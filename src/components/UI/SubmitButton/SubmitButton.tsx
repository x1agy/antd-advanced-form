import { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface SubmitButtonProps {
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ fullWidth, loading, disabled }) => {
  return (
    <Button
      htmlType="submit"
      style={{ width: fullWidth ? '100%' : 'unset' }}
      disabled={loading || disabled}
    >
      {loading ? <LoadingOutlined /> : 'Отправить'}
    </Button>
  );
};
