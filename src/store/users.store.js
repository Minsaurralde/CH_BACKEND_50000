import { userModel } from "./mongo/models/user.model.js";

const getAll = async () => {
  const result = await userModel.find();
  return result;
};

const getUser = async (id) => {
  let result = await userModel.findOne({ _id: id });
  return result;
};

const updateRole = async (id, role) => {
  let result = await userModel.updateOne({ _id: id }, { $set: { role: role } });
  return result;
};

const deleteUser = async (id) => {
  const result = await userModel.deleteOne({ _id: id });
  return result;
};

const deleteInactive = async () => {
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  const inactiveUsers = await userModel.find({
    last_login: { $lt: twoDaysAgo },
    role: "user",
  });

  if (inactiveUsers.length > 0) {
    const deletedUsers = await userModel.deleteMany({
      last_login: { $lt: twoDaysAgo },
      role: "user",
    });
    return inactiveUsers;
  }

  return [];
};

export default {
  getAll,
  getUser,
  updateRole,
  deleteUser,
  deleteInactive,
};
