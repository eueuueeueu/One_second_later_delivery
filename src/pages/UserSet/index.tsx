import { changeUserInfo, uploadSts } from '@/services';
import { useAppSelector } from '@/store';
import {
  CameraOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Form, Input, message, Upload, UploadProps } from 'antd';
import { FC, useState } from 'react';

interface FormValue {
  mobile: string;
  realName: string;
}

const UserSet: FC = () => {
  const [form] = Form.useForm();
  const userInfo = useAppSelector((state) => state.user);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  // 提交逻辑
  const onFinish = (values: FormValue) => {
    console.log('Submitted values:', values);
    // 这里调用用户信息更新接口
    changeUserInfo({
      avatarUrl: avatarUrl,
      mobileNumber: values.mobile,
      realName: values.realName,
    });
  };

  // 上传参数配置
  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl);
      const isValidFormat = ['image/jpeg', 'image/png', 'image/webp'].includes(
        file.type,
      );
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isValidFormat) {
        message.error('不支持的文件格式!');
        return Upload.LIST_IGNORE;
      }
      if (!isLt2M) {
        message.error('文件大小不能超过2MB!');
        return Upload.LIST_IGNORE;
      }
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      // reader.onload = () => {
      //   setAvatarUrl(reader.result as string);
      // };
      uploadSts(reader.result).then((res) => {
        console.log(res);
      });
      return false;
    },
    showUploadList: false,
  };
  return (
    <PageContainer
      title="个人信息设置"
      extra={[
        <Button key="back" onClick={() => history.push('/home')}>
          返回首页
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={userInfo}
        onFinish={onFinish}
        className="w-[600px]"
      >
        {/* 头像上传 */}
        <Form.Item label="头像：" className="text-center">
          <Upload {...uploadProps}>
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mx-auto mb-2 hover:border-purple-500 cursor-pointer">
              {userInfo.avatarUrl ? (
                <img
                  src={userInfo.avatarUrl}
                  alt="avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <CameraOutlined className="text-3xl text-gray-400" />
              )}
            </div>
          </Upload>
          <div className="text-gray-500 text-sm">
            上传格式.jpg .jpeg .png .webp
            <br />
            最大限制2MB
          </div>
        </Form.Item>

        {/* 真实姓名 */}
        <Form.Item
          label={
            <span className="font-medium">
              真实姓名：<span className="text-red-500">*</span>
            </span>
          }
          name="realName"
          rules={[{ required: true, message: '请输入真实姓名' }]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="请输入真实姓名"
            size="large"
          />
        </Form.Item>

        {/* 手机号 */}
        <Form.Item
          label={
            <span className="font-medium">
              手机号：<span className="text-red-500">*</span>
            </span>
          }
          name="mobile"
          rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
          ]}
        >
          <Input
            prefix={<MobileOutlined className="text-gray-400" />}
            placeholder="请输入手机号"
            size="large"
            maxLength={11}
          />
        </Form.Item>

        {/* 提交按钮 */}
        <Form.Item className="text-center ">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="bg-[#7b1fa2] hover:!bg-[#6a1b9a]"
            style={{
              borderColor: '#7b1fa2',
              boxShadow: '#6a1b9a',
              // '--antd-wave-shadow-color': '#6a1b9a',
            }}
          >
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};
export default UserSet;
