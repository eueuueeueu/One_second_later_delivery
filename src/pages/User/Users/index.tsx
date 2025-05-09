import { FormItemButton, FormItemSearch, Status } from '@/components';
import { EllipsisOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Form,
  MenuProps,
  Row,
  Space,
  Table,
  TableProps,
} from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone'; // 引入 timezone 插件
import utc from 'dayjs/plugin/utc'; // 引入 utc 插件
import { FC, useEffect, useState } from 'react';
import { filterObject } from '../Proxy/List/hook';
import { editUserStatus, getUserList } from './api';
import { UserDatum, UserDatumSearch } from './type';
// 初始化插件
dayjs.extend(utc);
dayjs.extend(timezone);

const User: FC = () => {
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
    run: getUserDataList,
  } = useRequest(
    (params?: Partial<UserDatum>) =>
      getUserList({
        ...params,
        current: pagination.current,
        pageSize: pagination.pageSize,
      }),
    {
      manual: true,
      onSuccess(res) {
        setPagination((prev) => ({
          ...prev,
          total: res?.data?.count,
        }));
      },
    },
  );
  // 表格列配置
  const columns: TableProps<UserDatum>['columns'] = [
    {
      title: '编号',
      dataIndex: 'userNo',
      key: 'userNo',
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      render: (record) => <Avatar src={record} />,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: '手机号',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
    {
      title: '地区',
      dataIndex: 'city',
      key: 'city',
      render: (record) => <div>{record ?? '----'}</div>,
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
      render: (record) => {
        // 根据当前行状态动态设置按钮禁用状态
        const [status, userNo] = [record.status, record.userNo];
        const items: MenuProps['items'] = [
          {
            key: '1',
            label: <a>启用</a>,
            disabled: status === 1, // 启用状态时禁用启用按钮
            onClick: () =>
              editUserStatus({
                userNo,
                status: status === 1 ? '0' : '1',
              }).then(() => getUserDataList()),
          },
          {
            key: '2',
            label: <a>禁用</a>,
            disabled: status === 0, // 禁用状态时禁用禁用按钮
            onClick: () =>
              editUserStatus({
                userNo,
                status: status === 1 ? '0' : '1',
              }).then(() => getUserDataList()),
          },
        ];

        return (
          <Space size="middle">
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
  const rowSelection: TableProps<UserDatum>['rowSelection'] = {
    // 选中一行的事件
    onChange: (selectedRowKeys: React.Key[], selectedRows: UserDatum[]) => {
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
    getUserDataList();
  }, [pagination.current, pagination.pageSize]);
  // 表单
  const [form] = Form.useForm();
  const onSearch = (values: UserDatumSearch) => {
    // console.log('Received values:', values);
    // 过滤空值参数
    getUserDataList(filterObject(values));
  };
  return (
    <div className="bg-white">
      <PageContainer title="用户列表">
        <div className="-mx-[10px] overflow-x-auto">
          <Form
            form={form}
            onFinish={onSearch}
            className="bg-white p-4 rounded-lg shadow-sm"
          >
            <Row gutter={10}>
              <FormItemSearch
                type="input"
                name="userNo"
                placeholder="用户编号"
              />
              <FormItemSearch
                type="input"
                name="mobileNumber"
                placeholder="手机号"
              />
              <FormItemSearch type="input" name="nickName" placeholder="昵称" />
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
                      getUserDataList();
                    }}
                  />
                  <FormItemButton type="search" label="搜索" />
                </Space>
              </Col>
            </Row>
          </Form>
          <div className="w-full h-[1px] bg-[#d8d6da] mb-4"></div>
          <Table<UserDatum>
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            rowKey={(record) => record.userNo}
            bordered
            style={{ padding: 0 }}
            loading={loading}
            columns={columns}
            dataSource={data?.data?.data}
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
export default User;
