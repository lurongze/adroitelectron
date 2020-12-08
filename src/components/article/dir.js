import React, { useEffect, useState } from 'react';
import classname from 'classnames';
import styles from './index.less';

function Dir(props) {
  const { content = '' } = props;
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState('');

  useEffect(()=>{
    var io = new IntersectionObserver(entries => {
      console.log(entries);
    }, {});
    list.map(s=>{
      // io.observe(document.getElementById(s))
      console.log('document.getElementById(s)', s,document.getElementById(s));
    });
    // return ()=>{
    //   list.map(s=>{
    //     io.unobserve(document.getElementById(s))
    //   });
    // }
  },[list]);

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
        <a
          key={s}
          className={classname(styles.dir, {
            [styles.active]: current === s,
          })}
          onClick={()=>setCurrent(s)}
          href={`#${s}`}
          title={s}
        >
          {s}
        </a>
      ))}
    </div>
  );
}

export default Dir;
