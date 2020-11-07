import React from 'react';
import MainBar from '@/components/mainBar/mainBar';
import Article from '@/components/article/article';
import { getTreeList } from '@/utils/helper';
import styles from './index.less';
import { Link } from 'umi';

function Index() {
  return (
    <div className={styles.body}>
      <MainBar />
      <Article themeId="" />
      <div
        className={styles.title}
        onClick={() => {
          const res = getTreeList();
          console.log('treeList', res);
        }}
      >
        <Link to="/menu">Adriot Electron</Link>
      </div>
    </div>
  );
}

export default Index;
