import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { FC } from 'react';

// 表单验证输入框组件
/**
 * 验证型表单输入组件 - 集成标签、验证规则和样式预设
 * @param {Object} props - 组件属性
 * @param {string} props.name - 表单字段标识(对应form.getFieldValue)
 * @param {string} props.label - 输入项标签文本(自动添加冒号)
 * @param {boolean} [props.required=true] - 是否必填项(自动添加红色星号)
 * @param {RegExp} [props.pattern=/./] - 正则验证规则(默认允许任意字符)
 * @param {number} [props.maxLength] - 输入最大字符限制
 * @param {string} [props.defaultValue=''] - 输入框默认值
 * @param {string} [props.className=''] - 自定义容器样式类
 *
 * @example
 * // 基础必填项
 * <VerifyFormItemInput
 *   name="username"
 *   label="用户名称"
 * />
 *
 * @example
 * // 带格式验证的选填项
 * <VerifyFormItemInput
 *   name="email"
 *   label="企业邮箱"
 *   required={false}
 *   pattern={/^\w+@domain\.com$/}
 * />
 *
 * @example
 * // 带长度限制的输入项
 * <VerifyFormItemInput
 *   name="remark"
 *   label="备注信息"
 *   maxLength={50}
 * />
 */
export const VerifyFormItemInput: FC<{
  name: string;
  label: string;
  required?: boolean;
  pattern?: RegExp;
  maxLength?: number;
  defaultValue?: string;
  className?: string;
}> = ({
  name,
  label,
  required = true,
  pattern = /./,
  maxLength,
  defaultValue = '',
  className = '',
}) => (
  <Form.Item
    label={
      <span className="font-medium">
        {label}：<span className="text-red-500">{required ? '*' : ''}</span>
      </span>
    }
    name={name}
    rules={[
      { required: required, message: `请输入${label}` },
      { pattern: pattern, message: `${label}格式不正确` },
    ]}
    className={className}
  >
    <Input
      prefix={<UserOutlined className="text-gray-400" />}
      placeholder={`请输入${label}`}
      size="large"
      className="!rounded-lg"
      maxLength={maxLength}
      defaultValue={defaultValue}
    />
  </Form.Item>
);
// 表单验证单选框组件
/**
 * 验证型单选按钮组 - 集成标签和默认值配置
 * @param {Object} props - 组件属性
 * @param {string} props.name - 表单字段标识(对应form.getFieldValue)
 * @param {string} props.label - 输入项标签文本(自动添加冒号)
 * @param {string} [props.defaultValue='undefined'] - 默认选中项的值
 * @param {Array<{value:string, label:string}>} props.option - 单选项配置数组
 *
 * @example
 * // 基础单选组
 * <VerifyFormItemRadio
 *   name="gender"
 *   label="用户性别"
 *   option={[
 *     { value: 'male', label: '男' },
 *     { value: 'female', label: '女' }
 *   ]}
 * />
 *
 * @example
 * // 带默认值的单选组
 * <VerifyFormItemRadio
 *   name="status"
 *   label="账户状态"
 *   defaultValue="active"
 *   option={[
 *     { value: 'active', label: '启用' },
 *     { value: 'disabled', label: '停用' }
 *   ]}
 * />
 */
export const VerifyFormItemRadio: FC<{
  name: string;
  label: string;
  defaultValue?: string;
  option: Array<{ value: string; label: string }>;
}> = ({ name, label, option, defaultValue = 'undefined' }) => (
  <Form.Item
    initialValue={defaultValue}
    label={<span className="font-medium">{label}：</span>}
    name={name}
  >
    <Radio.Group>
      {option.map((item) => (
        <Radio value={item.value}>{item.label}</Radio>
      ))}
    </Radio.Group>
  </Form.Item>
);
// 表单验证提交按钮组件
/**
 * 表单验证按钮组件 - 集成Antd Button与Form.Item容器
 * @param {Object} props - 组件属性
 * @param {string} props.label - 按钮显示文本
 * @param {'link'|'primary'|'text'|'default'|'dashed'} [props.type='primary'] - 按钮样式类型
 * @param {'button'|'submit'|'reset'} [props.htmlType='submit'] - 按钮原生类型(submit会触发表单提交)
 * @param {SizeType} [props.size='large'] - 按钮尺寸规格
 * @param {string} [props.className='w-full !bg-[#7b1fa2] hover:!bg-[#6a1b9a] !rounded-lg'] - 自定义样式类(默认紫色全宽圆角)
 *
 * @example
 * // 标准表单提交按钮
 * <VerifyFormItemButton label="立即提交" />
 *
 * @example
 * // 重置按钮配置
 * <VerifyFormItemButton
 *   label="重置表单"
 *   type="default"
 *   htmlType="reset"
 *   className="!bg-gray-100"
 * />
 *
 * @example
 * // 链接样式按钮
 * <VerifyFormItemButton
 *   label="查看帮助"
 *   type="link"
 *   htmlType="button"
 * />
 */
export const VerifyFormItemButton: FC<{
  label: string;
  type?: 'link' | 'primary' | 'text' | 'default' | 'dashed' | undefined;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  size?: SizeType;
  className?: string;
}> = ({
  type = 'primary',
  label,
  htmlType = 'submit',
  size = 'large',
  className = 'w-full !bg-[#7b1fa2] hover:!bg-[#6a1b9a] !rounded-lg',
}) => (
  <Form.Item>
    <Button type={type} htmlType={htmlType} size={size} className={className}>
      {label}
    </Button>
  </Form.Item>
);
