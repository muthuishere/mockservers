
This project is a mock backend server for a todo list application. It includes endpoints for authentication, managing todos, and user profiles. The server is built using `json-server`, `jsonwebtoken`, and `express`.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/muthuishere/mockservers.git
   cd mockservers
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   npm run start-todo-backend
   ```

The server will be running at `http://localhost:4632`.  Now you can invoke this endpoints from your frontend app , All the data is configurable via db.json

## API Endpoints

### Authentication

#### 

- **URL**: `/auth/login`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "username": "user1",
    "password": "password1"
  }
  ```

- **Example Fetch Request**:
  ```javascript
  fetch('http://localhost:4632/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'user1',
      password: 'password1'
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // { token: "..." }
  })
  .catch(error => console.error('Error:', error));
  ```

### Todo List

#### Get All Todos

- **URL**: `/todos`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

- **Example Fetch Request**:
  ```javascript
  fetch('http://localhost:4632/todos', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer <your-token>'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // Array of todos
  })
  .catch(error => console.error('Error:', error));
  ```

#### Create a Todo

- **URL**: `/todos`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Body**:
  ```json
  {
    "userId": 1,
    "title": "New Todo",
    "completed": false
  }
  ```

- **Example Fetch Request**:
  ```javascript
  fetch('http://localhost:4632/todos', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <your-token>',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: 1,
      title: 'New Todo',
      completed: false
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // Created todo object
  })
  .catch(error => console.error('Error:', error));
  ```

### User Profile

#### Get User Profile

- **URL**: `/users/:id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

- **Example Fetch Request**:
  ```javascript
  fetch('http://localhost:4632/users/1', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer <your-token>'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // User profile object
  })
  .catch(error => console.error('Error:', error));
  ```

## JSON Server Routes

The `json-server` routes are automatically generated based on the `db.json` file. Here are some example routes:

- `/users`: GET, POST, PUT, DELETE
- `/todos`: GET, POST, PUT, DELETE

## Middleware

### Authentication Middleware

The authentication middleware ensures that all routes except `/auth` are protected. You need to include the `Authorization` header with a valid JWT token for accessing protected routes.

### Error Handling

If the token is invalid or missing, the server will respond with a `401 Unauthorized` error.

## License

This project is licensed under the MIT License.



