// import React from 'react';
// import { Express } from 'express';

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/login', (req, res) => {
    res.send({
        token: 'prueba1'
    });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));   