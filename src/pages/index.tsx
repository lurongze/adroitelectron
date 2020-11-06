import React from 'react';
import MainBar from '@/components/mainBar/mainBar';
import Menu from '@/components/menu/menu';
import styles from './index.less';

function Index() {
  return (
    <div className={styles.body}>
      <MainBar />
      <Menu />
      <div className={styles.title}>Adriot Electron</div>
    </div>
  );
}

export default Index;
