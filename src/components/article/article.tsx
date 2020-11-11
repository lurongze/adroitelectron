import React, { useEffect, useState } from 'react';
import { Button, Empty, Input, message } from 'antd';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { isEmpty } from '@/utils/helper';
import { getArticle } from '@/utils/tcb';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const renderers = {
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter style={dark} language={language} children={value} />
    );
  },
};
import styles from './index.less';

interface listType {
  title: string;
  _id: string;
  articleId: string;
}
interface propsType {
  articleId: string;
}

function Article(props: propsType) {
  const { articleId = '' } = props;
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(false);
  const [codeEdit, setCodeEdit] = useState(false);

  function getArticleData(id: string) {
    getArticle(id).then((res: any) => {
      if (res?.data && res.data.length !== 0) {
        const record = res.data[0];
        setContent(record.content);
      }
    });
  }

  useEffect(() => {
    if (!isEmpty(articleId)) {
      getArticleData(articleId);
    }
  }, [articleId]);

  return (
    <div
      className={styles.articleContent}
      onDoubleClick={() => setVisible(true)}
      onClick={() => {
        if (visible) {
          setVisible(false);
        }
      }}
    >
      <div
        className={`${styles.toolHeader} ${
          visible ? styles.show : styles.hide
        }`}
      >
        <Button onClick={() => setCodeEdit(true)}>修改</Button>
        <Button>保存</Button>
        <Button
          onClick={() => {
            setVisible(false);
            setCodeEdit(false);
          }}
        >
          取消
        </Button>
      </div>
      {isEmpty(content) && (
        <Empty description="暂无数据" style={{ marginTop: '30%' }} />
      )}
      {!isEmpty(content) && !codeEdit && (
        <ReactMarkdown
          renderers={renderers}
          plugins={[gfm]}
          children={content}
        />
      )}
      {!isEmpty(content) && codeEdit && (
        <Input.TextArea
          style={{ width: '100%', height: '100%' }}
          defaultValue={content}
        />
      )}
    </div>
  );
}

export default Article;
