# Blog API

This is a Node.js API that allows users to register, log in, create blogs and view blogs.
Unauthenticated users can only view public blogs.
Admin has access to all of the blogs and can allow/decline a certain blog.
If an Admin allows a users blog, the user becomes a Blogger and can view all of his blogs.

Authentication is handled with JWT tokens, and passwords are hashed with bcrypt.

The API is built with a PostgreSQL database connected with Sequelize.

## Routes

The following routes are documented in Postman documentation:
https://documenter.getpostman.com/view/25387074/2s93sgXAh3

## Database

The API uses a PostgreSQL database connected with Sequelize. The database is hosted online, so you don't need to set it up locally.

## Security

Passwords are hashed with bcrypt to ensure secure storage. Authentication is handled with JWT tokens, which are generated on login and register and sent back to the client.

## Usage

To run the API locally, follow these steps:

Clone this repository to your local machine.  
Install the required dependencies by running npm install.  
Start the development server with npm run start.  
Use a tool like Postman to make requests to the API.

## Credits

This API was created by Marko Čabo.
