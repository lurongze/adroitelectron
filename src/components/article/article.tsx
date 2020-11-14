import React, { useEffect, useState } from 'react';
import { Button, Empty, Input, message } from 'antd';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { isEmpty } from '@/utils/helper';
import { getArticle } from '@/utils/tcb';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { light } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'github-markdown-css/github-markdown.css';
import styles from './index.less';
import { PageLoading } from '@ant-design/pro-layout';

const renderers = {
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter style={light} language={language} children={value} />
    );
  },
};

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
  const [loading, setLoading] = useState(false);

  function getArticleData(id: string) {
    if (!loading) {
      setLoading(true);
      getArticle(id)
        .then((res: any) => {
          if (res?.data && res.data.length !== 0) {
            const record = res.data[0];
            setContent(record.content);
          }
        })
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    if (!isEmpty(articleId)) {
      getArticleData(articleId);
    }
  }, [articleId]);

  return (
    <div className={styles.articleContent}>
      {isEmpty(content) && !loading && (
        <Empty description="暂无数据" style={{ marginTop: '30%' }} />
      )}
      {loading && <PageLoading />}
      {!isEmpty(content) && (
        <ReactMarkdown
          className="markdown-body"
          renderers={renderers}
          plugins={[gfm]}
          children={content}
        />
      )}
    </div>
  );
}

export default Article;
