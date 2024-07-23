import { FC } from 'react';
import { Button, Flex, Form, Input, message } from 'antd';
import { AxiosError } from 'axios';

import { countryCodeValidation, countryLabelValidation } from '@/constants';
import { useAddContactTypeMutation, useAddCountryMutation } from '@/store/api';
import { AddValue } from '@/types';

import { Modal, SubmitButton } from '../UI';

interface AddValueToBackendModalProps {
  open: boolean;
  handleClose: () => void;
  valueType: 'country' | 'contactType';
}

export const AddValueToBackendModal: FC<AddValueToBackendModalProps> = ({
  open,
  handleClose,
  valueType,
}) => {
  const [addCountry, { isLoading: countryLoading }] = useAddCountryMutation();
  const [addContactType, { isLoading: contactLoading }] = useAddContactTypeMutation();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const isLoading = countryLoading || contactLoading;

  const handleSubmit = async (values: AddValue) => {
    try {
      if (valueType === 'country') {
        await addCountry(values).unwrap();
      }
      if (valueType === 'contactType') {
        await addContactType(values).unwrap();
      }
      messageApi.open({
        type: 'success',
        content: 'Значение успешно добавлено',
      });
      handleClose();
    } catch (error) {
      const errorField = (error as AxiosError<{ field: 'userLabel' | 'code' }>).response?.data
        .field;
      form.setFields([{ name: errorField, errors: ['Значение уже существует'] }]);
    }
  };

  return (
    <Modal
      open={open}
      onClose={(e) => {
        e.preventDefault();
        handleClose();
      }}
      title={`Добавить ${valueType === 'country' ? 'страну' : 'тип контакта'}`}
      showCancelButton={false}
      showSubmitButton={false}
    >
      {contextHolder}
      <Form onFinish={handleSubmit} layout="vertical" form={form}>
        <Form.Item name="code" label="Код" rules={countryCodeValidation}>
          <Input />
        </Form.Item>
        <Form.Item name="userLabel" label="Название" rules={countryLabelValidation}>
          <Input />
        </Form.Item>
        <Flex justify="center" gap={16}>
          <Button onClick={handleClose}>Закрыть</Button>
          <SubmitButton loading={isLoading} />
        </Flex>
      </Form>
    </Modal>
  );
};
