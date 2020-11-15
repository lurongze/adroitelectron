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
} from 'antd';
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
}

const LAYOUT_FORM_LAYOUT = {
  labelCol: {
    flex: '0 0 80px',
    xs: { flex: '0 0 80px' },
    sm: { flex: '0 0 80px' },
  },
};

function Editor(props: propsType) {
  const { onSuccess, onCancel, noteId = '' } = props;
  const [form] = Form.useForm();

  function onFinish(values: formType) {
    if (!isEmpty(noteId)) {
      updateNote(noteId, values).then((res: any) => {
        if (res?.updated) {
          message.success('保存成功！');
          isFuncAndRun(onSuccess);
        }
      });
    } else {
      addNote(values).then((res: any) => {
        if (res?.id) {
          message.success('保存成功！');
          isFuncAndRun(onSuccess);
        }
      });
    }
  }

  function getNoteData(id: string) {
    getNote(id).then((res: any) => {
      if (res?.data && res.data.length !== 0) {
        const record = res.data[0];
        form.setFieldsValue(record);
      }
    });
  }

  useEffect(() => {
    if (!isEmpty(noteId)) {
      getNoteData(noteId);
    }
  }, [noteId]);

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="title"
          label="笔记标题"
          required
          {...LAYOUT_FORM_LAYOUT}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="笔记描述"
          required
          {...LAYOUT_FORM_LAYOUT}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="sort" label="排序" required {...LAYOUT_FORM_LAYOUT}>
          <InputNumber defaultValue={50} />
        </Form.Item>
        <Form.Item {...LAYOUT_FORM_LAYOUT}>
          <div
            style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
          >
            <Button
              style={{ margin: '0 10px' }}
              type="primary"
              onClick={() => form.submit()}
            >
              保存
            </Button>
            <Button
              style={{ margin: '0 10px' }}
              type="primary"
              danger
              onClick={() => {
                removeNote(noteId).then((res: any) => {
                  if (res?.deleted) {
                    message.success('删除成功！');
                    isFuncAndRun(onSuccess);
                  }
                });
              }}
            >
              删除
            </Button>
            <Button
              style={{ margin: '0 10px' }}
              onClick={() => isFuncAndRun(onCancel)}
            >
              取消
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}

export default Editor;
