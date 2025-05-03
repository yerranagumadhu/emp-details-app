
# Employee Details Viewer (App 2)

This React application is responsible for displaying detailed information about a specific employee based on their ID. It is designed to be opened in a new tab from App 1 (Employee Search App) and enforces restrictions to prevent users from opening multiple employee detail views simultaneously.

## Features

- Fetches employee details using their ID via a Django REST API.
- Redirects unauthenticated users to the Okta SAML SSO login.
- Prevents multiple tabs from opening different employee records.
- Displays detailed employee information including department, job title, salary, and hire date.

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd app2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm start
```

> This will start the application on [http://localhost:3001](http://localhost:3001)

## Environment Requirements

- Node.js >= 14.x
- React >= 18.x
- Backend Django API with Okta SSO protection running on [http://localhost:8000](http://localhost:8000)

## Key Functionalities

- Uses `localStorage` to track the currently viewed employee ID.
- Redirects to Okta login if the session is not authenticated.
- Automatically returns to the current tab (RelayState) after successful authentication.
- Handles errors and warnings gracefully (e.g., when trying to open another employee in a new tab).

## Sample API Endpoint

```
GET http://localhost:8000/employee/api/<empId>/
```

## Security Note

- RelayState parameter is passed to Django during SSO login to redirect users back to the correct React tab after authentication.
- LocalStorage key `openEmpId` is used to prevent concurrent viewing of different employee records.

## License

This project is licensed under the MIT License.
