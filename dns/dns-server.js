const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const functions = require('./functions.js');
const getConfig = require('./file-config');

module.exports = async function(ipAddress, resolver) {

    const settings = await getConfig();
    const config = settings.config;

    const upstreamDnsUdpHost = config.upstreamDnsUdpHost;
    const localDnsPort = config.localDnsPort;
    const upstreamDnsUdpPort = config.upstreamDnsUdpPort;
    const forgedRequestsTTL = config.forgedRequestsTTL;

    server.on('error', (err) => {
      console.log(`server error:\n${err.stack}`);
      server.close();
    });

    server.on('message', async (localReq, linfo) => {
        const dnsRequest = functions.parseDnsMessageBytes(localReq);

        // Multiple questions per query are not supported,
        // then should then support rejecting such requests,
        // or serve just first question like Google DNS does?

        const question = dnsRequest.questions[0];   // currently, only one question per query is supported by DNS implementations

        let forgingHostParams = undefined;

        let resolvedIp = resolver.resolve(linfo.address, question.domainName);
        if (resolvedIp) {
            forgingHostParams = {
                hostName: question.domainName,
                ip: resolvedIp,
                cname: null
            }
        }

        if (!!config.requestsToForge && !resolvedIp) {  // if requestsToForge section presents in config
            for (let i = 0; i < config.requestsToForge.length; i++) {
                const requestToForge = config.requestsToForge[i];
                const targetDomainNamePattern = requestToForge.hostNamePattern;

                if (functions.domainNameMatchesTemplate(question.domainName, targetDomainNamePattern)
                    && question.qclass === 1) {
                    switch (question.qtype) {
                        case 28:    // type IPv6 - not supported
                                    // (c) https://tools.ietf.org/html/rfc3596#section-2.1
                            const localDnsResponse = {
                                ID: dnsRequest.ID,
                                QR: true,
                                Opcode: dnsRequest.Opcode,
                                AA: dnsRequest.AA,
                                TC: false,      // dnsRequest.TC,
                                RD: dnsRequest.RD,
                                RA: false,       // ToDo should it be some more complex logic here, rather then simply setting to 'false'?
                                Z: dnsRequest.Z,
                                RCODE: 4,       // 4 - not implemented
                                QDCOUNT: dnsRequest.QDCOUNT,
                                ANCOUNT: 0,
                                NSCOUNT: 0,
                                ARCOUNT: 0,     // as we're not providing additional records section
                                questions: dnsRequest.questions
                            }

                            const responseBuf = functions.composeDnsMessageBin(localDnsResponse);

                            console.log('response composed for unsupported IPv6: ', localDnsResponse.questions[0]);
                            server.send(responseBuf, linfo.port, linfo.address);
                            break;
                        case 1:     // type Internet
                        case 5:     // type CNAME
                                    // compose DNS response locally
                            forgingHostParams = requestToForge;
                            break;
                    }
                    if (forgingHostParams) {
                        break;
                    }
                }
            }
        }

        if (!!forgingHostParams) {
            const forgeIp = forgingHostParams.ip;
            const forgeCNAME = forgingHostParams.cname;
            const answers = [];

            if (forgeIp) {
                answers.push({
                    domainName: question.domainName,
                    type: question.qtype,   // 1
                    class: question.qclass,
                    ttl: forgedRequestsTTL,
                    rdlength: 4,
                    rdata_bin: functions.ip4StringToBuffer(forgeIp),
                    IPv4: forgeIp
                });
            }
            else if (forgeCNAME) {
                const rdata = functions.writeDomainNameToBuf(forgeCNAME);
                const rdlength = rdata.length;

                answers.push({
                    domainName: question.domainName,
                    type: 5,    // type CNAME
                    class: question.qclass,
                    ttl: forgedRequestsTTL,
                    rdlength: rdlength,
                    rdata_bin: rdata
                });

                // if request QTYPE is 5 'CNAME', then requester awaits just canonical host name,
                // no need to make further DNS resolve.
                // Otherwise (QTYPE is 1), resolve IP address for canonical hostname from uplevel DNS server
                // and add this data to canonical hostname.
                if (question.qtype === 1) {
                    const remoteRequestFields = {
                        ID: Math.floor((Math.random() * 65535) + 1),
                        QR: false,
                        Opcode: 0,
                        AA: false,
                        TC: false,
                        RD: true,
                        RA: false,
                        Z: 0,
                        RCODE: 0,
                        QDCOUNT: 1,
                        ANCOUNT: 0,
                        NSCOUNT: 0,
                        ARCOUNT: 0,
                        questions: [
                            {
                                domainName: forgeCNAME,
                                qtype: 1,
                                qclass: 1
                            }
                        ]
                    }

                    let remoteResponseBuf;
                    try {
                        if (config.remoteDnsConnectionMode === "udp") {
                            const remoteRequestBin = functions.composeDnsMessageBin(remoteRequestFields);
                            remoteResponseBuf = await functions.getRemoteDnsResponseBin(remoteRequestBin, upstreamDnsUdpHost, upstreamDnsUdpPort);
                        }
                    } catch (error) {
                        console.error(error.message);
                    }

                    const remoteResponseFields = functions.parseDnsMessageBytes(remoteResponseBuf);
                    remoteResponseFields.answers.forEach( answer => {
                        answers.push(answer);
                    });
                }

            } else {
                console.warn('For ' + question.domainName + ', \'ip\' either \'cname\' field should be specified in dns.json');
            }

            const localDnsResponse = {
                ID: dnsRequest.ID,
                QR: true,
                Opcode: dnsRequest.Opcode,
                AA: dnsRequest.AA,
                TC: false,      // dnsRequest.TC,
                RD: dnsRequest.RD,
                // RA: true,       // ToDo should it be some more complex logic here, rather then simply setting to 'true'?
                RA: false,       // ToDo should it be some more complex logic here, rather then simply setting to 'true'?
                Z: dnsRequest.Z,
                RCODE: 0,       // dnsRequest.RCODE,    0 - no errors, look in RFC-1035 for other error conditions
                QDCOUNT: dnsRequest.QDCOUNT,
                ANCOUNT: answers.length,
                NSCOUNT: dnsRequest.NSCOUNT,
                ARCOUNT: 0,     // we don't provide records in additional section in this case
                questions: dnsRequest.questions,
                answers: answers
            }

            localDnsResponse.answers.forEach((answer)=>{
                console.log(`From ${linfo.address}, Domain: ${answer.domainName}, Resolved ip: ${answer.IPv4}`);
            });

            const responseBuf = functions.composeDnsMessageBin(localDnsResponse);
            server.send(responseBuf, linfo.port, linfo.address);
        }
        else {

            try {
                if (config.remoteDnsConnectionMode === "udp") {
                    const responseBuf = await functions.getRemoteDnsResponseBin(localReq, upstreamDnsUdpHost, upstreamDnsUdpPort);
                    server.send(responseBuf, linfo.port, linfo.address);
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    });

    server.on('listening', () => {
      const address = server.address();
      console.log(`DNS: ${address.address}:${address.port}`);
    });
    server.bind(localDnsPort, ipAddress);
};
