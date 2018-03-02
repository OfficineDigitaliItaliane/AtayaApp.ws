'use strict';

module.exports = {

    dblogin:{
        user: process.env.MYSQL_USER,
        pass: process.env.MYSQL_PASSWORD,
        db: process.env.MYSQL_DATABASE,
        dbconf:{
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            dialect: "mysql",
            operatorsAliases: false
        }
    },

    db:{
        db: process.env.MONGO_DATABASE,
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT
    },

    imageFolder: process.env.IMAGE_FOLDER
};