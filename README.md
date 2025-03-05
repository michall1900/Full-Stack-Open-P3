# Full-Stack-Open-P3-The Phonebook Backend

This project is a simple phonebook application built with Node.js and Express. It provides a RESTful API for managing a list of persons, including adding, retrieving, and deleting persons.

## Link to Online Application

https://full-stack-open-p3-f9zw.onrender.com

## Project Structure

```
Full-Stack-Open-P3
├── .gitignore
├── controllers
│   ├── infoController.js
│   ├── personsController.js
├── index.js
├── package-lock.json
├── package.json
├── README.md
├── controllers
│   ├── infoController.js
│   ├── personsController.js
├── middlewares
│   ├── corsSettings.js
│   ├── errors.js
│   ├── getPersonModel.js
│   ├── isBodyExist.js
│   ├── requestLogger.js
├── models
│   ├── person.js
├── requests
│   ├── addInvalidPerson.rest
│   ├── addValidPerson.rest
│   ├── deletePerson.rest
│   ├── getAllPersons.rest
│   ├── getInfo.rest
│   ├── getPerson.rest
│   ├── updatePerson.rest
├── routes
│   ├── apiRoutes.js
│   ├── infoRoutes.js
├── services
│   ├── persons.js
│   ├── mongo.js
```

### Controllers

- **controllers/infoController.js**: Handles the `/info` route to provide general information about the phonebook.
- **controllers/personsApi.js**: Handles the `/api/persons` routes for managing persons data.

### Routes
- **routes/apiRoutes.js**: Defines the routes for the `/api/persons` endpoint, delegating the request handling to the corresponding controller functions.
- **routes/infoRoutes.js**: Defines the route for the `/info` endpoint, delegating the request handling to the corresponding controller function.

### Services

- **services/persons.js**: Contains the business logic for managing persons, including validation, adding, retrieving, and deleting persons while persons saves localy.
- **services/mongo.js**: This file was initially created for an exercise to demonstrate how to interact with a MongoDB database using JavaScript. However, it is no longer in use in the current project.


### Requests

- **requests/addInvalidPerson.rest**: REST client file for testing invalid person addition.
- **requests/addValidPerson.rest**: REST client file for testing valid person addition.
- **requests/deletePerson.rest**: REST client file for testing person deletion.
- **requests/getAllPersons.rest**: REST client file for testing retrieval of all persons.
- **requests/getInfo.rest**: REST client file for testing the `/info` endpoint.
- **requests/getPerson.rest**: REST client file for testing retrieval of a single person by ID.
- **requests/updatePerson.rest**: REST client file for testing updating a person's information.


## Getting Started

### Prerequisites

- Node.js
- npm
- .env (If you are unable to use the online application link or are in dev mode) : A File with the enviornment variable `MONGODB_URI`: The connection string for the MongoDB database (if applicable).

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd part3
    ```
3. Install the dependencies:
    ```sh
    npm install
4. If you are unable to use the online application link or are in dev mode, create a MongoDB web service.

    Follow these steps to set up the MongoDB service:

    1. Create a MongoDB database:
      - You can use a cloud service like MongoDB Atlas or set up a local MongoDB server.

    2. Obtain the MongoDB connection string:
      - For MongoDB Atlas, you can find the connection string in the Atlas dashboard.
      - For a local MongoDB server, the connection string is usually `mongodb://localhost:27017/<database-name>`.

    3. Create a `.env` file in the project root directory and add the following environment variable:
      ```sh
      MONGODB_URI=<your-mongodb-connection-string>
      ```

    4. Update the `services/mongo.js` file to use the connection string from the `.env` file.

    5. Ensure that the `services/persons.js` file interacts with the MongoDB database for CRUD operations.

    6. Start the MongoDB server (if using a local server) and run the application as described in the "Running the Application" section.
### Running the Application

To start the application in development mode:
```sh
npm run dev
```
To start the application in production mode:
```sh
npm run start
```

### API Endpoints

- **GET /api/persons**: Retrieves a list of all persons.
  - **Response**: 
    - **200 OK**: An array of person objects.
    ```json
    [
      {
        "id": 1,
        "name": "John Doe",
        "number": "123-456-7890"
      },
      ...
    ]
    ```
  - **Errors**:
    - **500 Internal Server Error**: If there is a problem communicating with MongoDB.
    ```json
    {
    "error": "<A MongoDB error>"
    }
    ```

- **GET /api/persons/:id**: Retrieves a specific person by ID.
  - **Response**:
    - **200 OK**: A person object.
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "number": "123-456-7890"
    }
    ```
    - **404 Not Found**: If the person with the specified ID does not exist.
    ```json
    {
      "error": "Person not found"
    }
    ```
    - **Errors**:
      - **400 Bad Request**: If the ID is malicious or improperly formatted.
      ```json
      {
        "error": "malformatted id"
      }
      ```
      - **500 Internal Server Error**: If there is a problem communicating with MongoDB.
      ```json
      {
      "error": "<A MongoDB error>"
      }
      ```

- **POST /api/persons**: Adds a new person.
  You should give a valid phonenumber and name.
   * `name`: A string that must be unique, required, and match a specific pattern.
      The pattern enforces that the name should start with an uppercase letter followed by lowercase letters, and can include multiple words separated by spaces. The minimum length is 3 characters.
  * `number`: A string that is required and must pass a custom validation function.
    The validation ensures that the number starts with 2-3 digits, followed by a hyphen, and then more digits.Also, the number should be with a minimum length of 8 characters.

  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "number": "123-456-7890"
    }
    ```
  - **Response**:
    - **201 Created**: The created person object.
    ```json
    {
      "id": 2,
      "name": "John Doe",
      "number": "123-456-7890"
    }
    ```
    - **400 Bad Request**: If the name or number is missing or already exists.
    ```json
    {
      "error": "Name or number is missing"
    }
    ```
    ```json
    {
      "error": "Name must be unique"
    }
    ```
    - **Errors**:
      - **400 Bad Request**: If the name is within an invalid pattern.
      ```json
      {
      "error": "<Explanation about the valid pattern>"
      }
      ```
      - **400 Bad Request**: If the number is within an invalid pattern.
      ```json
      {
      "error": "<Explanation about the valid pattern>"
      }
      ```
      - **500 Internal Server Error**: If there is a problem communicating with MongoDB.
      ```json
      {
      "error": "<A MongoDB error>"
      }
      ```
- **DELETE /api/persons/:id**: Deletes a person by ID.
  - **Response**:
    - **204 No Content**: If the deletion is successful.
    - **404 Not Found**: If the person with the specified ID does not exist.
    ```json
    {
      "error": "Person not found"
    }
    ```
  - **Errors**:
    - **400 Bad Request**: If the ID is malicious or improperly formatted.
    ```json
    {
      "error": "malformatted id"
    }
    ```
    - **500 Internal Server Error**: If there is a problem communicating with MongoDB.
    ```json
    {
      "error": "<A MongoDB error>"
    }
    ```

  - **PUT /api/persons/:id**: Updates a person's information by ID.
    - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "number": "123-456-7890"
    }
    ```
    - **Response**:
    - **200 OK**: The updated person object.
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "number": "123-456-7890"
    }
    ```
    - **404 Not Found**: If the person with the specified ID does not exist.
    ```json
    {
      "error": "Person not found"
    }
    ```
    - **Errors**:
    - **400 Bad Request**: If the name or number is missing or invalid.
    ```json
    {
      "error": "Name or number is missing or invalid"
    }
    ```
    - **400 Bad Request**: If the ID is malicious or improperly formatted.
    ```json
    {
      "error": "malformatted id"
    }
    ```
    - **500 Internal Server Error**: If there is a problem communicating with MongoDB.
    ```json
    {
      "error": "<A MongoDB error>"
    }
    ```
  
- **GET /info**: Provides general information about the phonebook.
  - **Response**:
    - **200 OK**: A text message with the number of persons in the phonebook and the current date and time.
    ```text
    Phonebook has info for X people
    <current date and time>
    ```
  - **Errors**:
    - **500 Internal Server Error**: If there is a problem communicating with MongoDB.
    ```json
    {
      "error": "<A MongoDB error>"
    }
    ```


### Middlewares

- **express.json()**: Parses incoming JSON requests.
- **corsSettings.js**: Enables CORS in development mode for a specific URL (http://localhost:5173 - if the frontend is running separately).
- **requestLogger.js**: Logs HTTP requests and responses.
- **isBodyExist.js**: Middleware that checks if the request contains a body before processing the request.
- **getPersonModel.js**: Middleware that retrieves the person model from the database and attaches it to the request object for further processing.
- **errors.js**: Contains custom error handling middleware functions for the application.

### Error Handling

- **unknownEndpoint**: Middleware for handling requests to unknown endpoints, returning a 404 error.
  - **Response**:
    - **404 Not Found**: If the endpoint does not exist.
    ```json
    {
      "error": "Unknown Endpoint"
    }
    ```

- **idErrorHandler**: Middleware for handling errors related to invalid IDs.
  - **Response**:
    - **400 Bad Request**: If the ID is malformatted.
    ```json
    {
      "error": "malformatted id"
    }
    ```

- **duplicateErrorHandler**: Middleware for handling duplicate key errors in MongoDB.
  - **Response**:
    - **400 Bad Request**: If a duplicate key error is detected.
    ```json
    {
      "error": "The name is already exist inside the phonebook."
    }
    ```

- **errorHandler**: Middleware for handling general errors in the application.
  - **500 Internal Server Error (or another status thrown by other routes)**: If an unexpected error occurs.
    ```json
    {
      "error": "<Error message>"
    }
    ```

### Models
  - **models/person.js**: Defines the Mongoose schema and model for a person, including validation rules and JSON transformation settings. It exports a function to receive the Person model.
