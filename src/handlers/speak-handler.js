import { speak, mongoose } from '../models/index'

export async function find() {
  return new Promise(function (resolve, reject) {
    speak.find().exec(function (error, result) {
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
    speak.findById(id).exec(function (error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}

export async function findByUnitId(unit_id) {
  return new Promise(function (resolve, reject) {
    speak.find({unit_id: unit_id}).exec(function (error, result) {
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
    speak.findByIdAndRemove(id).exec(function (error, result) {
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
    speak.create(obj, function (error, result) {
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
    speak.update({ _id: mongoose.Types.ObjectId(id) }, obj, { multi: false }, function(error, result) {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}