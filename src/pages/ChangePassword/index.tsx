import { updatePwd } from '@/services';
import { LockOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';

interface FormValue {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const [form] = Form.useForm();
  // 提交——修改密码
  const onFinish = (values: FormValue) => {
    updatePwd({
      oldpwd: values.oldPassword,
      adminPwd: values.newPassword,
      confirmPwd: values.confirmPassword,
    }).then((res) => {
      message.info(res.msg);
    });
  };
  return (
    <PageContainer
      title="修改密码"
      extra={[
        <Button key="back" onClick={() => history.push('/home')}>
          返回首页
        </Button>,
      ]}
    >
      {/* 密码修改表单 */}
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        className="w-[500px]"
      >
        {/* 旧密码 */}
        <Form.Item
          label={
            <span className="font-medium">
              旧密码：<span className="text-red-500">*</span>
            </span>
          }
          name="oldPassword"
          rules={[{ required: true, message: '请输入旧密码' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="请输入旧密码"
            size="large"
          />
        </Form.Item>

        {/* 新密码 */}
        <Form.Item
          label={
            <span className="font-medium">
              新密码：<span className="text-red-500">*</span>
            </span>
          }
          name="newPassword"
          rules={[{ required: true, message: '请输入新密码' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="请输入新密码"
            size="large"
          />
        </Form.Item>

        {/* 确认密码 */}
        <Form.Item
          label={
            <span className="font-medium">
              确认密码：<span className="text-red-500">*</span>
            </span>
          }
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: '请再次输入密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="请再次输入密码"
            size="large"
          />
        </Form.Item>

        {/* 提交按钮 */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className=" bg-[#955ce6] hover:!bg-[#ae77f1]"
          >
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};
export default ChangePassword;
