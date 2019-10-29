import {
  Form,
  Input,
  Modal,
  Row,
  Col,
  Tabs,
  Select,
  DatePicker,
  InputNumber,
  Transfer,
} from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { useState, useEffect, SetStateAction, ReactNode } from 'react';
import moment from 'moment';

import style from './style.less';
import { FormValueType } from './UpdateForm';
import { ProductList } from '@/pages/Product/Bundle/data';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;

interface CreateFormProps extends FormComponentProps {
  product: ProductList;
  modalVisible: boolean;
  handleAdd: (fieldsValue: FormValueType) => void;
  handleModalVisible: () => void;
  handleProductSearch: (direction: 'left' | 'right', value: string) => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { handleAdd, handleModalVisible, modalVisible, form, product, handleProductSearch } = props;

  const [options, setOptions] = useState([1]);
  const [optionData, setOptionData] = useState({
    // selectedKeys0: [],
    // targetKeys0: [],
  });

  // useEffect(() => {
  // });

  const onEdit = (targetKey: ReactNode | string, action: string) => {
    if (action === 'add') {
      const temp = options.slice();
      const target = options.slice();
      target.push(temp[temp.length - 1] + 1);
      setOptions(target);
    } else if (action === 'remove') {
      const temp = Number(targetKey) - 1;
      const target = options.slice();
      target.splice(temp, 1);
      setOptions(target);
    }
  };

  const submit = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const bundleGroup = {};
      options.map((item, index) => {
        bundleGroup[index + 1] = fieldsValue[`group${index}`];
        return item;
      });
      const data = {
        bundleCode: fieldsValue.bundleCode,
        bundleName: fieldsValue.bundleName,
        startDate: moment(fieldsValue.date[0]).format('YYYY-MM-DD'),
        endDate: moment(fieldsValue.date[1]).format('YYYY-MM-DD'),
        shop: fieldsValue.shop,
        totalBundlePrice: fieldsValue.totalBundlePrice,
        description: fieldsValue.description,
        bundleGroup,
      };
      handleAdd(data);
    });
  };

  const handleProductChange = (targetKeys: string[], index: number) => {
    const temp = optionData;
    temp[`targetKeys${index}`] = targetKeys;
    setOptionData(temp);
  };

  const handleProductSelectChange = (
    selectedKeys: string[],
    targetKeys: string[],
    index: number,
  ) => {
    const temp = optionData;
    temp[`selectedKeys${index}`] = [...selectedKeys, ...targetKeys];
    setOptionData({ ...temp });
  };

  const secondForm = () => (
    <div>
      <Tabs defaultActiveKey="1" type="editable-card" onEdit={onEdit}>
        {options.map((item, index) => {
          const title = `Group ${item}`;
          return (
            <TabPane
              tab={title}
              closable={index !== 0 && index === options.length - 1}
              key={item.toString()}
            >
              <Row gutter={{ md: 8, lg: 24, xl: 48 }} key={item.toString()}>
                <Col md={24} sm={24} key={item.toString()}>
                  <FormItem
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label={`Group ${index + 1}`}
                    key={item.toString()}
                  >
                    {form.getFieldDecorator(`group${index}`, {
                      rules: [{ required: true, message: 'required' }],
                    })(
                      <Transfer
                        key={item.toString()}
                        className={style['create-form-transfer']}
                        rowKey={record => record.id}
                        dataSource={product}
                        selectedKeys={optionData[`selectedKeys${index}`]}
                        targetKeys={optionData[`targetKeys${index}`]}
                        showSearch
                        onChange={e => handleProductChange(e, index)}
                        onSelectChange={(s, t) => handleProductSelectChange(s, t, index)}
                        onSearch={handleProductSearch}
                        render={i => i.treatmentName}
                      />,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );

  const afterClose = () => {
    setOptions([1]);
    setOptionData({});
  };

  return (
    <Modal
      destroyOnClose
      title="Bundle Add"
      width="888px"
      okText="Submit"
      onOk={submit}
      visible={modalVisible}
      afterClose={afterClose}
      onCancel={() => handleModalVisible()}
    >
      <div className={style['create-form']}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Bundle Code">
              {form.getFieldDecorator('bundleCode', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Bundle Name">
              {form.getFieldDecorator('bundleName', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Select Date">
              {form.getFieldDecorator('date', {
                rules: [{ required: true, message: 'required' }],
              })(<RangePicker />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Shop">
              {form.getFieldDecorator('shop', {
                rules: [{ required: true, message: 'required' }],
              })(
                <Select placeholder="Please select">
                  <Option value="1">1</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Total Bundle Price">
              {form.getFieldDecorator('totalBundlePrice', {
                rules: [{ required: true, message: 'required' }],
              })(<InputNumber placeholder="Please enter" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Description">
              {form.getFieldDecorator('description')(
                <Input.TextArea autosize={{ minRows: 1, maxRows: 2 }} />,
              )}
            </FormItem>
          </Col>
        </Row>
        {secondForm()}
      </div>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
