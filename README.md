# Contact Management App - Backend
This project is a backend implementation of a Contact Management App, developed as part of the TalentLabs Certified Associate in Back-end Development certification. The app allows users to efficiently manage their contacts, including features for user registration, authentication, and CRUD (Create, Read, Update, Delete) operations on contacts.
### Key Features:

-   **User Authentication & Authorization**: Secure user registration and login using JWT tokens, ensuring that only authenticated users can access and manage their contacts.
-   **Robust Contact Management**: Full CRUD functionality for managing contacts, with each user's contacts securely isolated.
-   **Input Validation & Error Handling**: Comprehensive validation for user inputs, including email validation using regex, and detailed error handling to ensure a smooth user experience.
-   **Security Best Practices**: Passwords are hashed using bcrypt, and sensitive operations are protected by token-based authentication.
-   **Scalability & Maintainability**: The app is built with scalability in mind, using Node.js, Express, and MongoDB with Mongoose for a robust and maintainable codebase.
-   **Environment Configuration**: Secure handling of environment variables using dotenv, ensuring the application's security and flexibility across different environments.

## Routes
### Users
- Register a user: POST `/api/users/register`
-- body: *{ username, email, password }*
- Login a user: POST `/api/users/login`
-- body: *{ email, password }*
- Get current user info (private): GET `/api/users/current`
### Contacts
(all the contacts related routes are private)
- Get all contacts: GET `/api/contacts`
- Create new contact: POST `/api/contacts`
-- body: *{ name, email, phone }*
- Get contact with *:id*: GET `/api/contacts/:id`
- Update contact by *:id*: PUT `/api/contacts/:id`
- Delete a contact by *:id*: DELETE `/api/contacts/:id`
