import { FormItemButton, FormItemSearch, Status } from '@/components';
import { formatDateTime } from '@/hook/formatDateTime';
import { filterObject } from '@/pages/User/Proxy/List/hook';
import { EllipsisOutlined, RedoOutlined } from '@ant-design/icons';
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
import { FC, useEffect, useState } from 'react';
import { getOrdersList } from './api';
import { OrdersListDatum, OrdersListDatumSearch } from './type';
// 初始化插件
const OrderList: FC = () => {
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
    run: getOrdersData,
  } = useRequest(
    (params?: Partial<OrdersListDatum>) =>
      getOrdersList({
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
  const columns: TableProps<OrdersListDatum>['columns'] = [
    {
      title: '编号',
      dataIndex: 'userNo',
      key: 'userNo',
    },
    {
      title: '下单用户',
      dataIndex: 'nickName',
      key: 'nickName',
      render: (text, row) => {
        return (
          <div className="flex justify-center items-center">
            <Avatar src={row.avatarUrl} />
            <div className="text-[12px]">
              <p>{text}</p>
              <p>{row.mobileNumber}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: '下单金额',
      dataIndex: 'startPrice',
      key: 'startPrice',
      render: (_, row) => (
        <div className="text-[12px]">
          <p className="flex justify-between">
            <span>起步价</span>
            <span>{row.startPrice}元</span>
          </p>
          <p className="flex justify-between">
            <span>路程价</span>
            <span>{row.distancePrice}元</span>
          </p>
          <p className="flex justify-between">
            <span>重量价</span>
            <span>{row.weightPrice}元</span>
          </p>
          <p className="flex justify-between">
            <span>时间段价</span>
            <span>{row.timePrice}元</span>
          </p>
          <p className="flex justify-between">
            <span>支付金额</span>
            <span>{row.payAmount}元</span>
          </p>
        </div>
      ),
    },
    {
      title: '下单信息',
      dataIndex: 'goodsDesc',
      key: 'goodsDesc',
      render: (_, row) => (
        <div className="w-[100px] text-[12px]">
          <p className="font-medium">{row.goodsDesc}</p>
          <p className="text-[#999999] text-[11px]">
            起点：{row.startAddress?.city}
            {row.startAddress?.addressDetail}
          </p>
          <p>
            {row.startAddress?.contactName}
            {row.startAddress?.mobileNumber}
          </p>
          <p className="text-[#999999] text-[11px]">
            终点：{row.endAddress.addressDetail}
          </p>
          <p>
            {row.endAddress?.contactName}
            {row.endAddress?.mobileNumber}
          </p>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (record: number) => {
        // 根据图片中实际状态值调整 case
        switch (record) {
          case -2:
            return <Status label="已取消" type="cancel" />;
          case -1:
            return <Status label="已关闭" type="close" />;
          case 0:
            return <Status label="待付款" type="warning" />;
          case 1:
            return <Status label="待接单" type="warning" />;
          case 2:
            return <Status label="配送中" type="warning" />;
          case 3:
            return <Status label="待确认" type="warning" />;
          case 4:
            return <Status label="已完成" type="success" />;
          default:
            return <Status label="未知" type="default" />;
        }
      },
    },
    {
      title: '售后',
      dataIndex: 'status',
      key: 'status',
      render: (_, row) => (
        <div className="w-[70px] text-[12px]">
          <p>退款编号:{row.refundNo ?? '无'}</p>
          <p>已退款:{row.refundAmount}元</p>
          <p>退款日期:{row.refundTime}</p>
        </div>
      ),
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (_, row) => {
        return (
          <div>
            <p>
              创建：
              {formatDateTime(row.createTime)}
            </p>
            <p>更新：{formatDateTime(row.updateTime)}</p>
            <p>关闭：{formatDateTime(row.closeTime)}</p>
          </div>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (record) => {
        // 根据当前行状态动态设置按钮禁用状态
        const [status] = [record.status];
        const items: MenuProps['items'] = [
          {
            key: '1',
            label: <a>接单</a>,
            disabled: status !== 1, // 启用状态时禁用启用按钮
          },
          {
            key: '2',
            label: <a>配送完成</a>,
            disabled: status !== 1, // 启用状态时禁用启用按钮
          },
          {
            key: '3',
            label: <a>确认完成</a>,
            disabled: status !== 1, // 禁用状态时禁用禁用按钮
          },
          {
            key: '4',
            label: <a>取消</a>,
            disabled: status !== 1,
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
  const rowSelection: TableProps<OrdersListDatum>['rowSelection'] = {
    // 选中一行的事件
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: OrdersListDatum[],
    ) => {
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
    getOrdersData();
  }, [pagination.current, pagination.pageSize]);
  // 表单
  const [form] = Form.useForm();
  const onSearch = (values: OrdersListDatumSearch) => {
    // 过滤空值参数
    getOrdersData(filterObject(values));
  };
  return (
    <PageContainer title="订单列表">
      <Form
        form={form}
        onFinish={onSearch}
        className="bg-white p-4 rounded-lg shadow-sm"
      >
        <Row gutter={10}>
          <FormItemSearch type="input" name="userNo" placeholder="用户编号" />
          <FormItemSearch type="input" name="orderNo" placeholder="订单编号" />
          <FormItemSearch type="input" name="riderNo" placeholder="骑手编号" />
          <FormItemSearch
            type="input"
            name="mobileNumber"
            placeholder="用户手机号"
          />
          <FormItemSearch
            type="select"
            name="status"
            placeholder="状态"
            option={[
              { value: null, label: '全部' },
              { value: -2, label: '已取消' },
              { value: -1, label: '已关闭' },
              { value: 0, label: '待付款' },
              { value: 1, label: '待接单' },
              { value: 2, label: '配送中' },
              { value: 3, label: '待确认' },
              { value: 4, label: '已完成' },
            ]}
          />
          <Col span={24} className="text-left flex justify-between">
            <Space>
              <FormItemButton
                type="reset"
                label="重置"
                callBack={() => {
                  form.resetFields();
                  getOrdersData();
                }}
              />
              <FormItemButton type="search" label="搜索" />
            </Space>
            <Button
              onClick={() => getOrdersData()}
              className="w-[40px] h-[40px]"
            >
              <RedoOutlined className="text-[18px]" />
            </Button>
          </Col>
        </Row>
      </Form>
      <Table<OrdersListDatum>
        rowSelection={{ type: 'checkbox', ...rowSelection }}
        rowKey={(record) => record.orderNo}
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
    </PageContainer>
  );
};
export default OrderList;
