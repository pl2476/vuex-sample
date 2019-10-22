import { Form, Input, Modal, Select, Row, Col, Cascader } from 'antd';
import React, { PureComponent } from 'react';
import { FormComponentProps } from 'antd/es/form';
// import { connect } from 'dva';
import { TableListItem } from '@/pages/Product/Category/data';
import style from './style.less';
// import { StateType } from './model';
import { getTreeNodeParent } from '@/utils/utils';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
}

export interface UpdateFormProps extends FormComponentProps {
  handleUpdateModalVisible: (flag?: boolean, formVals?: FormValueType) => void;
  handleUpdate: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
  treeOptions: object[];
}
const FormItem = Form.Item;
const { Option } = Select;

// export interface UpdateFormState {}

// @connect((category: StateType) => category.treeOptions)
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
      if (fieldsValue.parentCategoryId && typeof fieldsValue.parentCategoryId === 'object') {
        temp.parentCategoryId = fieldsValue.parentCategoryId.pop();
      } else {
        temp.parentCategoryId = '';
      }
      temp.categoryId = values.categoryId;
      handleUpdate(temp);
    });
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values, form, treeOptions } = this.props;

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
                {form.getFieldDecorator('categoryName', {
                  initialValue: values.categoryName,
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Category">
                {form.getFieldDecorator('parentCategoryId', {
                  initialValue: getTreeNodeParent(treeOptions, values.parentCategoryId),
                  rules: [{ required: true, message: 'required' }],
                })(
                  <Cascader
                    options={treeOptions}
                    changeOnSelect
                    fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                    placeholder=""
                  />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Display Order">
                {form.getFieldDecorator('displayOrder', {
                  initialValue: String(values.displayOrder),
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Remarks">
                {form.getFieldDecorator('remarks', {
                  initialValue: String(values.remarks),
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
        </div>
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
