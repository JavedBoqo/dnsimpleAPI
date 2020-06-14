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
 
const requestHeaders = {
    'Authorization' : 'Bearer ' + Token,
    'Accept'        : 'application/json',
    'Content-Type'  : 'application/json'
}

const DnsDetail = {
    record_type :   "A",
    name        :   "mydns",
    type        :   "A",
    content     :   "8.8.8.1",
    ttl         :   600,
    priority    :   10
}

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
