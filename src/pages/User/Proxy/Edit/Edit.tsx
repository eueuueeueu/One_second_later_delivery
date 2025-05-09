import {
  GoBackTitle,
  VerifyFormItemButton,
  VerifyFormItemInput,
  VerifyFormItemRadio,
} from '@/components';
import { history, useLocation } from '@umijs/max';
import { Form, message } from 'antd';
import qs from 'qs';
import { FC, useEffect } from 'react';
import { ProxyDatum } from '../List/type';
import { editProxy } from './api';

// 修改代理表单提交
const onFinish = (values: any) => {
  // console.log('Submitted values:', values);
  editProxy({ ...values }).then((res) => {
    if (res.code !== 200) return message.error(res.msg);
    message.success(res.msg);
    history.push('/user/admin');
  });
};
const EditProxyList: FC = () => {
  const location = useLocation();
  const params = qs.parse(location.search.slice(1)) as unknown as ProxyDatum;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      agentAccount: params.agentAccount,
      realName: params.realName,
      mobileNumber: params.mobileNumber,
      status: params.status,
      agentNo: params.agentNo,
    });
  }, []);
  return (
    <div className="max-w-[800px] mx-auto p-6 bg-white">
      <GoBackTitle title="修改代理" />
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <VerifyFormItemInput name="agentAccount" label="账户名称" />
        <VerifyFormItemInput name="realName" label="真实姓名" />
        <VerifyFormItemInput
          name="agentNo"
          label="代理编号(不显示,请求参数需要)"
          className="hidden"
        />
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

export default EditProxyList;
