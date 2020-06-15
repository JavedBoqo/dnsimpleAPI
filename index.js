/* INSTRUCTIONS 
-Install request module using  below command in Command Shell:
    npm install --save request@2.88.2
-Add DNS values as per your requirements inside DnsDetail object
-Now run below command:
    node dns.js
    */
   
const request   = require('request');
const Token     = 'DNSIMPLE TOKEN';
const AccountID = "DNSIMPLE ACCOUNT ID";
const ZoneName  = 'test.com';  
const APIUrl    = `https://api.dnsimple.com/v2/${AccountID}/zones/${ZoneName}/records/`;
const Params    = process.argv.slice(2);

if(Params.length < 4) {
    console.log(`Parameters missing: {TYPE} {NAME} {IP} {TTL}`);
    return;
}

const DNSType = Params[0].toUpperCase();
const DNSName = Params[1];
const DNSIP   = Params[2];

//***** Check for Valid TTL
let TTL         = Params[3];
let ttlValue    = 0;
switch((Params[3]).toString().toUpperCase()) {
    case '1M':
    case '10M':
        TTL         = parseInt(TTL.replace("M",""));
        ttlValue    = TTL*60;
    break;
    case '1H':
    case '2H':
    case '4H':
    case '8H':
    case '12H':
        TTL         = parseInt(TTL.replace("H",""));
        ttlValue    = TTL*60*60;
        break;
    case '1D':
    case '3D':
        TTL         = parseInt(TTL.replace("D",""));
        ttlValue    = TTL*24*60*60;
    break;
}    

const DnsDetail = {
    record_type :   DNSType,
    name        :   DNSName,
    type        :   DNSType,
    content     :   DNSIP,
    ttl         :   ttlValue,
    priority    :   10
}
if(ttlValue <= 0) {
    console.log("Invalid TTL value");
    return;
}

const requestHeaders = {
    'Authorization' : 'Bearer ' + Token,
    'Accept'        : 'application/json',
    'Content-Type'  : 'application/json'
}

// const DnsDetail = {
//     record_type :   "A",
//     name        :   "mytest",
//     type        :   "A",
//     content     :   "8.8.8.1",
//     ttl         :   600,
//     priority    :   10
// }

const Options =    {
    url     :   APIUrl,
    headers :   requestHeaders,
    body    :   JSON.stringify(DnsDetail)
}

console.log("Request send to DNSimple API please wait...");

request.post(
    Options,
    (err,httpResponse,body) => {
     if(err)  {
         console.log(`Error: ${err}`);
         return;
     }
     console.log(`Success: ${body}`);
    }
);

