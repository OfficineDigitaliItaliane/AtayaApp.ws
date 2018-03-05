/**
 * Created by giovanni on 01/10/17.
 */

/**
 * @api {post} /api/cms/media/upload Media Upload
 * @apiGroup Media
 * @apiUse authHeader
 * @apiParam {File} file Media file
 * @apiSuccessExample {json} Success-Response:
{
    "name": "iTunesArtwork_1520252388807.png",
    "type": "image/png"
}
 */

/**
 * @api {get} /api/cms/media/:fileName Get Media
 * @apiGroup Media
* @apiSuccessExample Success-Response:

HTTP/1.1 200 OK
X-Powered-By: Express
X-Request-Id: 83405b8e-d048-4175-bff4-901501c28b57
Access-Control-Allow-Origin: *
Content-Disposition: attachment; filename=image.png
Content-Type: image/png
Content-Length: 65537
Date: Mon, 05 Mar 2018 12:25:39 GMT
Connection: close

PNG

...

 */

