import Joi from 'joi'

export interface LoginPayload {
  user: {
    email: string
    password: string
  }
}

export const LOGIN_VALIDATION = Joi.object({
  email: Joi.string().required().email({ tlds: false }),
  password: Joi.string().required().min(8)
})
