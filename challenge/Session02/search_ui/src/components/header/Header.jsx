import React from 'react';
import { Button, Avatar, Typography } from 'antd';
import { ExportOutlined, UserOutlined } from '@ant-design/icons';
import logo from './logo.png';
import './Header.css';

const { Text } = Typography;

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="user-info">
        <Avatar className="user-avatar" icon={<UserOutlined />} />
        <Text className="username">Elizabeth Lincoln</Text>

        <Button
          type="text"
          icon={<ExportOutlined
            className='logout-icon'
          />}
          className="logout-button"
        >
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
