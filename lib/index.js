'use strict'
const rp = require('request-promise');
const  _ = require('lodash');


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
        headers: {},
		body: {}
	}
	let headers = {
		'Authorization': 'key=' + this.key,
		'Content-Type': 'application/json'
	};
	this.options.headers = headers;
}

module.exports = FCM;

/**
 * [function description]
 * @param  {String || Array} target [description]
 * @return {FCM instance}        [description]
 */
FCM.prototype.sendTo = function(target){
	if(_.isArray(target)){
		if(this.options.body.to){
			target.push(this.options.body.to);
			delete this.options.body.to;
		}
		else if (this.options.body.registration_ids) {
			this.options.body.registration_ids.concat(target)
		}
		else {
			this.options.body.registration_ids = target
		}
	}
	else if (_.isString(target)) {
		if(this.options.body.registration_ids){
			this.options.body.registration_ids.push(target)
		}
		else if (this.options.body.to) {
				this.options.body.registration_ids = [this.options.body.to,target];
				delete this.options.body.to;
			}
		else{
			this.options.body.to = target;
		}
	}
	else {
		throw Error("Target must be string or array of string");
	}
	return this;
}


FCM.prototype.withMessage = function(payload){
	if(!payload)
		throw Error("payload not present")
	this.options.body.data = payload;
	return this;
}


/**
 * [Send fcm message now]
 * @return {[type]} [description]
 */
FCM.prototype.now = function(){
	if(this.options.body.to && this.options.body.registration_ids)
			throw Error("Cant send to and registration_ids both");
	return rp(this.options)
}


FCM.prototype.send = function(payload) {
	const self = this;
  self.options.body = payload
	return rp(self.options)

};
