import { write, mongoose } from '../models/index'

export async function find() {
  return new Promise(function (resolve, reject) {
    write.find().exec(function (error, result) {
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
    write.findById(id).exec(function (error, result) {
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
    write.findByIdAndRemove(id).exec(function (error, result) {
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
    write.create(obj, function (error, result) {
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
    write.update({ _id: mongoose.Types.ObjectId(id) }, obj, { multi: false }, function(error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}