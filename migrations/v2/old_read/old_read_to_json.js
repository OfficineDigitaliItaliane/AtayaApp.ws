import fs from 'fs';

(async () => {
  console.log('Migration Started')

  const data = readAllOldData();
  for (const item of data) {
    elementToMedia(item, ['picture'])
    if (!item['options']) {
      continue;
    }
    for (const option of item['options']) {
      elementToMedia(option, ['audio'])
      delete option.correct
    }
  }
  
  console.log(JSON.stringify(data, null, 4))
  console.log('Migration Ended')
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