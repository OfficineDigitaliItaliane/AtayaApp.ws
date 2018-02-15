import { User } from '../models'
import crypto from 'crypto'
import { secrets } from '../../config/environments'
import Sequelize from 'sequelize'


function encryptPassword(password){
    let hash = crypto.createHash(secrets.cryptAlgorithm)
    let cryptPassword = hash.update(password)
    return cryptPassword.digest('hex')
}

export async function findUserByEmailAndPassword(username, password){
    var Op = Sequelize.Op;
    let res = await User.findOne({
        where: {
            username: {
                [Op.like]: username
            },
            password: {
                [Op.like]: encryptPassword(password)
            },
            enabled: {
                [Op.eq]: 1
            }
        }
    })
    return res
}

export async function findUserByEmail(username) {
    var Op = Sequelize.Op;
    let res = await User.findOne({
        where: {
            username: {
                [Op.like]: username
            }
        }
    })
    return res
}

export async function findById(userId){
    var Op = Sequelize.Op;
    let res = await User.findOne({
        where: {
            id: {
                [Op.eq]: userId
            }
        },
        attributes: ['username', 'id', 'createdAt']
    })
    return res
}

export async function create(username, password){
    let res = await User.create(
        {
            username: username,
            password: password
        }
    )
    return res
}