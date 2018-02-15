import passport from 'passport'
import passportJWT from 'passport-jwt'

import {secrets} from '../config/environments'
import * as user from '../src/repo/user'

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
    secretOrKey: secrets.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: true
}

class Auth {
  constructor () {
      this.passport = passport
      this.strategy = new JwtStrategy(jwtOptions, async function (jwtPayload, next) {
        try {
          let loggedUser = await user.findById(jwtPayload.userId)
          if (loggedUser) {
            return next(null, loggedUser)
          } else {
            return next(null, false)
          }
        } catch (error) {
          return next(error)
        }
      })
      this.passport.use(this.strategy)
    }
  
    initialize () {
      return this.passport.initialize()
    }
  
    authenticate () {
      return this.passport.authenticate('jwt', secrets.jwtSession)
    }
  }

  export default Auth