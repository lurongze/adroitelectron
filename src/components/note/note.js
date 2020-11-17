import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { isFuncAndRun } from '@/utils/helper';
import { Menu, message, Modal } from 'antd';
import { connect } from 'umi';
import { HomeFilled, BookFilled, FolderAddFilled, PlusOutlined } from '@ant-design/icons';
import styles from './leftBar.less';

function Note(props) {
  const {
    dispatch,
    noteModel: { notes = [] },
    global: { currentNote = '' },
  } = props;

  useEffect(() => {
    dispatch({
      type: 'noteModel/queryNotes',
    });
  }, []);

  return (
    <div className={styles.note}>
      <div className={styles.title}>高级前端进阶</div>
      <div className={style.noteList}>
        {notes.map(s => (
          <div key={s._id}>{s.title}</div>
        ))}
      </div>
      <div><PlusOutlined />新增笔记</div>
    </div>
  );
}

export default connect(({ global, noteModel, loading }) => ({
  global,
  noteModel,
  loading: loading.models.noteModel,
}))(Note);
