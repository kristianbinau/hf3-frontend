<template>
  <div class="min-h-screen flex flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
    <div class="flex flex-col top-0 left-0 w-64 bg-white border-r">
      <div class="flex items-center justify-center h-14 border-b">
        <div>HF3 Frontend</div>
      </div>
      <div class="overflow-y-auto overflow-x-hidden flex-grow">
        <ul class="flex flex-col py-4 space-y-1">

          <template v-if="user !== null">
            <li class="px-5">
              <div class="flex flex-row items-center h-8">
                <div class="text-sm font-light tracking-wide text-gray-500">Addresses</div>
              </div>
            </li>
            <li>
              <NuxtLink to="/addresses"
                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span class="ml-2 text-sm tracking-wide truncate">Addresses</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cities"
                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span class="ml-2 text-sm tracking-wide truncate">Cities</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/countries"
                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span class="ml-2 text-sm tracking-wide truncate">Countries</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/sub-regions"
                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span class="ml-2 text-sm tracking-wide truncate">Sub Regions</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/regions"
                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span class="ml-2 text-sm tracking-wide truncate">Regions</span>
              </NuxtLink>
            </li>
            <li class="px-5">
              <div class="flex flex-row items-center h-8">
                <div class="text-sm font-light tracking-wide text-gray-500">Customers</div>
              </div>
            </li>
            <li>
              <NuxtLink to="/customers"
                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span class="ml-2 text-sm tracking-wide truncate">Customers</span>
              </NuxtLink>
            </li>
          </template>

          <li class="px-5">
            <div class="flex flex-row items-center h-8">
              <div class="text-sm font-light tracking-wide text-gray-500">Settings</div>
            </div>
          </li>
          <li v-if="user === null">
            <NuxtLink to="/login"
                      class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span class="ml-2 text-sm tracking-wide truncate">Login</span>
            </NuxtLink>
          </li>
          <li v-if="user !== null">
            <NuxtLink to="/logout"
                      class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span class="ml-2 text-sm tracking-wide truncate">Logout</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-grow bg-gray-100">
      <slot></slot>
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
