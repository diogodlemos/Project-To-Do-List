const Joi = require('joi');

const taskSchema = Joi.object({
  task: Joi.string().required(),
})

module.exports = {
  taskSchema,
}