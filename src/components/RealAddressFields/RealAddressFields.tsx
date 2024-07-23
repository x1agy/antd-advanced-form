import { Flex, Form, Input } from 'antd';

import { buildNumberValidation, cityValidation, streetValidation } from '@/constants';

import { CountryList } from './components';

export const RealAddressFields = () => {
  return (
    <Flex vertical gap={8}>
      <CountryList />
      <Form.Item name={['realAddress', 'city']} label="Город" rules={cityValidation}>
        <Input />
      </Form.Item>
      <Form.Item name={['realAddress', 'street']} label="Улица" rules={streetValidation}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['realAddress', 'build_number']}
        label="Номер дома"
        rules={buildNumberValidation}
      >
        <Input />
      </Form.Item>
    </Flex>
  );
};
