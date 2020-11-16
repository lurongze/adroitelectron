import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { isFuncAndRun } from '@/utils/helper';
import { Menu, message, Modal } from 'antd';
import { connect } from 'umi';
import {
  HomeFilled,
  BookFilled,
  FolderAddFilled,
  EditFilled,
} from '@ant-design/icons';
import { getNotes } from '@/utils/tcb';
import Notes from './notes';
import styles from './mainBar.less';

const { SubMenu } = Menu;

interface propsType {
  onClickItem?: Function;
  global?: any;
  dispatch?: any;
}
interface listType {
  _id: string;
  title: string;
}

function MainBar(props: propsType) {
  const {
    onClickItem,
    dispatch,
    global: { notes = [] },
  } = props;
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [noteId, setNoteId] = useState<string>('');
  const [list, setList] = useState<listType[]>([]);
  const [selectedNote, setSelectedNote] = useState<string>('');

  function handleClickItem(key: string) {
    isFuncAndRun(onClickItem, key);
  }

  useEffect(() => {
    console.log('global/queryNotes');
    dispatch({
      type: 'global/queryNotes',
    });
  }, []);

  return (
    <>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[selectedNote]}
        openKeys={openKeys}
        inlineCollapsed={true}
        style={{ width: '60px', height: '100vh' }}
      >
        <Menu.Item
          key="1"
          onClick={() => {
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
          {notes.map((s: listType) => (
            <Menu.Item key={s._id} onClick={() => setSelectedNote(s._id)}>
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

export default connect(
  ({ global, loading }: { global: any; loading: any }) => ({
    global,
    loading: loading.models.index,
  }),
)(MainBar);
