# Student Management System

A small full-stack app for keeping student records. You can add, edit, search and delete students, see a breakdown by status, year and course, and export or import the data.

It is built with **Express** (backend + REST API), **lowdb** (data saved to a JSON file) and **plain HTML, CSS and JavaScript** (frontend, no framework or build step).

## Quick start

You need [Node.js](https://nodejs.org) 18.11 or newer.

```bash
npm install
npm run dev
```

Then open **http://localhost:4000**.

The first run creates `data/students.json` with three sample students.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the server and restarts it whenever `server.js` changes |
| `npm start` | Starts the server without auto-restart |

To use a different port, set `PORT` before starting: `PORT=5000 npm start` in Git Bash, or `$env:PORT=5000; npm start` in PowerShell. If the port is already in use, the server tries the next one (up to 10 tries) and prints the address it ends up on.

> Always open the app through the server address. Opening `public/index.html` directly from the folder shows the page, but no student data can load.

## Features

- **Students:** a table of all students with search (name, email, course, phone), a status filter and sorting (name, newest, year, course)
- **Add / edit:** a form with validation. Email addresses must be unique.
- **Delete:** with a confirmation prompt
- **Summary cards:** total, active, on leave, and Year 4 students who haven't graduated yet
- **Insights:** bars by status, year and course, plus the five newest students
- **Settings:** export to CSV or JSON, and import from a JSON backup (existing emails are skipped)
- **Works on phones:** the sidebar turns into tabs on narrow screens

## Project structure

```
├── server.js          Backend: Express server, validation, API routes
├── package.json       Dependencies and npm scripts
├── data/
│   └── students.json  The data file (created on first run, git-ignored)
└── public/            Frontend, served as static files
    ├── index.html     Page structure: Students, Insights and Settings views + the form
    ├── styles.css     Styles
    └── app.js         Loads data from the API, draws the page, handles clicks
```

**How it fits together:** the browser loads the files in `public/`. `app.js` calls the API with `fetch`. `server.js` checks the request, reads or writes `data/students.json` and replies with JSON. Search, filtering, sorting and switching views all happen in the browser, with no extra requests.

## API

All endpoints accept and return JSON.

| Method | Endpoint | Description | Success |
| --- | --- | --- | --- |
| `GET` | `/api/students` | List all students, sorted by name. Optional `?search=` | `200` |
| `GET` | `/api/students/:id` | Get one student | `200` |
| `POST` | `/api/students` | Create a student | `201` |
| `PUT` | `/api/students/:id` | Update a student | `200` |
| `DELETE` | `/api/students/:id` | Delete a student | `204` |

**Request body** for `POST` and `PUT`:

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

- `name`, `email`, `course` and `year` are required.
- `status` must be `Active`, `On leave` or `Graduated`; it defaults to `Active`.
- `phone` is optional.
- The server adds `id`, `createdAt` and `updatedAt`, trims every field, and lowercases the email.

**Errors** come back as `{ "error": "message" }`:

| Status | When |
| --- | --- |
| `400` | A required field is missing, the email is invalid, or the status is invalid |
| `404` | No student has that id, or the API route doesn't exist |
| `409` | Another student already has that email |
| `500` | The data couldn't be saved |

**Example:**

```bash
curl -X POST http://localhost:4000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","course":"Math","year":"Year 1"}'
```

## Data and backups

All data lives in `data/students.json`.

- **Back up:** copy that file, or use **Settings → Download JSON** in the app.
- **Start fresh:** stop the server, delete the file and start the server again. The three sample students come back.
- **Edit the file by hand:** stop the server first. The server reads the file only when it starts, and its next save would overwrite your edits.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `EADDRINUSE: address already in use` | Another program is using the port. The server tries the next 10 ports on its own; if they're all taken, set a different `PORT`. |
| Sidebar links or buttons do nothing | Make sure you opened `http://localhost:4000` and not the HTML file, then press Ctrl+F5 to reload without the cache. |
| "Could not load records." | The server isn't running. Start it with `npm run dev`. |
| `node --watch` is not recognised | Your Node.js is older than 18.11. Update it, or use `npm start`. |
