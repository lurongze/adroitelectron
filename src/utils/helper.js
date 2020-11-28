// 需要插入父节点id，pid为null或''，就是找root节点，然后root节点再去找自己的子节点
export function array2Tree(data, pid, level=0) {
  let res = [];
  data.forEach(item => {
    if (item.parentId === pid) {
      let itemChildren = array2Tree(data, item._id, level+1);
      if (itemChildren.length) {
        item.children = itemChildren;
      }
      res.push({...item, level});
    }
  });
  return res;
}

export function isEmpty(val) {
  if (
    val === null ||
    typeof val === 'undefined' ||
    (typeof val === 'string' && val === '' && val !== 'undefined')
  ) {
    return true;
  }
  return false;
}

export function isFuncAndRun(func, ...params) {
  if (!isEmpty(func) && typeof func === 'function') {
    func(...params);
  }
}

export function log(...params) {
  console.log(...params);
}

export function getTreeList() {
  const list = [
    { id: 1, title: 'html5', parentId: 0 },
    { id: 2, title: 'javascript', parentId: 0 },
    { id: 3, title: 'css', parentId: 0 },
    { id: 4, title: '标签学习', parentId: 1 },
    { id: 5, title: 'header学习', parentId: 1 },
    { id: 6, title: 'flex布局', parentId: 3 },
    { id: 7, title: 'react', parentId: 2 },
    { id: 8, title: 'vue', parentId: 2 },
    { id: 9, title: 'angular', parentId: 2 },
    { id: 10, title: 'loadash', parentId: 2 },
    { id: 11, title: 'webpack', parentId: 2 },
  ];
  return array2Tree(list, 0);
}
