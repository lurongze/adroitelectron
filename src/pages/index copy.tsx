import React, { useState } from 'react';
import MainBar from '@/components/mainBar/mainBar';
import Articles from '@/components/article/articles';
import Article from '@/components/article/article';
import styles from './index.less';

function Index() {
  const [moduleKey, setModuleKey] = useState('html');
  const [articleId, setArticleId] = useState('');
  return (
    <div className={styles.body}>
      <MainBar onClickItem={(e: string) => setModuleKey(e)} />
      <Articles
        moduleKey={moduleKey}
        onClickArticle={(e: string) => {
          setArticleId(e);
        }}
      />
      <Article articleId={articleId} />
    </div>
  );
}

export default Index;
