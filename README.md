promise-fcm
===================
An implementation of firebase cloud messaging using promises.

Documantation
-------------

**Installation**
`npm install promise-fcm --save`


**Usage example**
```javascript
let sender = new FCM("serverKey");
let message = {
	to: registrationDeviceId,
	data: {}
}
sender.send(message)
      .then(function (response) {
        console.log("Request succeeded with status ", response.statusCode);
        console.log("The response is : " , response.body);
      })
      .catch(function (err) {
    	  console.log(err)
      });
```


TODO'S
-------------
 * Add tests
 * Add retry case
 * Add more docs 
