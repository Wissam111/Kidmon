const { makeFamilyMemberUser, makeParentUser } = require("../../entities");
const { USER_ROLES } = require("../../entities/user");
const { AlreadyExistsError, NotFoundError, UserRoleError } = require("../../utils/errors");

const buildCreateFamilyMemberUserUseCase = (userDb) => {
  // no need for transaction because phone is primary key in the database
  return async ({
    firstName,
    lastName,
    phone,
    image,
    braceletId,
    parentId,
    allergies,
    limits,
  }) => {
    // check if phone exsits
    const phoneExsits = await userDb.findByPhone({ phone: phone });
    if (phoneExsits) {
      throw new AlreadyExistsError("Phone already exists");
    }

    // check if braceletId exists
    const bracelet = await userDb.findByBraceletId({ braceletId: braceletId });
    if (bracelet) throw new AlreadyExistsError("braceletId already exists");

    // check if parent exists
    const parent = await userDb.findById({ id: parentId, populate: false });
    if (!parent) throw new NotFoundError("Parent does not exist");
    if (parent.role !== USER_ROLES.parent) throw new UserRoleError('The user with this parent id does not have a parent role')

    // create family member user
    user = makeFamilyMemberUser({
      firstName,
      lastName,
      phone,
      image,
      braceletId,
      parent: parentId,
      allergies,
      limits,
    });
    const createdUser = await userDb.create(user);

    // update parent family members
    parent.familyMembers.push(user.id);
    const updatedParent = makeParentUser({ ...parent, updatedAt: null });
    await userDb.update(updatedParent);

    return createdUser;
  };
};

module.exports = { buildCreateFamilyMemberUserUseCase };
