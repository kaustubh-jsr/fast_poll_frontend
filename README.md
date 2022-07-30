# Fast Poll

Fast Poll - A real time polling application built in React and TailwindCSS.
The app uses websockets with channels served using redis on the [backend django app](https://github.com/kaustubh-jsr/fast_poll_backend), to update poll results in real time.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run Locally

Clone this project, and also clone the [API repo](https://github.com/kaustubh-jsr/wuphfer_backend) this project utilises for backend

```bash
  git clone https://github.com/kaustubh-jsr/fast_poll_frontend.git
```

Go to the project directory

```bash
  cd fast_poll_frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
