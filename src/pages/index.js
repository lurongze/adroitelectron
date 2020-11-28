import React, { useEffect, useState } from 'react';
import { Menu, message, Empty } from 'antd';
import Editor from '@monaco-editor/react';
import { DiffEditor as MonacoDiffEditor } from '@monaco-editor/react';
import MainBar from '@/components/mainBar/mainBar';
import Categories from '@/components/categories/categories';
import { connect } from 'umi';
import cloudFunc from '@/utils/cloudFunc';
import styles from './index.less';

function Index() {
  const [initing, setIniting] = useState(true);
  const [code, setCode] = useState('');
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
      <MainBar />
      <Categories />
      <div style={{ flex: 1, height: '100vh' }}>
        <Editor height="90vh" language="javascript" />
      </div>
      {/* <MonacoDiffEditor height="90vh" language="javascript" /> */}
    </div>
  );
}

export default Index;
