<template>
  <div v-if="!$fetchState.pending">
    <div v-for="row of request.data" :key="row.id"
         class="relative bg-white shadow overflow-hidden sm:rounded-lg my-20 mx-20">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 uppercase-first">
          {{ name }}
        </h3>
        <p v-if="description !== undefined" class="mt-1 max-w-2xl text-sm text-gray-500">
          {{ description }}
        </p>
      </div>
      <div class="absolute top-0 right-0 mt-3 mr-1 flex">
        <span class="hidden sm:block mx-1">
          <button type="button"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="editRow(row.id)">
            <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor" aria-hidden="true"><path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
            Edit
          </button>
        </span>
        <span class="hidden sm:block mx-1">
          <button type="button"
                  class="inline-flex items-center px-4 py-2 border border-red-500 rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="deleteRow(row.id)">
            <svg class="-ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor" aria-hidden="true"><path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
            Delete
          </button>
        </span>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div v-for="(item, index) of row" :key="index"
               class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              {{ index }}
            </dt>
            <dd :contenteditable="row.editing == true" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ item }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <button @click="$fetch">Refresh</button>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
      default: undefined,
    },
    route: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      request: [],
      url: this.route !== undefined ? this.route : 'https://hf3.binau.dev/api/' + this.name,
    }
  },
  async fetch() {
    this.request = await fetch(`/api/${'sanctum/csrf-cookie'}`).then(res => {
      console.log(res);
      console.log(res.json());
      const de = this.$axios.$post(`/api/${'login'}`, {'email': '123@123.com', 'password': '12345678'}).then(res => {
        return de;
      });
      console.log(de)
      return res.json();
    })
  },
  computed: {
    filteredData() {
      const copyOfData = JSON.parse(JSON.stringify(this.request.data));
      return copyOfData.map(function (val) {
        delete val.updated_at;
        delete val.created_at;
        return val
      });
    },
  },
  methods: {
    editRow(id) {
      const rowIndex = this.filteredData.map(item => item.id).indexOf(id);
      this.request.data[rowIndex].editing = true;
    },
    saveRow(id) {
      const rowIndex = this.filteredData.map(item => item.id).indexOf(id);
      this.request.data[rowIndex].editing = false;
    },
    async deleteRow(id) {
      const url = this.url + '/' + id;
      await this.$axios.$delete(url).then(res => {
        this.$fetch();
        return res;
      });
    },
    methods: {
      async login() {
        const res = await this.$axios.$post('https://hf3.binau.dev/login', {'email': '123@123.com', 'password': '12345678'}).then(res => {
          return res;
        });
        console.log(res)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.uppercase-first:first-letter {
  text-transform: capitalize;
}
</style>
