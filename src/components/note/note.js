import React, { useEffect, useState } from 'react';
import { Dropdown, Input, Tooltip } from 'antd';
import { isFuncAndRun, isEmpty } from '@/utils/helper';
import { Menu, message, Modal, Popover } from 'antd';
import { connect } from 'umi';
import classnames from 'classnames';
import {
  HomeFilled,
  BookFilled,
  FolderAddFilled,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import styles from '../categories/index.less';

function Note(props) {
  const {
    dispatch,
    noteModel: { notes = [] },
    global: { currentNote = {} },
  } = props;

  const [showNotes, setShowNotes] = useState(false);
  const [eidtId, setEditId] = useState('');

  function selectNote(data) {
    dispatch({
      type: 'global/selectNote',
      payload: data,
    });
    setShowNotes(false);
  }

  function saveNote(e, row) {
    const title = e.target.value;
    if (!isEmpty(title)) {
      dispatch({
        type: 'noteModel/saveNote',
        payload: {
          ...row,
          title,
          success: () => {
            message.success('保存成功！');
            dispatch({
              type: 'noteModel/queryNotes',
            });
          },
        },
      });
    }
  }

  useEffect(() => {
    dispatch({
      type: 'noteModel/queryNotes',
    });
  }, []);

  function menu(s) {
    return (
      <div className={styles.popverContainer}>
        <div
          className={styles.popverItem}
          key="1"
          onClick={() => setEditId(s._id)}
        >
          <EditOutlined />
          编辑
        </div>
        <div className={styles.popverItem} key="2">
          <DeleteOutlined />
          删除
        </div>
      </div>
    );
  }

  return (
    <div className={styles.noteHead}>
      <div
        className={styles.noteTitle}
        onClick={() => setShowNotes(!showNotes)}
      >
        {currentNote?.title || ''}
      </div>
      {showNotes && (
        <div className={styles.menuComponent}>
          {notes.map(s => (
            <div
              className={classnames(styles.menuItem, {
                [styles.current]: s._id === currentNote._id,
              })}
              title={s.title}
            >
              {eidtId === s._id ? (
                <div className={styles.menuTitle}>
                  <Input
                    defaultValue={s.title}
                    autoFocus
                    onBlur={() => setEditId('')}
                    onPressEnter={e => saveNote(e, s)}
                  />
                </div>
              ) : (
                <div
                  className={styles.menuTitle}
                  onClick={() => setCurrentCate(s._id)}
                >
                  {s.title}
                </div>
              )}
              <Popover
                placement="rightBottom"
                content={menu(s)}
                trigger="hover"
              >
                <MoreOutlined className={styles.menuIcon} />
              </Popover>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default connect(({ global, noteModel, loading }) => ({
  global,
  noteModel,
  loading: loading.models.noteModel,
}))(Note);
