import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { isFuncAndRun } from '@/utils/helper';
import { Menu, message, Modal } from 'antd';
import { connect } from 'umi';
import {
  HomeFilled,
  BookFilled,
  FolderAddFilled,
  LogoutOutlined,
} from '@ant-design/icons';
import Notes from './notes';
import styles from './mainBar.less';

const { SubMenu } = Menu;

function MainBar(props) {
  const {
    dispatch,
    onSignOut,
    noteModel: { notes = [] },
    global: { currentNote = '' },
  } = props;
  const [openKeys, setOpenKeys] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'noteModel/queryNotes',
    });
  }, []);

  return (
    <>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[currentNote?._id || '']}
        openKeys={openKeys}
        inlineCollapsed={true}
        style={{ width: '60px', height: '100vh' }}
      >
        <Menu.Item
          key="1"
          onClick={() => {
            setOpenKeys([]);
            dispatch({
              type: 'global/toggleNav',
            });
          }}
          title={null}
        >
          <HomeFilled style={{ color: 'goldenrod' }} />
        </Menu.Item>
        <SubMenu
          key="2"
          title={<BookFilled />}
          onTitleClick={() => {
            if (openKeys.length !== 0) {
              setOpenKeys([]);
            } else {
              setOpenKeys(['2']);
            }
          }}
        >
          {notes.map(s => (
            <Menu.Item
              key={s._id}
              onClick={() => {
                setOpenKeys([]);
                localStorage.setItem('selectedNote', JSON.stringify(s));
                dispatch({
                  type: 'global/selectNote',
                  payload: s,
                });
              }}
            >
              {s.title}
            </Menu.Item>
          ))}
        </SubMenu>
        <Menu.Item
          key="3"
          title="新增笔记"
          onClick={() => {
            setOpenKeys([]);
            setVisible(true);
          }}
        >
          <FolderAddFilled />
        </Menu.Item>
        <Menu.Item
          key="4"
          title="退出登录"
          onClick={() => {
            Modal.confirm({
              title: '确认退出登录吗？',
              okText: '退出',
              cancelText: '取消',
              onOk: () => {
                isFuncAndRun(onSignOut);
              },
            });
          }}
        >
          <LogoutOutlined />
        </Menu.Item>
      </Menu>
      <Modal
        closable={false}
        footer={null}
        visible={visible}
        destroyOnClose
        onCancel={() => setVisible(false)}
      >
        <Notes
          onSuccess={() => {
            setVisible(false);
          }}
          onCancel={() => setVisible(false)}
        />
      </Modal>
    </>
  );
}

export default connect(({ global, noteModel, loading }) => ({
  global,
  noteModel,
  loading: loading.models.noteModel,
}))(MainBar);
