import { FC, SyntheticEvent } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Divider, Flex, Modal as AntdModal, ModalProps as AntdModalProps, Typography } from 'antd';

interface ModalProps extends AntdModalProps {
  showCancelButton?: boolean;
  showCloseIcon?: boolean;
  showSubmitButton?: boolean;
  title?: string;
}

export const Modal: FC<ModalProps> = ({
  showCancelButton,
  showCloseIcon,
  showSubmitButton,
  title,
  children,
  onClose,
  ...props
}) => {
  const handleClose = (e: SyntheticEvent<Element, Event>) => {
    onClose?.(e);
  };
  return (
    <AntdModal
      {...props}
      cancelText="Закрыть"
      closeIcon={(showCloseIcon ?? true) && <CloseOutlined />}
      onClose={handleClose}
      cancelButtonProps={{ style: { display: showCancelButton ?? true ? 'unset' : 'none' } }}
      okButtonProps={{ style: { display: showSubmitButton ?? true ? 'unset' : 'none' } }}
      okText="Отправить"
      onCancel={handleClose}
    >
      <Flex justify="center">
        <Typography>{title}</Typography>
      </Flex>
      <Divider />
      {children}
    </AntdModal>
  );
};
