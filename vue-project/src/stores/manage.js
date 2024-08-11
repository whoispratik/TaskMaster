import { defineStore } from 'pinia'
export const useManageStore = defineStore('manage', {
  state: () => ({ isopen: false, istaskmodelopen: false, ishovered: false }),
  actions: {
    toggle() {
      this.isopen = !this.isopen
      //console.log(this.isopen)
    },
    createtasktoggle() {
      this.istaskmodelopen = !this.istaskmodelopen
    },
    MouseOverHandler() {
      this.ishovered = !this.ishovered
      console.log('mousover event')
    },
    MouseOutHandler() {
      this.ishovered = !this.ishovered
      console.log('mousout event')
    },
    falseassigner() {
      this.isopen = false
    },
    taskfalseassigner() {
      this.istaskmodelopen = false
    }
  },
  getters: {
    hiddenClass(state) {
      return !state.isopen ? 'hidden' : ''
    },
    hiddentaskClass(state) {
      return !state.istaskmodelopen ? 'hidden' : ''
    }
  }
})
