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
import { isFuncAndRun, isEmpty } from '@/utils/helper';
import { PlusOutlined } from '@ant-design/icons';
import cloudFunc from '@/utils/cloudFunc';
import styles from './mainBar.less';

function Notes(props) {
  const {
    loading,
    dispatch,
    noteModel: { notes = [] },
  } = props;
  const inputRef = useRef(null);
  const inputNumberRef = useRef(null);
  const [list, setList] = useState([]);

  function clickRow(id) {
    let resList = list.map(s => {
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
    setList(resList);
  }

  function addRow() {
    let resList = list.map(s => ({ ...s, edit: false }));
    resList = [
      ...resList,
      {
        _id: `tmp${new Date().getTime()}`,
        title: '',
        sort: resList[resList.length - 1]?.sort || 50,
        edit: true,
      },
    ];
    setList(resList);
  }

  function removeNote(id) {
    dispatch({
      type: 'noteModel/deleteNote',
      payload: {
        id,
        success: () => {
          message.success('删除成功！');
          dispatch({
            type: 'noteModel/queryNotes',
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
        type: 'noteModel/saveNote',
        payload: {
          ...row,
          title,
          sort,
          success: () => {
            message.success('保存成功！');
            dispatch({
              type: 'noteModel/queryNotes',
            });
          },
        },
      });
    }
  }

  useEffect(() => {
    if (notes.length !== 0) {
      setList(notes.map(s => ({ ...s, edit: false })));
    }
  }, [notes]);

  const columns = [
    {
      title: '笔记名',
      key: '_id',
      width: 400,
      render(text, row) {
        if (row.edit) {
          return (
            <Input
              defaultValue={row.title}
              autoFocus
              ref={inputRef}
              style={{ width: '100%' }}
            />
          );
        }
        return row.title;
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
      width: 150,
      render(text, row) {
        let btns = [
          <a onClick={() => clickRow(row._id)} className={styles.actionItem}>
            编辑
          </a>,
          <Popconfirm
            title="确认删除吗?"
            okText="删除"
            cancelText="取消"
            onConfirm={() => removeNote(row._id)}
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
        // showHeader={false}
        search={false}
        rowKey="_id"
        toolbar={{
          title: '',
          subTitle: '我的笔记',
          actions: [
            <Button
              onClick={() => addRow()}
              key="button"
              icon={<PlusOutlined />}
              type="primary"
              disabled={list.find(s => s.edit)}
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

export default connect(({ noteModel, loading }) => ({
  noteModel,
  loading: loading.models.noteModel,
}))(Notes);
