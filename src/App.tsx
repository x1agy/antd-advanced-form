import { useState } from 'react';
import { Button, Checkbox, Flex, Form } from 'antd';

import { SubmitButton } from './components/UI';
import {
  ConfirmPasswordField,
  ContactFields,
  LoginField,
  PasswordField,
  RealAddressFields,
} from './components';

import styles from './App.module.scss';

function App() {
  const [form] = Form.useForm();
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);

  const onSubmit = (values: unknown) => {
    console.log(values);
  };

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      className={styles.form}
      layout="vertical"
      initialValues={{ contact: [{}] }}
    >
      <Flex vertical align="center" className={styles.form_contentWrapper}>
        <LoginField />
        <PasswordField />
        <ConfirmPasswordField form={form} />
        <RealAddressFields />
        <ContactFields form={form} />

        <Form.Item
          layout="horizontal"
          valuePropName="checked"
          name="confirm_policy"
          label="Я соглашаюсь с политикой конфиденциальности сайта"
        >
          <Checkbox onChange={(e) => setIsPolicyAccepted(e.target.checked)} />
        </Form.Item>
        <Button.Group>
          <Button onClick={() => form.resetFields()}>Сбросить</Button>
          <SubmitButton fullWidth disabled={!isPolicyAccepted} />
        </Button.Group>
      </Flex>
    </Form>
  );
}

export default App;
