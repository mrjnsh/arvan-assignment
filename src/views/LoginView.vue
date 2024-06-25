<template>
  <AuthFormWrapper>
    <div class="text-center">
      <h1 class="Text-Style-4 title">LOGIN</h1>
    </div>
    <form
      ref="form"
      id="auth-form"
      @submit.prevent="handleSubmit"
      novalidate
      class="needs-validation d-grid gap-4"
    >
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
      <div>
        <SubmitButton button-text="Login" class="my-3" />
        <AuthViewsLink
          questionText="Don’t have an account?"
          questionLink="/register"
          questionLinkText="Register Now"
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
import { LOGIN_URL } from '@/config'
import type { User } from '@/domain/User'
import { VALIDATION, type LoginPayload } from '@/domain/payloads/LoginPayload'
import { RunValidation } from '@/hooks/joiValidator'
import { useForm } from '@/hooks/useForm'
import { useMutation } from '@/hooks/useMutation'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginForm',
  components: {
    InputField,
    SubmitButton,
    AuthFormWrapper,
    AuthViewsLink,
  },
  setup() {
    const { values, errors, handleChange } = useForm<LoginPayload['user']>(
      {
        email: '',
        password: ''
      },
      (value) => RunValidation(VALIDATION, value)
    )

    const { mutate } = useMutation<User, LoginPayload>({
      url: LOGIN_URL,
      method: 'POST'
    })

    const handleSubmit = async () => {
      try {
        await mutate({
          user: {
            ...values.value
          }
          
        })
        console.log(errors.value.password,"ojmsl;");
      } catch (err) {
        console.error('Login failed:', err)
      }
    }

    return {
      handleSubmit,
      values,
      handleChange,
      errors
    }
  }
})
</script>

<style scoped>
.title {
  padding: 37px 0;
}
</style>
