import React, { useEffect, useState } from 'react';
import { Menu, message, Empty, Button } from 'antd';
import classnames from 'classnames';
import MainBar from '@/components/mainBar/mainBar';
import Categories from '@/components/categories/categories';
import NoteList from '@/components/note/note';
import Articles from '@/components/article/articles';
import { connect } from 'umi';
import cloudFunc from '@/utils/cloudFunc';
import Login from './login';
import styles from './index.less';

function Index(props) {
  const {
    global: { currentNote = {} },
  } = props;
  const [initing, setIniting] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
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
      <div className={styles.colNav}>
        <div
          className={styles.noteTitle}
          onClick={() => setShowNotes(!showNotes)}
        >
          当前笔记：{currentNote?.title || '未选择笔记'}
        </div>
        <div className={classnames(styles.moveNav, styles.noteNav, {
          [styles.show]: showNotes
        })}>
          <NoteList />
        </div>
        <div className={classnames(styles.moveNav, styles.cateNav,{
          [styles.show]: !showNotes
        })}>
          <Categories />
        </div>
      </div>

      <div className={styles.colNav}>
        <Articles />
      </div>
    </div>
  );
}

export default connect(({ global }) => ({
  global,
}))(Index);
