# Full-Stack-Open-P3-The Phonebook Backend

This project is a simple phonebook application built with Node.js and Express. It provides a RESTful API for managing a list of persons, including adding, retrieving, and deleting persons.

## Project Structure

```
Full-Stack-Open-P3
├── .gitignore
├── controllers
│   ├── info.js
│   ├── personsApi.js
├── index.js
├── package.json
├── README.md
├── requests
│   ├── addInvalidPerson.rest
│   ├── addValidPerson.rest
│   ├── deletePerson.rest
│   ├── getAllPersons.rest
│   ├── getInfo.rest
│   ├── getPerson.rest
├── routes
│   ├── api.js
│   ├── info.js
├── services
│   ├── persons.js
```

### Controllers

- **controllers/info.js**: Handles the `/info` route to provide general information about the phonebook.
- **controllers/personsApi.js**: Handles the `/api/persons` routes for managing persons data.

### Routes

- **routes/api.js**: Sets up the routes for the `/api/persons` endpoint.
- **routes/info.js**: Sets up the route for the `/info` endpoint.

### Services

- **services/persons.js**: Contains the business logic for managing persons, including validation, adding, retrieving, and deleting persons.

### Requests

- **requests/addInvalidPerson.rest**: REST client file for testing invalid person addition.
- **requests/addValidPerson.rest**: REST client file for testing valid person addition.
- **requests/deletePerson.rest**: REST client file for testing person deletion.
- **requests/getAllPersons.rest**: REST client file for testing retrieval of all persons.
- **requests/getInfo.rest**: REST client file for testing the `/info` endpoint.
- **requests/getPerson.rest**: REST client file for testing retrieval of a single person by ID.

## Getting Started

### Prerequisites

- Node.js
- npm

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
    ```

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
  - **Errors**: None.

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

- **POST /api/persons**: Adds a new person.
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

- **DELETE /api/persons/:id**: Deletes a person by ID.
  - **Response**:
    - **204 No Content**: If the deletion is successful.
    - **404 Not Found**: If the person with the specified ID does not exist.
    ```json
    {
      "error": "Person not found"
    }
    ```

- **GET /info**: Provides general information about the phonebook.
  - **Response**:
    - **200 OK**: A text message with the number of persons in the phonebook and the current date and time.
    ```text
    Phonebook has info for X people
    <current date and time>
    ```

### Middleware

- **express.json()**: Parses incoming JSON requests.
- **cors()**: Enables CORS in development mode.
- **morgan**: Logs HTTP requests and responses.

### Error Handling

- **unknownEndpoint**: Middleware for handling requests to unknown endpoints, returning a 404 error.
  - **Response**:
    - **404 Not Found**: If the endpoint does not exist.
    ```json
    {
      "error": "unknown endpoint"
    }
    ```
