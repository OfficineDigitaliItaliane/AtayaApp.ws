
/*
write -> audio picture to Media
understand -> video_url e audio to Media,  question audio to Media, added picture , answer audio to Media
speak -> audio picture to Media
read -> .. to Media anche added markers ( migration -> delete )
*/

import * as db from '../../src/models/index'

(async () => {
  await db.read.deleteMany({}).exec();
  await toMedia(db.write, ['picture', 'audio']);


})()


async function toMedia(collection, fieldToMediaList) {
  const list = await collection.find().lean().exec()
  for (const el of list) {
    for (const fieldToMedia of fieldToMediaList) {
      const value = el[fieldToMedia];
      if (typeof value == 'string') {
        el[fieldToMedia] = {
          value: value
        }
      }
    }

    await db.write.update({ _id: el._id }, el);
  }
}
