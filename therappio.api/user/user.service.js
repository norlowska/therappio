const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
  login,
  signup,
  create,
  getAll,
  getById,
  update,
  delete: _delete,
};

async function signup(userParam) {
  // validate email address
  if (await User.findOne({ email: userParam.email })) {
    throw 'Email ' + userParam.email + ' is already in use';
  }
  const { password, ...userWithoutPassword } = userParam;

  // hash password
  userWithoutPassword.hash = bcrypt.hashSync(password, 10);
  const user = new User(userWithoutPassword);
  // save user
  await user.save();
}

async function login({ email, password }) {
  console.log('login service', email, password);
  const user = await User.findOne({ email });
  console.log(user);
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_KEY);
    const { hash, __v, ...userModified } = user;

    return {
      ...userModified,
      token,
    };
  }
}

async function getAll() {
  return await User.find().select('-hash -__v').populate('therapist', '_id');
}

async function getById(id) {
  return await User.findById(id)
    .select('-hash  -__v')
    .populate('therapist', 'firstName lastName phoneNumber');
}

async function create(userParam) {
  // validate
  if (await User.findOne({ email: userParam.email })) {
    throw 'Email ' + userParam.email + ' is already in use';
  }

  const { password, ...userWithoutPassword } = userParam;

  // hash password
  userWithoutPassword.hash = bcrypt.hashSync(password, 10);
  const user = new User(userWithoutPassword);

  // save user
  await user.save();
}

async function update(id, userParam) {
  console.log('update user service');
  const user = await User.findById(id);

  // validate
  if (!user) throw 'User not found';
  if (user.email !== userParam.email && (await User.findOne({ email: userParam.email }))) {
    throw 'Email "' + userParam.email + '" is already in use';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
    const { password, ...userParam } = userParam;
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();

  return getById(user._id);
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
