import React, { useEffect, useState } from 'react';
import { Menu, message, Empty } from 'antd';
import LeftBar from '@/components/leftBar/leftBar';
import Categories from '@/components/categories/categories';
import { connect } from 'umi';
import cloudFunc from '@/utils/cloudFunc';
import styles from './index.less';

function Index() {
  const [initing, setIniting] = useState(true);

  useEffect(() => {
    cloudFunc.signIn(() => setIniting(false));
  }, []);
  if (initing) {
    return (
      <Empty
        description="页面初始化中..."
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }
  return (
    <div className={styles.body}>
      <LeftBar />
    </div>
  );
}

export default Index;
