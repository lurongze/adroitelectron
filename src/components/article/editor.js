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
import { isFuncAndRun, isEmpty } from '@/utils/helper';
import Editor from '@monaco-editor/react';
import { addArticle, updateArticle, getArticle } from '@/utils/tcb';

function Editor(props) {
  const { onSuccess, onCancel, articleId = '' } = props;

  return (
    <div style={{ flex: 1, height: '100vh' }}>
      <Editor height="90vh" language="javascript" />
    </div>
  );
}

export default Editor;
