const express = require('express');
const tasksRouter = express.Router();
const pool = require('../modules/pool');

// const pg = require('pg');

// const Pool = pg.Pool;

let tasksArray = [];

//need routerGET
tasksRouter.get('/', (req, res) => {
    console.log('request for /tasks was made');
    res.send(tasksArray);
});

//need routerPOST
tasksRouter.post('/', (req, res) => {
    console.log('inside post request from db, ', req.body.task);
    // const newTasks = req.body;

    let task = req.body.task;
    let status = req.body.status;


    //insert query, to insert info into database
    const queryText = `
    INSERT INTO "tasks" ("tasks", "status")
    VALUES ($1, $2);
    `; 

    pool.query(queryText, [task, status])
    .then((result) => {
        console.log('result', result);
        res.sendStatus(201); //created status
    })
    .catch((error) => {
        console.log('error making post insert query', error);
        res.sendStatus(500); //server error status
    });
});

//need routerPUT

//need routerDELETE



module.exports = tasksRouter;