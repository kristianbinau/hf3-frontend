<template>
  <div>
    <util-notifications :set-notification="notification"></util-notifications>

    <div class='px-4 py-5 bg-white sm:p-6'>
      <div class='grid grid-cols-6 gap-6'>
        <div class='col-span-6 sm:col-span-3'>
          <label for='id' class='block text-sm font-medium text-gray-700'>Id</label>
          <input id='id' v-model='address.id' disabled type='text' name='id'
                 class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' />
        </div>

        <div class='col-span-6 sm:col-span-3'>
          <label for='city-id' class='block text-sm font-medium text-gray-700'>City Id</label>
          <input id='city-id' v-model='address.city_id' type='text' name='city-id'
                 class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' />
        </div>

        <div class='col-span-6'>
          <label for='road' class='block text-sm font-medium text-gray-700'>Road</label>
          <input id='road' v-model='address.road' type='text' name='road'
                 class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' />
        </div>

        <div class='col-span-6 sm:col-span-6 lg:col-span-2'>
          <label for='road-num' class='block text-sm font-medium text-gray-700'>Road Num</label>
          <input id='road-num' v-model='address.road_num' type='text' name='road-num'
                 class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' />
        </div>

        <div class='col-span-6'>
          <label for='apartment_floor' class='block text-sm font-medium text-gray-700'>Apartment Floor</label>
          <input id='apartment_floor' v-model='address.apartment_floor' type='text' name='apartment_floor'
                 class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' />
        </div>

        <div class='col-span-6 sm:col-span-6 lg:col-span-2'>
          <label for='apartment_num' class='block text-sm font-medium text-gray-700'>Apartment Num</label>
          <input id='apartment_num' v-model='address.apartment_num' type='text' name='apartment_num'
                 class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' />
        </div>

        <div class='col-span-6'>
          <label for='created_at' class='block text-sm font-medium text-gray-700'>Created At</label>
          <input id='created_at' v-model='address.created_at' disabled type='text' name='created_at'
                 class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' />
        </div>

        <div class='col-span-6'>
          <label for='updated_at' class='block text-sm font-medium text-gray-700'>Updated At</label>
          <input id='updated_at' v-model='address.updated_at' disabled type='text' name='updated_at'
                 class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' />
        </div>
      </div>
    </div>
    <div class='px-4 py-3 bg-gray-50 text-right sm:px-6'>
      <button class='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' type='submit' @click='save'>
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addressObject: {
      type: Object,
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
      address: {
        id: '',
        city_id: '',
        road: '',
        road_num: '',
        apartment_floor: '',
        apartment_num: '',
        updated_at: '',
        created_at: ''
      },
      url: this.route !== undefined ? this.route : `/api/${'api/addresses'}`,
      notification: null,
    }
  },

  created() {
    if (!(this.addressObject && Object.keys(this.addressObject).length === 0 && this.addressObject.constructor === Object)) {
      this.address = this.addressObject
    }
  },

  methods: {
    save() {
      if (this.addressObject && Object.keys(this.addressObject).length === 0 && this.addressObject.constructor === Object) {
        // Create
        this.create()
      } else {
        // Update
        this.update()
      }
    },

    create() {
      this.$axios.post(this.url, {
        'city_id': this.address.city_id,
        'road': this.address.road,
        'road_num': this.address.road_num,
        'apartment_floor': this.address.apartment_floor,
        'apartment_num': this.address.apartment_num
      })
        .then(res => {
          if (res.status === 200) {
            this.notification = {
              short: 'Success!',
              long: 'Address was created successfully',
              type: 'message',
            }
          }
        })
    },

    update() {
      this.$axios.patch(this.url + '/' + this.addressObject.id, {
        'city_id': this.address.city_id,
        'road': this.address.road,
        'road_num': this.address.road_num,
        'apartment_floor': this.address.apartment_floor,
        'apartment_num': this.address.apartment_num
      })
        .then(res => {
          if (res.status === 200) {
            this.notification = {
              short: 'Success!',
              long: 'Address was updated successfully',
              type: 'message',
            }
          }
        })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
