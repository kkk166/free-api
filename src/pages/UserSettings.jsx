import React from 'react';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const UserSettings = () => {
  return (
    <Result
      icon={<SmileOutlined />}
      title="个人设置已迁移"
      subTitle="个人资料与修改密码功能已移至右上角头像下拉菜单"
      extra={
        <Button type="primary" onClick={() => window.history.back()}>
          返回
        </Button>
      }
    />
  );
};

export default UserSettings;
