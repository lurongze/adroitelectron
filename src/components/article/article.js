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
  FileTextOutlined,
  BookOutlined,
} from '@ant-design/icons';
import styles from './index.less';

function Article(props) {
  const {
    dispatch,
    articleModel: { articles = [] },
    global: { currentNote = {}, currentCategory = {}, currentArticle = {} },
    loading = false,
  } = props;

  return (
    <div className={classnames(styles.articleContent)}>articleContent</div>
  );
}

export default connect(({ global, articleModel, loading }) => ({
  global,
  articleModel,
  loading: loading.models.articleModel,
}))(Article);
