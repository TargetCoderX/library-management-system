
# Library Management Sysyem

### Overview
The Library Management System is a comprehensive and user-friendly application designed to streamline the operations of a library. This system provides librarians and users with a robust platform to manage books, track borrowed and returned items, maintain user records, and facilitate the efficient operation of library activities.


## Features

- **Book Management**: Add, update, and delete book records with details such as title, author, genre, publication date, and ISBN.

- **User Management**: Maintain a database of library members including their personal details, membership status, and borrowing history.

- **Borrowing and Returning**: Easily issue and return books, automatically updating the inventory and user records.

- **Inventory Tracking**: Real-time tracking of book availability and generating reports on inventory status.

- **Overdue Management:** Monitor overdue books and send notifications to users for returns.


## Tech Stack

- **Frontend**: Next JS for both frontend and backend (React)
- **Backend**: Next JS for both frontend and backend (NODE)
- **Database**: MongoDB
- **Authentication**:  JOSH with JWT (JSON Web Tokens) for secure user authentication and authorization.


## Installation

Clone the repo to your local machine

**NOTE**: You have to install mongoDB and setup for database

```bash
git clone https://github.com/TargetCoderX/library-management-system.git
cd library-management-system
```

Install Dependencies:

```bash
npm install
```

Set Up Environment Variables: rename .env.example to .env.local file in the root directory and add the following variables:
 ```
MONGODB_URL=your_mongo_database_uri
JWT_SECRET=your_jwt_secret
MAILER1_HOST=smtp.gmail.com
MAILER1_USERNAME=*******************@gmail.com
MAILER1_PASSWORD=*****************************
MAILER1_PORT=587
 ```

 Run the Application:

```
npm run dev
```
    
## Contributing

We welcome contributions to enhance the functionality and performance of this Library Management System. If you have suggestions, bug reports, or pull requests, please feel free to open an issue on GitHub.
## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License 


## Authors

- [@Soumya Manna](https://portfolio-frontend-soumya-manna-1999.vercel.app/)

