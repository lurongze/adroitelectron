import React, { useEffect, useState } from 'react';
import { Menu, message } from 'antd';
import MainBar from '@/components/mainBar/mainBar';
import { getArticle } from '@/utils/tcb';

const { SubMenu } = Menu;

function Index() {
  const [moduleKey, setModuleKey] = useState('html');
  const [articleId, setArticleId] = useState('');

  useEffect(() => {
    console.log('index useEffect');
  }, []);
  return (
    <div style={{ display: 'flex' }}>
      <MainBar />
      <Menu
        style={{ width: '256px', height: '100vh' }}
        mode="inline"
        theme="light"
      >
        <Menu.Item key="1" onDoubleClick={() => message.success('成功！')}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="2">Navigation Two</Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span onDoubleClick={() => message.success('弹层！')}>
              Navigation Two
            </span>
          }
        >
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
          <SubMenu key="sub1-2" title="Submenu">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub2" title="Navigation Three">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
        </SubMenu>
        <Menu.Item key="link">
          <a
            href="https://ant.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ant Design
          </a>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Index;
