import { Rule } from 'antd/es/form';

type ValidationRules = {
  [key: string]: Rule[];
};

export const requiredRule: Rule = {
  required: true,
  message: 'Поле обязательно для заполнения',
};

const getMinAndMaxRule = (rule: { min: number; max: number }): Rule[] => {
  const { min, max } = rule;

  return [
    { min: min, message: `Минимальное количество символов ${min}` },
    { max: max, message: `Максимальное количество символов ${max}` },
  ];
};

const validation: ValidationRules = {
  loginValidation: [
    requiredRule,
    ...getMinAndMaxRule({ max: 50, min: 3 }),
    {
      pattern: /^[ёЁА-яA-z0-9\-_]+$/g,
      message: 'Допустимые символы: Кириллица, Латиница, цифры и символы `-`, `_`',
    },
  ],

  passwordValidation: [
    ...getMinAndMaxRule({ max: 20, min: 9 }),
    {
      pattern: /[0-9]/,
      message: 'Пароль должен содержать хотя бы 1 цифру',
    },
    {
      pattern: /[a-z]/,
      message: 'Пароль должен содержать хотя бы 1 прописную букву',
    },
    {
      pattern: /[A-Z]/,
      message: 'Пароль должен содержать хотя бы 1 строчную букву',
    },
    {
      pattern: /[.,!"№;%:?*()_+@#$^&\- ="'/|\\{}~<>[\]]/,
      message:
        'Пароль должен содержать хотя бы один специальный символ (.,!"№;%:?*()_+@#$^&- ="\'/|{}~<>[])',
    },
    {
      validator: (_, value: string) => {
        if ((value?.length ?? '') < 1) {
          return Promise.reject('Поле обязательно для заполнения');
        }
        if (value.match(/[ёЁА-я]/)) {
          return Promise.reject('Кириллица запрещена');
        }
        return Promise.resolve('');
      },
    },
  ],

  confirmPasswordValidation: [requiredRule],

  countryValidation: [requiredRule],

  countryCodeValidation: [requiredRule],

  countryLabelValidation: [requiredRule],

  cityValidation: [
    requiredRule,
    ...getMinAndMaxRule({ min: 3, max: 100 }),
    {
      pattern: /^([ёЁА-я]+(?:.|-|\s|'))?[ёЁА-я]*$/,
      message: 'Неправильный формат города',
    },
    {
      transform(value: string) {
        return value.trim();
      },
    },
  ],

  streetValidation: [
    ...getMinAndMaxRule({ min: 3, max: 100 }),
    {
      pattern: /^([ёЁА-я]+(?:.|-|\s|'))?[ёЁА-я]*$/,
      message: 'Неправильный формат улицы',
    },
    {
      transform(value: string) {
        return value.trim();
      },
    },
  ],

  buildNumberValidation: [
    ...getMinAndMaxRule({ min: 3, max: 100 }),
    {
      pattern: /^([ёЁА-я]+(?:.|-|\s|'))?[ёЁА-я]*$/,
      message: 'Неправильный формат build number',
    },
    {
      transform(value: string) {
        return value.trim();
      },
    },
  ],
};

export const {
  loginValidation,
  passwordValidation,
  confirmPasswordValidation,
  countryValidation,
  countryCodeValidation,
  countryLabelValidation,
  cityValidation,
  streetValidation,
  buildNumberValidation,
} = validation;
