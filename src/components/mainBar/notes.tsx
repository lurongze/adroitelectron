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
} from 'antd';
import { connect } from 'umi';
import { list, listType } from '@/data/nav';
import { isFuncAndRun, isEmpty } from '@/utils/helper';
import { addNote, updateNote, getNote, removeNote } from '@/utils/tcb';

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

  const [list, setList] = useState([]);
  const [editId, setEditId] = useState('');

  const columns = [
    {
      title: 'title',
      dataIndex: '_id',
      width: 300,
      render(text, row) {
        if (editId === row._id) {
          return (
            <Input value={row.title} autoFocus style={{ width: '100%' }} />
          );
        }
        return row.title;
      },
    },
    {
      title: '操作',
      dataIndex: '_id',
      render(text, row) {
        // return <a onClick={() => setEditId(row._id)}>编辑</a>;
        let btns = [<a onClick={() => setEditId(row._id)}>编辑</a>];
        if (editId === row._id) {
          btns = [
            <a onClick={() => setEditId('')}>取消</a>,
            <a onClick={() => message.success('保存！')}>保存</a>,
          ];
        }
        btns.push(<a onClick={() => message.success('删除')}>删除</a>);
        return btns;
      },
    },
  ];

  return (
    <>
      <Button>新增笔记</Button>
      <Table
        columns={columns}
        dataSource={notes}
        pagination={false}
        showHeader={false}
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
