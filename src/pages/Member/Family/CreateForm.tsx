import { Form, Input, Modal, Row, Col, Checkbox } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { useState } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import style from './style.less';
import { FormValueType } from './UpdateForm';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  memberCode: string;
  modalVisible: boolean;
  handleAdd: (fieldsValue: FormValueType) => void;
  handleModalVisible: () => void;
}
const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible, memberCode } = props;
  const [isMember, setIsMember] = useState(false);
  const isMemberChange = (e: CheckboxChangeEvent) => {
    if (e.target) {
      const { checked } = e.target;
      setIsMember(checked);
    }
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      handleAdd({
        isMember,
        familyMemberCode: memberCode,
        ...fieldsValue,
      });
    });
  };
  return (
    <Modal
      destroyOnClose
      title="Member Family Add"
      width="888px"
      visible={modalVisible}
      onOk={okHandle}
      okText="Submit"
      onCancel={() => handleModalVisible()}
    >
      <div className={style['create-form']}>
        <Checkbox checked={isMember} onChange={isMemberChange}>
          Is Member
        </Checkbox>
        <div style={{ marginTop: '18px' }}></div>
        <div style={isMember ? { display: 'block' } : { display: 'none' }}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Member Code">
                {form.getFieldDecorator('memberCode', {
                  rules: isMember ? [{ required: true, message: 'required' }] : [],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
        </div>
        <div style={!isMember ? { display: 'block' } : { display: 'none' }}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Name">
                {form.getFieldDecorator('name', {
                  rules: !isMember ? [{ required: true, message: 'required' }] : [],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Email">
                {form.getFieldDecorator('email', {
                  rules: !isMember ? [{ required: true, message: 'required' }] : [],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Contact Tel.">
                {form.getFieldDecorator('contactTel', {
                  rules: !isMember ? [{ required: true, message: 'required' }] : [],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
