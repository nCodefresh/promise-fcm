'use strict'
var rp = require('request-promise');

function FCM(key){
	if(key)
		this.key = key;
	else{
		throw Error("Key not present");
	}

	this.options = {
		resolveWithFullResponse: true, 
		json: true,
		uri: 'https://fcm.googleapis.com/fcm/send',
        port: 443,
        method: 'POST',
        headers: {}
	}
}

module.exports = FCM;

FCM.prototype.send = function(payload) {
	const self = this;
    let headers = {
    	'Authorization': 'key=' + self.key,
    	'Content-Type': 'application/json'
    };
    self.options.headers = headers;
    self.options.body = payload
	return rp(self.options)

};