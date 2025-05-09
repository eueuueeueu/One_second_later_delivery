import { ProxyDatum } from '@/pages/User/Proxy/List/type';
import { Link } from '@umijs/max';
import { Button, Col, Form, Input, Select } from 'antd';
import { FC } from 'react';

// 表单搜索框-搜索框/下拉框组件
/**
 * 表单搜索组合组件 - 支持输入框/下拉选择两种模式
 * @param {'input'|'select'} props.type - 控件类型'input'|'select'
 * @param {number} [props.span=4] - 栅格布局占比
 * @param {keyof ProxyDatum} props.name - 表单字段名
 * @param {string} [props.placeholder='请输入'] - 提示文本
 * @param {Array<{value:null|number, label:string}>} [props.option] - 下拉选项(仅select类型需要)
 *
 * @typedef {Object} ProxyDatum - 表单数据类型
 * @example
 * <FromItemSearch
 *   type="input"
 *   name="username"
 *   placeholder="搜索名称"
 * />
 *
 * <FromItemSearch
 *   type="select"
 *   name="status"
 *   option={[{value: 1, label: '启用'}]}
 * />
 */
const FormItemSearch: FC<
  | {
      type: 'input';
      span?: number;
      // name: keyof ProxyDatum;
      name: any;
      placeholder?: string;
      option?: never;
    }
  | {
      type: 'select';
      span?: number;
      // name: keyof ProxyDatum;
      name: any;
      placeholder?: string;
      option: Array<{ value: null | number; label: string }>;
    }
> = ({ name, span = 4, option, placeholder = '请输入', type }) => (
  <Col span={span}>
    <Form.Item<ProxyDatum> name={name}>
      {type === 'select' ? (
        <Select
          placeholder={placeholder}
          options={option}
          style={{ height: '40px' }}
        />
      ) : (
        <Input
          placeholder={placeholder}
          allowClear
          style={{ height: '40px' }}
        />
      )}
    </Form.Item>
  </Col>
);

// 表单重置/搜索组件
/**
 * 表单操作按钮组件 - 支持搜索/重置两种类型
 * @param {() => void} [props.callBack] - 按钮点击回调（重置按钮专用）
 * @param {string} props.label - 按钮显示文本
 * @param {'search'|'reset'} props.type - 按钮类型
 *
 * @example
 * <FormItemButton
 *   type="search"
 *   label="查询"
 * />
 *
 * <FormItemButton
 *   type="reset"
 *   label="重置"
 *   callBack={() => console.log('重置操作')}
 * />
 */
const FormItemButton: FC<{
  callBack?: () => unknown;
  label: string;
  type: 'search' | 'reset';
}> = ({ callBack = () => {}, label, type }) => (
  <>
    {type === 'reset' ? (
      <Button
        onClick={callBack}
        type="default"
        style={{
          backgroundColor: '#fff',
          borderColor: '#d9d9d9',
          width: '120px',
          height: '40px',
        }}
      >
        {label}
      </Button>
    ) : (
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
        {label}
      </Button>
    )}
  </>
);

// 添加-跳转按钮组件
/**
 * 导航操作按钮组件 - 带路由跳转功能的紫色主题按钮
 * @param {Object} props - 组件属性
 * @param {string} props.label - 按钮显示文本
 * @param {string} props.to - 路由跳转路径(React Router规范)
 *
 * @example
 * <AddButtonLink
 *   label="添加用户"
 *   to="/user/create"
 * />
 *
 * <AddButtonLink
 *   label="新建项目"
 *   to="/project/new"
 * />
 */
const AddButtonLink: FC<{ label: string; to: string }> = ({ label, to }) => (
  <Link to={to}>
    <Button
      type="primary"
      htmlType="submit"
      style={{
        backgroundColor: '#955ce6',
        borderColor: '#955ce6',
        width: '100px',
        height: '40px',
      }}
    >
      {label}
    </Button>
  </Link>
);
export { AddButtonLink, FormItemButton, FormItemSearch };
