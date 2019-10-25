import { Button, Card, Col, Form, Icon, Input, Row, Select, message, Modal, Cascader } from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import { StateType } from './model';
import CreateForm from '@/pages/Product/Treatment/CreateForm';
import StandardTable, { StandardTableColumnProps } from './StandardTable';
import UpdateForm, { FormValueType } from '@/pages/Product/Treatment/UpdateForm';
import {
  TableListItem,
  TableListParams,
  TableListPagination,
} from '@/pages/Product/Treatment/data';

import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'treatment/add'
      | 'treatment/fetch'
      | 'treatment/export'
      | 'treatment/remove'
      | 'treatment/get'
      | 'treatment/update'
      | 'treatment/categoryOption'
    >
  >;
  loading: boolean;
  treatment: StateType;
}

interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  expandForm: boolean;
  selectedRows: TableListItem[];
  formValues: { [key: string]: string };
  stepFormValues: Partial<TableListItem>;
  rowKey: string;
  categoryOption: object[];
}

@connect(
  ({
    treatment,
    loading,
  }: {
    treatment: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    treatment,
    loading: loading.models.treatment,
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
    rowKey: 'id',
    categoryOption: [],
  };

  columns: StandardTableColumnProps[] = [
    {
      title: 'Name',
      dataIndex: 'treatmentName',
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Show Online',
      dataIndex: 'showOnline',
    },
    {
      title: 'Operation',
      render: (text, record) => (
        <Fragment>
          <Icon
            onClick={() => this.handleUpdateModalVisible(true, record)}
            type="edit"
            theme="filled"
            style={{ color: '#52c41a' }}
          />
          &nbsp;
          <Icon
            onClick={() => this.handleDelete('single', record)}
            type="delete"
            theme="filled"
            style={{ color: '#52c41a' }}
          />
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'treatment/fetch',
    });
    dispatch({
      type: 'treatment/categoryOption',
      callback: (response: object[]) => {
        this.setState({
          categoryOption: [response],
        });
      },
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
      type: 'treatment/fetch',
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
      type: 'treatment/fetch',
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
          type: 'treatment/remove',
          payload: {
            key: selectedRows.map(row => row.id),
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
        categoryId: fieldsValue.categoryId
          ? fieldsValue.categoryId[fieldsValue.categoryId.length - 1]
          : '',
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'treatment/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = (flag?: boolean) => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'treatment/getProduct',
    //   payload: {
    //     code: '',
    //   },
    //   callback: (res: object) => {
    //     if (res) {
    //     }
    //   },
    // });
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
        type: 'treatment/get',
        payload: {
          id: record.id,
        },
        callback: (e: { code: string; data: object }) => {
          if (e.code === '200') {
            const { data } = e;
            this.setState({
              updateModalVisible: !!flag,
              stepFormValues: data || {},
            });
          }
        },
      });
    }
  };

  handleExpandItemDelete = (data: object) => {
    const { dispatch } = this.props;
  };

  handleAdd = (fields: FormValueType) => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'treatment/add',
      payload: fields,
      callback: (e: { code: string; message: string }) => {
        if (e.code === '429') {
          message.success(e.message);
          this.handleModalVisible();
          form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
              ...fieldsValue,
              categoryId: fieldsValue.categoryId
                ? fieldsValue.categoryId[fieldsValue.categoryId.length - 1]
                : '',
              updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };
            this.setState({
              formValues: values,
            });
            dispatch({
              type: 'treatment/fetch',
              payload: values,
            });
          });
        } else if (e.message) {
          message.error(e.message);
        }
      },
    });
  };

  handleUpdate = (fields: FormValueType) => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'treatment/update',
      payload: fields,
      callback: (e: { code: string; message: string }) => {
        if (e.code === '413') {
          message.success(e.message);
          this.handleUpdateModalVisible(false);
          form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
              ...fieldsValue,
              categoryId: fieldsValue.categoryId
                ? fieldsValue.categoryId[fieldsValue.categoryId.length - 1]
                : '',
              updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };
            this.setState({
              formValues: values,
            });
            dispatch({
              type: 'treatment/fetch',
              payload: values,
            });
          });
        } else if (e.message) {
          message.error(e.message);
        }
      },
    });
  };

  handleDelete = (type: string, record?: FormValueType) => {
    const { selectedRows } = this.state;
    const { dispatch, form } = this.props;
    const that = this;
    if (!selectedRows) return;
    let ids: never[] | (string | undefined)[] = [];
    if (type === 'single' && record) {
      ids = [record.id];
    } else {
      ids = selectedRows.map(row => row.id);
    }
    confirm({
      title: 'Are you sure you want to delete this information?',
      content: '',
      onOk() {
        dispatch({
          type: 'treatment/remove',
          payload: {
            ids,
          },
          callback: (e: { code: string; message: string }) => {
            if (e.code === '401') {
              message.success(e.message);
              that.handleUpdateModalVisible(false);
              that.setState({
                selectedRows: [],
              });
              form.validateFields((err, fieldsValue) => {
                if (err) return;
                const values = {
                  ...fieldsValue,
                  categoryId: fieldsValue.categoryId
                    ? fieldsValue.categoryId[fieldsValue.categoryId.length - 1]
                    : '',
                  updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
                };
                that.setState({
                  formValues: values,
                });
                dispatch({
                  type: 'treatment/fetch',
                  payload: values,
                });
              });
            } else if (e.message) {
              message.error(e.message);
            }
          },
        });
      },
      onCancel() {},
    });
  };

  handleExportList = () => {
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        categoryId: fieldsValue.categoryId
          ? fieldsValue.categoryId[fieldsValue.categoryId.length - 1]
          : '',
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'treatment/export',
        payload: values,
        callback: (res: string) => {
          if (res) {
            window.location.href = res;
          } else {
            message.error('error');
          }
        },
      });
    });
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { categoryOption } = this.state;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="Treatment Code">
              {getFieldDecorator('treatmentCode')(<Input placeholder="" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="Name">
              {getFieldDecorator('treatmentName')(<Input placeholder="" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="Category Tree">
              {getFieldDecorator('categoryId')(
                <Cascader
                  options={categoryOption}
                  changeOnSelect
                  fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                  placeholder=""
                />,
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="Status">
              {getFieldDecorator('status')(
                <Select placeholder="" style={{ width: '100%' }}>
                  <Option value="true">Active</Option>
                  <Option value="false">Inactive</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="Show Online">
              {getFieldDecorator('showOnline')(
                <Select placeholder="" style={{ width: '100%' }}>
                  <Option value="true">Yes</Option>
                  <Option value="false">No</Option>
                </Select>,
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
      treatment: { data },
      loading,
    } = this.props;
    const {
      selectedRows,
      modalVisible,
      updateModalVisible,
      stepFormValues,
      rowKey,
      categoryOption,
    } = this.state;

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
                  <Button onClick={() => this.handleDelete('multiple')}>Delete</Button>
                  {/* <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown> */}
                </span>
              )}
              <Button onClick={() => this.handleExportList()}>Export</Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              rowKey={rowKey}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              handleExpandItemDelete={this.handleExpandItemDelete}
            />
          </div>
        </Card>
        <CreateForm
          {...parentMethods}
          fields={data.optionFields}
          categoryOptions={categoryOption}
          modalVisible={modalVisible}
        />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            fields={data.optionFields}
            categoryOptions={categoryOption}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);
