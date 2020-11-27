import React, { useRef, ReactElement, useEffect, useState } from 'react';
import {
  Input,
  Menu,
  Form,
  message,
  Button,
  Tree,
  Cascader,
  TreeSelect,
  Select,
  InputNumber,
  Table,
  Popconfirm,
} from 'antd';
import { connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import { isFuncAndRun, isEmpty, array2Tree } from '@/utils/helper';
import { PlusOutlined } from '@ant-design/icons';
import cloudFunc from '@/utils/cloudFunc';
import styles from './index.less';

function ManageCategories(props) {
  const {
    loading,
    dispatch,
    categoriesModel: { categories = [] },
  } = props;
  const inputRef = useRef(null);
  const inputNumberRef = useRef(null);
  const [list, setList] = useState([]);
  const [storeList, setStoreList] = useState([]);

  function storeAndSetList(resList = []) {
    const treeList = array2Tree(resList, '');
    setStoreList(resList.map(s => ({ ...s, children: undefined })));
    setList(treeList);
  }

  function clickRow(id) {
    let resList = [...storeList].map(s => {
      if (s._id === id) {
        return { ...s, edit: true };
      }
      return { ...s, edit: false };
    });
    if (isEmpty(id)) {
      resList = resList.filter(s => {
        if (s._id.startsWith('tmp') && isEmpty(s.title)) {
          return false;
        }
        return true;
      });
    }
    storeAndSetList(resList);
  }

  function addRow(parentId = '') {
    const _id = `tmp${new Date().getTime()}`;
    const resList = [
      ...storeList,
      {
        _id,
        title: '',
        parentId,
        sort: 50,
        edit: true,
      },
    ];
    storeAndSetList(resList);
  }

  function removeCategory(id) {
    dispatch({
      type: 'categoriesModel/deleteCategory',
      payload: {
        id,
        success: () => {
          message.success('删除成功！');
          dispatch({
            type: 'categoriesModel/queryCategories',
          });
        },
      },
    });
  }

  function saveRow(row) {
    const title = inputRef?.current?.state?.value || '';
    const sort = inputNumberRef?.current?.state?.value || 50;
    if (!isEmpty(title)) {
      dispatch({
        type: 'categoriesModel/saveCategory',
        payload: {
          ...row,
          title,
          sort,
          success: () => {
            message.success('保存成功！');
            dispatch({
              type: 'categoriesModel/queryCategories',
            });
          },
        },
      });
    }
  }

  useEffect(() => {
    if (categories.length !== 0) {
      const resList = categories.map(s => ({ ...s, edit: false }));
      storeAndSetList(resList);
    }
  }, [categories]);

  const columns = [
    {
      title: '分类名',
      key: '_id',
      width: 600,
      className: styles.rowTr,
      render(text, row) {
        if (row.edit) {
          return (
            <Input
              defaultValue={row.title}
              autoFocus
              ref={inputRef}
              style={{ flex: 1 }}
            />
          );
        }
        return row.title || '';
      },
    },
    {
      title: '排序',
      key: '_id',
      width: 100,
      render(text, row) {
        if (row.edit) {
          return (
            <InputNumber
              defaultValue={row.sort}
              ref={inputNumberRef}
              style={{ width: '100%' }}
            />
          );
        }
        return row.sort;
      },
    },
    {
      title: '操作',
      key: '_id',
      align: 'center',
      width: 250,
      render(text, row) {
        let btns = [
          <a onClick={() => addRow(row._id)} className={styles.actionItem}>
            新增子类
          </a>,
          <a onClick={() => clickRow(row._id)} className={styles.actionItem}>
            编辑
          </a>,
          <Popconfirm
            title="确认删除吗?"
            okText="删除"
            cancelText="取消"
            onConfirm={() => removeCategory(row._id)}
          >
            <a className={styles.actionItem} style={{ color: '#ff4d4f' }}>
              删除
            </a>
          </Popconfirm>,
        ];
        if (row.edit) {
          btns = [
            <a onClick={() => clickRow('')} className={styles.actionItem}>
              取消
            </a>,
            <a onClick={() => saveRow(row)} className={styles.actionItem}>
              保存
            </a>,
          ];
        }
        return btns;
      },
    },
  ];

  return (
    <>
      <ProTable
        columns={columns}
        loading={loading}
        dataSource={list}
        pagination={false}
        search={false}
        expandable={{
          defaultExpandAllRows: true,
          expandedRowKeys: storeList.map(s => s._id),
        }}
        rowKey="_id"
        toolbar={{
          title: '',
          subTitle: '分类管理',
          actions: [
            <Button
              onClick={() => addRow()}
              key="button"
              icon={<PlusOutlined />}
              type="primary"
              disabled={storeList.find(s => s.edit)}
            >
              新建
            </Button>,
          ],
          settings: [],
        }}
      />
    </>
  );
}

export default connect(({ categoriesModel, loading }) => ({
  categoriesModel,
  loading: loading.models.categoriesModel,
}))(ManageCategories);
