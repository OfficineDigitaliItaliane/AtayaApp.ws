import logger from '../../config/logger'
import * as user from '../repo/user'

export async function login(req, res, next) {
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

export async function signup(req, res, next){
    let {body: {username, password}} = req
    try {
        var userExist = await user.findUserByEmail(username)
        if (userExist){
            res.sendStatus(409).end()
        } else {
            var newUser = await user.create(username, password)
            res.status(201).json(newUser)
        }

    } catch (error) {
        return next(error)
    } 
}

export async function stub(req, res, next){
    try{
        res.json({message:"hello world"})
    }catch(error){
        return next(error)
    }
}