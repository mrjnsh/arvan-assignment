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
      class="needs-validation d-grid gap-3"
    >
      <InputField
        v-model="email"
        typeOfInput="email"
        label="Email"
        errorText="Required Field"
        inputId="email"
      />
      <InputField
        v-model="password"
        typeOfInput="password"
        label="Password"
        errorText="Required Field"
        inputId="password"
      />
      <div class="mt-4">
        <SubmitButton button-text="Login" />
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
import SubmitButton from '@/components/form/Button/SubmitButton.vue'
import InputField from '@/components/form/Input/InputField.vue'
import AuthViewsLink from '@/components/form/Link/AuthViewsLink.vue'
import AuthFormWrapper from '@/components/form/frame/AuthFormWrapper.vue'
import { LOGIN_URL } from '@/config'
import type { User } from '@/domain/User'
import type { LoginPayload } from '@/domain/payloads/LoginPayload'
import { useMutation } from '@/hooks/useMutation'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginForm',
  components: {
    InputField,
    SubmitButton,
    AuthFormWrapper,
    AuthViewsLink
  },
  setup() {
    const email = ref('')
    const password = ref('')

    const { mutate } = useMutation<User, LoginPayload>({
      url: LOGIN_URL,
      method: 'POST',
    })

    const handleSubmit = async () => {
      if (email.value && password.value) {
        try {
          await mutate({
            user: {
              email: email.value,
              password: password.value
            }
          })
        } catch (err) {
          console.error('Login failed:', err)
        }
      }
    }

    return {
      email,
      password,
      handleSubmit
    }
  }
})
</script>

<style scoped>
.title {
  padding: 37px 0;
}
</style>
