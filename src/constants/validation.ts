import { Rule } from "antd/es/form"

type ValidationRules = {
  [key: string]: Rule[]
}

const requiredRule: Rule = {
  required: true,
  message: 'Поле обязательно для заполнения'
}

const getMinAndMaxRule = (rule: {min: number, max: number}): Rule[] => {
  const {min, max} = rule;

  return [{min: min, message: `Минимальное количество символов ${min}`}, {max: max, message: `Максимальное количество символов ${max}`}]
}

const validation: ValidationRules = {
  loginValidation: [requiredRule, ...getMinAndMaxRule({max: 50, min: 3}), {pattern: /^[ёЁА-яA-z0-9-_]$/, message: 'Допустимые символы: Кириллица, Латиница, цифры и символы `-`, `_`'}]
}

export const {loginValidation} = validation;