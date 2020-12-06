import React, { useEffect, useState } from 'react';
import styles from './index.less';

function Dir(props) {
  const { content = '' } = props;
  const [list, setList] = useState([]);

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
