import CustomError from "../handlers/errors/custom-error.js";
import {
  EErrorCode,
  EErrorMsg,
  EErrorName,
} from "../handlers/errors/enum-errors.js";
import store from "../store/users.store.js";
import sendEmail from "../utils/nodemailer.js";

const getAll = async () => {
  let result = await store.getAll();

  return result.map((user) => ({
    id: user._id,
    role: user.role,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  }));
};

const getById = async (id) => {
  if (!id) {
    CustomError.createError({
      name: EErrorName.MISSING_DATA,
      cause: `* id    : id need to be a string, receibed ${id}`,
      message: EErrorMsg.MISSING_DATA,
      code: EErrorCode.BAD_REQUEST,
    });
  }

  let result = await store.getUser(id);
  return result;
};

const updateRoleById = async ({ id, role }) => {
  if (!id || !role) {
    CustomError.createError({
      name: EErrorName.MISSING_DATA,
      cause: `
        List of required properties:
        * id       : id need to be a string, receibed ${id}
        * role  : role need to be a string, receibed ${role}
        `,
      message: EErrorMsg.MISSING_DATA,
      code: EErrorCode.BAD_REQUEST,
    });
  }

  let result = await store.updateRole(id, role);
  return result;
};

const deleteById = async (userID) => {
  if (!userID) {
    CustomError.createError({
      name: EErrorName.MISSING_DATA,
      cause: `
        List of required properties:
        * userId    : userId need to be a string, receibed ${userID}
        `,
      message: EErrorMsg.MISSING_DATA,
      code: EErrorCode.BAD_REQUEST,
    });
  }

  await store.deleteUser(userID);
  return;
};

const deleteInactiveUsers = async () => {
  const inactiveUsers = await store.deleteInactive();
  await sendInactiveMessage(inactiveUsers);

  const response = { deletedCount: inactiveUsers.length };
  return `fueron eliminados ${response.deletedCount} usuarios`;
};

const sendInactiveMessage = async (inactiveUsers) => {
  const emailPromises = inactiveUsers.map((user) => {
    return sendEmail({
      to: user.email,
      subject: "Cuenta Eliminada por Inactividad",
      html: `
        <div>
          Estimado ${
            user.first_name ? user.first_name : "cliente"
          }, su cuenta ha sido eliminada debido a
          inactividad de más de 2 días.
        </div>
        `,
    });
  });

  await Promise.all(emailPromises);
};

export default {
  getAll,
  getById,
  updateRoleById,
  deleteById,
  deleteInactiveUsers,
  sendEmail,
};
