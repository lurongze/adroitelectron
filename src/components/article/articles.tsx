import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { isFuncAndRun } from '@/utils/helper';
import { getArticles } from '@/utils/tcb';
import AddArticle from './add';
import styles from './index.less';

interface listType {
  title: string;
  _id: string;
  moduleKey: string;
}
interface propsType {
  moduleKey: string;
  onClickArticle?: Function;
}

function Articles(props: propsType) {
  const { moduleKey = '', onClickArticle } = props;
  const [list, setList] = useState<listType[]>([]);
  const [selected, setSelected] = useState<string>('');

  function getArticleList(key: string) {
    getArticles(key).then((res: any) => {
      setList(res?.data || []);
    });
  }

  useEffect(() => {
    console.log('moduleKey', moduleKey);
    if (moduleKey) {
      getArticleList(moduleKey);
    }
  }, [moduleKey]);

  return (
    <div className={styles.articleBlock}>
      <div className={styles.articleList}>
        {list.map((s: listType, i) => (
          <AddArticle
            onSuccess={() => getArticleList(moduleKey)}
            edit
            articleId={s._id}
            key={s._id}
          >
            <div
              onClick={() => {
                setSelected(s._id);
                isFuncAndRun(onClickArticle, s._id);
              }}
              className={`${styles.articleItem} ${
                s._id === selected ? styles.selected : ''
              }`}
            >
              {i+1}.{s.title}
            </div>
          </AddArticle>
        ))}
      </div>
    </div>
  );
}

export default Articles;
