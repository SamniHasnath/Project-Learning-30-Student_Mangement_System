# 🎓 Student Management System

<p align="center">
  <strong>A Simple Full-Stack Student Management Dashboard</strong>
  <br/>
  Manage student records, explore insights, and organize academic data through a responsive web application.
</p>

---

## 📌 Overview

The **Student Management System** is a full-stack web application designed to simplify student record management through an interactive dashboard.

It allows users to manage student information, search and filter records, view dashboard statistics, explore insights, and import or export data.

Built using **HTML5, CSS3, Vanilla JavaScript, Node.js, Express.js and lowdb**, this project demonstrates the fundamentals of full-stack web development without requiring a frontend framework or a traditional database server.

### ✨ Key Highlights

- Full CRUD functionality for student records
- REST API built with Express.js
- JSON-based persistent storage using lowdb
- Search, filtering and sorting
- Dashboard statistics and insights
- CSV and JSON export
- JSON data import
- Responsive dashboard design
- Backend validation and basic XSS protection

---

## 📸 Screenshots

### Dashboard & Student Management

<img width="1515" height="690" alt="Student Management Dashboard" src="https://github.com/user-attachments/assets/1e0dedaf-6c86-4fd9-8a44-649d8ffd5e3f" />

### Student Management Interface

<img width="688" height="491" alt="Student Management Interface" src="https://github.com/user-attachments/assets/b960d96c-278b-4303-8316-34038becf574" />

### Dashboard Insights

<img width="1528" height="696" alt="Student Management Insights" src="https://github.com/user-attachments/assets/b14d748c-146c-4a59-b75f-167db69b87de" />

---

## 🚀 Features

### 👨‍🎓 Student Management

- View all student records.
- Add new students.
- Edit existing student information.
- Delete students with confirmation.
- Display student initials as avatars.
- View contact, course, academic year and status information.

### 🔍 Search, Filter & Sort

<details>
<summary><strong>Search functionality</strong></summary>

Search students using:

- Name
- Email
- Course
- Phone number

</details>

<details>
<summary><strong>Filtering</strong></summary>

Filter student records by:

- Active
- On leave
- Graduated

</details>

<details>
<summary><strong>Sorting</strong></summary>

Sort student records by:

- Name
- Newest
- Academic year
- Course

</details>

### 📊 Dashboard Statistics

The dashboard displays key student statistics:

- Total students
- Active students
- Students on leave
- Year 4 students who have not graduated

### 📈 Student Insights

The Insights page provides an overview of student data:

- Students by status
- Students by academic year
- Students by course
- Five newest student records

### ⚙️ Data Import & Export

- Export student records as CSV.
- Export student records as JSON.
- Import student data using JSON backups.
- Skip records with existing email addresses during import.

### 📱 Responsive UI

- Responsive dashboard layout
- Adaptive navigation for smaller screens
- Responsive tables and dashboard components
- Desktop and mobile-friendly layouts

### ✅ Backend Validation

The backend validates student data before saving it.

- Required field validation
- Email format validation
- Duplicate email detection
- Allowed status validation
- Input trimming and normalization
- Automatic ID generation
- Automatic timestamps

### 🔐 Basic Security

- User-provided values are escaped before rendering to reduce XSS risks.
- Input validation is performed on the backend.

> Authentication and authorization are not currently implemented. This project is intended for learning, development and trusted demonstration environments.

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| Vanilla JavaScript | UI logic and DOM manipulation |
| Fetch API | Communicating with the backend REST API |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend server and REST API |
| lowdb | Lightweight JSON database |
| FileSync | Synchronous file-based storage |

### Development Tools

| Tool | Purpose |
|---|---|
| npm | Dependency management |
| Git | Version control |
| GitHub | Repository hosting |
| Node.js `--watch` | Automatic server restart |
| Postman | API testing |
| Thunder Client | API testing |
| cURL | API testing |

---

## 🏗️ System Architecture

The application follows a simple client-server architecture.

```text
┌─────────────────────────────────────┐
│              FRONTEND              │
│                                     │
│         HTML + CSS + JS             │
│                                     │
│  Dashboard / Search / CRUD / UI     │
└──────────────────┬──────────────────┘
                   │
                   │ Fetch API
                   │ JSON Requests
                   ▼
┌─────────────────────────────────────┐
│              BACKEND               │
│                                     │
│             Node.js                 │
│             Express                 │
│                                     │
│  REST API / Validation / Logic      │
└──────────────────┬──────────────────┘
                   │
                   │ Read / Write
                   ▼
┌─────────────────────────────────────┐
│              STORAGE                │
│                                     │
│               lowdb                 │
│                                     │
│         students.json               │
└─────────────────────────────────────┘
```

### Request Flow

```text
User Interaction
      │
      ▼
Frontend JavaScript
      │
      ▼
Fetch API Request
      │
      ▼
Express REST API
      │
      ▼
Backend Validation
      │
      ▼
Business Logic
      │
      ▼
lowdb / JSON Storage
      │
      ▼
API Response
      │
      ▼
Frontend UI Update
```

Search, filtering, sorting, dashboard statistics and navigation are handled in the browser after the student data has been loaded.

---

## 📁 Project Structure

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

| File | Responsibility |
|---|---|
| `server.js` | Express server, API routes, validation and lowdb setup |
| `package.json` | Dependencies and npm scripts |
| `package-lock.json` | Locks dependency versions |
| `public/index.html` | Frontend structure |
| `public/styles.css` | Styling and responsive layout |
| `public/app.js` | API calls, UI rendering, events, search, filtering and sorting |
| `data/students.json` | Local student data storage |
| `.gitignore` | Excludes unnecessary or private files |
| `README.md` | Project documentation |

> The `data/` directory is excluded from Git to prevent local student data from being committed.

---

## 🔌 REST API

The application provides a REST API for managing student records.

### Base URL

```text
http://localhost:4000
```

### API Endpoints

| HTTP Method | Endpoint | Description | Status |
|---|---|---|---|
| `GET` | `/api/students` | Retrieve all students | `200` |
| `GET` | `/api/students/:id` | Retrieve a student by ID | `200` |
| `POST` | `/api/students` | Create a new student | `201` |
| `PUT` | `/api/students/:id` | Update a student | `200` |
| `DELETE` | `/api/students/:id` | Delete a student | `204` |

### 1. Retrieve All Students

```http
GET /api/students
```

Optional search:

```http
GET /api/students?search=maya
```

### 2. Retrieve a Student

```http
GET /api/students/1
```

### 3. Create a Student

```http
POST /api/students
Content-Type: application/json
```

Request body:

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

### 4. Update a Student

```http
PUT /api/students/1
Content-Type: application/json
```

### 5. Delete a Student

```http
DELETE /api/students/1
```

---

## 📋 Student Data Model

Each student record contains the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | Number | Automatically generated | Unique student ID |
| `name` | String | Yes | Student's full name |
| `email` | String | Yes | Unique email address |
| `course` | String | Yes | Student's course |
| `year` | String | Yes | Academic year |
| `status` | String | No | Student status |
| `phone` | String | No | Contact number |
| `createdAt` | String | Automatically generated | Creation timestamp |
| `updatedAt` | String | Automatically generated | Last update timestamp |

### Allowed Status Values

```text
Active
On leave
Graduated
```

The default status is `Active` when no status is provided.

The backend also:

- Trims string values.
- Converts email addresses to lowercase.
- Generates unique IDs.
- Generates timestamps.
- Checks for duplicate email addresses.

---

## 💾 Data Storage

This application uses **lowdb**, a lightweight JSON-based database, to persist student records.

### Storage Location

```text
data/students.json
```

### Example Data

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

- Lightweight and easy to integrate.
- No separate database server required.
- Stores data in a JSON file.
- Suitable for small projects and learning purposes.
- Easy to inspect and manage locally.

> For larger applications or production environments, a database such as PostgreSQL, MySQL or MongoDB would be more appropriate.

---

## 🌱 Seed Data

When the application starts for the first time:

1. The data directory is created.
2. `students.json` is initialized.
3. Three sample students are inserted.

### Reset the Dataset

1. Stop the server.
2. Delete `data/students.json`.
3. Start the application again.

The sample records will be recreated.

> Stop the server before manually editing `students.json`.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) — version 18.11 or newer
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/SamniHasnath/Student-Mangemnt-System.git
```

### 2. Navigate to the Project

```bash
cd Student-Mangemnt-System
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Visit:

```text
http://localhost:4000
```

<details>
<summary><strong>Alternative: Start without the development watcher</strong></summary>

```bash
npm start
```

</details>

> Do not open `public/index.html` directly. The frontend requires the Express server to communicate with the API.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start server with automatic restart |
| `npm start` | Start server normally |

---

## 🌐 Environment Configuration

The application supports an optional environment variable.

| Variable | Default | Description |
|---|---|---|
| `PORT` | `4000` | Port used by the Express server |

### Run on a Different Port

**Git Bash / macOS / Linux**

```bash
PORT=5000 npm start
```

**Windows PowerShell**

```powershell
$env:PORT=5000; npm start
```

The project does not currently use `dotenv`.

If the selected port is already occupied, the server attempts to use the next available port.

---

## 🧪 API Testing

The REST API can be tested using:

- Postman
- Thunder Client
- cURL
- Browser Developer Tools

### Example cURL Request

```bash
curl -X POST http://localhost:4000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","course":"Mathematics","year":"Year 1"}'
```

### Error Response

```json
{
  "error": "Error message"
}
```

### HTTP Status Codes

| Status Code | Description |
|---|---|
| `400` | Invalid or missing input |
| `404` | Student or API route not found |
| `409` | Email already exists |
| `500` | Server or data storage error |

---

## 🖥️ How to Use

### 1. View Students

Open the Students page to view:

- Student records
- Summary statistics
- Search functionality
- Filters
- Sorting options

### 2. Add a Student

1. Click **Add Student**.
2. Enter the student's information.
3. Complete the required fields.
4. Click **Save Student**.

### 3. Edit a Student

1. Select the edit action on a student record.
2. Update the required information.
3. Save your changes.

### 4. Delete a Student

1. Select the delete action.
2. Confirm the deletion.
3. The student record will be removed.

### 5. Search Students

Use the search field to find students by name, email, course or phone number.

### 6. Filter Students

Use the status filter to display:

- All
- Active
- On leave
- Graduated

### 7. View Insights

Navigate to the Insights page to explore student statistics by course, academic year and status.

### 8. Import & Export

Navigate to Settings to:

- Download student data as CSV.
- Download student data as JSON.
- Import a JSON backup.

---

## 🧪 Testing Checklist

Automated tests have not yet been implemented. The following checklist can be used for manual testing.

### Student Management

- [ ] Add a student.
- [ ] View a student.
- [ ] Edit a student.
- [ ] Delete a student.
- [ ] Confirm deletion.

### Validation

- [ ] Submit without a name.
- [ ] Submit without an email.
- [ ] Submit without a course.
- [ ] Submit without an academic year.
- [ ] Enter an invalid email.
- [ ] Enter a duplicate email.
- [ ] Enter an invalid status.

### Search, Filter & Sort

- [ ] Search by name.
- [ ] Search by email.
- [ ] Search by course.
- [ ] Search by phone.
- [ ] Filter by status.
- [ ] Sort by name.
- [ ] Sort by newest.
- [ ] Sort by academic year.
- [ ] Sort by course.
- [ ] Reset filters.

### Import & Export

- [ ] Export CSV.
- [ ] Export JSON.
- [ ] Import JSON.
- [ ] Verify duplicate emails are skipped.

### Responsive UI

- [ ] Test desktop layout.
- [ ] Test tablet layout.
- [ ] Test mobile layout.
- [ ] Verify responsive navigation.

---

## 🔐 Authentication & Security Limitations

Authentication and authorization have not been implemented.

The application currently does not include:

- Login or registration
- Password authentication
- JWT authentication
- Session management
- Role-based access control
- User account management

The administrator name displayed in the dashboard is placeholder UI content and is not connected to a real account.

Therefore, anyone with access to the server may potentially access, modify or delete student records.

This application is intended for:

- Local development
- Learning
- Demonstrations
- Trusted environments

---

## 🐛 Troubleshooting

| Problem | Solution |
|---|---|
| `EADDRINUSE` | Another application is using the port. Set a different `PORT`. |
| Could not load records | Make sure the Express server is running. |
| Buttons do nothing | Open the application through `http://localhost:4000`, not directly through `index.html`. |
| Changes are not visible | Refresh the browser using `Ctrl + F5`. |
| `node --watch` is not recognized | Update Node.js to 18.11+ or use `npm start`. |
| Student data disappeared | Check whether `data/students.json` exists and the application has write permissions. |

---

## 🚀 Deployment Considerations

The application is currently not deployed and does not have a live demo URL.

Because student records are stored in `data/students.json`, the deployment environment must support persistent file storage.

Potential deployment environments include:

- Virtual machines
- VPS hosting
- AWS EC2
- Node.js hosting platforms with persistent storage

Ephemeral or serverless environments may not be suitable without additional storage configuration.

### Recommended Production Improvements

- Replace lowdb with a production database.
- Implement authentication and authorization.
- Use secure HTTPS connections.
- Add automated tests.
- Add API documentation.
- Implement logging and monitoring.

---

## 🔮 Future Improvements

### Authentication & Authorization

- User login and registration
- Password hashing
- JWT or session authentication
- Role-based access control

### Database

- PostgreSQL integration
- MySQL integration
- MongoDB integration
- SQLite integration

### API

- Pagination
- Advanced filtering
- Server-side search
- Bulk import API
- Improved validation
- API documentation

### Import & Export

- CSV import
- Excel import/export
- Bulk student upload

### Testing

- Jest
- Supertest
- Integration testing
- Frontend testing

### DevOps

- Docker
- GitHub Actions
- CI/CD
- Deployment
- HTTPS

### UI & UX

- Dark mode
- Accessibility improvements
- Advanced charts
- Improved mobile experience
- Pagination
- Loading states

---

## 🎓 Learning Outcomes

This project provided practical experience in:

### Frontend Development

- HTML5
- CSS3
- Responsive design
- JavaScript ES6+
- DOM manipulation
- Event handling
- Fetch API
- Client-side state management
- Search and filtering
- Sorting
- Data aggregation
- Browser file handling

### Backend Development

- Node.js
- Express.js
- REST API development
- HTTP methods and status codes
- JSON requests and responses
- Server-side validation
- Error handling
- Static file serving

### Data Management

- lowdb
- JSON-based storage
- CRUD operations
- Data validation
- Import and export

### Security Fundamentals

- Input validation
- Input sanitization
- Basic XSS prevention
- Authentication and authorization limitations

### Development Practices

- Git
- GitHub
- Project structuring
- API testing
- Manual testing
- Documentation

---

## 🔄 CRUD Operations

The project demonstrates the four fundamental CRUD operations.

| Operation | HTTP Method | Endpoint |
|---|---|---|
| Create | `POST` | `/api/students` |
| Read | `GET` | `/api/students` |
| Read by ID | `GET` | `/api/students/:id` |
| Update | `PUT` | `/api/students/:id` |
| Delete | `DELETE` | `/api/students/:id` |

CRUD represents:

- **Create** — Add new records.
- **Read** — Retrieve records.
- **Update** — Modify existing records.
- **Delete** — Remove records.

---

## 💡 What I Learned

Through this project, I gained a practical understanding of how a full-stack application works from end to end.

```text
Frontend
   │
   ▼
User Interaction
   │
   ▼
JavaScript
   │
   ▼
Fetch API
   │
   ▼
Express REST API
   │
   ▼
Backend Validation
   │
   ▼
lowdb
   │
   ▼
JSON Data Storage
   │
   ▼
API Response
   │
   ▼
Frontend UI Update
```

This project helped me understand how frontend applications communicate with backend services, how REST APIs handle requests, how data validation works, and how data can be stored and managed through a full-stack application.

---

## 💼 Internship Project

This project was developed as part of the:

**Auspify Technologies Full Stack Development Internship Program**

The project demonstrates practical implementation of:

- Frontend development
- Backend development
- REST API development
- CRUD operations
- Data persistence
- Backend validation
- Responsive UI development
- Git and GitHub workflow
- Full-stack architecture

---

## 👤 Author

**Samni Hasnath**

- GitHub: [SamniHasnath](https://github.com/SamniHasnath)

---

## 📄 License

No license has been added to this repository yet.

If this project is intended to be reused or distributed as an open-source project, an appropriate license such as the MIT License can be added.

---

<p align="center">
  <strong>Built to learn, practice and grow as a Full-Stack Developer 🚀</strong>
</p>
