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
import { TableListItem, OptionFields } from '@/pages/Product/Treatment/data';
import { getTreeNodeParent } from '@/utils/utils';

import style from './style.less';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
}

export interface UpdateFormProps extends FormComponentProps {
  handleUpdateModalVisible: (flag?: boolean, formVals?: FormValueType) => void;
  handleUpdate: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
  categoryOptions: object[];
  fields: OptionFields[];
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
    categoryOptions: [],
  };

  constructor(props: UpdateFormProps) {
    super(props);
    this.state = {
      current: 1,
      columns: [
        {
          title: 'Code',
          dataIndex: 'code',
          key: 'code',
        },
        {
          title: 'Process Time (min)',
          dataIndex: 'processtime',
          key: 'processtime',
        },
        {
          title: 'Capacity',
          dataIndex: 'capacity',
          key: 'capacity',
        },
        {
          title: 'Duration (min)',
          dataIndex: 'duration',
          key: 'duration',
        },
        {
          title: 'Price ($)',
          dataIndex: 'price',
          key: 'price',
        },
      ],
      optionData: [],
      options: [1],
      fieldRows: [],
      optionsForm: [],
    };
  }

  componentDidMount() {
    const { values, fields } = this.props;
    const { optionsForm } = this.state;
    const count = [];
    if (values.options) {
      for (let i = 0; i < values.options.length; i += 1) {
        const tempObj = {};
        count.push(i + 1);
        const item = values.options[i];
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
    const tempFieldRows: OptionFields[] = [];
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
        treatmentName: fieldsValue.treatmentName,
        categoryId: fieldsValue.categoryId[fieldsValue.categoryId.length - 1],
        description: fieldsValue.description,
        showOnline: fieldsValue.showOnline,
        options: optionData,
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
        // const formOptions = values.options || [];
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
          Treatment Details
        </div>
        <Form key="1">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Category Tree">
                {form.getFieldDecorator('categoryId', {
                  initialValue: getTreeNodeParent(categoryOptions, values.categoryId),
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
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Name">
                {form.getFieldDecorator('treatmentName', {
                  initialValue: values.treatmentName,
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Description">
                {form.getFieldDecorator('description', {
                  initialValue: values.description,
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Show Online">
                {form.getFieldDecorator('showOnline', {
                  initialValue: values.showOnline,
                })(
                  <Select placeholder="Please select">
                    <Option value="true">Yes</Option>
                    <Option value="false">No</Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );

    const secondTemplate = (key: number) => (
      <Form key="2">
        {fieldRows.map((row: OptionFields[]) => (
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            {row.map((item: OptionFields) => (
              <Col md={12} sm={24}>
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
          Treatment Options
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
        title="Treatment Edit"
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
              Treatment Details
            </div>
            <Descriptions title="" column={2} bordered size="middle">
              <Descriptions.Item label="Category Tree">
                {form.getFieldValue('categoryId')}
              </Descriptions.Item>
              <Descriptions.Item label="Name">
                {form.getFieldValue('treatmentName')}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
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
              Treatment Options
            </div>
            <Table dataSource={optionData} columns={columns} />
          </div>
        </div>
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
