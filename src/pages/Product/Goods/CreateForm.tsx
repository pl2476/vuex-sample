import {
  Form,
  Input,
  Modal,
  Row,
  Col,
  Steps,
  Button,
  Tabs,
  Cascader,
  Descriptions,
  Table,
  Select,
} from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { useState, useEffect, SetStateAction, ReactNode } from 'react';

import style from './style.less';
import { FormValueType } from './UpdateForm';
import { OptionFields } from '@/pages/Product/Goods/data';

const FormItem = Form.Item;
const { Step } = Steps;
const { TabPane } = Tabs;
const { Option } = Select;

interface CreateFormProps extends FormComponentProps {
  categoryOptions: object[];
  fields: object[];
  brandList: object[];
  modalVisible: boolean;
  handleAdd: (fieldsValue: FormValueType) => void;
  handleModalVisible: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const {
    handleAdd,
    handleModalVisible,
    modalVisible,
    form,
    fields,
    brandList,
    categoryOptions,
  } = props;

  const [options, setOptions] = useState([1]);
  const [fieldRows, setFieldRows] = useState([]);
  const [current, setCurrent] = useState(1);
  const [optionData, setOptionData] = useState([]);

  useEffect(() => {
    // const rows = Math.ceil(fields.length / 2);
    const tempFieldRows = [];
    for (let i = 0; i < fields.length; i += 2) {
      if (i !== fields.length - 1) {
        tempFieldRows.push([fields[i], fields[i + 1]]);
      } else {
        tempFieldRows.push([fields[i]]);
      }
    }
    setFieldRows(tempFieldRows as SetStateAction<never[]>);
  }, [fields]);

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
      const data = {
        brandId: fieldsValue.brandId,
        categoryId: fieldsValue.categoryId[fieldsValue.categoryId.length - 1],
        description: fieldsValue.description,
        goodsName: fieldsValue.goodsName,
        optionContents: JSON.stringify(optionData),
      };
      handleAdd(data);
    });
  };

  const firstForm = () => (
    <div>
      <div
        style={{
          fontSize: '16px',
          fontWeight: 500,
          color: 'rgba(0,0,0,0.45)',
          margin: '30px 0 20px 0',
        }}
      >
        Product Details
      </div>
      <Form key="1">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Brand">
              {form.getFieldDecorator('brandId', {
                rules: [{ required: true, message: 'required' }],
              })(
                <Select placeholder="Please select" style={{ width: '100%' }}>
                  {brandList.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.brandName}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Category Tree">
              {form.getFieldDecorator('categoryId', {
                rules: [{ required: true, message: 'required' }],
              })(
                <Cascader
                  options={categoryOptions}
                  changeOnSelect
                  fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                  placeholder="Please select"
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Name">
              {form.getFieldDecorator('goodsName', {
                rules: [{ required: true, message: 'required' }],
              })(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Description">
              {form.getFieldDecorator('description')(<Input placeholder="Please enter" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );

  const secondTemplate = (key: number) => (
    <Form key="2">
      {fieldRows.map((row: OptionFields[], index) => (
        <Row key={row.toString()} gutter={{ md: 8, lg: 24, xl: 48 }}>
          {row.map((item: OptionFields, i) => (
            <Col key={item.toString() + i.toString()} md={12} sm={24}>
              <FormItem
                // key={item.key}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label={`${item.label} ${item.unit ? item.unit : ''}`}
              >
                {form.getFieldDecorator(`${item.key}${key}`)(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          ))}
        </Row>
      ))}
    </Form>
  );

  const secondForm = () => (
    <div>
      <div
        style={{
          fontSize: '16px',
          fontWeight: 500,
          color: 'rgba(0,0,0,0.45)',
          margin: '30px 0 20px 0',
        }}
      >
        Product Options
      </div>
      <Tabs
        // activeKey={2}
        defaultActiveKey="1"
        type="editable-card"
        onEdit={onEdit}
      >
        {options.map((item, index) => {
          const title = `Group ${item}`;
          return (
            <TabPane
              tab={title}
              closable={index !== 0 && index === options.length - 1}
              key={item.toString()}
            >
              {secondTemplate(item)}
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );

  const next = () => {
    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue);
      if (err) return;
      const temp = current + 1;
      const tempOptionData = [];
      if (current === 2) {
        for (let index = 0; index < options.length; index += 1) {
          const obj = {};
          for (let j = 0; j < fields.length; j += 1) {
            obj[fields[j].key] = form.getFieldValue(`${fields[j].key}${options[index]}`);
          }
          tempOptionData.push(obj);
        }
        setOptionData(tempOptionData as SetStateAction<never[]>);
      }
      setCurrent(temp);
    });
  };

  const prev = () => {
    const temp = current - 1;
    setCurrent(temp);
  };

  const footRender = () => {
    switch (current) {
      case 1:
        return (
          <div>
            <Button onClick={() => handleModalVisible()}>Cancel</Button>
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          </div>
        );
      case 2:
        return (
          <div>
            <Button onClick={() => prev()}>Prev</Button>
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          </div>
        );
      case 3:
        return (
          <div>
            <Button onClick={() => prev()}>Prev</Button>
            <Button type="primary" onClick={submit}>
              Submit
            </Button>
          </div>
        );
      default:
        return <div />;
    }
  };

  const columns = [
    {
      title: 'Product Code',
      dataIndex: 'Product Code',
      key: 'code',
    },
    {
      title: 'Price ($)',
      dataIndex: 'Price',
      key: 'price',
    },
  ];

  const afterClose = () => {
    setCurrent(1);
    setOptions([1]);
    setFieldRows([]);
    setOptionData([]);
  };

  return (
    <Modal
      destroyOnClose
      title="Goods Add"
      width="888px"
      visible={modalVisible}
      onCancel={() => handleModalVisible()}
      footer={footRender()}
      afterClose={afterClose}
    >
      <div className={style['create-form']}>
        <Steps current={current}>
          <Step key={1} title="Step 1" />
          <Step key={2} title="Step 2" />
          <Step key={3} title="Step 3" />
        </Steps>
        <div style={current === 1 ? { display: 'block' } : { display: 'none' }}>{firstForm()}</div>
        <div style={current === 2 ? { display: 'block' } : { display: 'none' }}>{secondForm()}</div>
        <div style={current === 3 ? { display: 'block' } : { display: 'none' }}>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 500,
              color: 'rgba(0,0,0,0.45)',
              margin: '15px 0 15px 0',
            }}
          >
            Product Details
          </div>
          <Descriptions title="" column={2} bordered size="middle">
            <Descriptions.Item label="Brand">{form.getFieldValue('brandId')}</Descriptions.Item>
            <Descriptions.Item label="Name">{form.getFieldValue('goodsName')}</Descriptions.Item>
            <Descriptions.Item label="Category Tree" span={2}>
              {form.getFieldValue('categoryId')}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={2}>
              {form.getFieldValue('description')}
            </Descriptions.Item>
          </Descriptions>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 500,
              color: 'rgba(0,0,0,0.45)',
              margin: '15px 0 15px 0',
            }}
          >
            Product Options
          </div>
          <Table dataSource={optionData} columns={columns} pagination={false} />
        </div>
      </div>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
