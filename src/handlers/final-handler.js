import { final, mongoose } from '../models/index'

export async function find() {
  return final.find().exec();
}

export async function findById(id) {
  return final.findById(id).exec();
}

export async function findByUnitId(unit_id) {
  return final.find({unit_id: unit_id}).exec();
}

export async function findByIdAndRemove(id) {
  return final.findByIdAndRemove(id).exec();
}

export async function create(obj) {
  return final.create(obj);
}

export async function update(id, obj) {
  return final.update({ _id: mongoose.Types.ObjectId(id) }, obj, { multi: false });
}