# Miscellaneous File Documentation

This document explains supporting files outside the main React and backend logic.

## Why Miscellaneous Files Matter

A project does not run only because of React or Java code. It also needs:

- HTML template
- package configuration
- SQL schema
- test setup
- main README

## File By File Explanation

### `public/index.html`

Use:

- Main HTML file loaded by browser

Code idea:

- Contains `<div id="root"></div>`
- React app is injected into this root div
- Contains page title and meta description

Theory:

- React controls UI inside the root div
- This file is the base HTML shell

Viva questions:

1. Why is `root` div important?
   Because React renders the app inside it.
2. Does React directly write HTML files?
   No, it renders components into the root div.

### `package.json`

Use:

- Project configuration for npm

Code idea:

- Stores dependencies like:
  `react`, `react-dom`, `react-router-dom`, `react-scripts`
- Stores scripts:
  `start`, `build`, `test`

Theory:

- npm uses `package.json` to know what packages and commands the project needs

Viva questions:

1. What is the use of `package.json`?
   It manages dependencies and scripts.
2. What does `npm start` do?
   It runs the React development server.

### `package-lock.json`

Use:

- Locks exact package versions

Theory:

- Makes installation more consistent on different systems

Viva questions:

1. Why keep `package-lock.json`?
   So the same dependency versions are installed everywhere.
2. Should we edit it manually?
   Usually no.

### `README.md`

Use:

- Main project guide

Code idea:

- Explains project structure
- Explains setup
- Includes SQL, API explanation, and viva notes

Theory:

- Good documentation improves project understanding and presentation

Viva questions:

1. Why is README important?
   It helps anyone understand and run the project.
2. What type of information should README contain?
   Setup steps, structure, features, and explanation.

### `database/job_portal.sql`

Use:

- SQL schema and sample data

Code idea:

- Creates database `job_portal`
- Creates `jobs` table
- Creates `applications` table
- Inserts sample jobs

Theory:

- SQL script helps quickly prepare database without manual table creation

Viva questions:

1. Why is SQL file useful?
   It creates the database structure quickly.
2. What is foreign key in `applications` table?
   It links each application to a job id.

### `src/App.test.js`

Use:

- Unit test for React render check

Theory:

- Testing is a quality check for important app behavior

### `src/reportWebVitals.js`

Use:

- Performance measurement helper from Create React App

Theory:

- It can be used to measure things like load performance, but it is optional here

Viva questions:

1. Is this file core to project logic?
   No, it is optional helper code.
2. Can the app run without using web vitals actively?
   Yes.

### `src/setupTests.js`

Use:

- Test environment setup file

Theory:

- It loads helpful testing matchers for React Testing Library

Viva questions:

1. Why is setup test file useful?
   It prepares the testing environment before tests run.
2. What library works with it here?
   React Testing Library and Jest DOM.

### `.gitignore`

Use:

- Tells Git which files or folders should not be committed

Theory:

- Common ignored files are `node_modules`, build output, and local environment files

Viva questions:

1. Why ignore `node_modules`?
   Because it is large and can be installed again.
2. Why is `.gitignore` important?
   It keeps the repository clean.

## Miscellaneous Summary

These files support the project by handling:

- browser HTML shell
- npm setup
- testing setup
- SQL database creation
- documentation
- Git cleanliness
