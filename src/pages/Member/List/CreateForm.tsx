import { Form, Input, Modal, Row, Col, Select, DatePicker, Divider, Checkbox } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { useState } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

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
  const [addressStatus, setAddressStatus] = useState(false);
  const addressStatusChange = (e: CheckboxChangeEvent) => {
    if (e.target) {
      const { checked } = e.target;
      setAddressStatus(checked);
    }
  };
  const [otherStatus, setOtherStatus] = useState(false);
  const otherStatusChange = (e: CheckboxChangeEvent) => {
    if (e.target) {
      const { checked } = e.target;
      setOtherStatus(checked);
    }
  };
  const [habitStatus, setHabitStatus] = useState(false);
  const habitStatusChange = (e: CheckboxChangeEvent) => {
    if (e.target) {
      const { checked } = e.target;
      setHabitStatus(checked);
    }
  };
  const [marketStatus, setMarketStatus] = useState(false);
  const marketStatusChange = (e: CheckboxChangeEvent) => {
    if (e.target) {
      const { checked } = e.target;
      setMarketStatus(checked);
    }
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="Member Add"
      width="888px"
      visible={modalVisible}
      onOk={okHandle}
      okText="Submit"
      onCancel={() => handleModalVisible()}
    >
      <div className={style['create-form']}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="First Name">
              {form.getFieldDecorator('firstName', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Last Name">
              {form.getFieldDecorator('lastName', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Email">
              {form.getFieldDecorator('email', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Mobile Phone">
              {form.getFieldDecorator('mobilePhone', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Home Shop">
              {form.getFieldDecorator('homeShop', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Gender">
              {form.getFieldDecorator('gender')(
                <Select placeholder="Please select">
                  <Option value="FEMALE">FEMALE</Option>
                  <Option value="MALE">MALE</Option>
                  <Option value="UNKOWN">UNKNOW</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Date of Birthday">
              {form.getFieldDecorator('dateOfBirth')(<DatePicker style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Marketing Group">
              {form.getFieldDecorator('marketingGroup')(
                <Select placeholder="Please select">
                  <Option value="Marketing">Marketing</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Discount Group">
              {form.getFieldDecorator('discountGroup')(
                <Select placeholder="Please select">
                  <Option value="Discount">Discount</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Divider dashed />
        <Checkbox checked={addressStatus} onChange={addressStatusChange}>
          Contact address
        </Checkbox>
        <Checkbox checked={otherStatus} onChange={otherStatusChange}>
          Other Contact Phones
        </Checkbox>
        <Checkbox checked={habitStatus} onChange={habitStatusChange}>
          Habit
        </Checkbox>
        <Checkbox checked={marketStatus} onChange={marketStatusChange}>
          Marketing Communications
        </Checkbox>
        <div style={{ marginTop: '18px' }}></div>
        <div style={addressStatus ? { display: 'block' } : { display: 'none' }}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Country">
                {form.getFieldDecorator('country')(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="City">
                {form.getFieldDecorator('city')(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="District">
                {form.getFieldDecorator('district')(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Address">
                {form.getFieldDecorator('address')(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
        </div>
        <div style={otherStatus ? { display: 'block' } : { display: 'none' }}>
          <Divider dashed />
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Home Phone">
                {form.getFieldDecorator('homePhone')(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Business Phone">
                {form.getFieldDecorator('businessPhone')(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
        </div>
        <div style={habitStatus ? { display: 'block' } : { display: 'none' }}>
          <Divider dashed />
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Preferred Contact">
                {form.getFieldDecorator('preferredContact')(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Preferred Shop">
                {form.getFieldDecorator('preferredShop')(
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
                {form.getFieldDecorator('preferredTherapist')(
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
                {form.getFieldDecorator('preferredRoom')(
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
                {form.getFieldDecorator('dislikeRoom')(
                  <Select placeholder="Please select">
                    <Option value="dislikeRoom">dislikeRoom</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Remarks">
                {form.getFieldDecorator('remarks')(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
        </div>
        <div style={marketStatus ? { display: 'block' } : { display: 'none' }}>
          <Divider dashed />
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Notification">
                {form.getFieldDecorator('notification')(
                  <Select placeholder="Please select">
                    <Option value="Notification">Notification</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Enabled">
                {form.getFieldDecorator('enabled')(
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
};

export default Form.create<CreateFormProps>()(CreateForm);
