import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    message: ''
  }),
  actions: {
    setMessage(msg: string) {
      this.message = msg
    },
    clearMessage() {
      this.message = ''
    }
  }
})
