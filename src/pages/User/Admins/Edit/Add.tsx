import {
  GoBackTitle,
  VerifyFormItemButton,
  VerifyFormItemInput,
  VerifyFormItemRadio,
} from '@/components';
import { history } from '@umijs/max';
import { Form, message } from 'antd';
import { FC } from 'react';
import { addAdmin } from './api';

// 添加代理表单提交
const onFinish = (values: any) => {
  // console.log('Submitted values:', values);
  addAdmin(values).then((res) => {
    if (res.code !== 200) return message.error(res.msg);
    message.success(res.msg);
    history.push('/user/admins');
  });
};
const AddAdminList: FC = () => {
  const [form] = Form.useForm();
  return (
    <div className="w-[800px] mx-auto p-6 bg-white">
      <GoBackTitle title="新增代理" />
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={{ status: 'enable' }}
        onFinish={onFinish}
      >
        <VerifyFormItemInput name="adminName" label="账户名称" />
        <VerifyFormItemInput name="realName" label="真实姓名" />
        <VerifyFormItemInput
          name="mobileNumber"
          label="手机号"
          pattern={/^1[3-9]\d{9}$/}
          maxLength={11}
        />
        <VerifyFormItemRadio
          name="status"
          label="是否启用"
          option={[
            { value: '1', label: '启用' },
            { value: '0', label: '禁用' },
          ]}
        />
        {/* 提交按钮 */}
        <VerifyFormItemButton label="提交保存" />
      </Form>
    </div>
  );
};

export default AddAdminList;
