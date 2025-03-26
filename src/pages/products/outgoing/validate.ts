const required = { required: true, message: 'Талаа сөзсүз түрдө толтурулушу керек' }
const numberOnly = { pattern: /^\d+$/, message: 'Сан гана жазыңыз' }
const documentNumberRule = { pattern: /^\d{8,}$/, message: 'Минималдуу 8 сан жазыңыз' }

export const InputRules = {
  Number: [required, numberOnly],
  DocumentNumber: [required, documentNumberRule, numberOnly],
  Field: [required],
}
