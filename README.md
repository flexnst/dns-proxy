# Easy DNS

This is easy DNS-server with web-interface for debug mobile applications or other.

## Setup

```bash
git clone https://github.com/flexnst/dns-proxy.git
cd dns-proxy
npm i
npm run production
sudo npm dun server
```

After starting server print link to local web UI and DNS-server ip:

For example:
```
Web: http://192.168.0.101
DNS: 192.168.0.101:53
```

## Configuring device

Add a new DNS server 192.168.0.101 (You may have another!) to the network settings of your device, it is **important that it is the first in the list**.

## Open web ui

Open link http://192.168.0.101 (You may have another!) in your browser and manage domain personally for you device.

## Read more

This project, a fork of the https://github.com/kolobok86/dns-proxy repository, you can read there for more detailed information about the work of DNS server writed on NodeJS. Thanks!