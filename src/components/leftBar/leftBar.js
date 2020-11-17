import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { isFuncAndRun } from '@/utils/helper';
import { Menu, message, Modal } from 'antd';
import { connect } from 'umi';
import {
  HomeFilled,
  BookFilled,
  FolderAddFilled,
} from '@ant-design/icons';
import styles from './leftBar.less';


function LeftBar(props) {
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
    <div className={styles.leftBar}>
      <div className={styles.barItem}>
        <BookFilled />
      </div>
    </div>
  );
}

export default connect(
  ({
    global,
    noteModel,
    loading,
  }) => ({
    global,
    noteModel,
    loading: loading.models.noteModel,
  }),
)(LeftBar);
