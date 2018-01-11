import { action, extendObservable } from 'mobx'
import productsDataStore from './ProductsDataStore'
import { Moltin } from '../lib'

export class CheckoutStateStore {
  // Various functions
  updateCurrentStep: Function
  doPayment: Function

  // Form onChange handlers
  onEmailChange: Function
  onFirstnameChange: Function
  onLastnameChange: Function
  onAddressChange: Function
  onCountyChange: Function
  onPostcodeChange: Function
  onCardNumberChange: Function
  onCardMonthChange: Function
  onCardYearChange: Function
  onCVVChange: Function

  emailValue: string
  emailValid: boolean

  firstnameValue: string
  firstnameValid: boolean

  lastnameValue: string
  lastnameValid: boolean

  addressValue: string
  addressValid: boolean

  countyValue: string
  countyValid: boolean

  postcodeValue: string
  postcodeValid: boolean

  cardNumberValue: string
  cardNumberValid: boolean

  cardMonthValue: string
  cardMonthValid: boolean

  cardYearValue: string
  cardYearValid: boolean

  cvvValue: string
  cvvValid: boolean

  // Various
  currentStep: 'customer' | 'payment' | 'completed'
  paymentError: Error
  orderId: string

  // Computed
  customerFormValid: boolean
  paymentFormValid: boolean
  isVisaCard: boolean
  isMasterCard: boolean

  constructor() {
    extendObservable(this, {
      emailValue: '',
      emailValid: false,

      firstnameValue: '',
      firstnameValid: false,

      lastnameValue: '',
      lastnameValid: false,

      addressValue: '',
      addressValid: false,

      countyValue: '',
      countyValid: false,

      postcodeValue: '',
      postcodeValid: false,

      cardNumberValue: '',
      cardNumberValid: false,

      cardMonthValue: '',
      cardMonthValid: false,

      cardYearValue: '',
      cardYearValid: false,

      cvvValue: '',
      cvvValid: false,

      termsAccepted: false,
      currentStep: 'customer',
      paymentStatus: '',
      orderId: '',

      get customerFormValid() {
        return (
          this.emailValid &&
          this.firstnameValid &&
          this.lastnameValid &&
          this.addressValid &&
          this.countyValid &&
          this.postcodeValid
        )
      },

      get paymentFormValid() {
        return this.cardNumberValid && this.cardMonthValid && this.cardYearValid && this.cvvValid
      },

      get isVisaCard() {
        return new RegExp(/^4\d{12}(?:\d{3})?$/).exec(this.cardNumberValue)
      },

      get isMasterCard() {
        return new RegExp(/^5[1-5]\d{14}$/).exec(this.cardNumberValue)
      },

      onEmailChange: action((value, valid) => {
        this.emailValue = value
        this.emailValid = valid
      }),

      onFirstnameChange: action((value, valid) => {
        this.firstnameValue = value
        this.firstnameValid = valid
      }),

      onLastnameChange: action((value, valid) => {
        this.lastnameValue = value
        this.lastnameValid = valid
      }),

      onAddressChange: action((value, valid) => {
        this.addressValue = value
        this.addressValid = valid
      }),

      onCountyChange: action((value, valid) => {
        this.countyValue = value
        this.countyValid = valid
      }),

      onPostcodeChange: action((value, valid) => {
        this.postcodeValue = value
        this.postcodeValid = valid
      }),

      onCardNumberChange: action((value, valid) => {
        this.cardNumberValue = value.trim()
        this.cardNumberValid = valid
      }),

      onCardMonthChange: action((value, valid) => {
        this.cardMonthValue = value
        this.cardMonthValid = valid
      }),

      onCardYearChange: action((value, valid) => {
        this.cardYearValue = value
        this.cardYearValid = valid
      }),

      onCVVChange: action((value, valid) => {
        this.cvvValue = value
        this.cvvValid = valid
      }),

      updateCurrentStep: action(newCurrentStep => {
        this.currentStep = newCurrentStep
      }),

      doPayment: action(async () => {
        const address = {
          first_name: this.firstnameValue,
          last_name: this.lastnameValue,
          line_1: this.addressValue,
          county: this.countyValue,
          postcode: this.postcodeValue,
          country: 'NO'
        }

        const customer = {
          email: this.emailValue,
          name: `${this.firstnameValue} ${this.lastnameValue}`
        }

        const payment = {
          gateway: 'braintree',
          method: 'purchase',
          first_name: this.firstnameValue,
          last_name: this.lastnameValue,
          number: this.cardNumberValue,
          month: this.cardMonthValue,
          year: this.cardYearValue,
          verification_value: this.cvvValue
        }

        try {
          productsDataStore.setLoading(true)

          if (!this.orderId) {
            // Add shipping cost
            if (productsDataStore.cartTotal < 15000) {
              await Moltin.Cart().AddCustomItem({
                name: 'Frakt',
                sku: 'frakt',
                quantity: 1,
                price: {
                  amount: 2900
                }
              })
            }

            const order = await Moltin.Cart().Checkout(customer, address)
            this.orderId = order.data.id
          }

          await Moltin.Orders.Payment(this.orderId, payment)

          this.currentStep = 'completed'
          this.orderId = ''
          productsDataStore.setLoading(false)
        } catch (error) {
          this.paymentError = error
          productsDataStore.setLoading(false)
        }
      })
    })
  }
}

const singleton = new CheckoutStateStore()
export default singleton
