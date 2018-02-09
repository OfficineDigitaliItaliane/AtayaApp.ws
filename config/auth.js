import passport from 'passport'
import passportJWT from 'passport-jwt'

import config from '../config/environments'
import * as userController from '../src/controllers/users'

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    ignoreExpiration: true
}

class Auth {
    constructor () {
      this.passport = passport
      this.strategy = new JwtStrategy(jwtOptions, async function (jwtPayload, next) {
        try {
          let user = await User.findById(jwtPayload.id)
          if (user) {
            return next(null, user)
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
      return this.passport.authenticate('jwt', cfg.jwtSession)
    }
  }

  export default Auth