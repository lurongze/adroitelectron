import React, { useEffect, useState } from 'react';
import { isFuncAndRun, isEmpty } from '@/utils/helper';
import { Input, message, Modal, Popover, Spin } from 'antd';
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
import { removeNote } from '@/utils/tcb';

function Note(props) {
  const {
    dispatch,
    noteModel: { notes = [] },
    global: { currentNote = {} },
    loading,
  } = props;

  const [showNotes, setShowNotes] = useState(false);
  const [eidtId, setEditId] = useState('');
  const [list, setList] = useState([]);

  function selectNote(data) {
    dispatch({
      type: 'global/selectNote',
      payload: data,
    });
    setShowNotes(false);
  }

  function addNote() {
    const emp = list.find(s => isEmpty(s.title));
    if (!emp) {
      const newId = `tmp${new Date().getTime()}`;
      const resList = [
        ...list,
        {
          _id: newId,
          title: '',
          sort: list[list.length - 1]?.sort || 50,
          edit: true,
        },
      ];
      setEditId(newId);
      setList(resList);
    }
  }


  function removeNote(s){
    Modal.confirm({
      title: '确认删除笔记吗？',
      onOk:()=>{
        dispatch({
          type: 'noteModel/deleteNote',
          payload: {
            id: s._id,
            success: () => {
              message.success('sh成功！');
              dispatch({
                type: 'noteModel/queryNotes',
              });
            },
          },
        });
      }
    })
  }

  function saveNote(e, row) {
    const title = e.target.value;
    if (!isEmpty(title)) {
      setEditId('');
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

  function handleBlur() {
    setEditId('');
    setList(list.filter(s => !isEmpty(s.title)));
  }

  useEffect(() => {
    dispatch({
      type: 'noteModel/queryNotes',
    });
  }, []);

  useEffect(() => {
    if (notes.length) {
      setList(notes);
    }
  }, [notes]);

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
        <div className={styles.popverItem} key="2" onClick={()=>{
          removeNote(s);
        }}>
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
        <Spin spinning={loading}>
          <div className={styles.menuComponent}>
            <div className={classnames(styles.menuItem, styles.absoluteItem)}>
              <div
                onClick={() => {
                  addNote();
                }}
                className={styles.menuTitle}
              >
                <PlusOutlined style={{ margin: '0 15px' }} />
                新增笔记
              </div>
            </div>
            {list.map(s => (
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
                      onBlur={() => handleBlur()}
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
        </Spin>
      )}
    </div>
  );
}

export default connect(({ global, noteModel, loading }) => ({
  global,
  noteModel,
  loading: loading.models.noteModel,
}))(Note);
