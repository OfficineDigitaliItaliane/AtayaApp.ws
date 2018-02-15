import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaiHttp from 'chai-http'
import * as models from '../src/models/index'

chai.use(chaiHttp)
chai.use(chaiAsPromised)
global.expect = chai.expect
global.request = chai.request

require('../src/api/cms.spec.js')

after((done) => {
  models.sequelize.close()
  done()
})