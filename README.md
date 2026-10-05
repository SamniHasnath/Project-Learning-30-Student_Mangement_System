# Student Management System

A simple full-stack web application for managing student records. The system allows users to **add, view, edit, search, filter, sort and delete students**, view student insights, and import or export student data.

The project is built with **Node.js, Express, lowdb, HTML, CSS and Vanilla JavaScript**, with no frontend framework or build step.

---

## 📌 Overview

The **Student Management System** is a single-page dashboard designed to provide a simple alternative to managing student information through spreadsheets or paper records.

Each student record contains:

* Name
* Email
* Course
* Academic year
* Status
* Phone number
* Creation and update timestamps

The application demonstrates a complete **frontend → REST API → backend → data storage** workflow.

### What the system can do

* Create new student records
* View all students
* Edit existing students
* Delete students
* Search students
* Filter students by status
* Sort students
* Display summary statistics
* Display course, year and status insights
* Export data as CSV or JSON
* Import student data from JSON backups
* Work on desktop and mobile screens

> **Important:** This is a learning/internship project. Authentication and authorization are not currently implemented, so it is intended for local or trusted environments.

---

## ✨ Features

### 👨‍🎓 Student Management

* View all student records in a dashboard
* Add new students
* Edit existing students
* Delete students with confirmation
* Display student initials as avatars
* Display course, year, status and contact information

### 🔎 Search, Filter & Sort

Students can be searched by:

* Name
* Email
* Course
* Phone

Available filters:

* Active
* On leave
* Graduated

Available sorting options:

* Name
* Newest
* Year
* Course

A reset option clears the current search, filter and sorting options.

### ✅ Validation

The backend validates incoming student data.

* Name is required
* Email is required
* Course is required
* Year is required
* Email format is validated
* Email addresses must be unique
* Status must be one of the allowed values
* Optional phone number is trimmed
* Input values are cleaned before being stored

### 📊 Dashboard Summary

The dashboard displays:

* Total students
* Active students
* Students on leave
* Year 4 students who have not graduated

### 📈 Insights

The Insights page provides:

* Students by status
* Students by academic year
* Students by course
* Five newest students

### ⚙️ Settings

The Settings page supports:

* Export students as CSV
* Export students as JSON
* Import students from a JSON backup
* Skip records with existing email addresses

### 📱 Responsive Design

The interface works on different screen sizes.

On smaller screens:

* The sidebar changes into a top navigation/tab layout
* Tables and dashboard elements adapt to the available width

### 🔐 Basic Security

The application includes basic protection against Cross-Site Scripting (XSS) by escaping user-provided values before rendering them into HTML.

---
<img width="1515" height="690" alt="image" src="https://github.com/user-attachments/assets/1e0dedaf-6c86-4fd9-8a44-649d8ffd5e3f" />
<img width="688" height="491" alt="image" src="https://github.com/user-attachments/assets/b960d96c-278b-4303-8316-34038becf574" />
<img width="1528" height="696" alt="image" src="https://github.com/user-attachments/assets/b14d748c-146c-4a59-b75f-167db69b87de" />


# 🛠️ Tech Stack

## Frontend

| Technology         | Purpose                             |
| ------------------ | ----------------------------------- |
| HTML5              | Page structure                      |
| CSS3               | Styling and responsive layout       |
| Vanilla JavaScript | Frontend logic and DOM manipulation |
| Fetch API          | Communication with REST API         |

## Backend

| Technology | Purpose                        |
| ---------- | ------------------------------ |
| Node.js    | JavaScript runtime             |
| Express.js | Web server and REST API        |
| lowdb      | Lightweight JSON database      |
| FileSync   | Synchronous file-based storage |

## Development Tools

| Tool                            | Purpose                                     |
| ------------------------------- | ------------------------------------------- |
| npm                             | Dependency management                       |
| Git                             | Version control                             |
| GitHub                          | Source-code hosting                         |
| Node.js `--watch`               | Automatic server restart during development |
| Postman / Thunder Client / cURL | API testing                                 |

---

# 🏗️ System Architecture

The application follows a simple full-stack architecture:

```text
┌─────────────────────────────┐
│          Browser            │
│   HTML + CSS + JavaScript   │
└──────────────┬──────────────┘
               │
               │ fetch()
               │ JSON requests
               ▼
┌─────────────────────────────┐
│       Express Server        │
│                             │
│  REST API /api/students     │
│  Validation                 │
│  Business Logic             │
└──────────────┬──────────────┘
               │
               │ read / write
               ▼
┌─────────────────────────────┐
│            lowdb            │
│                             │
│   data/students.json        │
└─────────────────────────────┘
```

### Request Flow

```text
User Action
     ↓
Frontend app.js
     ↓
fetch() API request
     ↓
Express server
     ↓
Validate request
     ↓
lowdb
     ↓
students.json
     ↓
JSON response
     ↓
Frontend updates UI
```

Search, filtering, sorting, statistics and navigation are performed in the browser after the student data has been loaded.

---

# 📁 Project Structure

```text
Student-Management-System/
│
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── data/
│   └── students.json
│
├── .github/
│   └── copilot-instructions.md
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

### File Responsibilities

| File / Folder        | Purpose                                                        |
| -------------------- | -------------------------------------------------------------- |
| `server.js`          | Express server, validation, API routes and lowdb setup         |
| `package.json`       | Project dependencies and npm scripts                           |
| `package-lock.json`  | Locks dependency versions                                      |
| `public/index.html`  | Frontend page structure                                        |
| `public/styles.css`  | Application styling and responsive design                      |
| `public/app.js`      | API calls, UI rendering, search, filtering, sorting and events |
| `data/students.json` | Local student data storage                                     |
| `.gitignore`         | Prevents unnecessary/private files from being committed        |
| `README.md`          | Project documentation                                          |

> The `data/` directory is git-ignored so local student data is not committed to GitHub.

---

# 🔌 REST API

Base URL:

```text
http://localhost:4000
```

All API requests and responses use JSON.

## Endpoints

| Method   | Endpoint            | Description      | Success |
| -------- | ------------------- | ---------------- | ------- |
| `GET`    | `/api/students`     | Get all students | `200`   |
| `GET`    | `/api/students/:id` | Get one student  | `200`   |
| `POST`   | `/api/students`     | Create a student | `201`   |
| `PUT`    | `/api/students/:id` | Update a student | `200`   |
| `DELETE` | `/api/students/:id` | Delete a student | `204`   |

### GET All Students

```http
GET /api/students
```

Optional search:

```http
GET /api/students?search=maya
```

### GET One Student

```http
GET /api/students/1
```

### Create Student

```http
POST /api/students
Content-Type: application/json
```

Example:

```json
{
  "name": "Maya Patel",
  "email": "maya.patel@northstar.edu",
  "course": "Computer Science",
  "year": "Year 3",
  "status": "Active",
  "phone": "+1 555 010 2841"
}
```

### Update Student

```http
PUT /api/students/1
Content-Type: application/json
```

### Delete Student

```http
DELETE /api/students/1
```

---

# 📋 Student Data Model

Each student contains:

| Field       | Type   |                Required | Description                   |
| ----------- | ------ | ----------------------: | ----------------------------- |
| `id`        | Number | Automatically generated | Unique student ID             |
| `name`      | String |                     Yes | Student's full name           |
| `email`     | String |                     Yes | Unique email address          |
| `course`    | String |                     Yes | Student's course              |
| `year`      | String |                     Yes | Academic year                 |
| `status`    | String |                      No | Active, On leave or Graduated |
| `phone`     | String |                      No | Student phone number          |
| `createdAt` | String | Automatically generated | ISO timestamp                 |
| `updatedAt` | String | Automatically generated | ISO timestamp                 |

### Allowed Status Values

```text
Active
On leave
Graduated
```

If no status is supplied, the server uses:

```text
Active
```

The server also:

* Trims string values
* Converts email addresses to lowercase
* Generates IDs
* Generates timestamps
* Checks duplicate emails

---

# ❌ API Error Responses

Errors are returned in this format:

```json
{
  "error": "Error message"
}
```

| HTTP Status | Meaning                        |
| ----------- | ------------------------------ |
| `400`       | Invalid or missing input       |
| `404`       | Student or API route not found |
| `409`       | Email already exists           |
| `500`       | Server/data storage error      |

---

# 🧪 API Example

Using cURL:

```bash
curl -X POST http://localhost:4000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","course":"Mathematics","year":"Year 1"}'
```

The same API can be tested using:

* Postman
* Thunder Client
* cURL
* Browser developer tools

---

# 💾 Database / Data Storage

This project uses **lowdb** instead of a traditional database server.

Student data is stored in:

```text
data/students.json
```

Example:

```json
{
  "students": [
    {
      "id": 1,
      "name": "Maya Patel",
      "email": "maya@example.com",
      "course": "Computer Science",
      "year": "Year 3",
      "status": "Active",
      "phone": "+1 555 010 2841",
      "createdAt": "2026-10-01T10:00:00.000Z",
      "updatedAt": "2026-10-01T10:00:00.000Z"
    }
  ]
}
```

### Why lowdb?

lowdb is useful for this project because it:

* Is lightweight
* Requires no database server
* Stores data in a JSON file
* Is easy to understand for beginners
* Is suitable for a small learning project

> For a production application with many users and large amounts of data, a proper database such as PostgreSQL, MySQL or MongoDB would be more appropriate.

---

# 🌱 Initial Seed Data

When the application starts for the first time:

1. The `data/` directory is created.
2. `students.json` is created.
3. Three sample students are inserted.

To start with a fresh dataset:

1. Stop the server.
2. Delete `data/students.json`.
3. Start the server again.

The sample records will be recreated.

> Stop the server before manually editing `students.json`. The application reads and saves the file through lowdb.

---

# 🔐 Authentication & Authorization

Authentication and authorization are **not currently implemented**.

There is no:

* Login
* Registration
* Password system
* Session
* JWT
* Role-based access control
* User management

The dashboard may display an administrator name as placeholder UI content, but it is **not connected to an actual user account**.

Therefore, anyone who can access the server can potentially read, create, update or delete student records.

For this reason, the project is intended for:

* Local development
* Learning
* Demonstrations
* Trusted environments

---

# 🚀 Installation & Setup

## Prerequisites

Install:

* Node.js **18.11 or newer**
* npm
* Git

Node.js is required for the development script because the project uses:

```bash
node --watch server.js
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/SamniHasnath/Student-Mangemnt-System.git
```

---

## 2. Open the Project

```bash
cd Student-Mangemnt-System
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start Development Server

```bash
npm run dev
```

The server will start on:

```text
http://localhost:4000
```

---

## 5. Open the Application

Open:

```text
http://localhost:4000
```

> **Important:** Do not open `public/index.html` directly from your file system. The frontend needs the Express server to communicate with the REST API.

---

# 📜 Available Scripts

| Command       | Description                          |
| ------------- | ------------------------------------ |
| `npm install` | Installs project dependencies        |
| `npm run dev` | Starts server with automatic restart |
| `npm start`   | Starts server normally               |

### Development

```bash
npm run dev
```

### Normal Start

```bash
npm start
```

---

# 🌐 Environment Variables

The application uses one optional environment variable:

```env
PORT=4000
```

| Variable | Required | Default | Description                     |
| -------- | -------- | ------- | ------------------------------- |
| `PORT`   | No       | `4000`  | Port used by the Express server |

### Git Bash / macOS / Linux

```bash
PORT=5000 npm start
```

### Windows PowerShell

```powershell
$env:PORT=5000; npm start
```

The application does not currently use `dotenv`.

If the selected port is already occupied, the server attempts to use the next available port.

---

# 🖥️ How to Use

## 1. View Students

Open the **Students** page to see:

* Summary cards
* Search
* Filters
* Sorting
* Student table

## 2. Add Student

Click:

```text
+ Add Student
```

Enter:

* Name
* Email
* Course
* Year
* Status
* Phone

Then click:

```text
Save Student
```

## 3. Edit Student

Select the edit button for an existing record.

Update the information and save the changes.

## 4. Delete Student

Select the delete button.

A confirmation prompt appears before the record is removed.

## 5. Search Students

Use the search field to search by:

* Name
* Email
* Course
* Phone

## 6. Filter Students

Use the status filter to display:

```text
All
Active
On leave
Graduated
```

## 7. View Insights

Open:

```text
Insights
```

to see:

* Status breakdown
* Year breakdown
* Course breakdown
* Recently added students

## 8. Import / Export

Open:

```text
Settings
```

Available options:

* Download CSV
* Download JSON
* Import JSON backup

---

# 📸 Screenshots

Screenshots can be added to the repository using:

```text
screenshots/
├── students.png
├── student-form.png
├── insights.png
├── settings.png
└── mobile.png
```

Then include them in this README:

```markdown
![Students Dashboard](screenshots/students.png)

![Add / Edit Student Form](screenshots/student-form.png)

![Insights](screenshots/insights.png)

![Settings](screenshots/settings.png)

![Mobile View](screenshots/mobile.png)
```

---

# 🧪 Testing

There are currently **no automated tests** in the project.

Testing can be performed manually through the UI and REST API.

## Manual Testing Checklist

### Student Management

* [ ] Add a student with valid information
* [ ] View the new student
* [ ] Edit the student
* [ ] Delete the student
* [ ] Confirm deletion works

### Validation

* [ ] Submit without a name
* [ ] Submit without an email
* [ ] Submit without a course
* [ ] Submit without a year
* [ ] Enter an invalid email
* [ ] Enter an existing email
* [ ] Enter an invalid status

### Search / Filter / Sort

* [ ] Search by name
* [ ] Search by email
* [ ] Search by course
* [ ] Search by phone
* [ ] Filter by status
* [ ] Sort by name
* [ ] Sort by newest
* [ ] Sort by year
* [ ] Sort by course
* [ ] Reset filters

### Import / Export

* [ ] Export CSV
* [ ] Export JSON
* [ ] Import JSON
* [ ] Verify duplicate emails are skipped

### Responsive Design

* [ ] Test desktop layout
* [ ] Test tablet layout
* [ ] Test mobile layout
* [ ] Verify navigation changes on small screens

---

# 🐛 Troubleshooting

| Problem                          | Solution                                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `EADDRINUSE`                     | Another application is using the port. Set another `PORT`.                                      |
| `Could not load records`         | Make sure the Express server is running.                                                        |
| Buttons do nothing               | Open the application through `http://localhost:4000`, not `index.html`.                         |
| Changes are not visible          | Try `Ctrl + F5` to refresh the browser cache.                                                   |
| `node --watch` is not recognised | Update Node.js to 18.11+ or use `npm start`.                                                    |
| Student data disappeared         | Check that `data/students.json` still exists and the application has permission to write to it. |

---

# 🚀 Deployment

The application is currently **not deployed** and does not have a live demo URL.

Because the application stores data in:

```text
data/students.json
```

the deployment environment must provide persistent file storage.

Suitable deployment options include:

* VPS
* Virtual machine
* AWS EC2
* Other Node.js hosts with persistent disk storage

Serverless or ephemeral container platforms may not be suitable for the current architecture because local files can be lost when the application restarts or the instance is replaced.

For a production deployment, the recommended approach would be to replace lowdb with a persistent database such as:

* PostgreSQL
* MySQL
* MongoDB
* SQLite

and add proper authentication and authorization.

---

# 🔮 Future Improvements

The project can be extended with:

### Authentication

* Login and registration
* Password hashing
* JWT authentication
* Session management
* Role-based access control

### Database

Move from lowdb to:

* PostgreSQL
* MySQL
* MongoDB
* SQLite

### Testing

Add automated tests using:

* Jest
* Supertest
* Integration testing
* Frontend testing

### API Improvements

* Pagination
* Advanced filtering
* Server-side search
* Bulk import endpoint
* Better validation
* API documentation

### Import / Export

* CSV import
* Excel export/import
* Bulk student upload

### DevOps

* Docker
* GitHub Actions
* CI/CD pipeline
* Production deployment
* HTTPS

### UI Improvements

* Dark mode
* Improved accessibility
* Advanced charts
* Better mobile experience
* Pagination
* Loading states

---

# 🎓 Learning Outcomes

This project helped develop practical understanding of:

### Frontend Development

* HTML5
* CSS3
* Responsive design
* JavaScript ES6+
* DOM manipulation
* Event handling
* Fetch API
* Client-side state handling
* Search and filtering
* Sorting
* Data aggregation
* Browser file handling

### Backend Development

* Node.js
* Express.js
* REST API design
* HTTP methods
* HTTP status codes
* JSON requests and responses
* Server-side validation
* Error handling
* Static file serving

### Data Management

* lowdb
* JSON file storage
* CRUD operations
* Unique constraints
* Data validation
* Import/export

### Security

* Input validation
* Data sanitization
* Basic XSS protection
* Understanding authentication limitations

### Development Practices

* Git
* GitHub
* Project structure
* README documentation
* API testing
* Manual testing
* Environment configuration

---

# 🔄 CRUD Operations

The project demonstrates the four fundamental CRUD operations:

```text
CREATE
   ↓
POST /api/students

READ
   ↓
GET /api/students
GET /api/students/:id

UPDATE
   ↓
PUT /api/students/:id

DELETE
   ↓
DELETE /api/students/:id
```

This is one of the main concepts demonstrated by the project.

---

# 📚 What I Learned

Through this project, I learned how a full-stack application works from end to end.

```text
Frontend
   ↓
User interacts with UI
   ↓
JavaScript sends API request
   ↓
Express receives request
   ↓
Backend validates data
   ↓
lowdb stores/retrieves data
   ↓
Backend sends JSON response
   ↓
Frontend updates the UI
```

The project provided practical experience in connecting a frontend application with a backend REST API and persistent data storage.

---

# 💼 Internship Context

This project was developed as part of the:

**Auspify Technologies Full Stack Development Internship Program**

The project was completed as a practical full-stack development exercise to demonstrate:

* Frontend development
* Backend development
* REST API development
* CRUD operations
* Data storage
* Validation
* Responsive UI
* Git/GitHub workflow
* Full-stack application architecture

---

# 👤 Author

**Samni Hasnath**

GitHub:
https://github.com/SamniHasnath

---

# 📄 License

No license has been added to this repository yet.

A license such as the **MIT License** can be added if the project is intended to be reused or distributed as open-source software.

---

## ⭐ Project Summary

**Student Management System** is a beginner-friendly full-stack CRUD application demonstrating how a browser frontend communicates with an Express REST API and stores data using lowdb.

### Main technologies

```text
HTML
CSS
JavaScript
      ↓
   Express
      ↓
    Node.js
      ↓
    lowdb
      ↓
students.json
```

The project focuses on understanding the fundamentals of **full-stack web development, REST APIs, CRUD operations, validation, client-server communication and data persistence**.
