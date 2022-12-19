const express = require('express');
const app = express();
const PORT = 5001;
const tasksRouter = require('./routes/tasks.router');

app.use(express.urlencoded());

app.use(express.static('server/public'));

app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});