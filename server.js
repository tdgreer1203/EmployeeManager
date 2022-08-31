const express = require('express');
const { appendFile } = require('fs');
const db = require('./db/connections');

const apiRoutes = require('./routes');

const PORT = process.env.PORT || 3001;

appendFile.use(express.urlencoded({ extended: false }));
appendFile.use(express.json());

appendFile.use('/api', apiRoutes);

appendFile.use((req, res) => {
    res.status(404).end();
});

db.connect(err => {
    if(err) throw err;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});