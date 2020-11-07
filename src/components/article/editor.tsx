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
} from 'antd';
import { list, listType } from '@/data/nav';
import { isFuncAndRun } from '@/utils/helper';
import { addArticle } from '@/utils/tcb';

interface formType {
  name: string;
}
interface propsType {
  children?: ReactElement;
  onSuccess?: Function;
  onCancel?: Function;
}

const LAYOUT_FORM_LAYOUT = {
  labelCol: {
    flex: '0 0 80px',
    xs: { flex: '0 0 80px' },
    sm: { flex: '0 0 80px' },
  },
};

function Editor(props: propsType) {
  const { onSuccess, onCancel } = props;
  const [form] = Form.useForm();

  function onFinish(values: formType) {
    addArticle(values).then((res: Object) => {
      console.log('res', res);
      if (res?.id) {
        message.success('保存成功！');
        isFuncAndRun(onSuccess);
      }
    });
  }

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="moduleKey"
          label="所属模块"
          required
          {...LAYOUT_FORM_LAYOUT}
        >
          <Select>
            {list.map((s: listType) => (
              <Select.Option key={s.key} value={s.key}>
                {s.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="title" label="标题" required {...LAYOUT_FORM_LAYOUT}>
          <Input />
        </Form.Item>
        <Form.Item {...LAYOUT_FORM_LAYOUT}>
          <Button type="primary" onClick={() => form.submit()}>
            保存
          </Button>
          <Button onClick={() => isFuncAndRun(onCancel)}>取消</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Editor;
