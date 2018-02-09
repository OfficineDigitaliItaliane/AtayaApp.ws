import logger from '../../config/logger'
import user from '../repo/user'

export async function login(req, res, err) {
    let {body: {username, password}} = req
    try {
        var userFound = await user.findUserByEmailAndPassword(username, password)
        if (!userFound) {
            res.sendStatus(401).end()
        } else {
            let response = {
                authToken: userFound.getAuthToken()
            }
            res.json(response)
        }
      } catch (error) {
          return next(error)
      }
}

export async function signup(req, res, err){
}