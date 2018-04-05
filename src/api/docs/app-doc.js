/**
 * Created by giovanni on 01/10/17.
 */

/**
 * @api {get} /api/app/book Get Book Zip
 * @apiGroup App
 * @apiUse appAuthHeader
 * @apiSuccessExample Success-Response:

 HTTP/1.1 200 OK
 X-Powered-By: Express
 X-Request-Id: a71c11b3-da50-4cd8-ae30-7e994512fd5a
 Access-Control-Allow-Origin: *
 Content-Disposition: attachment; filename="book.zip"
 Accept-Ranges: bytes
 Cache-Control: public, max-age=0
 Last-Modified: Tue, 06 Mar 2018 11:45:36 GMT
 ETag: W/"238-161fb218f00"
 Content-Type: application/zip
 Content-Length: 568
 Date: Tue, 06 Mar 2018 12:11:13 GMT
 Connection: close

 ...

 */

/**
 * @api {get} /api/app/book/update/:timestamp Is Book Update
 * @apiGroup App
 * @apiUse appAuthHeader
 * @apiParam {String} timestamp Book timestamp
 * @apiSuccessExample Success-Response:
 * true
 */