import { Form, Input, Modal, Select, Row, Col } from 'antd';
import React, { PureComponent } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { TableListItem } from '@/pages/Product/Brand/data';
import style from './style.less';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
}

export interface UpdateFormProps extends FormComponentProps {
  handleUpdateModalVisible: (flag?: boolean, formVals?: FormValueType) => void;
  handleUpdate: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Option } = Select;

// export interface UpdateFormState {}

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
    const { updateModalVisible, handleUpdateModalVisible, values, form } = this.props;

    return (
      <Modal
        destroyOnClose
        title="Brand Edit"
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
                {form.getFieldDecorator('brandName', {
                  initialValue: values.brandName,
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="For Cash Package">
                {form.getFieldDecorator('forCashPackage', {
                  initialValue: String(values.forCashPackage),
                  rules: [{ required: true, message: 'required' }],
                })(
                  <Select placeholder="Please select">
                    <Option value="true">Yes</Option>
                    <Option value="false">No</Option>
                  </Select>,
                )}
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
        </div>
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
