import logger from '../../config/logger'
import * as userHandler from '../handlers/user-handler'

export async function login(req, res, next) {
    let {body: {username, password}} = req
    try {
        var userFound = await userHandler.findEnabledUserByEmailAndPassword(username, password)
        if (!userFound) {
            res.sendStatus(401).end()
        } else {
            let response = {
                authToken: userHandler.getAuthTokenByUserId(userFound._id)
            }
            res.json(response)
        }
    } catch (error) {
        return next(error)
    }
}

export async function signup(req, res, next){
    let {body: {username, password}} = req
    try {
        var userExist = await userHandler.findUserByEmail(username)
        if (userExist){
            res.sendStatus(409).end()
        } else {
            var newUser = await userHandler.create(username, password)
            res.status(201).json(newUser)
        }

    } catch (error) {
        return next(error)
    }
}
