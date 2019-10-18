import { Form, Input, Modal, Row, Col, Select } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

import style from './style.less';
import { FormValueType } from './UpdateForm';

const FormItem = Form.Item;
const { Option } = Select;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: FormValueType) => void;
  handleModalVisible: () => void;
}
const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="Brand Add"
      width="888px"
      visible={modalVisible}
      onOk={okHandle}
      okText="Submit"
      onCancel={() => handleModalVisible()}
    >
      <div className={style['create-form']}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Name">
              {form.getFieldDecorator('brandName', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="For Cash Package">
              {form.getFieldDecorator('forCashPackage', {
                rules: [{ required: true, message: 'required' }],
                initialValue: 'true',
              })(
                <Select placeholder="Please select">
                  <Option value="true">Yes</Option>
                  <Option value="false">No</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
