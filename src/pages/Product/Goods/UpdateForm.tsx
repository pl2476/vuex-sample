import {
  Form,
  Input,
  Modal,
  Steps,
  Row,
  Col,
  Button,
  Tabs,
  Cascader,
  Descriptions,
  Table,
  Select,
} from 'antd';
import React, { PureComponent, ReactNode } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { TableListItem, OptionFields } from '@/pages/Product/Goods/data';
import { getTreeNodeParent, TreeNode } from '@/utils/utils';

import style from './style.less';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
}

export interface UpdateFormProps extends FormComponentProps {
  handleUpdateModalVisible: (flag?: boolean, formVals?: FormValueType) => void;
  handleUpdate: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
  categoryOptions: TreeNode[];
  fields: OptionFields[];
  brandList: object[];
}

export interface UpdateFormState {
  current: number;
  columns: object[];
  optionData: object[];
  options: number[];
  fieldRows: OptionFields[][];
  optionsForm: object[];
}

const FormItem = Form.Item;
const { Step } = Steps;
const { TabPane } = Tabs;
const { Option } = Select;

class UpdateForm extends PureComponent<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
    fields: [],
  };

  constructor(props: UpdateFormProps) {
    super(props);
    this.state = {
      current: 1,
      columns: [
        {
          title: 'Product Code',
          dataIndex: 'Product Code',
          key: 'Product Code',
        },
        {
          title: 'Price ($)',
          dataIndex: 'Price',
          key: 'Price',
        },
      ],
      optionData: [],
      options: [1],
      fieldRows: [],
      optionsForm: [],
    };
  }

  componentWillReceiveProps() {
    const { values, fields } = this.props;
    const { optionsForm } = this.state;
    const count = [];
    if (values.optionContents && typeof values.optionContents === 'string') {
      const optionContents = JSON.parse(values.optionContents);
      for (let i = 0; i < optionContents.length; i += 1) {
        const tempObj = {};
        count.push(i + 1);
        const item = optionContents[i];
        Object.keys(item).forEach(key => {
          tempObj[`${key}${i + 1}`] = item[key];
        });
        // for (const key in item) {
        //   if (item.hasOwnProperty(key)) {
        //     tempObj[`${key}${i}`] = object[key];
        //   }
        // }
        optionsForm.push(tempObj);
      }
      this.setState({
        options: count,
      });
    }
    const tempFieldRows = [];
    for (let i = 0; i < fields.length; i += 2) {
      if (i !== fields.length - 1) {
        tempFieldRows.push([fields[i], fields[i + 1]]);
      } else {
        tempFieldRows.push([fields[i]]);
      }
    }
    this.setState({
      fieldRows: tempFieldRows,
    });
  }

  submit = () => {
    const { form, handleUpdate, values } = this.props;
    const { optionData } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleUpdate({
        id: values.id,
        brandId: fieldsValue.brandId,
        categoryId: fieldsValue.categoryId[fieldsValue.categoryId.length - 1],
        description: fieldsValue.description,
        goodsName: fieldsValue.goodsName,
        optionContents: JSON.stringify(optionData),
      });
    });
  };

  render() {
    const {
      updateModalVisible,
      handleUpdateModalVisible,
      values,
      form,
      fields,
      categoryOptions,
      brandList,
    } = this.props;
    const { current, columns, optionData, options, fieldRows, optionsForm } = this.state;

    const onEdit = (targetKey: ReactNode | string, action: string) => {
      if (action === 'add') {
        const temp = options.slice();
        const target = options.slice();
        const optionsFormTarget = optionsForm.slice();
        target.push(temp[temp.length - 1] + 1);
        const tempObj = {};
        for (let j = 0; j < fields.length; j += 1) {
          tempObj[`${fields[j].key}${temp[temp.length - 1] + 1}`] = undefined;
        }
        optionsFormTarget.push(tempObj);
        this.setState({
          options: target,
          optionsForm: optionsFormTarget,
        });
      } else if (action === 'remove') {
        const temp = Number(targetKey) - 1;
        const target = options.slice();
        target.splice(temp, 1);
        this.setState({
          options: target,
        });
      }
    };

    const next = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        const temp = current + 1;
        const tempOptionData = [];
        if (current === 2) {
          for (let index = 0; index < options.length; index += 1) {
            const obj = {};
            for (let j = 0; j < fields.length; j += 1) {
              obj[fields[j].key] = form.getFieldValue(`${fields[j].key}${options[index]}`);
              // obj[fields[j].key] = formOptions[index][`${fields[j].key}`];
            }
            tempOptionData.push(obj);
          }
          this.setState({
            optionData: tempOptionData,
          });
        }
        this.setState({
          current: temp,
        });
      });
    };

    const prev = () => {
      const temp = current - 1;
      this.setState({
        current: temp,
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
                  initialValue: values.brandId,
                  rules: [{ required: true, message: 'required' }],
                })(
                  <Select placeholder="Please select" style={{ width: '100%' }}>
                    {brandList.map((item: TableListItem) => (
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
                  initialValue: getTreeNodeParent(categoryOptions, values.categoryId || ''),
                  rules: [{ required: true, message: 'required' }],
                })(
                  <Cascader
                    options={categoryOptions}
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
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Name">
                {form.getFieldDecorator('goodsName', {
                  initialValue: values.goodsName,
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Description">
                {form.getFieldDecorator('description', {
                  initialValue: values.description,
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );

    const secondTemplate = (key: number) => (
      <Form key="2">
        {fieldRows.map((row: OptionFields[]) => (
          <Row key={row.toString()} gutter={{ md: 8, lg: 24, xl: 48 }}>
            {row.map((item: OptionFields, i) => (
              <Col key={item.toString() + i.toString()} md={12} sm={24}>
                <FormItem
                  // key={item.key}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label={`${item.label} ${item.unit ? item.unit : ''}`}
                >
                  {form.getFieldDecorator(`${item.key}${key}`, {
                    initialValue: optionsForm[key - 1][`${item.key}${key}`],
                  })(<Input placeholder="Please enter" />)}
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

    const footRender = () => {
      switch (current) {
        case 1:
          return (
            <div>
              <Button onClick={() => handleUpdateModalVisible()}>Cancel</Button>
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
              <Button type="primary" onClick={this.submit}>
                Submit
              </Button>
            </div>
          );
        default:
          return <div />;
      }
    };

    return (
      <Modal
        destroyOnClose
        title="Goods Edit"
        width="888px"
        visible={updateModalVisible}
        afterClose={() => handleUpdateModalVisible()}
        onCancel={() => handleUpdateModalVisible(false, values)}
        footer={footRender()}
      >
        <div className={style['create-form']}>
          <Steps current={current}>
            <Step key={1} title="Step 1" />
            <Step key={2} title="Step 2" />
            <Step key={3} title="Step 3" />
          </Steps>
          <div style={current === 1 ? { display: 'block' } : { display: 'none' }}>
            {firstForm()}
          </div>
          <div style={current === 2 ? { display: 'block' } : { display: 'none' }}>
            {secondForm()}
          </div>
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
            <Table
              rowKey="Product Code"
              dataSource={optionData}
              columns={columns}
              pagination={false}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
