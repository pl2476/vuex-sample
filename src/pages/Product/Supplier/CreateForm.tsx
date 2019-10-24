import { Form, Input, Modal, Row, Col, Transfer } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

import style from './style.less';
import { FormValueType } from './UpdateForm';
import { ProductList } from '@/pages/Product/Supplier/data';
// import { TransferItem } from 'antd/lib/transfer';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  product: ProductList;
  selectedKeys: string[];
  targetKeys: string[];
  modalVisible: boolean;
  handleAdd: (fieldsValue: FormValueType) => void;
  handleModalVisible: () => void;
  handleProductChange: () => void;
  handleProductSelectChange: () => void;
  handleProductSearch: (direction: 'left' | 'right', value: string) => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const {
    handleAdd,
    handleModalVisible,
    handleProductSearch,
    handleProductChange,
    handleProductSelectChange,
    modalVisible,
    form,
    product,
    selectedKeys,
    targetKeys,
  } = props;
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
              {form.getFieldDecorator('name', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Contact Name">
              {form.getFieldDecorator('contactName', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Contact Email">
              {form.getFieldDecorator('contactEmail', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Contact Tel.">
              {form.getFieldDecorator('contactTel', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={24} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Product">
              {form.getFieldDecorator('supplierProduct', {
                rules: [{ required: true, message: 'required' }],
              })(
                <Transfer
                  className={style['create-form-transfer']}
                  rowKey={record => record.id}
                  dataSource={product}
                  selectedKeys={selectedKeys}
                  targetKeys={targetKeys}
                  showSearch
                  onChange={handleProductChange}
                  onSelectChange={handleProductSelectChange}
                  onSearch={handleProductSearch}
                  render={item => item.treatmentName}
                />,
              )}
            </FormItem>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
