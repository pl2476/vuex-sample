import moment from 'moment';
import { DatePicker, Form, Input, Modal, Select, Row, Col, Divider, Checkbox } from 'antd';
import React, { Component } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FormComponentProps } from 'antd/es/form';
import { TableListItem } from '@/pages/Member/List/data';
import style from './CreateForm.less';

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

export interface UpdateFormState {
  formVals: FormValueType;
  addressStatus: boolean;
  otherStatus: boolean;
  habitStatus: boolean;
  marketStatus: boolean;
}

class UpdateForm extends Component<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  constructor(props: UpdateFormProps) {
    super(props);

    this.state = {
      formVals: {
        memberCode: props.values.memberCode,
        firstName: props.values.firstName,
        lastName: props.values.lastName,
        email: props.values.email,
        mobilePhone: props.values.mobilePhone,
        homeShop: props.values.homeShop,
        gender: props.values.gender,
        dateOfBirth: props.values.dateOfBirth,
        marketingGroup: props.values.marketingGroup,
        discountGroup: props.values.discountGroup,
        country: props.values.country,
        city: props.values.city,
        district: props.values.district,
        address: props.values.address,
        homePhone: props.values.homePhone,
        businessPhone: props.values.businessPhone,
        preferredContact: props.values.preferredContact,
        preferredShop: props.values.preferredShop,
        preferredTherapist: props.values.preferredTherapist,
        preferredRoom: props.values.preferredRoom,
        dislikeRoom: props.values.dislikeRoom,
        remarks: props.values.remarks,
        notification: props.values.notification,
      },
      addressStatus: false,
      otherStatus: false,
      habitStatus: false,
      marketStatus: false,
    };
  }

  addressStatusChange = (e: CheckboxChangeEvent) => {
    if (e.target) {
      const { checked } = e.target;
      this.setState({
        addressStatus: checked,
      });
    }
  };

  otherStatusChange = (e: CheckboxChangeEvent) => {
    if (e.target) {
      const { checked } = e.target;
      this.setState({
        otherStatus: checked,
      });
    }
  };

  habitStatusChange = (e: CheckboxChangeEvent) => {
    if (e.target) {
      const { checked } = e.target;
      this.setState({
        habitStatus: checked,
      });
    }
  };

  marketStatusChange = (e: CheckboxChangeEvent) => {
    if (e.target) {
      const { checked } = e.target;
      this.setState({
        marketStatus: checked,
      });
    }
  };

  okHandle = () => {
    const { handleUpdate, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const temp = fieldsValue;
      temp.dateOfBirth = moment(fieldsValue.dateOfBirth).format('YYYY-MM-DD');
      handleUpdate(temp);
    });
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values, form } = this.props;
    const { formVals, addressStatus, otherStatus, habitStatus, marketStatus } = this.state;

    return (
      <Modal
        destroyOnClose
        title="Member Edit"
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
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Member Code">
                {form.getFieldDecorator('memberCode', {
                  initialValue: formVals.memberCode,
                  rules: [{ required: true, message: 'required' }],
                })(<Input disabled placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="First Name">
                {form.getFieldDecorator('firstName', {
                  initialValue: formVals.firstName,
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Last Name">
                {form.getFieldDecorator('lastName', {
                  initialValue: formVals.lastName,
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Email">
                {form.getFieldDecorator('email', {
                  initialValue: formVals.email,
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Mobile Phone">
                {form.getFieldDecorator('mobilePhone', {
                  initialValue: formVals.mobilePhone,
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Home Shop">
                {form.getFieldDecorator('homeShop', {
                  initialValue: formVals.homeShop,
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Gender">
                {form.getFieldDecorator('gender', {
                  initialValue: formVals.gender,
                })(
                  <Select placeholder="Please select">
                    <Option value="FEMALE">FEMALE</Option>
                    <Option value="MALE">MALE</Option>
                    <Option value="UNKOWN">UNKNOW</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Date of Birthday">
                {form.getFieldDecorator('dateOfBirth', {
                  initialValue: moment(formVals.dateOfBirth || new Date()),
                })(<DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Marketing Group">
                {form.getFieldDecorator('marketingGroup', {
                  initialValue: formVals.marketingGroup,
                })(
                  <Select placeholder="Please select">
                    <Option value="Marketing">Marketing</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Discount Group">
                {form.getFieldDecorator('discountGroup', {
                  initialValue: formVals.discountGroup,
                })(
                  <Select placeholder="Please select">
                    <Option value="Discount">Discount</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Divider dashed />
          <Checkbox checked={addressStatus} onChange={this.addressStatusChange}>
            Contact address
          </Checkbox>
          <Checkbox checked={otherStatus} onChange={this.otherStatusChange}>
            Other Contact Phones
          </Checkbox>
          <Checkbox checked={habitStatus} onChange={this.habitStatusChange}>
            Habit
          </Checkbox>
          <Checkbox checked={marketStatus} onChange={this.marketStatusChange}>
            Marketing Communications
          </Checkbox>
          <div style={{ marginTop: '18px' }}></div>
          <div style={addressStatus ? { display: 'block' } : { display: 'none' }}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Country">
                  {form.getFieldDecorator('country', {
                    initialValue: formVals.country,
                  })(<Input placeholder="Please enter" />)}
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="City">
                  {form.getFieldDecorator('city', {
                    initialValue: formVals.city,
                  })(<Input placeholder="Please enter" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="District">
                  {form.getFieldDecorator('district', {
                    initialValue: formVals.district,
                  })(<Input placeholder="Please enter" />)}
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Address">
                  {form.getFieldDecorator('address', {
                    initialValue: formVals.address,
                  })(<Input placeholder="Please enter" />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div style={otherStatus ? { display: 'block' } : { display: 'none' }}>
            <Divider dashed />
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Home Phone">
                  {form.getFieldDecorator('homePhone', {
                    initialValue: formVals.homePhone,
                  })(<Input placeholder="Please enter" />)}
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Business Phone">
                  {form.getFieldDecorator('businessPhone', {
                    initialValue: formVals.businessPhone,
                  })(<Input placeholder="Please enter" />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div style={habitStatus ? { display: 'block' } : { display: 'none' }}>
            <Divider dashed />
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Preferred Contact"
                >
                  {form.getFieldDecorator('preferredContact', {
                    initialValue: formVals.preferredContact,
                  })(<Input placeholder="Please enter" />)}
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Preferred Shop">
                  {form.getFieldDecorator('preferredShop', {
                    initialValue: formVals.preferredShop,
                  })(
                    <Select placeholder="Please select">
                      <Option value="preferredShop">preferredShop</Option>
                    </Select>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Preferred Therapist"
                >
                  {form.getFieldDecorator('preferredTherapist', {
                    initialValue: formVals.preferredTherapist,
                  })(
                    <Select mode="multiple" placeholder="Please select">
                      <Option value="Therapist1">Therapist1</Option>
                      <Option value="Therapist2">Therapist2</Option>
                      <Option value="Therapist3">Therapist3</Option>
                    </Select>,
                  )}
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Preferred Room">
                  {form.getFieldDecorator('preferredRoom', {
                    initialValue: formVals.preferredRoom,
                  })(
                    <Select placeholder="Please select">
                      <Option value="preferredRoom">preferredRoom</Option>
                    </Select>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Dislike Room">
                  {form.getFieldDecorator('dislikeRoom', {
                    initialValue: formVals.dislikeRoom,
                  })(
                    <Select placeholder="Please select">
                      <Option value="dislikeRoom">dislikeRoom</Option>
                    </Select>,
                  )}
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Remarks">
                  {form.getFieldDecorator('remarks', {
                    initialValue: formVals.remarks,
                  })(<Input placeholder="Please enter" />)}
                </FormItem>
              </Col>
            </Row>
          </div>
          <div style={marketStatus ? { display: 'block' } : { display: 'none' }}>
            <Divider dashed />
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Notification">
                  {form.getFieldDecorator('notification', {
                    initialValue: formVals.notification,
                  })(
                    <Select placeholder="Please select">
                      <Option value="Notification">Notification</Option>
                    </Select>,
                  )}
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Enabled">
                  {form.getFieldDecorator('enabled', {
                    initialValue: formVals.enabled,
                  })(
                    <Select placeholder="Please select">
                      <Option value="yes">yes</Option>
                      <Option value="no">no</Option>
                    </Select>,
                  )}
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
