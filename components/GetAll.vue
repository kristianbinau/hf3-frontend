<template>
  <div class='m-20'>
    <div v-if='!$fetchState.pending' class='flex flex-col'>
      <div class='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div class='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
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
            <div class='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
              <div class='flex-1 flex justify-between sm:hidden'>
                <a href='#'
                   class='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
                  Previous
                </a>
                <a href='#'
                   class='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
                  Next
                </a>
              </div>
              <div class='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                <div>
                  <p class='text-sm text-gray-700'>
                    Showing
                    {{ ' ' }}
                    <span class='font-medium'>{{ request.from }}</span>
                    {{ ' ' }}
                    to
                    {{ ' ' }}
                    <span class='font-medium'>{{ request.to }}</span>
                    {{ ' ' }}
                    of
                    {{ ' ' }}
                    <span class='font-medium'>{{ request.total }}</span>
                    {{ ' ' }}
                    results
                  </p>
                </div>
                <div>
                  <nav class='relative z-0 inline-flex rounded-md shadow-sm -space-x-px' aria-label='Pagination'>
                    <a :class="{'opacity-50 cursor-not-allowed': page === 1}"
                       class='disabled:opacity-50 relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                       @click='previousPage'>
                      <span class='sr-only'>Previous</span>
                      <svg class='h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'
                           aria-hidden='true'>
                        <path fill-rule='evenodd'
                              d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                              clip-rule='evenodd' />
                      </svg>
                    </a>
                    <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                    <a v-if='page !== 1' aria-current='page'
                       class='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                       @click="specificPage(1)">
                      1
                    </a>
                    <a
                      class='z-10 bg-indigo-50 border-indigo-500 text-indigo-600 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium'>
                      {{ page }}
                    </a>
                    <a v-if='page !== request.last_page'
                       class='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                       @click="specificPage(request.last_page)">
                      {{ request.last_page }}
                    </a>
                    <button :class="{'opacity-50 cursor-not-allowed': page === request.last_page}"
                       class='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                       @click='nextPage'>
                      <span class='sr-only'>Next</span>
                      <svg class='h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'
                           aria-hidden='true'>
                        <path fill-rule='evenodd'
                              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                              clip-rule='evenodd' />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
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
    this.request = await fetch(this.url).then(res => {
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

    nextPage() {
      this.page++
      this.$fetch()
    },

    previousPage() {
      this.page--
      this.$fetch()
    },

    specificPage(num) {
      this.page = num
      this.$fetch()
    },

    async deleteRow(id) {
      const url = this.url + '/' + id
      await this.$axios.$delete(url).then(res => {
        this.$fetch()
        return res
      })
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
