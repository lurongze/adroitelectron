import React, { useEffect, useState, Fragment } from 'react';
import { Menu, message, Tooltip, Modal, Popover } from 'antd';
import { connect } from 'umi';
import classnames from 'classnames';
import { isFuncAndRun, isEmpty, array2Tree } from '@/utils/helper';
import {
  CaretDownOutlined,
  CarOutlined,
  SettingFilled,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import NoteList from '../note/note';
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
  const [showNotes, setShowNotes] = useState(false);
  const [currentCate, setCurrentCate] = useState('');

  function toogleMenu(e, id, isIn, len = 0) {
    if (!!len) {
      e.stopPropagation();
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

  const menu = (
    <div className={styles.popverContainer}>
      <div className={styles.popverItem} key="1">
        <EditOutlined />
        编辑
      </div>
      <div className={styles.popverItem} key="2">
        <DeleteOutlined />
        删除
      </div>
    </div>
  );

  function treeRender(treeData) {
    return treeData.map(s => {
      const inHideList = hideList.includes(s._id);
      const children = s?.children || [];
      const childrenLen = children.length;
      return (
        <Fragment key={s._id}>
          <div
            className={classnames(styles.menuItem, {
              [styles.current]: s._id === currentCate,
            })}
            title={s.title}
          >
            <CaretDownOutlined
              onClick={e => toogleMenu(e, s._id, inHideList, childrenLen)}
              className={classnames(styles.menuIcon, {
                [styles.hidden]: !childrenLen,
                [styles.up]: inHideList,
              })}
              style={{ marginLeft: `${s.level * 15}px` }}
            />
            <div
              className={styles.menuTitle}
              onClick={() => setCurrentCate(s._id)}
            >
              {s.title}
            </div>
            <Popover placement="rightBottom" content={menu} trigger="click">
              <MoreOutlined className={styles.menuIcon} />
            </Popover>
          </div>
          <div
            className={classnames(styles.subMenu, {
              [styles.hidden]: inHideList,
            })}
          >
            {treeRender(children)}
          </div>
        </Fragment>
      );
    });
  }

  return (
    <>
      <div className={`${styles.categories} ${!showNav ? styles.hide : ''}`}>
        <NoteList />
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
