import logger from '../../config/logger'
import * as userHandler from '../handlers/user-handler'

export async function login(req, res, next) {
    let {body: {username, password}} = req
    try {
        var userFound = await userHandler.findUserByEmailAndPassword(username, password)
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