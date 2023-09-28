# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run

The project can be simply run by using "docker-compose up" command. It will build the docker image and run the container. The application will be available at http://localhost:8000

## What it does

The app first starts up a DB an initializes it with a very bare bones "schema" (if you can even call it that). Then it runs a selenium-webdriver script that scrapes the data from the website (attached to a remote chrome ran inside a container) and inserts it into the DB. The app then starts up a server that serves the data from the DB. The frontend is a simple react app that displays the data from the server. Pagination is implemented on BE and FE.

## Stacks
Everything is written in TS
### Scraper

- Node.js
- Selenium Webdriver
- pg-promise

### Server

- Node.js
- Express
- pg-promise
- cors
- esm

### Frontend

- React
- Material UI (maybe a bit of an overkill for this project, but I am familiar with it and it's easy to use)
