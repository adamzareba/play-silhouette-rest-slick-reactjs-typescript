# `Silhouette REST Slick BackEnd + FrontEnd Seed` [![Build Status](https://travis-ci.org/adamzareba/play-silhouette-rest-slick-reactjs-typescript.svg)](https://travis-ci.org/adamzareba/play-silhouette-rest-slick-reactjs-typescript)

Example BackEnd project for Play Framework that uses [Silhouette](https://github.com/mohiva/play-silhouette) for authentication and authorization, exposed REST API for sign-up, sign-in + example FrontEnd project for ReactJS+ Typescript used for handling view layer.
FrontEnd application implements authentication and accessing secured backend actions.

BackEnd application uses [Play](https://www.playframework.com/), [Silhouette](https://github.com/mohiva/play-silhouette), [Slick](https://github.com/playframework/play-slick) and [H2](http://www.h2database.com) for storage. 

FrontEnd application uses [Node.js](https://nodejs.org/), [React](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/), [Material-UI](https://material-ui-next.com/). 
Project generated based on [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript).

## Prerequisites
    - node.js (recommended version 8.x)
    - H2 (database)

## Installation

* Before you run you have to build FrontEnd project. To do it run command in PROJECT_ROOT/app/frontend directory of project:
    ```
    npm i
    ```
* To run BackEnd + FrontEnd together you need to run command from project root directory:
    ```
    sbt run
    ```

## Built-in users

| username    | password        |
| ----------- |:---------------:|
| test1       | test1Password   |
| test2       | test2Password   |

## Database reload

Slick evolutions are responsible for data reloading.

## API documentation

Documentation is available under address: [REST API](http://localhost:9000/docs)

# License

The code is licensed under [Apache License v2.0](http://www.apache.org/licenses/LICENSE-2.0). 
