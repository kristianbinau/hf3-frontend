<template>
  <div class='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
    <util-notifications :set-notification="notification"></util-notifications>

    <div class='max-w-md w-full space-y-8'>
      <div>
        <img class='mx-auto h-12 w-auto' src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
             alt='Workflow'>
        <h2 class='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Sign in to your account
        </h2>
      </div>
      <input type='hidden' name='remember' value='true'>
      <div class='rounded-md shadow-sm -space-y-px'>
        <div>
          <label for='email-address' class='sr-only'>Email address</label>
          <input id='email-address' v-model='email' name='email' type='email' autocomplete='email' required
                 class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                 placeholder='Email address'>
        </div>
        <div>
          <label for='password' class='sr-only'>Password</label>
          <input id='password' v-model='password' name='password' type='password' autocomplete='current-password'
                 required
                 class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                 placeholder='Password'>
        </div>
      </div>

      <div class='flex items-center justify-between'>
        <div class='flex items-center'>
          <input id='remember-me' name='remember-me' type='checkbox'
                 class='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'>
          <label for='remember-me' class='ml-2 block text-sm text-gray-900'>
            Remember me
          </label>
        </div>

        <div class='text-sm'>
          <a href='#' class='font-medium text-indigo-600 hover:text-indigo-500'>
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          class='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          @click='login'>
          <span class='absolute left-0 inset-y-0 flex items-center pl-3'>
            <svg class='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' xmlns='http://www.w3.org/2000/svg'
                 viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
              <path fill-rule='evenodd'
                    d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                    clip-rule='evenodd'/>
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      email: '',
      password: '',
      notification: null,
    }
  },

  computed: {
    user() {
      return this.$store.state.user
    }
  },

  created() {
    if (this.user !== null) {
      this.$router.push('/')
    }
  },

  methods: {
    async login() {
      if (this.user !== null) {
        await this.$router.push('/')
        return;
      }

      const vm = this;
      /* Request CSRF token */
      await this.$axios.get(`/api/${'sanctum/csrf-cookie'}`)
        .then(res => {
          /* CSRF request failed, shouldn't happen. */
          if (res.status !== 204) {
            // eslint-disable-next-line no-console
            console.error('CSRF failed', res);
            return;
          }

          /* Send login request */
          this.$axios.post(`/api/${'login'}`, {
            'email': this.email,
            'password': this.password
          }, {
            validateStatus(status) {
              return status >= 200 && status <= 302
            }
          })
            .then(res => {
              /* Login successful */
              if (res.status === 200) {
                this.$store.commit('setUser', res.data)
                this.$router.push('/')
                return;
              }

              /* Login failed */
              this.handleFailedLogin(res);
            })
            .catch(function (error) {
              /* Login failed */
              vm.handleFailedLogin(error.response);
            })
        })
    },

    handleFailedLogin(errorResponse) {
      /* Wrong input */
      if (errorResponse.status === 422) {
        this.notification = {
          short: 'Error!',
          long: 'These credentials do not match our records.',
          type: 'error',
        };
      }

      /* Login failed, shouldn't happen. */
      // eslint-disable-next-line no-console
      console.error('Login failed', errorResponse);
    }
  }
}
</script>
