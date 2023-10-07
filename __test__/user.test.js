const mongoose = require('mongoose')
const request = require('supertest')  // it is needed to make HTTP requests

const helper = require('../helpers/user.helper')

const app = require('../index') // the app to test

require("dotenv").config()

beforeEach(async() => {
  await mongoose.connect(process.env.MONGODB_URI)
})

afterEach(async() => {
  await mongoose.connection.close()
})


describe("Check User's route request", () => {
  it("Get all users", async() => {  // 'it()' alias for 'test()'
  
    const res = await request(app)
      .get('/api/users');
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0)
  }, 10000)


  it("Get one user", async() => {
    const result = await helper.findLastInsertedUser();

    const res = await request(app)
      .get("/api/users/"+ result.username)

    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.username).toBe(result.username)
    expect(res.body.data.email).toBe(result.email)
  })

  it("Create a new user", async() => {
    const res = await request(app)
    .post('/api/users')
    .send({
      username: 'test6',
      password: '12345test4',
      name: 'name test4',
      surname: 'surname test4',
      email: 'test4@aueb.gr'
    })

    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBeTruthy();
  })

  it("Post create user that already exists", async() => {

    const result = await helper.findLastInsertedUser()

    const res = await request(app)
      .post('/api/users')
      .send({
        username: result.username,
        password: "1111",
        name: "new name",
        surname: "new surname",
        email: "new@aueb.gr"
      })
      
    expect(res.statusCode).toBe(400)
    expect(res.body.status).toBeFalsy();
  })

  it("Patch update a user", async() => {
    const result = await helper.findLastInsertedUser()

    const res = await request(app)
      .patch('/api/users/' + result.username)
      .send({
        username: result.username,
        password: "updated password",
        name : "new updated name",
        surname: "new updated surname",
        email: "new@aueb.gr",
        address: {
          area: "new area",
          road: "new road"
        },
        phone: [
          {
            type: "mobile",
            number: "1111111"
          }
        ]
      });
    
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBeTruthy()
  })

  it("Delete , delete a user", async() => {
    const result = await helper.findLastInsertedUser();

    const res = await request(app)
      .delete("/api/users/" + result.username);
    
    expect(res.statusCode).toBe(200)
  })

})