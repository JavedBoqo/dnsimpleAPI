const request   = require('request');
const Token     = 'DNSIMPLE TOKEN';
const AccountID = "DNSIMPLE ACCOUNT ID";
const ZoneName  = 'test.com';  
const ZoneID    = "000"
const APIUrl    = `https://api.dnsimple.com/v2/${AccountID}/zones/${ZoneName}/records/${ZoneID}`;

const requestHeaders = {
    'Authorization' : 'Bearer ' + Token,
    'Accept'        : 'application/json',
    'Content-Type'  : 'application/json'
}

const options = {
    url: APIUrl,
    method: 'DELETE',
    headers: requestHeaders
};

request(options, function(err, res, body) {
    if(err) {
        console.log(`Error: ${err}`);    
        return;
    }
    console.log(`Zone deleted successfully: ${body}`);
});