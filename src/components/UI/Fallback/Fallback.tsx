import { FC } from 'react';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';

interface FallbackProps {
  loading?: boolean;
  error?: boolean;
}

export const Fallback: FC<FallbackProps> = ({ loading, error }) => {
  if (error) {
    return (
      <Flex align="center" justify="center" vertical>
        <CloseOutlined />
        <Typography>Что то пошло не так :(</Typography>
      </Flex>
    );
  }
  if (loading) {
    return (
      <Flex align="center" justify="center" vertical>
        <LoadingOutlined size={40} />
        <Typography>Грузим</Typography>
      </Flex>
    );
  }
  return null;
};
