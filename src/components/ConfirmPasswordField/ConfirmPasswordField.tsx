import { FC } from 'react';
import { Form, FormInstance, Input } from 'antd';

import { confirmPasswordValidation } from '@/constants';

interface ConfirmPasswordFieldProps {
  form: FormInstance<any>;
}

export const ConfirmPasswordField: FC<ConfirmPasswordFieldProps> = ({ form }) => {
  return (
    <Form.Item
      rules={[
        ...confirmPasswordValidation,
        {
          validator(_, value) {
            const passwordValue = form.getFieldValue('password');
            if (value !== passwordValue) {
              form.setFields([
                { name: 'password', value: passwordValue, errors: ['Пароли должны совпадать'] },
              ]);
              return Promise.reject('Пароли должны совпадать');
            }
            return Promise.resolve('');
          },
        },
      ]}
      name="confirmPassword"
      label="Подтвердите пароль"
    >
      <Input.Password autoComplete="off" />
    </Form.Item>
  );
};
