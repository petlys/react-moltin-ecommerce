import Raven from 'raven-js'
import { action, extendObservable } from 'mobx'
import { Moltin, fetchImages } from '../lib'
import productsForPreRender from '../products.json'

export type Errors =
  | 'addProductToCartError'
  | 'updateCartItemQuantityError'
  | 'removeCartItemError'
  | 'emptyCartError'
  | ''

export class ProductsDataStore {
  fetchProducts: Function
  addProductToCart: Function
  updateCartItemQuantity: Function
  removeCartItem: Function
  emptyCart: Function
  setLoading: Function

  loading: boolean
  error: Errors
  products: Array<Object>
  cartProducts: Array<Object>
  cartTotal: number
  addToCartSuccess: boolean

  constructor() {
    extendObservable(this, {
      loading: false,
      error: '',
      products: productsForPreRender,
      cartProducts: [],
      addToCartSuccess: false,

      get cartTotal() {
        const total = this.cartProducts.reduce(
          (accumulator, cartProduct) => accumulator + cartProduct.meta.display_price.with_tax.value.amount,
          0
        )
        return total >= 15000 ? total : total + 2900
      },

      setLoading: action(loading => {
        this.loading = loading
      }),

      fetchProducts: action(async () => {
        try {
          const products = await Moltin.Products.All().then(result => result.data)
          const inventory = await Moltin.Inventories.All().then(result => result.data)
          const images = await fetchImages()

          this.products = products.map(product => {
            const imageId = product.relationships.main_image && product.relationships.main_image.data.id
            product.imageUrl = imageId ? images.find(image => image.id === imageId).link.href : ''
            product.stock = inventory.find(inventoryProduct => inventoryProduct.id === product.id).available

            return product
          })

          this.cartProducts = await Moltin.Cart()
            .Items()
            .then(result => result.data)
        } catch (error) {
          Raven.captureException(error)
        }
      }),

      addProductToCart: action(async productId => {
        try {
          this.loading = true

          await Moltin.Cart().AddProduct(productId)

          this.cartProducts = await Moltin.Cart()
            .Items()
            .then(result => result.data)

          this.loading = false
          this.addToCartSuccess = true

          setTimeout(() => {
            this.addToCartSuccess = false
          }, 1600)
        } catch (error) {
          this.loading = false
          this.error = 'addProductToCartError'
          Raven.captureException(error)
        }
      }),

      updateCartItemQuantity: action(async (id, quantity) => {
        try {
          this.loading = true

          await Moltin.Cart().UpdateItemQuantity(id, quantity)

          this.cartProducts = await Moltin.Cart()
            .Items()
            .then(result => result.data)

          this.loading = false
        } catch (error) {
          this.loading = false
          this.error = 'updateCartItemQuantityError'
          Raven.captureException(error)
        }
      }),

      removeCartItem: action(async id => {
        try {
          this.loading = true

          await Moltin.Cart().RemoveItem(id)

          this.cartProducts = await Moltin.Cart()
            .Items()
            .then(result => result.data)

          this.loading = false
        } catch (error) {
          this.loading = false
          this.error = 'removeCartItemError'
          Raven.captureException(error)
        }
      }),

      emptyCart: action(async () => {
        try {
          this.loading = true

          await Moltin.Cart().Delete()

          this.cartProducts = await Moltin.Cart()
            .Items()
            .then(result => result.data)

          this.loading = false
        } catch (error) {
          this.loading = false
          this.error = 'emptyCartError'
          Raven.captureException(error)
        }
      })
    })
  }
}

const singleton = new ProductsDataStore()
export default singleton
