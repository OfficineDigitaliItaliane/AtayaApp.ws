'use strict';

import models from '../models';
const server = require('../../index.js');

describe('Users',() =>{

    before((done)=>{
        models.User.create({
            username:'test@test.com',
            password: 'test'
        });
        done();
    });

     it('POST /api/cms/signup',(done)=>{
        request(server)
            .post('/api/cms/signup')
            .send({'username':'test2@test.com', 'password':'testpassword'})
            .end((err,res)=>{
                expect(res).to.have.status(201);
                expect('Content-Type',/json/);
                expect(res.body.username).to.equal('test2@test.com')
                done();
            })
     });

     it('POST /api/cms/login',(done)=>{
        request(server)
            .post('/api/cms/login')
            .send({'username':'test@test.com', 'password':'test'})
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect('Content-Type',/json/);
                expect(res.body).to.have.a.property('authToken')
                done();
            })
     });

     after((done)=>{
        models.User.destroy(
            {where: {}}
        );
        done();
    });

});