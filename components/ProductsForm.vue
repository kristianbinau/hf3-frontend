<template>
  <div>
    <util-notifications :set-notification="notification"></util-notifications>

    <div class="px-4 py-5 bg-white sm:p-6">
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6">
          <label for="id" class="block text-sm font-medium text-gray-700">Id</label>
          <input id="id" v-model="product.id" disabled type="text" name="id" :class="{'border-red-600': errors && errors.id}" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>

        <div class="col-span-6 sm:col-span-3">
          <label for="product-type-id" class="block text-sm font-medium text-gray-700">Product Type Id</label>
          <select id="product-type-id" v-model="product.product_type_id" name="product-type-id" :class="{'border-red-600': errors && errors.product_type_id }" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option v-for='productType in productTypes' :key='productType.id' :value='productType.id'>{{ productType.name }}</option>
          </select>
        </div>

        <div class="col-span-6 sm:col-span-3">
          <label for="manufacturer-id" class="block text-sm font-medium text-gray-700">Manufacturer Id</label>
          <select id="manufacturer-id" v-model="product.manufacturer_id" name="manufacturer-id" :class="{'border-red-600': errors && errors.manufacturer_id }" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option v-for='manufacturer in manufacturers' :key='manufacturer.id' :value='manufacturer.id'>{{ manufacturer.name }}</option>
          </select>
        </div>

        <div class="col-span-6">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input id="name" v-model="product.name" type="text" name="name" :class="{'border-red-600': errors && errors.name}" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>

        <div class="col-span-6">
          <label class="block text-sm font-medium text-gray-700">
            Description
          </label>
          <div class="mt-1">
            <textarea id="description" v-model="product.description"  name="description" rows="3" :class="{'border-red-600': errors && errors.description}" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="you@example.com"></textarea>
          </div>
        </div>

        <div class="col-span-6">
          <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
          <input id="price" v-model="product.price" type="text" name="price" :class="{'border-red-600': errors && errors.price}" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>

        <div class="col-span-6 sm:col-span-3">
          <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
          <select id="status" v-model="product.status" name="status" :class="{'border-red-600': errors && errors.status }" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>IN PRODUCTION</option>
            <option>DISCONTINUED</option>
          </select>
        </div>

        <div class="col-span-6">
          <label for="created_at" class="block text-sm font-medium text-gray-700">Created At</label>
          <input id="created_at" v-model="product.created_at" disabled type="text" :class="{'border-red-600': errors && errors.created_at}" name="created_at" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>

        <div class="col-span-6">
          <label for="updated_at" class="block text-sm font-medium text-gray-700">Updated At</label>
          <input id="updated_at" v-model="product.updated_at" disabled type="text" :class="{'border-red-600': errors && errors.updated_at}" name="updated_at" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
      </div>
    </div>
    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
      <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit" @click="save">
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productObject: {
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
      product: {
        id: '',
        product_type_id: '',
        manufacturer_id : '',
        name: '',
        description: '',
        price: '',
        status: '',
        updated_at: '',
        created_at: '',
      },
      manufacturers: [],
      productTypes: [],
      url: this.route !== undefined ? this.route : `/api/${'api/products'}`,
      notification: null,
      errors: null,
    }
  },

  created() {
    if (!(this.productObject && Object.keys(this.productObject).length === 0 && this.productObject.constructor === Object)) {
      this.product = JSON.parse(JSON.stringify(this.productObject));
    }

    this.getManufacturers();
    this.getProductTypes();
  },

  methods: {
    save() {
      this.errors = null; // Reset Errors

      if (this.productObject && Object.keys(this.productObject).length === 0 && this.productObject.constructor === Object) {
        // Create
        this.create();
      } else {
        // Update
        this.update();
      }
    },

    create() {
      const vm = this;
      this.$axios.post(this.url, {
        'product_type_id': this.product.product_type_id,
        'manufacturer_id': this.product.manufacturer_id,
        'name': this.product.name,
        'description': this.product.description,
        'price': this.product.price,
        'status': this.product.status,
      })
        .then(res => {
          if (res.status === 200) {
            this.product.id = res.data.id;
            this.product.updated_at = res.data.updated_at;
            this.product.created_at = res.data.created_at;

            this.notification = {
              short: 'Success!',
              long: 'Product was created successfully',
              type: 'message',
            }
            return;
          }

          this.handleError(res);
        })
        .catch(function (error) {
          vm.handleError(error.response);
        })
    },

    update() {
      if (JSON.stringify(this.product) === JSON.stringify(this.productObject)) {
        this.notification = {
          short: 'Alright!',
          long: 'Nothing to update...',
          type: 'message',
        }
        return;
      }

      const vm = this;
      const data = {
        'product_type_id': this.product.product_type_id,
        'manufacturer_id': this.product.manufacturer_id,
        'name': this.product.name,
        'description': this.product.description,
        'price': this.product.price,
        'status': this.product.status,
      };

      this.$axios.patch(this.url + '/' + this.productObject.id, data)
        .then(res => {
          if (res.status === 200) {
            this.product.updated_at = res.data.updated_at;

            this.notification = {
              short: 'Success!',
              long: 'Product was updated successfully',
              type: 'message',
            }
            return;
          }

          this.handleError(res);
        })
        .catch(function (error) {
          vm.handleError(error.response);
        })
    },

    async handleError(errorResponse) {
      if (errorResponse.data.errors) {
        this.errors = errorResponse.data.errors;
        for await (const [key, value] of Object.entries(this.errors)) {
          this.notification = {
            short: 'Error!',
            long: value[0],
            type: 'error',
            timeout: 10000,
            key,
          }
        }
      }

      // eslint-disable-next-line no-console
      console.error('Failed', errorResponse);
    },

    getManufacturers() {
      this.$axios.get(`/api/${'api/manufacturers?page=1'}`)
        .then(res => {
          if (res.status === 200) {
            this.manufacturers = this.manufacturers.concat(res.data.data);
          }
        })

      this.$axios.get(`/api/${'api/manufacturers?page=2'}`)
        .then(res => {
          if (res.status === 200) {
            this.manufacturers = this.manufacturers.concat(res.data.data);
          }
        })
    },

    getProductTypes() {
      this.$axios.get(`/api/${'api/product-types'}`)
        .then(res => {
          if (res.status === 200) {
            this.productTypes = res.data.data;
          }
        })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
