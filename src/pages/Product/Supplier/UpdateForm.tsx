import { Form, Input, Modal, Select, Row, Col, Transfer } from 'antd';
import React, { PureComponent } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { TableListItem, ProductList } from '@/pages/Product/Supplier/data';
import style from './style.less';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
}

export interface UpdateFormProps extends FormComponentProps {
  handleUpdateModalVisible: (flag?: boolean, formVals?: FormValueType) => void;
  handleUpdate: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
  product: ProductList;
  selectedKeys: string[];
  targetKeys: string[];
  handleProductChange: () => void;
  handleProductSelectChange: () => void;
  handleProductSearch: (direction: 'left' | 'right', value: string) => void;
}
const FormItem = Form.Item;
const { Option } = Select;

class UpdateForm extends PureComponent<UpdateFormProps, {}> {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  constructor(props: UpdateFormProps) {
    super(props);
    this.state = {};
  }

  okHandle = () => {
    const { handleUpdate, form, values } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      const temp = fieldsValue;
      temp.id = values.id;
      handleUpdate(temp);
    });
  };

  render() {
    const {
      updateModalVisible,
      handleUpdateModalVisible,
      values,
      form,
      product,
      selectedKeys,
      targetKeys,
      handleProductChange,
      handleProductSelectChange,
      handleProductSearch,
    } = this.props;

    return (
      <Modal
        destroyOnClose
        title="Category Edit"
        width="888px"
        visible={updateModalVisible}
        afterClose={() => handleUpdateModalVisible()}
        okText="Submit"
        onOk={this.okHandle}
        onCancel={() => handleUpdateModalVisible(false, values)}
      >
        <div className={style['create-form']}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Name">
                {form.getFieldDecorator('name', {
                  initialValue: values.name,
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Contact Name">
                {form.getFieldDecorator('contactName', {
                  initialValue: values.contactName,
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Contact Email">
                {form.getFieldDecorator('contactEmail', {
                  initialValue: String(values.contactEmail),
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Contact Tel.">
                {form.getFieldDecorator('contactTel', {
                  initialValue: String(values.contactTel),
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Active">
                {form.getFieldDecorator('status', {
                  initialValue: String(values.status),
                  rules: [{ required: true, message: 'required' }],
                })(
                  <Select placeholder="Please select">
                    <Option value="true">Active</Option>
                    <Option value="false">Inactive</Option>
                  </Select>,
                )}
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
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
