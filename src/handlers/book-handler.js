/**
 * Created by giovanni on 01/03/18.
 */

import * as env from '../../config/environments'
import uuidv4 from 'uuid/v4'
import fs from 'fs'
import archiver from 'archiver'
import * as readHandler from '../handlers/read-handler'
import * as speakHandler from '../handlers/speak-handler'
import * as writeHandler from '../handlers/write-handler'
import * as understandHandler from '../handlers/understand-handler'

function uuid() {
  return uuidv4()
}

function getBookFolder() {
  return __dirname + '/../../book'
}

export async function writeFile(fullFilePath, string) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(fullFilePath, string, function(error) {
      if (error) {
        reject(error)
      }
      else {
        resolve()
      }
    })
  })
}

export async function readFile(fullFilePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fullFilePath, function(error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}

export async function readJsonFile(fullFilePath) {
  let result = await readFile(fullFilePath)
  return JSON.parse(result)
}

export async function getBookTimestamp() {
  let bookFolder = getBookFolder()
  let fullFilePath = bookFolder + '/book.json'
  let result = await readJsonFile(fullFilePath)
  return result.timestamp
}

export function getZipFilePath() {
  return getBookFolder() + '/book.zip'
}

export async function createZip() {
  let bookFolder = getBookFolder()
  let fullFilePath = bookFolder + '/book.zip'

  // create a file to stream archive data to.
  var output = fs.createWriteStream(fullFilePath);
  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function() {
    console.log('Data has been drained');
  });

// good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

// good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err;
  });

// pipe archive data to the file
  archive.pipe(output);

  // append a file from string

  let jsonObj = await getJsonObj()
  let mediaArray = jsonObj.files
  delete jsonObj['files']

  let jsonFileName = 'book.json'
  let jsonPath = bookFolder + '/' + jsonFileName
  await writeFile(jsonPath, JSON.stringify(jsonObj))

  archive.file(jsonPath, { name: jsonFileName })

  // mediaArray.push('iTunesArtwork_1520271116713.png')

  for (var i = 0; i < mediaArray.length; i++) {
    let filename = mediaArray[i]
    archive.file(env['imageFolder'] + '/' + filename, { name: filename })
  }

  // finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize();
}

export async function getJsonObj() {
  let files = []

  let reads = await readHandler.find()
  let speaks = await speakHandler.find()
  let writes = await writeHandler.find()
  let understand = await understandHandler.find()

  speaks = speaks.map((row) => {
    let speak = row.toObject()
    speak.id = speak._id
    delete speak['_id']
    files.push(speak.picture)
    files.push(speak.audio)
    return speak
  })

  writes = writes.map((row) => {
    let write = row.toObject()
    write.id = write._id
    delete write['_id']

    let letters = write.letters
    write.letters = letters.map((elem) => {
      return {id: uuid(), text: elem}
    })
    write.type = letters.length > 0 ? "basic" : "advanced"
    if (letters.length == 0) {
      delete write['letters']
    }

    files.push(write.picture)

    return write
  })

  reads = reads.map((row) => {
    let read = row.toObject()
    read.id = read._id
    delete read['_id']

    let options = read.options
    options.letters = options.map((elem) => {
      elem.id = elem._id
      delete elem['_id']
      elem.read_id = read.id

      files.push(elem.audio)

      return elem
    })

    files.push(read.picture)

    return read
  })

  understand = understand.map((row) => {
    let understandSingle = row.toObject()
    understandSingle.id = understandSingle._id
    delete understandSingle['_id']
    let understandAnswers = []

    let questions = understandSingle.questions
    understandSingle.questions = questions.map((elem) => {
      elem.id = elem._id
      delete elem['_id']
      elem.section_id = understandSingle.id
      elem.answers.map((qA) => {
        qA.id = qA._id
        delete qA['_id']
        qA.question_id = elem.id
        understandAnswers.push(qA)

        files.push(qA.audio)

        return qA
      })
      delete elem['answers']

      files.push(elem.audio)

      return elem
    })

    understandSingle.answers = understandAnswers

    files.push(understandSingle.audio)

    return understandSingle
  })

  files = files.filter((v, i, a) => a.indexOf(v) === i)

  let result = {
    timestamp: (new Date).getTime(),
    understand: understand,
    read: reads,
    speak: speaks,
    write: writes,
    files: files
  }

  return result
}