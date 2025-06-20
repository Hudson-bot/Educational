﻿# Educational Platform

A full-stack web application designed for educational purposes, providing a platform for students and teachers to share content, practice for interviews, and manage academic materials.

## Features

- **User Authentication**: Secure sign-up and login functionality for students and teachers.
- **Content Sharing**: Teachers can upload various content types like PDFs and videos.
- **Student Dashboard**: A centralized hub for students to access all features.
- **AI Interview Bot**: An interactive bot to help students practice for technical interviews.
- **Notes Management**: Students can create, view, and manage their notes.
- **Research Paper Access**: A dedicated section for viewing and managing research papers.
- **Profile Management**: Users can view and update their profile information.

## Tech Stack

### Frontend

- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: A promise-based HTTP client for making API requests.
- **Context API**: For state management.

### Backend

- **Node.js**: A JavaScript runtime environment.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM library for MongoDB and Node.js.
- **JWT**: JSON Web Tokens for secure authentication.
- **OpenRouter**: Integration with AI models for the interview bot.

## Project Structure

The project is organized into two main directories:

- `backend/`: Contains the Node.js/Express server-side code, including API routes, controllers, models, and middleware.
- `Educational/`: Contains the React.js client-side application.

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB instance (local or cloud-based)

### Backend Setup

1.  Navigate to the backend directory:
    ```sh
    cd backend
    ```
2.  Install the dependencies:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
    JWT_SECRET=<YOUR_JWT_SECRET>
    EMAIL_HOST=<YOUR_EMAIL_HOST>
    EMAIL_PORT=<YOUR_EMAIL_PORT>
    EMAIL_USER=<YOUR_EMAIL_USER>
    EMAIL_PASS=<YOUR_EMAIL_PASS>
    OPENROUTER_API_KEY=<YOUR_OPENROUTER_API_KEY>
    ```
4.  Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1.  Navigate to the frontend directory:
    ```sh
    cd Educational
    ```
2.  Install the dependencies:
    ```sh
    npm install
    ```
3.  Start the frontend development server:
    ```sh
    npm run dev
    ```

The application should now be running on your local machine.
