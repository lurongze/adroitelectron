import React, { useState } from 'react';
import MainBar from '@/components/mainBar/mainBar';
import Articles from @/components/article/articleses';
import { getTreeList } from '@/utils/helper';
import styles from './index.less';
import { Link } from 'umi';

function Index() {
  const [moduleKey, setModuleKey] = useState('');
  return (
    <div className={styles.body}>
      <MainBar onClickItem={(e:string) => setModuleKey(e)} />
      <Article moduleKey={moduleKey} />
      <div className={styles.content}>
        <div className=>标题</div>
        <div>内容</div>
        <div>编辑器</div>
      </div>
    </div>
  );
}

export default Index;
