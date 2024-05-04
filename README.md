## CactusInk Blog Page
This RESTful API is designed according to the MVC model, allowing users to add blogs and interact with existing ones by liking, commenting, and viewing. When a new user is created, they receive an automatic email with relevant information. The application utilizes different modules such as Multer for file uploading, Nodemailer for email sending, and Morgan for logging HTTP requests. API documentation is provided using tools like Swagger or Redoc, offering an interactive documentation experience to facilitate user understanding of the API. Token and JWT-based authentication mechanisms are implemented for ensuring communication security and enhancing user authentication. This ensures secure communication between client and server. With these features in place, the CactusInk RESTful API provides a comprehensive structure that enriches the user's blogging experience while ensuring security.

[CactusInk Blog Live Page](https://cactusink-backend.onrender.com/)
<br><br>
If you prefer to see Redoc or JSON instead of Swagger, simply replace 'swagger' in the endpoint with 'redoc' or 'json'.<br>
[Swagger Documents](https://cactusink-backend.onrender.com/documents/swagger/)

## Project Skeleton


```
CactusInk Blog Page (folder)
  ├── index.js          
  ├── .env
  ├── public
  ├    ┣ static
  ├    ┣ index.html   
  ├── src
      ┣ configs
      ┃ ┗ dbConnection.js
      ┃ ┣ swagger.json
      ┣ controllers
      ┃ ┣ auth.js
      ┃ ┣ blog.js
      ┃ ┣ category.js
      ┃ ┣ comment.js
      ┃ ┣ token.js
      ┃ ┗ user.js
      ┣ helpers
      ┃ ┣ sync.js
      ┃ ┣ sendMail.js
      ┃ ┗ paswordEncrypte.js
      ┣ middlewares
      ┃ ┣ authentication.js
      ┃ ┣ errorHandler.js
      ┃ ┣ logger.js
      ┃ ┣ ipMiddleware.js
      ┃ ┣ permissions.js
      ┃ ┣ upload.js
      ┃ ┗ queryHandler.js
      ┣ models
      ┃ ┣ blog.js
      ┃ ┣ category.js
      ┃ ┣ comment.js
      ┃ ┣ token.js
      ┃ ┗ user.js
      ┣ routes
      ┃ ┣ auth.js
      ┃ ┣ blog.js
      ┃ ┣ category.js
      ┃ ┣ comment.js
      ┃ ┣ document.js
      ┃ ┣ index.js
      ┃ ┣ token.js
      ┃ ┗ user.js
  ├── upload
  ├── swaggerAutogen.js
  ├── package.json   
  └── README.md       
```
## Tech/framework used
- **Express.js:** Fast and flexible Node.js web application framework.
- **MongoDB:** Flexible and scalable NoSQL database solution.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
- **Logging:** Logging functionality is integrated to track application activities and errors.
- **Swagger/Redoc:** Documentation is generated using Swagger or Redoc to provide API documentation in an interactive and user-friendly manner.
- **JSON File Creation:** JSON files are created to store data or configurations for various purposes.
- **Token-based Authentication:** Token-based authentication mechanism is implemented to ensure secure communication between client and server, enhancing overall application security and user authentication.
- **Dotenv:** Node.js module used for loading environment variables.
- **Express-async-errors:** Helper module for asynchronous error handling in Express applications.
- **CRUD Operations** Users can create, read, update, and delete books from the database.
- **Middleware** Middleware functions are implemented to handle requests, perform validations, and enhance security.
- **Morgan** HTTP request logging middleware for Node.js. It generates log files for HTTP requests, providing valuable insights into how your application is functioning by recording details of incoming and outgoing HTTP requests.
- **Multer** A versatile file upload middleware for Node.js. This package retrieves files from HTTP requests and uploads them to the server. It supports features such as multiple file uploads, file size limits, and file type restrictions.
- **Nodemailer** A Node.js library for sending emails. Nodemailer simplifies the process of sending emails via an SMTP server. It supports features like email templates, attachments, and HTML formatting.

## Project ERD

![erd](./erd.png)

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/esmaaksoy/CactusInk-Backend
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create .env file in home directory.
   ```sh
   HOST=localhost
   PORT=8000
   MONGODB=ENTER YOUR Database adres or local: mongodb://127.0.0.1:27017/cactusInk
   SECRET_KEY=ENTER YOUR random letters and number, for example: jsl78dd9ff6f6s9jkd89Kkfnfd
   ACCESS_KEY=ENTER YOUR random letters and number, for example: jsl78dd9ff6f6s9jkd89Kkfnfd
   REFRESH_KEY=ENTER YOUR random letters and number, for example: jsl78dd9ff6f6s9jkd89Kkfnfd
   PAGE_SIZE=25

   ```
4. Logs File
   ```sh
   You can write:
   mkdir logs
   ```
5. The project is ready, you can start using it now.
   ```sh
   You can run:
   nodemon
   ```

