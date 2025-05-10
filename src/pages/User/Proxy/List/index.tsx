import {
  AddButtonLink,
  FormItemButton,
  FormItemSearch,
  Status,
} from '@/components';
import { formatDateTime } from '@/hook/formatDateTime';
import {
  ContactsTwoTone,
  EllipsisOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Link, useRequest } from '@umijs/max';
import {
  Button,
  Col,
  Dropdown,
  Form,
  MenuProps,
  Row,
  Space,
  Table,
  TableProps,
  Tooltip,
} from 'antd';
import qs from 'qs';
import { FC, useEffect, useState } from 'react';
import { editProxyStatus, getProxyList, resetPwd } from './api';
import { filterObject } from './hook';
import { ProxyDatum, ProxyDatumSearch } from './type';

const Proxy: FC = () => {
  // 分页配置数据
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });
  // 请求表格数据
  const {
    data,
    loading,
    run: getProxyData,
  } = useRequest(
    (params?: Partial<ProxyDatum>) =>
      getProxyList({
        ...params,
        current: pagination.current,
        pageSize: pagination.pageSize,
      }),
    {
      manual: true,
      onSuccess(res) {
        setPagination((prev) => ({
          ...prev,
          total: res.data.count,
        }));
      },
    },
  );
  // 表格列配置
  const columns: TableProps<ProxyDatum>['columns'] = [
    {
      title: '编号',
      dataIndex: 'agentNo',
      key: 'agentNo',
    },
    {
      title: '账号',
      dataIndex: 'agentAccount',
      key: 'agentAccount',
      render: (text, row) => {
        return (
          <div>
            <p>{text}</p>
            <p>初始密码:{row.defaultPwd}</p>
          </div>
        );
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      key: 'realName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (record) =>
        record === 1 ? (
          <Status label="启用" type="success" />
        ) : (
          <Status label="禁用" type="error" />
        ),
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (_, row) => {
        return (
          <div className="text-[12px]">
            <p>{`创建:${formatDateTime(row.createTime)}`}</p>
            <p>{`更新:${formatDateTime(row.updateTime)}`}</p>
          </div>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (record) => {
        // 根据当前行状态动态设置按钮禁用状态
        const [status, agentNo, updatedBy] = [
          record.status,
          record.agentNo,
          record.updatedBy,
        ];
        const items: MenuProps['items'] = [
          {
            key: '1',
            label: (
              <Link to={`/user/proxy/edit/edit?${qs.stringify(record)}`}>
                修改
              </Link>
            ),
          },
          {
            key: '2',
            label: <a>启用</a>,
            disabled: status === 1, // 启用状态时禁用启用按钮
            onClick: () =>
              editProxyStatus({
                agentNo,
                status: status === 1 ? '0' : '1',
              }).then(() => getProxyData()),
          },
          {
            key: '3',
            label: <a>禁用</a>,
            disabled: status === 0, // 禁用状态时禁用禁用按钮
            onClick: () =>
              editProxyStatus({
                agentNo,
                status: status === 1 ? '0' : '1',
              }).then(() => getProxyData()),
          },
          {
            key: '4',
            label: <a>重置密码</a>,
            onClick: () => resetPwd({ agentNo }).then(() => getProxyData()),
          },
        ];

        return (
          <Space size="middle">
            <Link to={`/user/admins?adminNo=${updatedBy}`}>
              <Tooltip title="操作人">
                <ContactsTwoTone className="text-[16px]" />
              </Tooltip>
            </Link>
            <a>
              <Dropdown menu={{ items }}>
                <Button
                  color="purple"
                  size="large"
                  className="w-[31px] h-[24px] rounded-[4px]"
                  variant="outlined"
                >
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </a>
          </Space>
        );
      },
    },
  ];
  // 表格行配置
  const rowSelection: TableProps<ProxyDatum>['rowSelection'] = {
    // 选中一行的事件
    onChange: (selectedRowKeys: React.Key[], selectedRows: ProxyDatum[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
  };
  // 分页变化处理
  const handleTableChange = (newPagination: any) => {
    setPagination({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
      total: newPagination.total,
    });
  };
  useEffect(() => {
    getProxyData();
  }, [pagination.current, pagination.pageSize]);
  // 表单
  const [form] = Form.useForm();
  const onSearch = (values: ProxyDatumSearch) => {
    // console.log('Received values:', values);
    // 过滤空值参数
    getProxyData(filterObject(values));
  };
  return (
    <div className="bg-white">
      <PageContainer title="代理列表">
        <div className="-mx-[10px] overflow-x-auto">
          <Form
            form={form}
            onFinish={onSearch}
            className="bg-white p-4 rounded-lg shadow-sm"
          >
            <Row gutter={10}>
              <FormItemSearch
                type="input"
                name="agentNo"
                placeholder="代理编号"
              />
              <FormItemSearch
                type="input"
                name="agentAccount"
                placeholder="账号"
              />
              <FormItemSearch
                type="input"
                name="mobileNumber"
                placeholder="手机号"
              />
              <FormItemSearch type="input" name="realName" placeholder="昵称" />
              <FormItemSearch
                type="select"
                name="status"
                placeholder="状态"
                option={[
                  { value: null, label: '全部' },
                  { value: 1, label: '启用' },
                  { value: 0, label: '禁用' },
                ]}
              />
              <Col span={24} className="text-left">
                <Space>
                  <FormItemButton
                    type="reset"
                    label="重置"
                    callBack={() => {
                      form.resetFields();
                      getProxyData();
                    }}
                  />
                  <FormItemButton type="search" label="搜索" />
                </Space>
              </Col>
            </Row>
          </Form>
          <div className="w-full h-[1px] bg-[#d8d6da] mb-4"></div>
          <div className='flex justify-between mb-2'>
            <AddButtonLink label="添加代理" to="/user/proxy/edit/Add" />
            <Button
              onClick={() => getProxyData()}
              className="w-[40px] h-[40px]"
            >
              <RedoOutlined className="text-[18px]" />
            </Button>
          </div>
          <Table<ProxyDatum>
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            rowKey={(record) => record.agentNo}
            bordered
            style={{ padding: 0 }}
            loading={loading}
            columns={columns}
            dataSource={data?.data.data}
            onChange={handleTableChange}
            pagination={{
              position: ['bottomRight'],
              current: pagination.current,
              pageSize: pagination.pageSize,
              pageSizeOptions: ['10', '20', '50', '100'],
              showSizeChanger: true,
              total: pagination.total,
              showTotal: (total) => `共${total}条数据`,
            }}
          />
        </div>
      </PageContainer>
    </div>
  );
};
export default Proxy;
