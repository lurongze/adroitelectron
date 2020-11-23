import React, { cloneElement, ReactElement, useEffect, useState } from 'react';
import { Input, Modal, message } from 'antd';
import { isFuncAndRun } from '@/utils/helper';
import Editor from './editor';

function AddArticle(props) {
  const { children, onSuccess, edit = false, articleId = '' } = props;
  const [visible, setVisible] = useState(false);

  return (
    <>
      {edit
        ? cloneElement(children, {
            onDoubleClick: () => {
              setVisible(true);
            },
          })
        : cloneElement(children, {
            onClick: () => {
              setVisible(true);
            },
          })}
      <Modal
        closable={false}
        footer={null}
        visible={visible}
        destroyOnClose
        onCancel={() => setVisible(false)}
        width="80vw"
      >
        <Editor
          articleId={articleId}
          onSuccess={() => {
            setVisible(false);
            isFuncAndRun(onSuccess);
          }}
          onCancel={() => setVisible(false)}
        />
      </Modal>
    </>
  );
}

export default AddArticle;
