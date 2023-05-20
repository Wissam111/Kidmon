const { Router } = require("express");
const { celebrate, Joi, Segments } = require("celebrate");
const { userController } = require("../../controllers");
const { imageUpload } = require("../middleware/image-file-uploader");
const { requireAuthentication } = require("../middleware/requireAuthentication");
const { makeFieldAuthorization, makeRoleAuthorization, makeParentAuthorization } = require("../middleware/requireAuthorization");
const { USER_ROLES } = require("../../entities/user");

const router = Router();


router.post(
  "/parent",
  imageUpload("image"),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      phone: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    }),
  }),
  requireAuthentication,
  makeRoleAuthorization({ userRoles: [USER_ROLES.admin] }),
  userController.createParentUser
);

router.post(
  "/family-member",
  imageUpload("image"),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      phone: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      braceletId: Joi.string().required(),
      parentId: Joi.string().required(),
      allergies: Joi.array().items(Joi.string()),
      limits: Joi.object().keys({
        daily: Joi.object().keys({
          value: Joi.number().required(),
          isActive: Joi.bool().required()
        }),
        weekly: Joi.object().keys({
          value: Joi.number().required(),
          isActive: Joi.bool().required()
        }),
        monthly: Joi.object().keys({
          value: Joi.number().required(),
          isActive: Joi.bool().required()
        }),
      }),
    }),
  }),
  requireAuthentication,
  makeRoleAuthorization({ userRoles: [USER_ROLES.parent] }),
  makeFieldAuthorization({ reqData: { in: 'body', field: 'parentId' }, userField: 'id' }),
  userController.createFamilyMemberUser
);

router.post(
  "/admin",
  imageUpload("image"),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      phone: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    }),
  }),
  requireAuthentication,
  makeRoleAuthorization({ userRoles: [USER_ROLES.admin] }),
  userController.createAdminUser
);

router.patch(
  "/",
  imageUpload("image"),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      userId: Joi.string(),
      phone: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      allergies: Joi.array().items(Joi.string()),
      parentId: Joi.string(),
      braceletId: Joi.string(),
      limits: Joi.object().keys({
        daily: Joi.object().keys({
          value: Joi.number().required(),
          isActive: Joi.bool().required()
        }),
        weekly: Joi.object().keys({
          value: Joi.number().required(),
          isActive: Joi.bool().required()
        }),
        monthly: Joi.object().keys({
          value: Joi.number().required(),
          isActive: Joi.bool().required()
        }),
      }).allow(null),
    }),
  }),
  requireAuthentication,
  makeFieldAuthorization({ reqData: { in: 'body', field: 'userId' }, userField: 'id' }),
  userController.updateUser
);

router.get(
  "/:userId",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  }),
  requireAuthentication,
  makeFieldAuthorization({ reqData: { in: 'params', field: 'userId' }, userField: 'id' }),
  userController.getUser
);

router.get(
  "/",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      search: Joi.string(),
      page: Joi.number(),
      pageSize: Joi.number(),
      sort: Joi.string().valid("desc", "asc"),
    }),
  }),
  requireAuthentication,
  makeRoleAuthorization({ userRoles: [USER_ROLES.admin] }),
  userController.getUsers
);

router.get(
  "/bracelet/:braceletId",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      braceletId: Joi.string().required(),
    }),
  }),
  requireAuthentication,
  makeRoleAuthorization({ userRoles: [USER_ROLES.admin] }),
  userController.getUserByBraceletId
);



router.delete("/familyMember/:familyMemberId",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      familyMemberId: Joi.string().required(),
    }),
  }),
  requireAuthentication,
  makeRoleAuthorization({ userRoles: [USER_ROLES.parent] }),
  makeParentAuthorization({ reqData: { in: 'params', field: 'familyMemberId' } }),
  userController.removeFamilyMember
);


module.exports = router;
