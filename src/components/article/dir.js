import React, { useEffect, useState } from 'react';
import styles from './index.less';

function Dir(props) {
  const { content = '' } = props;
  const [list, setList] = useState([
    '页面文件基础结构',
    '文档目的',
    '显示一下图片',
    '网络请求和请求结果数据操作',
    '页面循环，判断',
  ]);

  useEffect(() => {
    if (content) {
      const arr = content
        .split('\n')
        .filter(s => s && s.startsWith('##'))
        .map(s => s.replace('## ', ''));
      setList(arr);
    }
  }, [content]);

  return (
    <div className={styles.dirFixed}>
      {list.map(s => (
        <a key={s} className={styles.dir} href={`#${s}`}>
          <span className={styles.point}>·</span>
          {s}
        </a>
      ))}
    </div>
  );
}

export default Dir;
