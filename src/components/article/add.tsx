import React, { cloneElement, ReactElement, useEffect, useState } from 'react';
import { Input, Modal, message } from 'antd';
import Editor from './editor';

interface propsType {
  children: ReactElement;
}

function AddArticle(props: propsType) {
  const { children } = props;
  const [visible, setVisible] = useState(false);

  return (
    <>
      {cloneElement(children, {
        onClick: () => {
          setVisible(true);
        },
      })}
      <Modal
        closable={false}
        footer={null}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <Editor onSuccess={()=>setVisible(false)} onCancel={()=>setVisible(false)} />
      </Modal>
    </>
  );
}

export default AddArticle;
