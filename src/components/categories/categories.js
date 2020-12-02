import React, { useEffect, useState, Fragment } from 'react';
import { Menu, message, Tooltip, Modal, Popover, Input, Spin } from 'antd';
import { connect } from 'umi';
import classnames from 'classnames';
import { isFuncAndRun, isEmpty, array2Tree } from '@/utils/helper';
import {
  CaretDownOutlined,
  CarOutlined,
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import NoteList from '../note/note';
import Articles from '../article/articles';
import ManageCategories from './manageCategories';
import styles from './index.less';

let timer = null;
function Categories(props) {
  const {
    dispatch,
    loading,
    global: { showNav, currentNote },
    categoriesModel: { categories = [] },
  } = props;
  const [visible, setVisible] = useState(false);
  const [treeList, setTreeList] = useState([]);
  const [hideList, setHideList] = useState([]);
  const [currentCate, setCurrentCate] = useState('');
  const [storeList, setStoreList] = useState([]);
  const [editId, setEditId] = useState('');

  function storeAndSetList(resList = []) {
    const resTree = array2Tree(resList, '');
    const resStoreList = resList.map(s => ({ ...s, children: undefined }));
    setStoreList(resStoreList);
    setTreeList(resTree);
    console.log('storeAndSetList', resStoreList, resTree);
  }

  function addRow(parentId = '') {
    if (currentNote?._id) {
      const _id = `tmp${new Date().getTime()}`;
      const resList = [
        ...storeList,
        {
          _id,
          title: '',
          parentId,
          noteId: currentNote._id,
          sort: 50,
        },
      ];
      setEditId(_id);
      storeAndSetList(resList);
    } else {
      message.error('未选择笔记！');
    }
  }

  function handleBlur() {
    setEditId('');
    const resList = storeList.filter(s => !isEmpty(s.title));
    storeAndSetList(resList);
  }

  function saveCategory(e, row) {
    const title = e.target.value;
    if (!isEmpty(title)) {
      setEditId('');
      dispatch({
        type: 'categoriesModel/saveCategory',
        payload: {
          ...row,
          title,
          success: () => {
            message.success('保存成功！');
            dispatch({
              type: 'categoriesModel/queryCategories',
              payload: currentNote._id,
            });
          },
        },
      });
    }
  }

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

  function hanldeClick(s) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      setCurrentCate(s._id);
      dispatch({
        type: 'global/selectCategory',
        payload: s
      })
    }, 200);
  }

  function hanldDbClick(id) {
    timer && clearTimeout(timer);
    setEditId(id);
  }

  function removeCategory(s) {
    const { id, children = [] } = s;
    if (children.length) {
      message.error('分类下还有子分类，无法删除');
    } else {
      Modal.confirm({
        title: '确认删除分类吗？',
        okText: '删除',
        cancelText: '取消',
        onOk: () => {
          dispatch({
            type: 'categoriesModel/deleteCategory',
            payload: {
              id,
              success: () => {
                message.success('删除成功！');
                dispatch({
                  type: 'categoriesModel/queryCategories',
                  payload: currentNote._id,
                });
              },
            },
          });
        },
      });
    }
  }

  useEffect(() => {
    if (currentNote?._id) {
      dispatch({
        type: 'categoriesModel/queryCategories',
        payload: currentNote._id,
      });
    }
  }, [currentNote]);

  useEffect(() => {
    storeAndSetList(categories);
  }, [categories]);

  function menu(s) {
    return (
      <div className={styles.popverContainer}>
        <div
          className={styles.popverItem}
          key="1"
          onClick={() => setEditId(s._id)}
        >
          <EditOutlined />
          编辑
        </div>
        <div
          className={styles.popverItem}
          key="2"
          onClick={() => addRow(s._id)}
        >
          <PlusOutlined />
          新增下级
        </div>
        <div
          className={styles.popverItem}
          key="3"
          onClick={() => removeCategory(s)}
        >
          <DeleteOutlined />
          删除
        </div>
      </div>
    );
  }

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
            {editId === s._id ? (
              <div className={styles.menuTitle}>
                <Input
                  defaultValue={s.title}
                  autoFocus
                  onBlur={() => handleBlur()}
                  onPressEnter={e => saveCategory(e, s)}
                />
              </div>
            ) : (
              <>
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
                  onClick={() => hanldeClick(s)}
                  onDoubleClick={() => hanldDbClick(s._id)}
                >
                  {s.title}
                </div>
              </>
            )}
            <Popover placement="rightBottom" content={menu(s)} trigger="hover">
              <MoreOutlined
                className={styles.menuIcon}
                style={{ margin: '0 5px' }}
              />
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
      <div className={styles.menuComponent}>
        <div className={classnames(styles.menuItem, styles.absoluteItem)}>
          <div className={styles.menuTitle} onClick={() => addRow('')}>
            <PlusOutlined style={{ margin: '0 5px' }} />
            新增分类
          </div>
        </div>
        <Spin spinning={loading}>{treeRender(treeList)}</Spin>
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
