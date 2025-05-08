import { Status } from '@/components';
import { ContactsTwoTone, EllipsisOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Row,
  Select,
  Space,
  Table,
  TableProps,
  Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone'; // 引入 timezone 插件
import utc from 'dayjs/plugin/utc'; // 引入 utc 插件
import { FC, useEffect, useState } from 'react';
import { getProxyList } from './api';
import { filterObject } from './hook';
import { ProxyDatum, ProxyDatumSearch } from './type';
dayjs.extend(utc);
dayjs.extend(timezone);
// 操作栏选项
const items: MenuProps['items'] = [
  {
    key: '1',
    label: <a>修改</a>,
  },
  {
    key: '2',
    label: <a>启用</a>,
    disabled: true,
  },
  {
    key: '3',
    label: <a>禁用</a>,
  },
  {
    key: '4',
    label: <a>重置密码</a>,
  },
];
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
    render: (record, row) => {
      return (
        <div className="text-[12px]">
          <p>{`创建:${dayjs(record)
            .utc()
            .tz('Asia/Shanghai')
            .format('YYYY/MM/DD HH:mm')}`}</p>
          <p>{`更新:${dayjs(row.updateTime)
            .utc()
            .tz('Asia/Shanghai')
            .format('YYYY/MM/DD HH:mm')}`}</p>
        </div>
      );
    },
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>
          <Tooltip title="操作人">
            <ContactsTwoTone className="text-[16px]" />
          </Tooltip>
        </a>
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
    ),
  },
];
// 行配置
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
const Proxy: FC = () => {
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
            <Row gutter={12}>
              {/* 代理编号 */}
              <Col span={4}>
                <Form.Item<ProxyDatum> name="agentNo">
                  <Input
                    placeholder="代理编号"
                    allowClear
                    style={{ height: '40px' }}
                  />
                </Form.Item>
              </Col>

              {/* 账号 */}
              <Col span={4}>
                <Form.Item<ProxyDatum> name="agentAccount">
                  <Input
                    placeholder="账号"
                    allowClear
                    style={{ height: '40px' }}
                  />
                </Form.Item>
              </Col>

              {/* 手机号 */}
              <Col span={4}>
                <Form.Item<ProxyDatum> name="mobileNumber">
                  <Input
                    placeholder="手机号"
                    allowClear
                    style={{ height: '40px' }}
                  />
                </Form.Item>
              </Col>

              {/* 昵称 */}
              <Col span={4}>
                <Form.Item<ProxyDatum> name="realName">
                  <Input
                    placeholder="昵称"
                    allowClear
                    style={{ height: '40px' }}
                  />
                </Form.Item>
              </Col>

              {/* 状态选择 */}
              <Col span={4}>
                <Form.Item<ProxyDatum> name="status">
                  <Select
                    placeholder="状态"
                    options={[
                      { value: null, label: '全部' },
                      { value: 1, label: '启用' },
                      { value: 0, label: '禁用' },
                    ]}
                    style={{ height: '40px' }}
                  />
                </Form.Item>
              </Col>

              {/* 操作按钮 */}
              <Col span={24} className="text-left">
                <Space>
                  <Button
                    onClick={() => {
                      form.resetFields();
                      getProxyData();
                    }}
                    style={{
                      backgroundColor: '#fff',
                      borderColor: '#d9d9d9',
                      width: '120px',
                      height: '40px',
                    }}
                  >
                    取消
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      backgroundColor: '#955ce6',
                      borderColor: '#955ce6',
                      width: '120px',
                      height: '40px',
                    }}
                  >
                    搜索
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
          <div className="w-full h-[1px] bg-[#d8d6da]"></div>
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
