'use strict'

/**
 * Helper class for creating the Zip file.
 */

import fs from 'fs'

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