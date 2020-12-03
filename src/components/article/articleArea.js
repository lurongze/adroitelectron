import React, { useState } from 'react';
import Editor from '@/components/article/editor';
import Article from '@/components/article/article';

function ArticleArea(props) {
  const [viewContent, setViewContent] = useState(true);

  return viewContent ? (
    <Article
      onClickEdit={() => {
        setViewContent(false);
      }}
    />
  ) : (
    <Editor
      onSaveSuccess={() => {
        setViewContent(true);
      }}
    />
  );
}

export default ArticleArea;
