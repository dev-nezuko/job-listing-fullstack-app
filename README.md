# Jobs Server

## Getting started

### 1. Install dependencies

#### Prerequisite : Node.js v18.16

Install dependencies using yarn:

```
yarn install
```

### 2. Setup environment variables

Rename `.env.example` file with `.env`.
By default, Database URI is set to:

```
postgresql://root:root@localhost:5432/jobs-db
```

Make sure to replace `root (username)` & `root (password)` in `DATABASE_URL` with your PostgreSQL username & password set on your local machine.
Default server port is set to 8080. You can change it in env file by changing `PORT` value if 8080 is already in use for your machine.

### 3. Setup, migrate & seed database

Run following commands in the terminal:

```
npx prisma migrate deploy
```

```
npx prisma db seed
```

### 4. Start the server

For production server, run this command:

```
yarn start
```

For development server, run this command:

```
yarn run dev
```

Server will start at `http://localhost:8080` by default.

## Running test cases

Quit the server if it is running.
Run following command in the terminal.

```
yarn run test
```

# Blogs Application

## Installation

```sh
npm install --global yarn
yarn
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
