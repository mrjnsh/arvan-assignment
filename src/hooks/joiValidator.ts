import type { Errors } from './useForm'
import Joi from 'joi'

export function convertJoiErrors<T>(joiErrors: Joi.ValidationResult<T>): Errors<T> {
  const errors: Errors<T> = {}
  if (joiErrors.error) {
    for (const error of joiErrors.error.details) {
      if (error.path) {
        const [first] = error.path
        const path = first as keyof T
        if (!errors[path]) {
          errors[path] = [error.message]
        } else {
          errors[path]!.push(error.message)
        }
      }
    }
  }
  return errors
}

export function RunValidation<T>(validation: Joi.ObjectSchema<any>, value: T) {
  return convertJoiErrors(validation.validate(value, { presence: 'required', abortEarly: false }))
}
