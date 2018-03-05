/**
 * Created by giovanni on 01/10/17.
 */

/**
 * @apiDefine singleWriteSuccessResponse
 @apiSuccessExample {json} Success-Response:
{
    "letters": [
    "a",
    "b"
],
    "_id": "5a9941671edae8007cc896a9",
    "unit_id": 1,
    "picture": "picture.png",
    "word": "word"
}
*/

/**
 * @api {get} /api/cms/write Creates list of writes
 * @apiGroup Write
 * @apiUse authHeader
 *
 @apiSuccessExample {json} Success-Response:
[
    {
        "letters": [
            "a",
            "b"
        ],
        "_id": "5a9941671edae8007cc896a9",
        "unit_id": 1,
        "picture": "picture.png",
        "word": "word"
    },
    {
        "letters": [
            "c",
            "d"
        ],
        "_id": "5a9941921edae8007cc896aa",
        "unit_id": 1,
        "picture": "picture2.png",
        "word": "word2"
    }
]
 */

/**
 * @api {get} /api/cms/write/:id Find write by ID
 * @apiGroup Write
 * @apiUse authHeader
 * @apiUse singleWriteSuccessResponse
 */

/**
 * @api {post} /api/cms/write Add a new write
 * @apiGroup Write
 * @apiUse authHeader
 *
 * @apiParamExample {json} Request-Example:
{
    "unit_id": 1,
    "picture": "picture.png",
    "word": "word",
    "letters": [
    "a",
    "b"
]
}
 * @apiUse singleWriteSuccessResponse
 */

/**
 * @api {put} /api/cms/write/:id Update an existing write
 * @apiGroup Write
 * @apiUse authHeader
 *
 * @apiParamExample {json} Request-Example:
{
    "unit_id": 1,
    "picture": "newPicture.png",
    "word": "newWord",
    "letters": [
    "a",
    "b"
]
}
 * @apiUse singleWriteSuccessResponse
 */

/**
 * @api {delete} /api/cms/write/:id Deletes a write
 * @apiGroup Write
 * @apiUse authHeader
 */