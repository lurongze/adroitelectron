import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { getArticles } from '@/utils/tcb';
import styles from './index.less';

interface listType {
  title: string;
  _id: string;
  articleId: string;
}
interface propsType {
  articleId: string;
}

function Article(props: propsType) {
  const { articleId = '' } = props;
  const [list, setList] = useState<listType[]>([]);
  const [selected, setSelected] = useState<string>('');

  function getArticleList(key: string) {
    getArticles(key).then((res: any) => {
      console.log('getArticleList', res);
      setList(res?.data || []);
    });
  }

  useEffect(() => {
    if (articleId) {
      getArticleList(articleId);
    }
  }, [articleId]);

  return (
    <div className={styles.articleContent}>
      <div className={styles.articleTitle}>
        标题
      </div>
    </div>
  );
}

export default Article;
