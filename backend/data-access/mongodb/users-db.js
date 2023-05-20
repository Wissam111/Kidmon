"use strict";

const User = require("./schema/user");
const MongodbTransaction = require("./mongodb-transaction");
const { idMap, idsMap } = require("./utils");

exports.makeUserDb = ({ makeDb }) => {
  return Object.freeze({
    create,
    update,
    findById,
    remove,
    findById,
    findByPhone,
    makeTransaction,
    findByBraceletId,
    find,
  });

  async function create({ id: _id, transaction, ...userInfo }) {
    await makeDb();

    const createdUser = (
      await new User({ _id, ...userInfo }).save({
        session: transaction?.getSession(),
      })
    ).toObject();
    return idMap(createdUser);
  }

  async function update({
    id: _id,
    populate = true,
    transaction,
    ...userInfo
  }) {
    await makeDb();
    const user = await User.findOneAndUpdate({ _id }, userInfo, {
      session: transaction?.getSession(),
      populate: populate
        ? [
          { path: "parent", select: "id firstName lastName phone credits" },
          { path: "familyMembers" },
        ]
        : null,
      new: true
    }).lean();

    if (!user) return null;

    return {
      ...idMap(user),
      parent: populate ? idMap(user.parent) : user.parent,
      familyMembers: populate ? idsMap(user.familyMembers) : user.familyMembers,
    };
  }

  async function remove({ id: _id, transaction }) {
    await makeDb();
    await User.deleteOne({ _id }, { session: transaction?.getSession() })
  }

  async function findById({ id: _id, populate = true, transaction }) {
    await makeDb();
    const user = await User.findOne(
      { _id },
      {},
      {
        session: transaction?.getSession(),
        populate: populate
          ? [
            { path: "parent", select: "id firstName lastName phone credits" },
            { path: "familyMembers" },
          ]
          : null,
      }
    ).lean();

    if (!user) return null;

    return {
      ...idMap(user),
      parent: populate ? idMap(user.parent) : user.parent,
      familyMembers: populate ? idsMap(user.familyMembers) : user.familyMembers,
    };
  }

  async function findByPhone({ phone, populate = true, transaction }) {
    await makeDb();
    const user = await User.findOne(
      { phone },
      {},
      {
        session: transaction?.getSession(),
        populate: populate
          ? [
            { path: "parent", select: "id firstName lastName phone credits" },
            { path: "familyMembers" },
          ]
          : null,
      }
    ).lean();

    if (!user) return null;

    return {
      ...idMap(user),
      parent: populate ? idMap(user.parent) : user.parent,
      familyMembers: populate ? idsMap(user.familyMembers) : user.familyMembers,
    };
  }

  async function findByBraceletId({
    braceletId,
    populate = true,
    transaction,
  }) {
    await makeDb();
    console.log(braceletId);
    const user = await User.findOne(
      { braceletId: braceletId },
      {},
      {
        session: transaction?.getSession(),
        populate: populate
          ? [
            { path: "parent", select: "id firstName lastName phone credits" },
            { path: "familyMembers" },
          ]
          : null,
      }
    ).lean();

    if (!user) return null;
    return {
      ...idMap(user),
      parent: populate ? idMap(user.parent) : user.parent,
      familyMembers: populate ? idsMap(user.familyMembers) : user.familyMembers,
    };
  }

  async function find({
    search = "",
    page,
    pageSize = 10,
    sort = "desc",
    filters,
    transaction,
  }) {
    await makeDb();

    const _filters = {
      ...filters,
      $or: [
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstName", " ", "$lastName"] },
              regex: search, //Your text search here
              options: "i",
            },
          },
        },
        { phone: { $regex: "^" + search } },
      ],
    };

    const query = User.find(
      _filters,
      {},
      {
        sort: { createdAt: sort },
        limit: pageSize,
        skip: (page - 1) * pageSize,
        session: transaction?.getSession(),
      }
    );
    const count = await User.count(_filters);

    const users = await query.lean();
    return {
      users: idsMap(users),
      count: count,
    };
  }

  async function makeTransaction() {
    await makeDb();
    return new MongodbTransaction(await User.startSession());
  }
};
