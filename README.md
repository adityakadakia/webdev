# Prerequisites
Install Node.js, npm and MongoDB

# Set up local environment
1. Clone the repository
2. Install packages `npm install`
3. Start Mongo DB `mongod --dbpath </some/existing/directory>`
4. Export secret `export SESSION_SECRET=<foobar>`
5. Start server `node server.js`
6. Go to localhost:8080

# Tech
## Frontend
- HTML
- CSS, Twitter Bootstrap for responsive user interface
- JavaScript, AngularJS and jQuery for interactive pages

## Backend
- Node.js
- NPM packages: Express, Passport, bcrypt, mongoose and others
- MongoDB: No-SQL data store for user information, reviews, likes and followers

## 3P APIs
- Foursquare: search points of interest
- Google Maps: map with pins, search autocomplete and location
- Wikipedia: short descriptions
