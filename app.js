const fs = require('fs')
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const resizeOptimizeImages = require('resize-optimize-images');

const app = express();

// Parse the body to JSON.
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// Download image and resize it.
const download = (uri, filename) => {
	request.head(uri, function (err, res, body) {
		console.log('content-type:', res.headers['content-type']);
		console.log('content-length:', res.headers['content-length']);
		request(uri).pipe(fs.createWriteStream(filename)).on('close', async () => {
			const options = {
				images: ['download.png', 'download.png'],
				width: 50,
				quality: 50
			};
			await resizeOptimizeImages(options);
			console.log('resizing done');
		});
	});
};

// Testing route for api test.
app.get('/api', (req, res) => {
	res.json({
		message: 'Welcome to the API'
	});
});

// Public route for user login.
app.post('/api/login', (req, res) => {
	console.log(req.body);
	const user = {
		email: req.body.email,
		password: req.body.password
	}
	jwt.sign({ user }, 'secretkey', (err, token) => {
		res.json({
			token
		});
	});
});

// Protected route for resizing incoming image from req.body.imageurl.
app.post('/api/thumbnail', verifyToken, (req, res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if (err) {
			res.sendStatus(403);
		}
		else {
			download(req.body.imageurl, 'download.png');
			res.json({
				message: 'Image successfully resized'
			});
		}
	});
});

// Verify Token
function verifyToken(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		// Set the token
		req.token = bearerToken;
		next();
	} else {
		//Invalid Token
		res.sendStatus(403);
	}

}

// Start the server at port 5000.
app.listen(5000, () => console.log('Server started on port 5000'));