import {
  Form,
  Input,
  Modal,
  Row,
  Col,
  Tabs,
  DatePicker,
  InputNumber,
  Transfer,
  Select,
} from 'antd';
import React, { PureComponent, ReactNode } from 'react';
import { FormComponentProps } from 'antd/es/form';
import moment from 'moment';
import { TableListItem, ProductList } from '@/pages/Product/Bundle/data';

import style from './style.less';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
}

export interface UpdateFormProps extends FormComponentProps {
  handleUpdateModalVisible: (flag?: boolean, formVals?: FormValueType) => void;
  handleUpdate: (values: FormValueType) => void;
  handleProductSearch: (direction: 'left' | 'right', value: string) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
  product: ProductList;
}

export interface UpdateFormState {
  optionData: object;
  options: number[];
}

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;

class UpdateForm extends PureComponent<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    // handleProductSearch: () => {},
    values: {},
    // product: [],
  };

  constructor(props: UpdateFormProps) {
    super(props);
    this.state = {
      optionData: {},
      options: [1],
    };
  }

  // componentWillMount() {
  //   const { values } = this.props;
  //   if (values.bundleGroup) {
  //     const tempOptions: number[] = [];
  //     const tempOptionData = {};
  //     const { bundleGroup } = values;
  //     Object.keys(bundleGroup).forEach(key => {
  //       tempOptions.push(Number(key));
  //       tempOptionData[`group${key}`] = bundleGroup[Number(key)] || [];
  //       tempOptionData[`targetKeys${key}`] = bundleGroup[Number(key)] || [];
  //     });
  //     this.setState({
  //       options: tempOptions,
  //       optionData: tempOptionData,
  //     });
  //   }
  // }

  componentWillReceiveProps() {
    const { values } = this.props;
    if (values.bundleGroup) {
      const tempOptions: number[] = [];
      const tempOptionData = {};
      const { bundleGroup } = values;
      Object.keys(bundleGroup).forEach(key => {
        tempOptions.push(Number(key));
        tempOptionData[`group${key}`] = bundleGroup[Number(key)] || [];
        tempOptionData[`targetKeys${key}`] = bundleGroup[Number(key)] || [];
      });
      this.setState({
        options: tempOptions,
        optionData: tempOptionData,
      });
    }
  }

  submit = () => {
    const { form, handleUpdate, values } = this.props;
    const { options } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const bundleGroup = {};
      options.map((item, index) => {
        bundleGroup[index + 1] = fieldsValue[`group${index + 1}`];
        return item;
      });
      const data = {
        id: values.id,
        bundleCode: fieldsValue.bundleCode,
        bundleName: fieldsValue.bundleName,
        startDate: moment(fieldsValue.date[0]).format('YYYY-MM-DD'),
        endDate: moment(fieldsValue.date[1]).format('YYYY-MM-DD'),
        shop: fieldsValue.shop,
        totalBundlePrice: fieldsValue.totalBundlePrice,
        description: fieldsValue.description,
        bundleGroup,
      };
      handleUpdate(data);
    });
  };

  render() {
    const {
      updateModalVisible,
      handleUpdateModalVisible,
      values,
      form,
      product,
      handleProductSearch,
    } = this.props;
    const { optionData, options } = this.state;

    const onEdit = (targetKey: ReactNode | string, action: string) => {
      if (action === 'add') {
        const temp = options.slice();
        const target = options.slice();
        target.push(temp[temp.length - 1] + 1);
        this.setState({
          options: target,
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

    const handleProductChange = (targetKeys: string[], index: number) => {
      const temp = optionData;
      temp[`targetKeys${index}`] = targetKeys;
      this.setState({
        optionData: temp,
      });
    };

    const handleProductSelectChange = (
      selectedKeys: string[],
      targetKeys: string[],
      index: number,
    ) => {
      const temp = optionData;
      temp[`selectedKeys${index}`] = [...selectedKeys, ...targetKeys];
      this.setState({
        optionData: { ...temp },
      });
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
                      {form.getFieldDecorator(`group${index + 1}`, {
                        initialValue: optionData[`group${index + 1}`],
                        rules: [{ required: true, message: 'required' }],
                      })(
                        <Transfer
                          key={item.toString()}
                          className={style['create-form-transfer']}
                          rowKey={record => record.id}
                          dataSource={product}
                          selectedKeys={optionData[`selectedKeys${index + 1}`]}
                          targetKeys={optionData[`targetKeys${index + 1}`]}
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

    return (
      <Modal
        destroyOnClose
        title="Bundle Edit"
        width="888px"
        visible={updateModalVisible}
        okText="Submit"
        onOk={this.submit}
        afterClose={() => handleUpdateModalVisible()}
        onCancel={() => handleUpdateModalVisible(false, values)}
      >
        <div className={style['create-form']}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Bundle Code">
                {form.getFieldDecorator('bundleCode', {
                  initialValue: values.bundleCode,
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Bundle Name">
                {form.getFieldDecorator('bundleName', {
                  initialValue: values.bundleName,
                  rules: [{ required: true, message: 'required' }],
                })(<Input placeholder="Please enter" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Select Date">
                {form.getFieldDecorator('date', {
                  initialValue: [moment(values.startDate), moment(values.endDate)],
                  rules: [{ required: true, message: 'required' }],
                })(<RangePicker />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Shop">
                {form.getFieldDecorator('shop', {
                  initialValue: values.shop,
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
              <FormItem
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label="Total Bundle Price"
              >
                {form.getFieldDecorator('totalBundlePrice', {
                  initialValue: values.totalBundlePrice,
                  rules: [{ required: true, message: 'required' }],
                })(<InputNumber placeholder="Please enter" />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Description">
                {form.getFieldDecorator('description', {
                  initialValue: values.description,
                })(<Input.TextArea autoSize={{ minRows: 1, maxRows: 2 }} />)}
              </FormItem>
            </Col>
          </Row>
          {secondForm()}
        </div>
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
