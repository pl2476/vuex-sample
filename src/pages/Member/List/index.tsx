import { Button, Card, Col, Divider, Form, Icon, Input, Menu, Row, Select, message } from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
// import moment from 'moment';
import { StateType } from './model';
import CreateForm from '@/pages/Member/List/CreateForm';
import StandardTable, { StandardTableColumnProps } from '@/components/Table/StandardTable';
import UpdateForm, { FormValueType } from '@/pages/Member/List/UpdateForm';
import { TableListItem, TableListParams, TableListPagination } from '@/pages/Member/List/data';

import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

// type IStatusMapType = 'default' | 'processing' | 'success' | 'error';
// const statusMap = ['default', 'processing', 'success', 'error'];
// const status = ['关闭', '运行中', '已上线', '异常'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'listTableList/add'
      | 'listTableList/fetch'
      | 'listTableList/remove'
      | 'listTableList/get'
      | 'listTableList/update'
    >
  >;
  loading: boolean;
  listTableList: StateType;
}

interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  expandForm: boolean;
  selectedRows: TableListItem[];
  formValues: { [key: string]: string };
  stepFormValues: Partial<TableListItem>;
  rowKey: string;
}

/* eslint react/no-multi-comp:0 */
@connect(
  ({
    listTableList,
    loading,
  }: {
    listTableList: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    listTableList,
    loading: loading.models.listTableList,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    rowKey: 'userId',
  };

  columns: StandardTableColumnProps[] = [
    {
      title: 'Home Shop',
      dataIndex: 'homeShop',
    },
    {
      title: 'Member Code',
      dataIndex: 'memberCode',
      sorter: true,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'mobilePhone',
      sorter: true,
      render: (val: string) => <span>{`Mobile: ${val}`}</span>,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Operation',
      render: (text, record) => (
        <Fragment>
          {/* <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
          <Divider type="vertical" />
          <a href="">订阅警报</a> */}
          <Icon
            onClick={() => this.handleUpdateModalVisible(true, record)}
            type="edit"
            theme="twoTone"
            twoToneColor="#52c41a"
          />
          {/* <Divider type="vertical" /> */}
          &nbsp;
          <Icon
            onClick={() => this.handleDelete(record)}
            type="delete"
            theme="twoTone"
            twoToneColor="#52c41a"
          />
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listTableList/fetch',
    });
  }

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof TableListItem, string[]>,
    sorter: SorterResult<TableListItem>,
  ) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params: Partial<TableListParams> = {
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'listTableList/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'listTableList/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = (e: { key: string }) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'listTableList/remove',
          payload: {
            key: selectedRows.map(row => row.userId),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = (rows: TableListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'listTableList/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag?: boolean, record?: FormValueType) => {
    const { dispatch } = this.props;
    if (!flag) {
      this.setState({
        updateModalVisible: !!flag,
      });
      return;
    }
    if (record) {
      dispatch({
        type: 'listTableList/get',
        payload: {
          memberCode: record.memberCode,
        },
        callback: (e: { code: string; data: object }) => {
          if (e.code === '200') {
            this.setState({
              updateModalVisible: !!flag,
              stepFormValues: e.data || {},
            });
          }
        },
      });
    }
  };

  handleAdd = (fields: FormValueType) => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'listTableList/add',
      payload: fields,
      callback: (e: { code: string; message: string }) => {
        if (e.code === '304') {
          message.success(e.message);
          this.handleModalVisible();
          form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
              ...fieldsValue,
              updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };
            this.setState({
              formValues: values,
            });
            dispatch({
              type: 'listTableList/fetch',
              payload: values,
            });
          });
        } else {
          message.error(e.message);
        }
      },
    });
  };

  handleUpdate = (fields: FormValueType) => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'listTableList/update',
      payload: fields,
      callback: (e: { code: string; message: string }) => {
        if (e.code === '300') {
          message.success(e.message);
          this.handleUpdateModalVisible(false);
          form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
              ...fieldsValue,
              updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };
            this.setState({
              formValues: values,
            });
            dispatch({
              type: 'listTableList/fetch',
              payload: values,
            });
          });
        } else {
          message.error(e.message);
        }
      },
    });
  };

  handleDelete = (record: FormValueType) => {
    const { selectedRows } = this.state;
    const { dispatch, form } = this.props;

    if (!selectedRows) return;
    dispatch({
      type: 'listTableList/remove',
      payload: {
        // memberCode: selectedRows.map(row => row.memberCode),
        memberCode: record.memberCode,
      },
      callback: (e: { code: string; message: string }) => {
        if (e.code === '301') {
          message.success(e.message);
          this.handleUpdateModalVisible(false);
          form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
              ...fieldsValue,
              updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };
            this.setState({
              formValues: values,
            });
            dispatch({
              type: 'listTableList/fetch',
              payload: values,
            });
          });
        } else {
          message.error(e.message);
        }
      },
    });
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="horizontal">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Member Code/Name/Phone">
              {getFieldDecorator('name')(<Input placeholder="" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Email">{getFieldDecorator('name')(<Input placeholder="" />)}</FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="Member Code / Name / Phone">
              {getFieldDecorator('code_name_phone')(<Input placeholder="" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="Email">
              {getFieldDecorator('email')(<Input placeholder="" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="User Groups">
              {getFieldDecorator('marketingGroup')(
                <Select placeholder="" style={{ width: '100%' }}></Select>,
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="Enabled">
              {getFieldDecorator('enabled')(
                <Select placeholder="" style={{ width: '100%' }}>
                  <Option value="Yes">Yes</Option>
                  <Option value="No">No</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="Home Shop">
              {getFieldDecorator('homeShop')(
                // <Select placeholder="" style={{ width: '100%' }}>
                //   <Option value="0">0</Option>
                // </Select>,
                <Input placeholder="" />,
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'left', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              Reset
            </Button>
            {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a> */}
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderAdvancedForm();
  }

  render() {
    const {
      listTableList: { data },
      loading,
    } = this.props;

    const { selectedRows, modalVisible, updateModalVisible, stepFormValues, rowKey } = this.state;
    // const menu = (
    //   <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
    //     <Menu.Item key="remove">删除</Menu.Item>
    //     <Menu.Item key="approval">批量审批</Menu.Item>
    //   </Menu>
    // );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={() => this.handleModalVisible(true)}>
                Add
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  {/* <Button onClick={() => this.handleDelete()}>Delete</Button> */}
                  {/* <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown> */}
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              rowKey={rowKey}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);