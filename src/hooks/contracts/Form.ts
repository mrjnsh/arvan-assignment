export type FieldValues = Record<string, string | boolean | number | undefined | null>

export type Errors<T> = { [key in keyof T]?: string[] }

export interface FormState {
  isSubmitting: boolean
  isValid: boolean
}

export type Validator<T> = (value: T) => Errors<T> | null
