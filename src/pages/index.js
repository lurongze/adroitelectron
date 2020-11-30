import React, { useEffect, useState } from 'react';
import { Menu, message, Empty, Button } from 'antd';

import MainBar from '@/components/mainBar/mainBar';
import Categories from '@/components/categories/categories';
import { connect } from 'umi';
import cloudFunc from '@/utils/cloudFunc';
import styles from './index.less';

function Index() {
  const [initing, setIniting] = useState(true);
  const [code, setCode] = useState('');
  useEffect(() => {
    cloudFunc.isLogin();
  }, []);

  if (initing) {
    return (
      <>
        <Button
          style={{ margin: '50px 15px' }}
          onClick={() => {
            cloudFunc.signUpWithEmailAndPassword();
          }}
        >
          注册邮箱
        </Button>
        <Button
          style={{ margin: '50px 15px' }}
          onClick={() => {
            cloudFunc.signInWithEmailAndPassword(() => {
              setIniting(false);
            });
          }}
        >
          邮箱登录
        </Button>
      </>
    );
  }

  // if (initing) {
  //   return (
  //     <Empty
  //       description="页面初始化中..."
  //       image={Empty.PRESENTED_IMAGE_SIMPLE}
  //     />
  //   );
  // }

  return (
    <div className={styles.body}>
      <MainBar />
      <Categories />
    </div>
  );
}

export default Index;
