import { FC, useCallback, useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Form, FormInstance, FormListOperation, Input, Select } from 'antd';

import { Fallback } from '@/components/UI';
import { useGetContactTypeListQuery } from '@/store/api';

import styles from './ContactRowField.module.scss';

interface ContactRowFieldProps {
  field: {
    key: number;
    name: number;
  };
  utils: FormListOperation;
  index: number;
  fieldsCount: number;
  form: FormInstance<any>;
}

export const ContactRowField: FC<ContactRowFieldProps> = ({
  field,
  utils,
  index,
  fieldsCount,
  form,
}) => {
  const { data: contactTypeList, isFetching, isError } = useGetContactTypeListQuery();
  const [filteredOptions, setFilteredOptions] = useState(contactTypeList);
  const { remove, move } = utils;

  const dropdownRender = useCallback(
    (originNode: React.ReactElement) => {
      if (isError || isFetching) {
        return <Fallback error={isError} loading={isFetching} />;
      }
      return originNode;
    },
    [isError, isFetching],
  );

  useEffect(() => {
    type SelectedValues = ({ contact_type: string; contact_value: string } | undefined)[];
    const selectedValues = form.getFieldValue('contacts') as SelectedValues;

    const selectedValuesCount = selectedValues.reduce(
      (acc, item) => {
        if (item?.contact_type) {
          return {
            ...acc,
            [item.contact_type]: acc?.[item.contact_type] ? acc[item.contact_type] + 1 : 1,
          };
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    setFilteredOptions(
      contactTypeList?.map((option) => ({
        ...option,
        disabled: selectedValuesCount?.[option.value] > 1,
      })),
    );
  }, [contactTypeList, form]);

  return (
    <Flex gap={24} align="center">
      <Form.Item label="Тип" name={[field.name, 'contact_type']}>
        <Select
          className={styles.select}
          options={filteredOptions}
          loading={isFetching}
          dropdownRender={dropdownRender}
        />
      </Form.Item>
      <Form.Item label="Контакт" name={[field.name, 'contact_value']}>
        <Input />
      </Form.Item>
      <Button.Group className={styles.buttonGroup}>
        <Button onClick={() => remove(index)}>
          <CloseCircleOutlined />
        </Button>
        <Button onClick={() => move(index, index - 1)} disabled={index === 0}>
          <ArrowUpOutlined />
        </Button>
        <Button onClick={() => move(index, index + 1)} disabled={index === fieldsCount - 1}>
          <ArrowDownOutlined />
        </Button>
      </Button.Group>
    </Flex>
  );
};
