import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { isFuncAndRun } from '@/utils/helper';
import { getArticles } from '@/utils/tcb';
import AddArticle from './add';
import styles from './index.less';

function Articles(props) {
  const { moduleKey = '', onClickArticle } = props;
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);

  function getArticleList(key) {
    if (!loading) {
      setLoading(true);
      getArticles(key)
        .then(res => {
          setList(res?.data || []);
        })
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    if (moduleKey) {
      getArticleList(moduleKey);
    }
  }, [moduleKey]);

  return (
    <div className={styles.articleBlock}>
      <div className={styles.articleList}>
        {list.map((s, i) => (
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
              {i + 1}.{s.title}
            </div>
          </AddArticle>
        ))}
      </div>
    </div>
  );
}

export default Articles;
