import React, { cloneElement, ReactElement, useEffect, useState } from 'react';
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
import styles from './mainBar.less';

interface formType {
  name: string;
}
interface propsType {
  children?: ReactElement;
  onSuccess?: Function;
  onCancel?: Function;
  noteId?: string;
  global?: any;
}

const LAYOUT_FORM_LAYOUT = {
  labelCol: {
    flex: '0 0 80px',
    xs: { flex: '0 0 80px' },
    sm: { flex: '0 0 80px' },
  },
};

function Notes(props: propsType) {
  const {
    onSuccess,
    onCancel,
    noteId = '',
    global: { notes = [] },
  } = props;

  const [list, setList] = useState<Object[]>([]);
  const [editId, setEditId] = useState('');

  function removeNote(id: string) {}

  function handleChange(e: any, id: string) {
    const { value } = e.target;
  }

  function clickRow(id: string = '') {
    const resList = list.map((s: any) => {
      if (s._id === id) {
        return { ...s, edit: true };
      }
      return { ...s, edit: false };
    });
    setList(resList);
  }

  const columns = [
    {
      title: 'title',
      dataIndex: '_id',
      width: 300,
      render(text: any, row: any) {
        if (row.edit) {
          return (
            <Input
              value={row.title}
              autoFocus
              onChange={(e: any) => handleChange(e, row._id)}
              style={{ width: '100%' }}
            />
          );
        }
        return row.title;
      },
    },
    {
      title: '操作',
      dataIndex: '_id',
      align: 'right',
      render(text: any, row: any) {
        // return <a onClick={() => setEditId(row._id)}>编辑</a>;
        let btns = [
          <a onClick={() => clickRow(row._id)} className={styles.actionItem}>
            编辑
          </a>,
          <Popconfirm title="确认删除吗?" onConfirm={() => removeNote(row._id)}>
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
            <a
              onClick={() => message.success('保存！')}
              className={styles.actionItem}
            >
              保存
            </a>,
          ];
        }
        return btns;
      },
    },
  ];

  useEffect(() => {
    if (notes.length !== 0) {
      setList(notes.map((s: any) => ({ ...s, edit: false })));
    }
  }, [notes]);

  return (
    <>
      <ProTable
        columns={columns}
        dataSource={list}
        pagination={false}
        showHeader={false}
        search={false}
        toolbar={{
          title: '',
          subTitle: '我的笔记',
          actions: [
            <Button key="button" icon={<PlusOutlined />} type="primary">
              新建
            </Button>,
          ],
          settings: [],
        }}
      />
    </>
  );
}

export default connect(
  ({ global, loading }: { global: any; loading: any }) => ({
    global,
    loading: loading.models.index,
  }),
)(Notes);
