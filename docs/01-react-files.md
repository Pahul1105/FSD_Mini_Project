# React File Documentation

This document explains the React side of the project file by file.

## React Theory First

### What is React?

React is a JavaScript library used to build user interfaces. It helps us break the screen into small reusable parts called components.

### What is a component?

A component is a small part of the UI. Example:

- Navbar
- Login page
- Job card
- Admin panel

### What is state?

State is data that changes while the app is running. When state changes, React updates the screen automatically.

### What is routing?

Routing means showing different pages based on the URL without reloading the full browser page.

### What is context?

Context is a React feature used to share common data across many components. In this project, auth data is shared using `AuthContext`.

### What is localStorage?

`localStorage` is browser storage. It keeps data saved even after refreshing the page. In this project it stores:

- jobs
- users
- applications
- current logged-in user

## React Flow

The main flow is:

`index.js` -> `App.js` -> `AuthProvider` -> `Navbar` + page routes -> pages -> storage functions

## File By File Explanation

### `src/index.js`

Use:

- Entry point of the React app
- Renders `App` into the `root` element of `public/index.html`

Code idea:

- Imports React
- Imports CSS
- Creates root using `ReactDOM.createRoot`
- Renders `<App />`

Theory:

- This is where the React app starts
- `StrictMode` helps detect development issues

Viva questions:

1. What is the purpose of `index.js`?
   It is the starting file of the React app.
2. What does `createRoot` do?
   It connects React with the HTML root div.

### `src/App.js`

Use:

- Main routing file
- Wraps app in `AuthProvider`
- Defines page routes

Code idea:

- Uses `BrowserRouter`
- Shows common `Navbar`
- Defines routes for Home, Jobs, Login, Register, Applications, and Admin
- Uses `ProtectedRoute` for restricted pages

Theory:

- Central routing keeps the app organized
- Protected routes help control access based on login and role

Viva questions:

1. Why is `AuthProvider` wrapped around the app?
   So all components can access login data.
2. What is `BrowserRouter`?
   It enables routing in a React application.

### `src/context/AuthContext.js`

Use:

- Manages login state for the whole app
- Stores current user in React context

Code idea:

- Creates `AuthContext`
- Uses `useState` for `currentUser`
- Uses `useEffect` to load initial user and seed storage
- Provides `login`, `register`, and `logout` functions

Theory:

- Context avoids passing auth props manually through many components
- This is useful for shared global data

Viva questions:

1. Why use context here?
   Because many pages need user login information.
2. What is `useEffect` doing here?
   It runs once to initialize portal data and load the saved user.

### `src/components/Navbar.js`

Use:

- Top navigation bar
- Changes links based on login status and role

Code idea:

- Shows Home and Jobs for everyone
- Shows Login and Register for guests
- Shows My Applications for logged-in users
- Shows Admin only for admin role
- Shows Logout button for logged-in user

Theory:

- Conditional rendering means showing UI only when conditions are true
- Example: admin link appears only if `currentUser.role === "admin"`

Viva questions:

1. What is conditional rendering?
   Showing different UI based on conditions.
2. Why is the navbar outside `Routes`?
   So it appears on every page.

### `src/components/ProtectedRoute.js`

Use:

- Restricts access to protected pages

Code idea:

- If no user is logged in, redirect to login page
- If role is wrong, redirect to jobs page
- Otherwise show the actual page

Theory:

- Route guarding improves flow and basic security on the frontend
- It is not full backend security, but it controls UI access

Viva questions:

1. Why use a protected route?
   To stop unauthorized users from opening restricted pages.
2. What does `Navigate` do?
   It redirects to another route.

### `src/components/PortalSummary.js`

Use:

- Reusable summary cards for dashboard statistics

Code idea:

- Accepts `items` array
- Uses `.map()` to create summary cards

Theory:

- Reusable components reduce repeated code

Viva questions:

1. Why make this as a separate component?
   Because the same summary layout can be reused in multiple pages.
2. What does `.map()` do?
   It loops through array data and returns UI elements.

### `src/components/JobCard.js`

Use:

- Displays one job

Code idea:

- Shows title, company, location, type, salary, description
- Can show Apply button
- Can show Delete button
- Can show application count

Theory:

- Props let parent components pass data and functions into child components

Viva questions:

1. What are props?
   Props are inputs passed from parent component to child component.
2. Why is `JobCard` reusable?
   Because the same design works for user side and admin side.

### `src/components/JobList.js`

Use:

- Displays many jobs

Code idea:

- Receives `jobs` array
- Shows empty message if list is empty
- Uses `.map()` to render `JobCard` repeatedly

Theory:

- List rendering is a common React pattern
- `key` helps React identify items efficiently

Viva questions:

1. Why do we use `key` in lists?
   It helps React track items correctly.
2. What happens when jobs array is empty?
   A message is shown instead of cards.

### `src/pages/Home.js`

Use:

- Landing page of the portal
- Shows portal introduction, demo account info, stats, and recent jobs

Code idea:

- Reads stats from storage
- Reads recent jobs from storage
- Shows buttons for Explore Jobs and Login

Theory:

- Home page improves user understanding and app navigation

Viva questions:

1. What is the purpose of the Home page?
   It introduces the portal and gives quick navigation.
2. Why show portal stats?
   To make the system feel more informative and real.

### `src/pages/Jobs.js`

Use:

- Main user job browsing page
- Search jobs
- Apply to jobs

Code idea:

- Uses `useSearchParams` to read search values from URL
- Uses `useState` for form values and messages
- Loads jobs from `portalStore`
- Opens apply form for selected job
- Submits application to storage

Theory:

- Search parameters in URL make filtering more clear and shareable
- `useMemo` is used here for simple computed count

Viva questions:

1. Why use `useSearchParams`?
   To read and update search values in the URL.
2. Why does the page check `currentUser` before applying?
   Because only logged-in users should apply for jobs.

### `src/pages/Login.js`

Use:

- User login page

Code idea:

- Stores email and password in state
- Calls `login` from `AuthContext`
- Redirects user after successful login

Theory:

- Login is a basic authentication step
- Here authentication is simple and stored in browser storage

Viva questions:

1. What happens after successful login?
   The current user is stored and redirected to the correct page.
2. Why can admin and user go to different pages after login?
   Because routing depends on role.

### `src/pages/Register.js`

Use:

- New user registration page

Code idea:

- Takes name, email, password
- Calls `register` from auth context
- Saves new user in storage

Theory:

- Registration creates a new account so user can login later

Viva questions:

1. Where is new user data saved?
   In browser localStorage through `portalStore`.
2. What validation is done?
   Duplicate email is checked before saving.

### `src/pages/Applications.js`

Use:

- Shows jobs applied by current user

Code idea:

- Reads current user from auth context
- Gets applications by user id
- Shows table of job title, company, location, and date

Theory:

- This page gives personal tracking for each applicant

Viva questions:

1. Why is this page protected?
   Because application history belongs to logged-in users only.
2. What is the benefit of this page?
   It lets users track their own applications.

### `src/pages/AdminPanel.js`

Use:

- Admin dashboard for job management

Code idea:

- Shows stats
- Lets admin add a new job
- Shows all jobs
- Lets admin delete jobs
- Shows recent applications in table form

Theory:

- This is a simple example of admin-side CRUD
- CRUD means Create, Read, Update, Delete

Viva questions:

1. Which CRUD operations are shown in admin panel?
   Create, Read, and Delete.
2. Why is Admin page role protected?
   Because normal users should not manage jobs.

### `src/services/portalStore.js`

Use:

- Main frontend data layer
- Works like a mini local database in browser storage

Code idea:

- Defines storage keys
- Seeds default jobs and users
- Provides functions:
  `getJobs`, `addJob`, `deleteJob`, `applyForJob`,
  `registerUser`, `loginUser`, `logoutUser`,
  `getApplications`, `getApplicationsByUser`,
  `getPortalStats`

Theory:

- This file acts like a simple service layer
- It separates data logic from UI logic
- This is similar to DAO idea on backend, but here it is done on frontend storage

Viva questions:

1. Why separate storage logic into one file?
   To keep components clean and reusable.
2. Why is `seedPortalData` useful?
   It creates default records so the app works immediately.

### `src/index.css`

Use:

- Main styling file for the whole app

Code idea:

- Defines colors using CSS variables
- Styles navbar, pages, forms, cards, tables, and responsive layout

Theory:

- Global CSS is a simple and beginner-friendly styling method
- CSS variables help keep colors consistent

Viva questions:

1. Why use CSS variables?
   They make color and style values easy to reuse.
2. Why add media queries?
   To make the layout work on smaller screens.

### `src/App.test.js`

Use:

- Basic test file

Code idea:

- Renders app
- Checks whether navbar heading is visible

Theory:

- Testing ensures important UI parts render correctly

Viva questions:

1. Why keep even a small test?
   It helps verify that the app still renders after changes.
2. What is being tested here?
   The presence of the Job Portal heading.

## React Summary

The React part handles:

- UI
- login state
- protected navigation
- searching jobs
- applying for jobs
- admin management

The current frontend works independently using browser storage, which makes the project easier to demo.
