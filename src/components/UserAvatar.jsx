import React from 'react';
import { Card, Avatar, Upload, Button } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { message } from 'antd';

const UserAvatar = () => {
  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      message.success('头像上传成功！');
    } else if (info.file.status === 'error') {
      message.error('头像上传失败！');
    }
  };

  return (
    <Card title="个人头像">
      <div className="avatar-section">
        <Avatar 
          size={120} 
          src="https://weavefox.alipay.com/api/bolt/unsplash_image?keyword=person+avatar&width=200&height=200&random=avatar_200_200"
          icon={<UserOutlined />}
        />
        <Upload
          name="avatar"
          listType="picture"
          showUploadList={false}
          onChange={handleAvatarChange}
          customRequest={({ onSuccess }) => {
            setTimeout(() => {
              onSuccess('ok');
            }, 1000);
          }}
        >
          <Button icon={<UploadOutlined />} style={{ marginTop: 16 }}>
            更换头像
          </Button>
        </Upload>
      </div>
    </Card>
  );
};

export default UserAvatar;
