import { Form, Input, Modal, Row, Col } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

import style from './style.less';
import { FormValueType } from './UpdateForm';

const FormItem = Form.Item;

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
      const temp = fieldsValue;
      if (fieldsValue.parentCategoryId && typeof fieldsValue.parentCategoryId === 'object') {
        temp.parentCategoryId = fieldsValue.parentCategoryId.pop();
      } else {
        temp.parentCategoryId = '';
      }
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="Category Add"
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
              {form.getFieldDecorator('categoryName', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Display Order">
              {form.getFieldDecorator('displayOrder', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Remarks">
              {form.getFieldDecorator('remarks', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
