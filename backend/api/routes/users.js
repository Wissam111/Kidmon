const { Router } = require("express");
const { celebrate, Joi, Segments } = require("celebrate");
const { userController } = require("../../controllers");
const { imageUpload } = require("../middleware/image-file-uploader");

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
        daily: Joi.number().required(),
        weekly: Joi.number().required(),
        monthly: Joi.number().required(),
      }),
    }),
  }),
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
  userController.createAdminUser
);

router.patch(
  "/",
  imageUpload("image"),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      phone: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      allergies: Joi.array().items(Joi.string()),
      limits: Joi.object().keys({
        daily: Joi.number().required(),
        weekly: Joi.number().required(),
        monthly: Joi.number().required(),
      }),
    }),
  }),
  userController.updateUser
);

router.get(
  "/:userId",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  }),
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
  userController.getUsers
);

router.get(
  "/bracelet/:braceletId",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      braceletId: Joi.string().required(),
    }),
  }),
  userController.getUserByBraceletId
);

module.exports = router;
