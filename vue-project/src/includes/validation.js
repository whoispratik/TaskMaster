import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore'
import { db } from './firebase'
import {
  required,
  min,
  max,
  alpha_spaces as alphaspaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules'
import { useempStore } from '@/stores/emp'
export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)
    defineRule('required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaspaces)
    defineRule('email', email)
    defineRule('min_value', minValue)
    defineRule('max_value', maxValue)
    defineRule('confirmed', confirmed)
    defineRule('invalidcountry', excluded)
    defineRule('invalidpass', excluded)
    defineRule('tos', required)
    defineRule('futuredate', (value) => {
      let selectedDate = new Date(value)
      let currentDate = new Date()
      selectedDate.setHours(0, 0, 0, 0)
      currentDate.setHours(0, 0, 0, 0)
      if (selectedDate > currentDate) {
        return true
      } else {
        return 'the deadline can only be of the future'
      }
    })
    defineRule('WorkloadCheck', async (value) => {
      const empStore = useempStore()
      const EmpWorkloadObj = (await getDoc(doc(db, 'employee', value))).data().workload
      const q = query(
        collection(db, 'Task'),
        where('assignto', '==', value),
        where('priority', '==', empStore.CurrentPriority)
      )
      const Currently = await getDocs(q)
      if (Currently.size < EmpWorkloadObj[empStore.CurrentPriority]) {
        // console.log(Currently)
        return true
      } else return `The task limit for ${empStore.CurrentPriority} has been hit!!`
    })
    configure({
      generateMessage: (ctx) => {
        //we are overwriting this method
        const messages = {
          required: `the ${ctx.field} is required`,
          min: `the ${ctx.field} is too short`,
          max: `the ${ctx.field} is too long`,
          alpha_spaces: `the ${ctx.field} can only have alphabets and spaces`,
          email: `the ${ctx.field} is invalid`,
          min_value: `the ${ctx.field} is too low`,
          max_value: `the ${ctx.field} is too high `,
          confirmed: `the passwords dont match`,
          invalidcountry: 'our services arent available in this country for now',
          invalidpass: 'you cant have that as password',
          tos: 'you have to agree to terms of service',
          futuredate: 'The deadline cant be past dates'
        }
        const message = messages[ctx.rule.name] ?? `the field is  ${ctx.field} invalid`
        return message
      }
    })
  }
}
