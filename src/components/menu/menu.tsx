import React, { useEffect, useState } from 'react';
import styles from './menu.less';

interface listType {
  title: string;
}
interface propsType {
  themeId: string;
}

function Menu(props: propsType) {
  const { themeId = '' } = props;
  const [list, setList] = useState<listType[]>([
    { title: 'JS基础' },
    { title: '网络' },
    { title: '算法' },
  ]);
  const [selected, setSelected] = useState<number>(-1);

  function getMenuList() {
    console.log('getMenuList');
  }

  useEffect(() => {
    getMenuList();
  }, [themeId]);

  return (
    <div className={styles.menuBlock}>
      <div className={styles.menuList}>
        {Array.from(new Array(100).keys()).map((s: number) => (
          <div
            onClick={() => setSelected(s)}
            className={`${styles.menuItem} ${
              s === selected ? styles.selected : ''
            }`}
            key={s}
          >
            文件传输助手
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
