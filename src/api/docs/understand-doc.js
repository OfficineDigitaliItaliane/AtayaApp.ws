/**
 * Created by giovanni on 01/10/17.
 */

/**
 * @api {get} /api/cms/understand Creates list of understand
 * @apiGroup Understand
 * @apiUse authHeader
 *
 @apiSuccessExample {json} Success-Response:
[
    {
        "questions": [
            {
                "answers": [
                    {
                        "body": "body",
                        "audio": "audio.mp3",
                        "correct": false,
                        "_id": "5a994769895e9c001de1ec8f"
                    },
                    {
                        "body": "body2",
                        "audio": "audio2.mp3",
                        "correct": true,
                        "_id": "5a994769895e9c001de1ec8e"
                    }
                ],
                "body": "qBody",
                "audio": "qAudio.mp3",
                "_id": "5a994769895e9c001de1ec90"
            },
            {
                "answers": [
                    {
                        "body": "body",
                        "audio": "audio.mp3",
                        "correct": false,
                        "_id": "5a994769895e9c001de1ec8c"
                    },
                    {
                        "body": "body2",
                        "audio": "audio2.mp3",
                        "correct": true,
                        "_id": "5a994769895e9c001de1ec8b"
                    }
                ],
                "body": "q2Body",
                "audio": "q2Audio.mp3",
                "_id": "5a994769895e9c001de1ec8d"
            }
        ],
        "_id": "5a994769895e9c001de1ec91",
        "unit_id": 1,
        "video_url": "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
        "audio": "audio.mp3"
    },
    {
        "questions": [
            {
                "answers": [
                    {
                        "body": "body",
                        "audio": "audio.mp3",
                        "correct": false,
                        "_id": "5a99476f895e9c001de1ec96"
                    },
                    {
                        "body": "body2",
                        "audio": "audio2.mp3",
                        "correct": true,
                        "_id": "5a99476f895e9c001de1ec95"
                    }
                ],
                "body": "qBody",
                "audio": "qAudio.mp3",
                "_id": "5a99476f895e9c001de1ec97"
            },
            {
                "answers": [
                    {
                        "body": "body",
                        "audio": "audio.mp3",
                        "correct": false,
                        "_id": "5a99476f895e9c001de1ec93"
                    },
                    {
                        "body": "body2",
                        "audio": "audio2.mp3",
                        "correct": true,
                        "_id": "5a99476f895e9c001de1ec92"
                    }
                ],
                "body": "q2Body",
                "audio": "q2Audio.mp3",
                "_id": "5a99476f895e9c001de1ec94"
            }
        ],
        "_id": "5a99476f895e9c001de1ec98",
        "unit_id": 1,
        "video_url": "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
        "audio": "audio2.mp3"
    }
]
*/

/**
 * @api {get} /api/cms/understand/:id Find understand by ID
 * @apiGroup Understand
 * @apiUse authHeader
 *
 @apiSuccessExample {json} Success-Response:
{
    "questions": [
    {
        "answers": [
            {
                "body": "body",
                "audio": "audio.mp3",
                "correct": false,
                "_id": "5a994769895e9c001de1ec8f"
            },
            {
                "body": "body2",
                "audio": "audio2.mp3",
                "correct": true,
                "_id": "5a994769895e9c001de1ec8e"
            }
        ],
        "body": "qBody",
        "audio": "qAudio.mp3",
        "_id": "5a994769895e9c001de1ec90"
    },
    {
        "answers": [
            {
                "body": "body",
                "audio": "audio.mp3",
                "correct": false,
                "_id": "5a994769895e9c001de1ec8c"
            },
            {
                "body": "body2",
                "audio": "audio2.mp3",
                "correct": true,
                "_id": "5a994769895e9c001de1ec8b"
            }
        ],
        "body": "q2Body",
        "audio": "q2Audio.mp3",
        "_id": "5a994769895e9c001de1ec8d"
    }
],
    "_id": "5a994769895e9c001de1ec91",
    "unit_id": 1,
    "video_url": "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
    "audio": "audio.mp3"
}
 */

/**
 * @api {post} /api/cms/understand Add a new understand
 * @apiGroup Understand
 * @apiUse authHeader
 *
 * @apiParamExample {json} Request-Example:
{
    "unit_id": 1,
    "video_url": "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
    "audio": "audio.mp3",
    "questions": [
    {
        "body": "qBody",
        "audio": "qAudio.mp3",
        "answers": [
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
    },
    {
        "body": "q2Body",
        "audio": "q2Audio.mp3",
        "answers": [
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
]
}
 */

/**
 * @api {put} /api/cms/understand/:id Update an existing understand
 * @apiGroup Understand
 * @apiUse authHeader
 *
 * @apiParamExample {json} Request-Example:
{
    "unit_id": 1,
    "video_url": "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
    "audio": "newAudio.mp3",
    "questions": [
    {
        "body": "qBody",
        "audio": "qAudio.mp3",
        "answers": [
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
    },
    {
        "body": "q2Body",
        "audio": "q2Audio.mp3",
        "answers": [
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
]
}
 */

/**
 * @api {delete} /api/cms/understand/:id Deletes a understand
 * @apiGroup Understand
 * @apiUse authHeader
 */