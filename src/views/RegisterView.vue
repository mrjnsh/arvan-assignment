<template>
  <AuthFormWrapper>
    <div class="text-center">
      <h1 class="Text-Style-4">Register</h1>
    </div>
    <form
      ref="form"
      id="auth-form"
      @submit.prevent="handleSubmit"
      novalidate
      class="needs-validation d-grid gap-3"
    >
      <InputField
        v-model="values.username"
        @input="handleChange"
        typeOfInput="text"
        label="Username"
        :errorText="errors.username ? errors.username[0] : ''"
        inputId="username"
      />
      <InputField
        v-model="values.email"
        @input="handleChange"
        typeOfInput="email"
        label="Email"
        :errorText="errors.email ? errors.email[0] : ''"
        inputId="email"
      />
      <InputField
        v-model="values.password"
        @input="handleChange"
        typeOfInput="password"
        label="Password"
        :errorText="errors.password ? errors.password[0] : ''"
        inputId="password"
      />
      <div class="mt-4">
        <SubmitButton button-text="Register" :disabled="loading" />
        <AuthViewsLink
          questionText="Already have an account?"
          questionLink="/login"
          questionLinkText="Login Now"
        />
      </div>
    </form>
  </AuthFormWrapper>
</template>

<script lang="ts" setup>
import SubmitButton from '@/components/form/button/SubmitButton.vue'
import AuthFormWrapper from '@/components/form/frame/AuthFormWrapper.vue'
import InputField from '@/components/form/input/InputField.vue'
import AuthViewsLink from '@/components/form/link/AuthViewsLink.vue'
import type { User } from '@/domain/User'
import { RunValidation } from '@/hooks/joiValidator'
import { useForm } from '@/hooks/useForm'
import { useMutation } from '@/hooks/useMutation'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/useAuth'
import { REGISTER_VALIDATION, type RegisterPayload } from '@/domain/payloads/RegisterPayload'
import { REGISTER_URL } from '@/config'
import { toast } from 'vue3-toastify'

const { values, errors, handleChange } = useForm<RegisterPayload['user']>(
  {
    username: '',
    email: '',
    password: ''
  },
  (value) => RunValidation(REGISTER_VALIDATION, value)
)
const { setUser } = useAuth()
const router = useRouter()
const { mutate, data, error, loading } = useMutation<User, RegisterPayload>({
  url: REGISTER_URL,
  method: 'POST'
})

const handleSubmit = async () => {
  try {
    await mutate({
      user: {
        ...values.value
      }
    })
    if (data.value === null || error.value !== null) {
      toast.error(error.value!.message)
      return
    }
    toast.success('welcome')
    setUser(data.value, true)
    router.push({ name: 'dashboard' })
  } catch (err) {
    console.error('Registration failed:', err)
  }
}
</script>

