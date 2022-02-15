const Joi = require('joi');

const taskSchema = Joi.object({
  task: Joi.string().required(),
})

const idSchema = Joi.object({
  id: Joi.string().hex().required(),
});

module.exports = {
  taskSchema,
  idSchema,
}