LOGIN API
This project is a simple stateless microservice in Nodejs,with two major functionalities-
-Authentication
-Image Thumbnail generation
An arbitrary username/password pair is used for logging in the server and a JWT(JSON Web Token) is issued to the user which is used to validate future requests.
The JWT obtained in the “Login” endpoint must be attached to each request. If the JWT is missing or invalid, the endpoints should reject any further request. If 
the JWT is valid, along with the public url of an image, then the image is downloaded and it is resized into 50*50 pixel.

Prerequisites
We would be testing the api in POSTMAN which can be installed from https://www.postman.com/downloads/
For this project, we are also relying on some external dependencies.
The first one is express. It will make creating an API very easy and convenient. 
Install it using: npm install express
Furthermore, we need a library to transform our images.  
Install it using: npm install resize-optimize-images
For authentication we would need jsonwebtoken library.
Install it using: npm install jsonwebtoken
We would also need body-parser library, filesystem library, and request library.
it can be installed using npm i body-parser,npm i fs, npm i request.

Running the Test
For running the test, we first start the server on command prompt using: npm start
It should state that: Server started on port 5000
Then we go on postman and go on the link http://localhost:5000/api/login
then we go on body and change the data type from raw to json and provide the credentials email and password.
For Example: {
"email": "abc@gmail.com",
"password": "123"
}
 then the token is issued for any id and password for example:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWJjQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzIn0sImlhdCI6MTU5MDI1MDE2M30.jVBlRanF8oDd6rzYWtgNpFRRXhHQOgGiuJAmAvgEZII"
}
copy the token for further future requests.
Then open a new tab in the Postman and go on the link http://localhost:5000/api/thumbnail
and go to header and select Authorization in key box
and paste the token which was generated during login in th value box
and then go to body change the data type from RAW to JSON
and provide the link of the image which you want to download.

After successfull download and resizing the image into 50*50 pixel it gives output as: Image successfully resized.

Built With:
Node js
express api



