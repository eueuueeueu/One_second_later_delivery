import {
  GoBackTitle,
  VerifyFormItemButton,
  VerifyFormItemInput,
} from '@/components';
import { history, useLocation } from '@umijs/max';
import { Form, message } from 'antd';
import qs from 'qs';
import { FC, useEffect } from 'react';
import { AdminDatum } from '../type';
import { editAdmin } from './api';

// 添加管理员表单提交
const onFinish = (values: any) => {
  // console.log('Submitted values:', values);
  editAdmin({ ...values }).then((res) => {
    if (res.code !== 200) return message.error(res.msg);
    message.success(res.msg);
    history.push('/user/admins');
  });
};
const EditAdminList: FC = () => {
  const location = useLocation();
  const params = qs.parse(location.search.slice(1)) as unknown as AdminDatum;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      adminName: params.adminName,
      realName: params.realName,
      mobileNumber: params.mobileNumber,
      status: params.status,
      adminNo: params.adminNo,
    });
  }, []);
  return (
    <div className="w-[800px] mx-auto p-6 bg-white">
      <GoBackTitle title="修改管理员" />
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <VerifyFormItemInput name="adminName" label="账户名称" />
        <VerifyFormItemInput name="realName" label="真实姓名" />
        <VerifyFormItemInput
          name="adminNo"
          label="管理员编号(不显示,请求参数需要)"
          className="hidden"
        />
        <VerifyFormItemInput
          name="mobileNumber"
          label="手机号"
          pattern={/^1[3-9]\d{9}$/}
          maxLength={11}
        />
        {/* 提交按钮 */}
        <VerifyFormItemButton label="提交保存" />
      </Form>
    </div>
  );
};

export default EditAdminList;
