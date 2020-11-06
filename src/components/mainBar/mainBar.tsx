import React, { useState } from 'react';
import list from '@/data/nav';
import styles from './mainBar.less';

interface listType {
  title: string;
}

function MainBar() {
//   const [list, setList] = useState<listType[]>([
//     { title: 'JS基础' },
//     { title: '网络' },
//     { title: '算法' },
//   ]);
  return (
    <div className={styles.mainBar}>
      <div className={styles.mainBarItem}>
        <div className={styles.logo}>泽</div>
      </div>
      <div className={styles.barList}>
        {list.map(s => (
          <div key={s.title} title={s.title} className={styles.mainBarItem}>
            <div className={styles.logo}>{s.title.substr(0,1)}</div>
          </div>
        ))}
      </div>
      <div className={styles.mainBarItem}>
        <div className={styles.logo}>设</div>
      </div>
    </div>
  );
}

export default MainBar;
