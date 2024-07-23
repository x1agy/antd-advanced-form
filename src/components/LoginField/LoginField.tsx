import { Form, Input } from 'antd';

import { loginValidation } from '@/constants';

export const LoginField = () => {
  return (
    <Form.Item
      rules={[...loginValidation]}
      name="login"
      label="Логин"
      validateTrigger="onSubmit"
      validateFirst
    >
      <Input />
    </Form.Item>
  );
};
