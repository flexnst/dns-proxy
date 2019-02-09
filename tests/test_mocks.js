exports.responseBuffer = Buffer.from([
/* number   byte        comment
/* 0 */	    12,			// ID
/* 1 */	    245,			//
/* 2 */	    129,			//	b1000 0001 	QR = 1 => "response"
/* 3 */	    128,			//
/* 4 */	    0,			// qdcount 1
/* 5 */	    1,			//
/* 6 */	    0,			// ancount 2
/* 7 */	    2,			//
/* 8 */	    0,			// nscount 0
/* 9 */	    0,			//
/* 10 */	0,			// arcount 0
/* 11 */	0,			//
/* 12 */	6,			// Question
/* 13 */	115,		// s
/* 14 */	116,		// t
/* 15 */	97,		    // a
/* 16 */	116,	    // t
/* 17 */	105,		// i
/* 18 */	99,		    // c
/* 19 */	5,
/* 20 */	100,		// d
/* 21 */	101,		// e
/* 22 */	118,		// v
/* 23 */	108,		// l
/* 24 */	105,	    // i
/* 25 */	2,
/* 26 */	114,		// r
/* 27 */	117,		// u
/* 28 */	0,
/* 29 */	0,			// qtype
/* 30 */	1,			//
/* 31 */	0,			// qclass
/* 32 */	1,			//
/* 33 */	192,		// Answer #1; b1100 0000 => name compression
/* 34 */	12,			// offset 12 => static.devli.ru
/* 35 */	0,			// type
/* 36 */	1,			//
/* 37 */	0,			// class
/* 38 */	1,			//
/* 39 */	0,			// TTL
/* 40 */	0,			//
/* 41 */	1,			//
/* 42 */	43,			//
/* 43 */	0,			// rdlength = 4
/* 44 */	4,			//
/* 45 */	104,		// rdata "104.27.160.191"
/* 46 */	27,			//
/* 47 */	160,		//
/* 48 */	191,		//
/* 49 */	192,		// Answer #2; name compression
/* 50 */	12,			// offset 12 => static.devli.ru
/* 51 */	0,			// type
/* 52 */	1,			//
/* 53 */	0,			// class
/* 54 */	1,			//
/* 55 */	0,			// TTL
/* 56 */	0,			//
/* 57 */	1,			//
/* 58 */	43,			//
/* 59 */	0,			// rdlength = 4
/* 60 */	4,			//
/* 61 */	104,		// rdata "104.27.161.191"
/* 62 */	27,			//
/* 63 */	161,		//
/* 64 */	191			//
])

exports.requestBuffer = Buffer.from([
// domainName: 'play.google.com', qtype: 1, qclass: 1
    0x2C,
    0xAF,
    0x01,
    0x00,
    0x00,
    0x01,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x04,
    0x70,
    0x6C,
    0x61,
    0x79,
    0x06,
    0x67,
    0x6F,
    0x6F,
    0x67,
    0x6C,
    0x65,
    0x03,
    0x63,
    0x6F,
    0x6D,
    0x00,
    0x00,
    0x01,
    0x00,
    0x01
]);
