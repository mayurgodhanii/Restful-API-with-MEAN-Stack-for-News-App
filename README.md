# Restful-API-with-MEAN-Stack-User-Authentication-News-App
Create a RESTful API User Authentication Server Using the MEAN Stack with News App

## Requirements

- Node and npm

## Installation

- Clone the repo: `git clone https://github.com/mayurgodhanii/Restful-API-with-MEAN-Stack-for-News-App.git`
- Install dependencies: `npm install`
- Start the server: `node server.js`

## Testing the API
Test your API using [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop)

## Postman Collection
Postman Collection URL: https://www.getpostman.com/collections/d2a6ea31e7eb0f0561a9

## Rest API List

- POST - Signup (http://localhost:8080/api/signup)
- POST - Login (http://localhost:8080/api/login)
- POST - Profile Update (http://localhost:8080/api/profile)
- GET - Categories (http://localhost:8080/api/categories)
- GET - Get News Category wise (http://localhost:8080/api/news/:category_id/0)
- POST - Add News By Admin only (http://localhost:8080/api/news/:category_id/0)
- PUT - Edit News By Admin only (http://localhost:8080/api/news/:category_id/:news_id)
- DEL- Delete News By Admin only (http://localhost:8080/api/news/0/:news_id)
- GET - Search News (http://localhost:8080/api/search/:term)
