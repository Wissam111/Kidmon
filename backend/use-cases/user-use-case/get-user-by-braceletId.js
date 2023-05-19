const { NotFoundError } = require("../../utils/errors");

const buildGetUserByBraceletIdUseCase = (userDb) => {
  // no need for transaction because phone is primary key in the database
  return async ({ braceletId }) => {
    // if phone exsits
    const user = await userDb.findByBraceletId({ braceletId: braceletId });
    if (!user) {
      throw new NotFoundError(
        `User with Bracelet Id ${braceletId} was not found`
      );
    }

    return user;
  };
};

module.exports = { buildGetUserByBraceletIdUseCase };
