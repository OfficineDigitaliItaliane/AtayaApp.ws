import { read, mongoose } from '../models/index'

export async function find() {
  return new Promise(function (resolve, reject) {
    read.find().exec(function (error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}

export async function findById(id) {
  return new Promise(function (resolve, reject) {
    read.findById(id).exec(function (error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}

export async function findByIdAndRemove(id) {
  return new Promise(function (resolve, reject) {
    read.findByIdAndRemove(id).exec(function (error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}

export async function create(obj) {
  return new Promise(function (resolve, reject) {
    read.create(obj, function (error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}

export async function update(id, obj) {
  return new Promise(function (resolve, reject) {
    read.update({ _id: mongoose.Types.ObjectId(id) }, obj, { multi: false }, function(error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}