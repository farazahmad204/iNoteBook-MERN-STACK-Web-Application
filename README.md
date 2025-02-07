iNoteBook - MERN Stack Web Application iNoteBook is a MERN Stack web application that allows users to create, save, update, and delete individual notes. These notes are stored in a database and can be displayed on the web browser.

This is the basic structure and setup for the iNoteBook MERN stack web application. The app uses a RESTful API for backend communication and a dynamic, user-friendly interface for the frontend.

Features: User Note Management: Users can create, update, and delete their individual notes. User Authentication: APIs for user creation, deletion, and authentication. Data Interaction: Backend APIs for fetching and managing user notes data.

image

Backend: The backend of the application is built with Node.js, Express, and MongoDB using Mongoose. Here are the key packages used in the backend:

express - Web framework for building RESTful APIs. Command: npm i express mongoose - ODM (Object Data Modeling) library for MongoDB. Command: npm i mongoose nodemon - Development tool to automatically restart the server on file changes. Command: npm i -D nodemon cors - Middleware to enable Cross-Origin Resource Sharing. Command: npm i cors express-validator - Middleware for validating request data. bcryptjs - Library for hashing and comparing passwords. jsonwebtoken (JWT) - For creating and verifying JSON Web Tokens (JWT) for authentication. Command: npm i jsonwebtoken Frontend: The frontend is built with React.js. Below are the key steps and packages used in the frontend:

create-react-app - A tool for setting up a React application with a single command. Command: npx create-react-app my-app react-dom - Library that serves as the glue between React and the DOM. Command: npm install react-dom npm start - Command to start the React development server and run the app locally.
