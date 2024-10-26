import { reactive, toRefs, ref, shallowRef, type Ref } from 'vue'
import type { Errors, FieldValues, FormState, Validator } from './contracts/Form'

export function useForm<T extends FieldValues = FieldValues>(
  initialValues: T,
  validators: Validator<T>
) {
  const formState = reactive<FormState>({
    isSubmitting: false,
    isValid: true
  })
  const values: Ref<T> = shallowRef(initialValues)
  const errors: Ref<Errors<T>> = ref({})
  const validate = () => {
    const newErrors: Errors<T> | null = validators(values.value)
    if (newErrors === null) {
      formState.isValid = true
      return
    }
    formState.isValid = Object.keys(newErrors).length === 0
    errors.value = newErrors
  }

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const { name, value } = target
    values.value[name as keyof T] = value as any
    validate()
  }

  const handleSubmit = async (callback: (values: T) => Promise<void>) => {
    formState.isSubmitting = true
    validate()

    if (formState.isValid) {
      await callback(values.value)
    }

    formState.isSubmitting = false
  }

  return {
    ...toRefs(formState),
    values,
    errors,
    handleChange,
    handleSubmit
  }
}
