/**
 * Created by giovanni on 01/03/18.
 */

import * as env from '../../config/environments'
import uuidv4 from 'uuid/v4'
import fs from 'fs'
import * as readHandler from '../handlers/read-handler'
import * as speakHandler from '../handlers/speak-handler'
import * as writeHandler from '../handlers/write-handler'
import * as understandHandler from '../handlers/understand-handler'
import * as fileSystem from '../components/file-system'
import * as zip from '../components/zip'

function uuid() {
  return uuidv4()
}

function getBookFolder() {
  return __dirname + '/../../book'
}

export function getZipFilePath() {
  return getBookFolder() + '/book.zip'
}

export async function getBookTimestamp() {
  let bookFolder = getBookFolder()
  let fullFilePath = bookFolder + '/book.json'
  let result = await fileSystem.readJsonFile(fullFilePath)
  return result.timestamp
}

export async function createZip() {
  let bookFolder = getBookFolder()
  let fullFilePath = bookFolder + '/book.zip'
  let files = []

  let jsonObj = await getJsonObj()
  let mediaArray = jsonObj.files
  delete jsonObj['files']

  let jsonPath = bookFolder + '/' + 'book.json'
  await fileSystem.writeFile(jsonPath, JSON.stringify(jsonObj))
  files.push(jsonPath)

  for (var i = 0; i < mediaArray.length; i++) {
    files.push(env['imageFolder'] + '/' + mediaArray[i])
  }

  zip.create(fullFilePath, files)
}

export async function getJsonObj() {
  let files = []

  let speakObj = await getSpeakObj()
  let speaks = speakObj.speaks
  files.concat(speakObj.files)

  let writeObj = await getWriteObj()
  let writes = writeObj.speaks
  files.concat(writeObj.files)

  let readObj = await getReadObj()
  let reads = readObj.reads
  files.concat(readObj.files)

  let understandObj = await getUnderstandObj()
  let understand = understandObj.understand
  files.concat(understandObj.files)

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

export async function getSpeakObj() {
  let files = []

  let speaks = await speakHandler.find()
  speaks = speaks.map((row) => {
    let speak = row.toObject()
    speak.id = speak._id
    delete speak['_id']
    files.push(speak.picture)
    files.push(speak.audio)
    return speak
  })

  return {speaks: speaks, files: files}
}

export async function getWriteObj() {
  let files = []

  let writes = await writeHandler.find()
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

  return {writes: writes, files: files}
}

export async function getReadObj() {
  let files = []

  let reads = await readHandler.find()
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

  return {reads: reads, files: files}
}

export async function getUnderstandObj() {
  let files = []

  let understand = await understandHandler.find()
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

  return {understand: understand, files: files}
}