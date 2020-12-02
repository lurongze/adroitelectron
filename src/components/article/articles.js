import React, { useEffect, useState } from 'react';
import { isFuncAndRun, isEmpty } from '@/utils/helper';
import { Input, message, Modal, Popover, Spin } from 'antd';
import { connect } from 'umi';
import classnames from 'classnames';
import {
  CaretDownOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  AccountBookTwoTone,
  BookOutlined,
} from '@ant-design/icons';
import styles from '../categories/index.less';

let timer = null;
function Articles(props) {
  const {
    dispatch,
    articleModel: { articles = [] },
    global: { currentNote = {}, currentCategory = {} },
    loading,
  } = props;

  const [eidtId, setEditId] = useState('');
  const [list, setList] = useState([]);
  const [currentArticle, setCurrentArticle] = useState({});

  function selectArticle(data) {
    setCurrentArticle(data);
  }

  function addArticle() {
    if (isEmpty(currentCategory?._id) || isEmpty(currentNote?._id)) {
      message.error('未选择笔记本或者分类！');
    } else {
      const emp = list.find(s => isEmpty(s.title));
      if (!emp) {
        const newId = `tmp${new Date().getTime()}`;
        const resList = [
          ...list,
          {
            _id: newId,
            title: '',
            cateId: currentCategory._id,
            noteId: currentNote._id,
            sort: list[list.length - 1]?.sort || 50,
          },
        ];
        setEditId(newId);
        setList(resList);
      }
    }
  }

  function removeArticle(s) {
    Modal.confirm({
      title: '确认删除文章吗？',
      okText: '删除',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'articleModel/deleteArticle',
          payload: {
            id: s._id,
            success: () => {
              message.success('删除成功！');
              dispatch({
                type: 'articleModel/queryArticles',
              });
            },
          },
        });
      },
    });
  }

  function saveArticle(e, row) {
    const title = e.target.value;
    if (!isEmpty(title)) {
      setEditId('');
      dispatch({
        type: 'articleModel/saveArticle',
        payload: {
          ...row,
          title,
          success: () => {
            message.success('保存成功！');
            dispatch({
              type: 'articleModel/queryArticles',
              payload: {
                cateId: currentCategory._id,
              },
            });
          },
        },
      });
    }
  }

  function handleBlur() {
    setEditId('');
    setList(list.filter(s => !isEmpty(s.title)));
  }

  function handleClick(s) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      selectArticle(s);
    }, 200);
  }

  function hanldDbClick(id) {
    timer && clearTimeout(timer);
    setEditId(id);
  }

  useEffect(() => {
    if (!isEmpty(currentCategory?._id)) {
      dispatch({
        type: 'articleModel/queryArticles',
        payload: {
          cateId: currentCategory._id,
        },
      });
    }
  }, [currentCategory]);

  useEffect(() => {
    setList(articles);
  }, [articles]);

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
          onClick={() => {
            removeArticle(s);
          }}
        >
          <DeleteOutlined />
          删除
        </div>
      </div>
    );
  }

  return (
    <div className={styles.menuComponent}>
      <div className={classnames(styles.menuItem, styles.absoluteItem)}>
        <div
          onClick={() => {
            addArticle();
          }}
          className={styles.menuTitle}
        >
          <PlusOutlined style={{ margin: '0 5px' }} />
          新增文章
        </div>
      </div>
      <Spin spinning={loading}>
        {list.map(s => (
          <div
            key={s._id}
            className={classnames(styles.menuItem, {
              [styles.current]: s._id === currentArticle._id,
            })}
            title={s.title}
          >
            {eidtId === s._id ? (
              <div className={styles.menuTitle}>
                <Input
                  defaultValue={s.title}
                  autoFocus
                  onBlur={() => handleBlur()}
                  onPressEnter={e => saveArticle(e, s)}
                />
              </div>
            ) : (
              <div
                className={styles.menuTitle}
                onClick={() => handleClick(s)}
                onDoubleClick={() => hanldDbClick(s._id)}
              >
                <BookOutlined style={{ margin: '0 5px' }} />
                {s.title}
              </div>
            )}
            <Popover placement="rightBottom" content={menu(s)} trigger="hover">
              <MoreOutlined className={styles.menuIcon} />
            </Popover>
          </div>
        ))}
      </Spin>
    </div>
  );
}

export default connect(({ global, articleModel, loading }) => ({
  global,
  articleModel,
  loading: loading.models.articleModel,
}))(Articles);
