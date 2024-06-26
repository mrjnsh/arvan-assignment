<template>
  <AuthFormWrapper>
    <div class="text-center">
      <h1 class="Text-Style-4 title">Register</h1>
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
        <SubmitButton button-text="Register" />
        <AuthViewsLink
          questionText="Already have an account?"
          questionLink="/login"
          questionLinkText="Login Now"
        />
      </div>
    </form>
  </AuthFormWrapper>
</template>

<script lang="ts">
import SubmitButton from '@/components/Form/Button/SubmitButton.vue'
import AuthFormWrapper from '@/components/Form/Frame/AuthFormWrapper.vue'
import InputField from '@/components/Form/Input/InputField.vue'
import AuthViewsLink from '@/components/Form/Link/AuthViewsLink.vue'
import type { User } from '@/domain/User'
import { RunValidation } from '@/hooks/joiValidator'
import { useForm } from '@/hooks/useForm'
import { useMutation } from '@/hooks/useMutation'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/useAuth'
import { REGISTER_VALIDATION, type RegisterPayload } from '@/domain/payloads/RegisterPayload'
import { REGISTER_URL } from '@/config'

export default defineComponent({
  name: 'RegisterForm',
  components: {
    InputField,
    SubmitButton,
    AuthFormWrapper,
    AuthViewsLink
  },
  setup() {
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
          return
        }
        setUser(data.value, true)
        router.push({ name: 'dashboard' })
      } catch (err) {
        console.error('Registration failed:', err)
      }
    }
    return {
      handleSubmit,
      values,
      handleChange,
      errors,
      loading
    }
  }
})
</script>

<style scoped>
.title {
  padding: 37px 0;
}
</style>
