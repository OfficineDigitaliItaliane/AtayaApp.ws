'use strict';

import errors from './components/errors';
import express from 'express';

export default (app)=>{

    app.get('/health', (req, res) => res.send('ok'))
    app.use('/api',require('./api'))
    app.use('/doc', express.static(__dirname + '/../doc'))

    //all undefined assets or api routes should return a 404
    app.route('/:url(logs|bin|migrations|tests|config|node_modules|src)/*')
        .get(errors[404]);
};