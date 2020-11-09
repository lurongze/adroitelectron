import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { getArticles } from '@/utils/tcb';
import styles from './index.less';

interface listType {
  title: string;
  _id: string;
  moduleKey: string;
}
interface propsType {
  moduleKey: string;
}

function Article(props: propsType) {
  const { moduleKey = '' } = props;
  const [list, setList] = useState<listType[]>([]);
  const [selected, setSelected] = useState<string>('');

  function getArticleList(key: string) {
    getArticles(key).then((res: Object) => {
      console.log('getArticleList', res);
      setList(res?.data || []);
    });
  }

  useEffect(() => {
    if (moduleKey) {
      getArticleList(moduleKey);
    }
  }, [moduleKey]);

  return (
    <div className={styles.menuBlock}>
      <div className={styles.menuList}>
        {list.map((s: listType) => (
          <div
            onClick={() => setSelected(s._id)}
            className={`${styles.menuItem} ${
              s._id === selected ? styles.selected : ''
            }`}
            key={s._id}
          >
            {s.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Article;
