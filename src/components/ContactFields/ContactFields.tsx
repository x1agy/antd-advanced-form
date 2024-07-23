import { FC, useState } from 'react';
import { Button, Flex, Form, FormInstance } from 'antd';

import { AddValueToBackendModal } from '../AddValueToBackendModal';
import { ContactRowField } from './components';

import styles from './ContractFields.module.scss';

interface ContactFieldsProps {
  form: FormInstance<any>;
}

export const ContactFields: FC<ContactFieldsProps> = ({ form }) => {
  const [isAddValueModalOpen, setIsAddValueModalOpen] = useState(false);

  const handleOpenModal = () => setIsAddValueModalOpen(true);
  const handleCloseModal = () => setIsAddValueModalOpen(false);

  return (
    <Form.List name="contacts">
      {(fields, utils) => {
        const { add } = utils;
        return (
          <Flex vertical gap={16} className={styles.rowHolder}>
            {fields.map((field, index) => (
              <ContactRowField
                field={field}
                utils={utils}
                key={field.key}
                index={index}
                fieldsCount={fields.length}
                form={form}
              />
            ))}
            <Button.Group className={styles.buttonGroup}>
              <Button className={styles.buttonGroup_button} onClick={handleOpenModal}>
                Добавить тип контакта
              </Button>
              <Button className={styles.buttonGroup_button} onClick={() => add()}>
                Добавить строку
              </Button>
            </Button.Group>
            <AddValueToBackendModal
              handleClose={handleCloseModal}
              valueType="contactType"
              open={isAddValueModalOpen}
            />
          </Flex>
        );
      }}
    </Form.List>
  );
};
