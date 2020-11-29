const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

const query = async () => {
  const collection = await dbService.getCollection('user_collection');
  try {
    const users = await collection.find().toArray();
    users.forEach(user => delete user.password);
    return users;
  } catch (e) {
    console.error('ERROR: cannot find users');
    throw e;
  }
}

const getById = async (userId) => {
  const collection = await dbService.getCollection('user_collection');
  try {
    const user = await collection.findOne({ _id: ObjectId(userId) });
    delete user.password;
    return user;
  } catch (e) {
    console.error(`ERROR: while finding user ${userId}`);
    throw e;
  }
}

const getByEmail = async (email) => {
  const collection = await dbService.getCollection('user_collection');

  try {
    const user = await collection.findOne({ email });
    return user;
  } catch (e) {
    console.error(`ERROR: while finding user ${email}`);
    throw e;
  }
}

const remove = async (userId) => {
  const collection = await dbService.getCollection('user_collection');
  try {
    await collection.deleteOne({ _id: ObjectId(userId) });
  } catch (e) {
    console.error(`ERROR: cannot remove user ${userId}`);
    throw e;
  }
}

const update = async (user) => {
  const collection = await dbService.getCollection('user_collection');
  user._id = ObjectId(user._id);

  try {
    await collection.replaceOne({ _id: user._id }, { $set: user });
    return user;
  } catch (e) {
    console.error(`ERROR: cannot update user ${user._id}`);
    throw e;
  }
}

async function add(user) {
  const collection = await dbService.getCollection('user_collection');
  try {
    await collection.insertOne(user);
    return user;
  } catch (e) {
    console.error(`ERROR: cannot insert user`);
    throw e;
  }
}

module.exports = {
  query,
  getById,
  getByEmail,
  remove,
  update,
  add,
};