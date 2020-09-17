const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const User = db.User;

module.exports = {
  create,
  getAll,
  getById,
  update
};

async function create(userParam) {
  // validate
  if (await User.findOne({ email: userParam.email })) {
    throw "Email " + userParam.email + " is already in use";
  }

  const { password, ...userWithoutPassword } = userParam;

  const user = new User(userWithoutPassword);

  // save user
  await user.save();
}

async function getAll() {
  return await User.find()
    .select("-hash -__v")
    .populate("therapist", "_id");
}

async function getById(id) {
  return await User.findById(id)
    .select("-hash  -__v")
    .populate("therapist", "firstName lastName phoneNumber");
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.email !== userParam.email &&
    (await User.findOne({ email: userParam.email }))
  ) {
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

  return user;
}
