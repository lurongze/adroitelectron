import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { isFuncAndRun } from '@/utils/helper';
import AddArticle from '@/components/article/add';
import { list, listType } from '@/data/nav';
import styles from './mainBar.less';

interface propsType {
  onClickItem: Function;
}

function MainBar(props: propsType) {
  const { onClickItem } = props;

  function handleClickItem(key: string) {
    isFuncAndRun(onClickItem, key);
  }

  return (
    <div className={styles.mainBar}>
      <div className={styles.mainBarItem}>
        <div className={styles.logo}>泽</div>
      </div>
      <div className={styles.barList}>
        {list.map((s: listType) => (
          <div key={s.key} className={styles.mainBarItem}>
            <Tooltip title={s.title} placement="right">
              <div
                onClick={() => handleClickItem(s.key)}
                className={styles.logo}
              >
                {s.title.substr(0, 1)}
              </div>
            </Tooltip>
          </div>
        ))}
      </div>
      <div className={styles.mainBarItem}>
        <AddArticle>
          <div className={styles.logo}>设</div>
        </AddArticle>
      </div>
    </div>
  );
}

export default MainBar;
