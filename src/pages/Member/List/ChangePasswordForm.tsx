import { Form, Input, Modal, Row, Col, Checkbox } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { useState } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import style from './style.less';
import { FormValueType } from './UpdateForm';

const FormItem = Form.Item;
const { Password } = Input;

interface ChangePasswordFormProps extends FormComponentProps {
  userId: string | undefined;
  changePasswordModalVisible: boolean;
  handleChangePassword: (fieldsValue: FormValueType) => void;
  handleChangePasswordModalVisible: () => void;
}
const ChangePasswordForm: React.FC<ChangePasswordFormProps> = props => {
  const {
    changePasswordModalVisible,
    form,
    userId,
    handleChangePassword,
    handleChangePasswordModalVisible,
  } = props;
  const [isSendEmail, setIsSendEmail] = useState(false);
  const isSendEmailChange = (e: CheckboxChangeEvent) => {
    if (e.target) {
      const { checked } = e.target;
      setIsSendEmail(checked);
    }
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleChangePassword({
        ...fieldsValue,
        userId,
      });
    });
  };
  return (
    <Modal
      destroyOnClose
      title="Change Password"
      width="888px"
      visible={changePasswordModalVisible}
      onOk={okHandle}
      okText="Submit"
      onCancel={() => handleChangePasswordModalVisible()}
    >
      <div className={style['create-form']}>
        <Checkbox checked={isSendEmail} onChange={isSendEmailChange}>
          Send password by Email
        </Checkbox>
        <div style={{ marginTop: '20px' }} />
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="New Password">
              {form.getFieldDecorator('newPassword', {
                rules: [{ required: true, message: 'required' }],
              })(<Password placeholder="Please enter" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Old Password">
              {form.getFieldDecorator('oldPassword', {
                rules: [{ required: true, message: 'required' }],
              })(<Password placeholder="Please enter" />)}
            </FormItem>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default Form.create<ChangePasswordFormProps>()(ChangePasswordForm);
