const required = { required: true, message: 'Талаа сөзсүз түрдө толтурулушу керек' }
const numberOnly = { pattern: /^\d+$/, message: 'Сан гана киргизиңиз' }
const documentNumberRule = { pattern: /^\d{8,}$/, message: 'Жок дегенде 8 сан киргизиңиз' }

export const InputRules = {
  Number: [required, numberOnly],
  DocumentNumber: [required, documentNumberRule, numberOnly],
  Field: [required],
}
