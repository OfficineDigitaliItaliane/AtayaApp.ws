/**
 * Created by giovanni on 01/10/17.
 */

/**
 * @api {get} /api/cms/speak Creates list of speaks
 * @apiGroup Speak
 * @apiUse authHeader
 *
 @apiSuccessExample {json} Success-Response:
[
    {
        "_id": "5a9935e56b3e3800521161b8",
        "unit_id": 1,
        "picture": "picture.png",
        "audio": "audio.mp3"
    },
    {
        "_id": "5a9935eb6b3e3800521161b9",
        "unit_id": 1,
        "picture": "picture2.png",
        "audio": "audio2.mp3"
    }
]
 */

/**
 * @api {get} /api/cms/speak/:id Find speak by ID
 * @apiGroup Speak
 * @apiUse authHeader
 *
 @apiSuccessExample {json} Success-Response:
{
    "_id": "5a9935e56b3e3800521161b8",
    "unit_id": 1,
    "picture": "picture.png",
    "audio": "audio.mp3"
}
 */

/**
 * @api {post} /api/cms/speak Add a new speak
 * @apiGroup Speak
 * @apiUse authHeader
 *
 * @apiParamExample {json} Request-Example:
 {
     "unit_id": 1,
     "picture": "picture.png",
     "audio": "audio.mp3"
 }
 */

/**
 * @api {put} /api/cms/speak/:id Update an existing speak
 * @apiGroup Speak
 * @apiUse authHeader
 *
 * @apiParamExample {json} Request-Example:
{
    "unit_id": 1,
    "picture": "newPicture.png",
    "audio": "newudio.mp3"
}
 */

/**
 * @api {delete} /api/cms/speak/:id Deletes a speak
 * @apiGroup Speak
 * @apiUse authHeader
 */