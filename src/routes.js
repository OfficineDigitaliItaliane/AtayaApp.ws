'use strict';

import errors from './components/errors';

export default (app)=>{

    app.use('/api',require('./api'));
    
    //all undefined assets or api routes should return a 404
    app.route('/:url(logs|bin|migrations|tests|config|node_modules|src)/*')
        .get(errors[404]);
};