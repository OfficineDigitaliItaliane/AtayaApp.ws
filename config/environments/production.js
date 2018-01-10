'use strict';

module.exports = {

    db:{
        user: process.env.MYSQL_USER,
        pass: process.env.MYSQL_PASSWORD,
        db: process.env.MYSQL_DATABASE,
        dbconf:{
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            dialect: "mysql"
        }
    }
};