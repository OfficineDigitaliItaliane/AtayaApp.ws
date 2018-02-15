import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import {secrets} from '../../config/environments'


module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define('User',{
        
        id: {
            type: DataTypes.INTEGER,
            field:'id',
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            field:'username',
            allowNull:false,
            unique:true,
            validate:{
                isEmail: {args:true,  msg: 'Email is not a valid email'}
            }
        },
        password: {
            type: DataTypes.STRING,
            field: 'password',
            allowNull: false,
            validate: {
                notEmpty: {args: true, msg: 'Password not valid'},
                is : "^[a-zA-Z0-9]+$"
            },
            set(val) {
                if(val){
                    let hash = crypto.createHash(secrets.cryptAlgorithm);
                    let cryptPassword = hash.update(val);
                    cryptPassword = cryptPassword.digest("hex");
                    this.setDataValue('password', cryptPassword);
                }else{
                    this.setDataValue('password', null);
                }
            }
        },
        enabled: {
            type: 'TINYINT',
            field: 'enabled',
            defaultValue: 1
        }
    },
    {
        tableName: 'user'
    }
)

User.prototype.getAuthToken = function () {
    var userId = this.id
    return jwt.sign({userId}, secrets.jwtSecret)
}


return User
}