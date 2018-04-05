/**
 * Created by giovanni on 01/10/17.
 */

/**
 * @api {post} /api/cms/login Login
 * @apiGroup User
 * @apiParam {String} username Username.
 * @apiParam {String} password Password.
 * @apiParamExample {json} Request-Example:
 *  {
 *    "username": "user",
 *    "password": "pwd"
 *  }
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImlhdCI6dh4xMDY3NzE4Mn0.YRaOwj4lX8t2yXG6LxaaUZtUyJEP7-CYIX34RylfTSk"
 *  }
 * @apiError Unauthorized/401 Credentials not valid.
 */