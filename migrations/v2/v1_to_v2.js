
/*
write -> audio picture to Media
understand -> video_url e audio to Media,  question audio to Media, added picture , answer audio to Media
speak -> audio picture to Media
read -> .. to Media anche added markers ( migration -> delete )
*/

import * as db from '../../src/models/index'

(async () => {
  console.log('Migration Started')
  await db.read.deleteMany({}).exec();
  await toMedia(db.write, ['picture', 'audio']);
  await toMedia(db.speak, ['picture', 'audio']);
  await understandSectionToMedia();
  console.log('Migration Ended')
})()


async function toMedia(collection, fieldToMediaList) {
  const list = await collection.find().lean().exec()
  for (const el of list) {
    elementToMedia(el, fieldToMediaList);
    await collection.updateOne({ _id: el._id }, el);
  }
}

async function understandSectionToMedia() {
  const list = await db.understand.find().lean().exec()
  for (const el of list) {
    elementToMedia(el,['video_url', 'audio'] )
    if (!el.questions) {
      continue;
    }
    for (const question of el.questions) {
      elementToMedia(question, ['audio'])
      if (!question.answers) {
        continue;
      }
      for (const answer of question.answers) {
        elementToMedia(answer, ['audio'])
      }
    }
    await db.understand.updateOne({ _id: el._id }, el);
  }
}

function elementToMedia(element, fieldToMediaList) {
  for (const fieldToMedia of fieldToMediaList) {
    const value = element[fieldToMedia];
    if (typeof value == 'string') {
      // console.log(`Converting ${value} to media`)
      element[fieldToMedia] = {
        value: value
      }
    }
  }
}
