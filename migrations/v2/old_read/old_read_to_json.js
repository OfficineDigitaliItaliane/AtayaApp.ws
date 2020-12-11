import fs from 'fs';

import * as db from '../../../src/models/index'
import mongoose from "mongoose";

(async () => {
  console.log('Migration Started')

  const data = readAllOldData();
  for (const item of data) {

    let id = 1;

    elementToMedia(item, ['picture'])
    item['_id'] = item['id'];
    console.log(item['_id'])
    if (!item['options']) {
      continue;
    }
    item.markers = item.markers || [];
    item['options'] = (item['options'] || {}).filter((option) => option.correct);

    for (const option of item['options']) {
      option['_id'] = option['id'];
      elementToMedia(option, ['audio'])
      const newId = id++;
      const marker = {
        id: newId,
        x: 0,
        y: 0
      }
      item.markers.push(marker);
      option.markerId = newId;
    }
  }

  const ids = data.map((i) => i['_id']);

  await db.read.deleteMany({
    _id:{
      $in: ids
    }
  }).exec();
  await db.read.insertMany(data);

  console.log(JSON.stringify(data, null, 4))
  console.log('Migration Ended')
  mongoose.connection.close()
})()


function readAllOldData() {
  const bookString = fs.readFileSync(__dirname + '/book.json').toString();
  const book = JSON.parse(bookString)
  return book['read'];
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
