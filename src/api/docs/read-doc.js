/**
 * Created by giovanni on 01/10/17.
 */

/**
 * @api {get} /api/cms/read Creates list of reads
 * @apiGroup Read
 * @apiUse authHeader
 *
 @apiSuccessExample {json} Success-Response:
[
    {
        "options": [
            {
                "body": "body",
                "audio": "audio.mp3",
                "correct": false,
                "_id": "5a9946d7895e9c001de1ec74"
            },
            {
                "body": "body2",
                "audio": "audio2.mp3",
                "correct": true,
                "_id": "5a9946d7895e9c001de1ec73"
            }
        ],
        "_id": "5a9946d7895e9c001de1ec75",
        "unit_id": 1,
        "picture": "picture.png"
    },
    {
        "options": [
            {
                "body": "body",
                "audio": "audio.mp3",
                "correct": false,
                "_id": "5a994797895e9c001de1ec9a"
            },
            {
                "body": "body2",
                "audio": "audio2.mp3",
                "correct": true,
                "_id": "5a994797895e9c001de1ec99"
            }
        ],
        "_id": "5a994797895e9c001de1ec9b",
        "unit_id": 1,
        "picture": "picture2.png"
    }
]
 */

/**
 * @api {get} /api/cms/read/:id Find read by ID
 * @apiGroup Read
 * @apiUse authHeader
 *
 @apiSuccessExample {json} Success-Response:
{
    "options": [
    {
        "body": "body",
        "audio": "audio.mp3",
        "correct": false,
        "_id": "5a9946d7895e9c001de1ec74"
    },
    {
        "body": "body2",
        "audio": "audio2.mp3",
        "correct": true,
        "_id": "5a9946d7895e9c001de1ec73"
    }
],
    "_id": "5a9946d7895e9c001de1ec75",
    "unit_id": 1,
    "picture": "picture.png"
}
 */

/**
 * @api {post} /api/cms/read Add a new read
 * @apiGroup Read
 * @apiUse authHeader
 *
 * @apiParamExample {json} Request-Example:
{
    "unit_id": 1,
    "picture": "picture.png",
    "options": [
    {
        "body": "body",
        "audio": "audio.mp3",
        "correct": false
    },
    {
        "body": "body2",
        "audio": "audio2.mp3",
        "correct": true
    }
]
}
 */

/**
 * @api {put} /api/cms/read/:id Update an existing read
 * @apiGroup Read
 * @apiUse authHeader
 *
 * @apiParamExample {json} Request-Example:
{
    "unit_id": 1,
    "picture": "newPicture.png",
    "options": [
    {
        "body": "newBody",
        "audio": "newAudio.mp3",
        "correct": true
    },
    {
        "body": "newBody",
        "audio": "newAudio2.mp3",
        "correct": false
    }
]
}
 */

/**
 * @api {delete} /api/cms/read/:id Deletes a read
 * @apiGroup Read
 * @apiUse authHeader
 */