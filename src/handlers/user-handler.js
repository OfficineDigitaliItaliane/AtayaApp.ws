import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import {secrets} from '../../config/environments'
import { user } from '../models/index'

function hashPassword(password){
  let hash = crypto.createHash(secrets.cryptAlgorithm)
  let cryptPassword = hash.update(password)
  return cryptPassword.digest('hex')
}

export function getAuthTokenByUserId(userId) {
  return jwt.sign({userId}, secrets.jwtSecret)
}

export async function findEnabledUserByEmailAndPassword(username, password) {
  return new Promise(function (resolve, reject) {
    user.findOne({
      username: username,
      password: hashPassword(password),
      enabled: true
    }).exec(function (error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}

export async function findById(id) {
  return new Promise(function (resolve, reject) {
    user.findById(id).exec(function (error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}

export async function findUserByEmail(username) {
  return new Promise(function (resolve, reject) {
    user.findOne({
      username: username
    }).exec(function (error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}

export async function create(username, password) {
  return new Promise(function (resolve, reject) {
    user.create({
      username: username,
      password: hashPassword(password),
      enabled: true
    }, function (error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}

export async function remove() {
  return new Promise(function (resolve, reject) {
    user.remove({}).exec(function (error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}