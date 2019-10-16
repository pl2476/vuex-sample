import moment from 'moment';
import { Form, Input, Modal, Row, Col, Checkbox } from 'antd';
import React, { PureComponent } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FormComponentProps } from 'antd/es/form';
import { TableListItem } from '@/pages/Member/List/data';
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

export interface UpdateFormState {
  isMember: boolean;
}

class UpdateForm extends PureComponent<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  constructor(props: UpdateFormProps) {
    super(props);

    this.state = {
      isMember: false,
    };
  }

  componentWillReceiveProps() {
    const { values } = this.props;
    this.setState({
      isMember: values.isMember || false,
    });
  }

  // componentWillUnmount() {
  //   this.setState({
  //     isMember: false,
  //   });
  // }

  isMemberChange = (e: CheckboxChangeEvent) => {
    if (e.target) {
      const { checked } = e.target;
      this.setState({
        isMember: checked,
      });
    }
  };

  okHandle = () => {
    const { handleUpdate, form, values } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      const temp = fieldsValue;
      temp.userId = values.userId;
      temp.dateOfBirth = moment(fieldsValue.dateOfBirth).format('YYYY-MM-DD');
      handleUpdate(temp);
    });
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values, form } = this.props;
    const { isMember } = this.state;

    return (
      <Modal
        destroyOnClose
        title="Member Family Edit"
        width="888px"
        visible={updateModalVisible}
        afterClose={() => handleUpdateModalVisible()}
        okText="Submit"
        onOk={this.okHandle}
        onCancel={() => handleUpdateModalVisible(false, values)}
      >
        <div className={style['create-form']}>
          <Checkbox checked={isMember} onChange={this.isMemberChange}>
            Is Member
          </Checkbox>
          <div style={{ marginTop: '18px' }}></div>
          <div style={isMember ? { display: 'block' } : { display: 'none' }}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Member Code">
                  {form.getFieldDecorator('memberCode', {
                    initialValue: values.memberCode,
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
                    initialValue: values.name,
                    rules: !isMember ? [{ required: true, message: 'required' }] : [],
                  })(<Input placeholder="Please enter" />)}
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Email">
                  {form.getFieldDecorator('email', {
                    initialValue: values.email,
                    rules: !isMember ? [{ required: true, message: 'required' }] : [],
                  })(<Input placeholder="Please enter" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Contact Tel.">
                  {form.getFieldDecorator('contactTel', {
                    initialValue: values.contactTel,
                    rules: !isMember ? [{ required: true, message: 'required' }] : [],
                  })(<Input placeholder="Please enter" />)}
                </FormItem>
              </Col>
            </Row>
          </div>
        </div>
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
