'use strict'
const rp = require('request-promise');
const  _ = require('lodash');


function FCM(key){
	if(!key)
		throw Error("Key not present");
	this.key = key;

	this.err = [];

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
		this.err.push("Target must be a string or array of strings");
	}
	return this;
}


FCM.prototype.withMessage = function(payload){
	if(!payload)
		this.err.push("payload not present")
	this.options.body.data = payload;
	return this;
}


FCM.prototype.withNotification = function(notification){
	if(!notification)
		this.err.push("notification not present");
	this.options.body.notification = notification;
	return this;
}

FCM.prototype.withCollapseKey = function(key){
	if(!key)
		this.err.push("Key must be a string")
	this.options.body.collapse_key = key;
	return this;
}

/**
 * [Send fcm message now]
 * @return {[type]} [description]
 */
FCM.prototype.now = function(){
	if(this.options.body.to && this.options.body.registration_ids)
		this.err.push("Cant send to and registration_ids both");
	if(this.err.length) return Promise.reject(this.err)
	return rp(this.options)
}


FCM.prototype.send = function(payload) {
	const self = this;
  	self.options.body = payload
	return rp(self.options)
				.then(function (response) {
					console.info("Please consider using method chainig methodology => sendTo(target).withMessage(message).now().then().catch()");
					return Promise.resolve(response)
				})
				.catch(function (err) {
					console.info("Please consider using method chainig methodology => sendTo(target).withMessage(message).now().then().catch()");
					return Promise.reject(err);
				});

};
