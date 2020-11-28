import React, { useEffect, useState, Fragment } from 'react';
import { Menu, message, Tooltip, Modal } from 'antd';
import { connect } from 'umi';
import classnames from 'classnames';
import { isFuncAndRun, isEmpty, array2Tree } from '@/utils/helper';
import {
  CaretDownOutlined,
  CarOutlined,
  SettingFilled,
} from '@ant-design/icons';
import ManageCategories from './manageCategories';
import styles from './index.less';

const { SubMenu } = Menu;

function Categories(props) {
  const {
    dispatch,
    global: { showNav, currentNote },
    categoriesModel: { categories = [] },
  } = props;
  const [visible, setVisible] = useState(false);
  const [treeList, setTreeList] = useState([]);
  const [hideList, setHideList] = useState([]);

  function toogleMenu(id, isIn, len = 0) {
    if (!!len) {
      let resList = [];
      if (isIn) {
        resList = hideList.filter(s => s !== id);
      } else {
        resList = [...hideList, id];
      }
      setHideList(resList);
    }
  }

  useEffect(() => {
    dispatch({
      type: 'categoriesModel/queryCategories',
    });
  }, []);

  useEffect(() => {
    if (categories) {
      const resList = array2Tree(categories, '');
      setTreeList(resList);
    }
  }, [categories]);

  function treeRender(treeData) {
    return treeData.map(s => {
      const inHideList = hideList.includes(s._id);
      const children = s?.children || [];
      const childrenLen = children.length;
      return (
        <div key={s._id}>
          <div
            className={styles.menuItem}
            title={s.title + s._id}
            onClick={() => toogleMenu(s._id, inHideList, childrenLen)}
          >
            <CaretDownOutlined
              className={classnames(styles.menuIcon, {
                [styles.hidden]: !childrenLen,
              })}
              style={{ marginLeft: `${s.level * 15}px` }}
            />
            {s.title}
            {s._id}
          </div>
          {/* {!inHideList && treeRender(children)} */}
          <div className={classnames(styles.subMenu,{
            [styles.hidden]:inHideList
          })}>
            {treeRender(children)}
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div className={`${styles.categories} ${!showNav ? styles.hide : ''}`}>
        <div className={styles.noteHead}>
          <div className={styles.noteTitle}>
            <Tooltip title={currentNote?.title || ''} placement="right">
              {currentNote?.title || ''}
            </Tooltip>
          </div>
          <div className={styles.setting}>
            <SettingFilled onClick={() => setVisible(true)} />
          </div>
        </div>
        <div className={styles.menuComponent}>{treeRender(treeList)}</div>
      </div>
      <Modal
        closable={false}
        footer={null}
        visible={visible}
        destroyOnClose
        width="80vw"
        onCancel={() => setVisible(false)}
      >
        <ManageCategories
          onSuccess={() => {
            setVisible(false);
          }}
          onCancel={() => setVisible(false)}
        />
      </Modal>
    </>
  );
}

export default connect(({ global, categoriesModel, loading }) => ({
  global,
  categoriesModel,
  loading: loading.models.categoriesModel,
}))(Categories);
