import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import cloudFunc from '@/utils/cloudFunc';
import RenderNote from '@/components/categories/renderNote';
import styles from './index.less';

function NoteSite(props) {
  const {
    global: { currentNote = {}, showNav },
    match: {
      params: { id = '', title = '' },
    },
  } = props;

  console.log('props', props);

  return (
    <div className={styles.body}>
      <RenderNote noteId={id} title={title} />
    </div>
  );
}

export default connect(({ global }) => ({
  global,
}))(NoteSite);
