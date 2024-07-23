import { Form, Input } from 'antd/es';

import { passwordValidation } from '@/constants';

export const PasswordField = () => {
  return (
    <Form.Item
      rules={[...passwordValidation]}
      name="password"
      label="Пароль"
      validateTrigger="onChange"
      required
    >
      <Input.Password autoComplete="true" />
    </Form.Item>
  );
};
