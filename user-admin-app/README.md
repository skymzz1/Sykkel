# User Admin App

## Overview
The User Admin App is a web application that allows users to log in and provides an admin interface for managing user accounts. The application is structured into a frontend and backend, with a focus on user authentication and administration.

## Project Structure
```
user-admin-app
├── src
│   ├── frontend
│   │   ├── index.html        # Main entry point of the frontend application
│   │   ├── login.html        # Login page for user authentication
│   │   ├── admin.html        # Admin page for managing users
│   │   ├── css
│   │   │   └── styles.css    # Styles for the frontend application
│   │   └── js
│   │       └── app.js        # JavaScript for handling user interactions
│   └── backend
│       ├── app.js            # Entry point of the backend application
│       ├── routes
│       │   ├── auth.js       # Routes for authentication
│       │   └── admin.js      # Routes for admin functionalities
│       ├── controllers
│       │   ├── authController.js # Handles authentication logic
│       │   └── adminController.js # Handles admin logic
│       └── models
│           └── userModel.js  # Defines the user model
├── data
│   └── users.json            # Stores user data in JSON format
├── package.json               # Configuration file for npm
├── .gitignore                 # Specifies files to ignore by Git
└── README.md                  # Documentation for the project
```

## Setup Instructions
1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd user-admin-app
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the backend server**:
   ```
   node src/backend/app.js
   ```

4. **Open the frontend application**:
   Open `src/frontend/index.html` in your web browser.

## Usage
- Navigate to the login page to authenticate as a user.
- If you have admin privileges, you can access the admin page to add new users.

## Contributing
Feel free to submit issues or pull requests for any enhancements or bug fixes.