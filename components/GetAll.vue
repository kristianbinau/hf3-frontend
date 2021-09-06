<template>
  <div class='m-20'>
    <div v-if='!$fetchState.pending' class='flex flex-col'>
      <div class='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div class='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <button type='button'
                  class='inline-flex items-center px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  @click="$router.push('/' + name + '/create')">
            <svg class='-ml-1 mr-2 h-5 w-5 text-gray-500' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'
                 fill='currentColor' aria-hidden='true'>
              <path
                d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
            </svg>
            Create
          </button>
          <div class='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table class='min-w-full divide-y divide-gray-200'>
              <thead class='bg-gray-50'>
              <tr>
                <th v-for='(item, index) of filteredData[0]' :key='index'
                    scope='col' class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {{ index }}
                </th>
                <th scope='col' class='edit-button relative px-6 py-3'>
                  <span class='sr-only'>Edit</span>
                </th>
                <th scope='col' class='delete-button relative px-6 py-3'>
                  <span class='sr-only'>Delete</span>
                </th>
              </tr>
              </thead>
              <tbody class='bg-white divide-y divide-gray-200'>
              <tr v-for='row in filteredData' :key='row.id'>
                <td v-for='(item, index) of row' :key='index' class='px-6 py-4 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>{{ item }}</div>
                </td>
                <td class='edit-button px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <button type='button'
                          class='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          @click='editRow(row.id)'>
                    <svg class='-ml-1 mr-2 h-5 w-5 text-gray-500' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'
                         fill='currentColor' aria-hidden='true'>
                      <path
                        d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                    </svg>
                    Edit
                  </button>
                </td>
                <td class='delete-button px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <button type='button'
                          class='inline-flex items-center px-4 py-2 border border-red-500 rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          @click='deleteRow(row.id)'>
                    <svg class='-ml-1 mr-2 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'
                         fill='currentColor' aria-hidden='true'>
                      <path
                        d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
            <util-pagination :request="request" :page="page" @go-to-page="goToPage"></util-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: false,
      default: undefined
    }
  },

  data() {
    return {
      request: [],
      page: 1,
      url: this.route !== undefined ? this.route : `/api/${'api/' + this.name}`
    }
  },

  async fetch() {
    this.request = await fetch(this.url + '?page=' + this.page).then(res => {
      return res.json()
    })
  },

  computed: {
    filteredData() {
      const copyOfData = JSON.parse(JSON.stringify(this.request.data))
      return copyOfData.map(function(val) {
        delete val.updated_at
        delete val.created_at
        return val
      })
    }
  },

  methods: {
    editRow(id) {
      this.$router.push('/' + this.name + '/' + id);
    },

    async deleteRow(id) {
      const url = this.url + '/' + id
      await this.$axios.$delete(url).then(res => {
        this.$fetch()
        return res
      })
    },

    goToPage(page) {
      this.page = page;
      this.$fetch()
    }
  }
}
</script>

<style lang='scss' scoped>
.edit-button {
  width: 130px;
}
.delete-button {
  width: 145px;
}
</style>
