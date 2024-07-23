import { useCallback, useState } from 'react';
import { Button, Flex, Form, Select } from 'antd';

import { AddValueToBackendModal } from '@/components';
import { Fallback } from '@/components/UI';
import { countryValidation } from '@/constants';
import { useGetCountryListQuery } from '@/store/api';

export const CountryList = () => {
  const { data: countries, isFetching, isError } = useGetCountryListQuery();
  const [isAddCountryOpen, setIsCountryOpen] = useState(false);

  const handleCountryModalClose = () => setIsCountryOpen(false);
  const handleCountryModalOpen = () => setIsCountryOpen(true);

  const dropdownRender = useCallback(
    (originNode: React.ReactElement) => {
      if (isError || isFetching) {
        return <Fallback error={isError} loading={isFetching} />;
      }
      return originNode;
    },
    [isError, isFetching],
  );

  return (
    <Flex vertical gap={8} justify="end">
      <Form.Item name={['realAddress', 'country']} label="Страна" rules={countryValidation}>
        <Select options={countries} loading={isFetching} dropdownRender={dropdownRender}></Select>
      </Form.Item>
      <Button onClick={handleCountryModalOpen}>Добавить страну</Button>
      <AddValueToBackendModal
        open={isAddCountryOpen}
        handleClose={handleCountryModalClose}
        valueType="country"
      />
    </Flex>
  );
};
