import React, { useEffect, useState } from 'react';
import { Menu, message, Empty, Button } from 'antd';

import MainBar from '@/components/mainBar/mainBar';
import Categories from '@/components/categories/categories';
import NoteList from '@/components/note/note';
import Articles from '@/components/article/articles';
import { connect } from 'umi';
import cloudFunc from '@/utils/cloudFunc';
import Login from './login';
import styles from './index.less';

function Index() {
  const [initing, setIniting] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setIniting(false);
    if (cloudFunc.checkHasLogin()) {
      setIsLogin(true);
    }
  }, []);

  return initing ? (
    <Empty description="页面初始化中..." image={Empty.PRESENTED_IMAGE_SIMPLE} />
  ) : !isLogin ? (
    <Login onLoginSuccess={() => setIsLogin(true)} />
  ) : (
    <div className={styles.body}>
      <MainBar
        onSignOut={() => {
          cloudFunc.signOut();
          setIsLogin(false);
        }}
      />
      <NoteList />
      <Categories />
      <Articles />
    </div>
  );
}

export default Index;
