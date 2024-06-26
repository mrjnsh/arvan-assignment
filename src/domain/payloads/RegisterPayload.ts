import Joi from 'joi'

export interface RegisterPayload {
  user: {
    username: string
    email: string
    password: string
  }
}

export const REGISTER_VALIDATION = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().min(8).required()
})
