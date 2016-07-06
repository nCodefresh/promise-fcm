promise-fcm
===================
An implementation of firebase cloud messaging using promises.

Documentation
-------------

**Installation**
`npm install promise-fcm --save`


**Function chaining**
You can more easily chain functions and call `now` to send the message.
Example :

```javascript
let sender = new FCM('serverKey');
let message = {
	key: value
};
let registrationDeviceId = 'registrationDeviceId'
sender
	.sendTo(registrationDeviceId)
	.withMessage(message)
	.now()
	.then(function (response) {
	  console.log('Request succeeded with status ', response.statusCode);
	  console.log('The response is : ' , response.body);
	})
	.catch(function (err) {
	 console.log(err)
	});
```


**Usage example**
```javascript
let sender = new FCM('serverKey');
let message = {
	to: registrationDeviceId,
	data: {}
}
sender.send(message)
      .then(function (response) {
        console.log('Request succeeded with status ', response.statusCode);
        console.log('The response is : ' , response.body);
      })
      .catch(function (err) {
    	  console.log(err)
      });
```

Changelog
-------------
* 1.1.0 :
	*  Added new methodology , function chaining. Consider use it.
	* `send` method will print as well the new message about the function chaining methodology.
	* Methods `sendTo ` `withMessage ` `withNotification `  `withCollapseKey ` and `now ` will return in`err`array of errors is exist.

TODO'S
-------------
 * Add tests
 * Add retry case
 * Add more docs 
