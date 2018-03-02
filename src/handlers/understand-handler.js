import { understand, mongoose } from '../models/index'

export async function find() {
  return new Promise(function (resolve, reject) {
    understand.find().exec(function (error, result) {
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
    understand.findById(id).exec(function (error, result) {
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
    understand.findByIdAndRemove(id).exec(function (error, result) {
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
    understand.create(obj, function (error, result) {
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
    understand.update({ _id: mongoose.Types.ObjectId(id) }, obj, { multi: false }, function(error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}