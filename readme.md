# Todo Backend API

This is a simple backend API for a todo application. It includes CRUD operations for todos and user authentication using JWT. Each todo is associated with an author (user) and contains content, a completed status, and a timestamp.

## API Endpoints

### Authentication

- **Login** - `POST /users`
  - Logs in the user and returns a JWT token.
  - **Request body:**
    ```json
    {
      "username": "your-username",
      "password": "your-password"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "your-jwt-token"
    }
    ```

### Todos

- **Get All Todos** - `GET /todos`
  - Retrieves all todos for the logged-in user.
  - **Headers:**
    ```
    Authorization: Bearer <your-jwt-token>
    ```
  - **Response:**
    ```json
    [
      {
        "_id": "todo-id",
        "author": {
          "id": "author-id",
          "username": "author-username"
        },
        "content": "Todo content",
        "completed": false,
        "createdAt": "2024-09-08T12:00:00Z"
      }
    ]
    ```

- **Create Todo** - `POST /todos`
  - Creates a new todo.
  - **Request body:**
    ```json
    {
      "content": "Todo content"
    }
    ```
  - **Headers:**
    ```
    Authorization: Bearer <your-jwt-token>
    ```
  - **Response:**
    ```json
    {
      "_id": "new-todo-id",
      "author": {
        "id": "author-id",
        "username": "author-username"
      },
      "content": "Todo content",
      "completed": false,
      "createdAt": "2024-09-08T12:00:00Z"
    }
    ```

- **Get Todo by ID** - `GET /todos/:todoID`
  - Retrieves a specific todo by its ID.
  - **Headers:**
    ```
    Authorization: Bearer <your-jwt-token>
    ```
  - **Response:**
    ```json
    {
      "_id": "todo-id",
      "author": {
        "id": "author-id",
        "username": "author-username"
      },
      "content": "Todo content",
      "completed": false,
      "createdAt": "2024-09-08T12:00:00Z"
    }
    ```

- **Edit Todo** - `PUT /todos/:todoID`
  - Updates a specific todo by its ID.
  - **Request body:**
    ```json
    {
      "content": "Updated content",
      "completed": true
    }
    ```
  - **Headers:**
    ```
    Authorization: Bearer <your-jwt-token>
    ```

- **Delete Todo** - `DELETE /todos/:todoID`
  - Deletes a specific todo by its ID.
  - **Headers:**
    ```
    Authorization: Bearer <your-jwt-token>
    ```

## Todo Model

The `Todo` model includes the following fields:

- **author**: An object containing:
  - `id` (ObjectId of the user)
  - `username` (String, required)
  
- **content**: A string representing the todo, required with a maximum length of 50 characters.
  
- **completed**: A boolean flag indicating whether the todo is completed, default is `false`.

- **createdAt**: A timestamp indicating when the todo was created, default is the current date and time.

## Setup

1. Clone the repository.
2. Install the required dependencies using:
   ```bash
   npm install
   ```
3. Rename .env.sample file in the root directory to .env and edit variables
   ```bash
   PORT=PortYouWantServerToRun MONGODB_URI=YourMongoBDConnectionString JWT_SECRET=YourJWTSecret
   ```
4. Run the server using:
    ```bash
    npm start
    ```
## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication