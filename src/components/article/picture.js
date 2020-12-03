import React, { useState, useEffect, cloneElement } from 'react';
import { Button, Drawer, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createPictureUrl } from '@/utils/helper';
import cloudFunc from '@/utils/cloudFunc';
import ImgCrop from 'antd-img-crop';
import classnames from 'classnames';

import styles from './index.less';

function Picture(props) {
  const { dispatch, children } = props;
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const uploadProps = {
    name: 'file',
    beforeUpload: file => {
      console.log('beforeUpload', file);
      setLoading(true);
      const cloudPath = createPictureUrl(file);
      cloudFunc
        .uploadPicture(cloudPath, file)
        .then(res => {
          if (res?.fileID) {
            cloudFunc
              .getPictureURL(res.fileID)
              .then(res1 => {
                if (res1?.url && res1?.fileID) {
                  cloudFunc.savePicture(res1).then(res2 => {
                    // console.log('getPictureURL', res2);
                    message.success('上传成功！');
                    setLoading(false);
                    setList([{ url: res1.url }, ...list]);
                  });
                } else {
                  setLoading(false);
                }
              })
              .catch(() => setLoading(false));
          }
        })
        .catch(() => setLoading(false));
      return false;
    },
  };

  useEffect(() => {
    cloudFunc.queryPicture().then(res => {
      console.log('res', res);
      setList(res.data);
    });
  }, []);

  return (
    <>
      {cloneElement(children, {
        onClick() {
          setVisible(true);
        },
      })}
      <Drawer
        width="40vw"
        visible={visible}
        handler={null}
        closable={null}
        onClose={() => setVisible(false)}
        bodyStyle={{ padding: 0 }}
      >
        <div className={styles.pictureBlock}>
          {list.map(s => (
            <img className={styles.pictureItem} src={s.url} />
          ))}
        </div>

        <div className={styles.footer}>
          <ImgCrop
            quality={1}
            rotate
            modalTitle="图片处理"
            modalOk="确定"
            modalCancel="取消"
          >
            <Upload {...uploadProps}>
              <Button
                className={styles.button}
                type="primary"
                icon={<UploadOutlined />}
              >
                裁剪上传
              </Button>
            </Upload>
          </ImgCrop>
          <Upload {...uploadProps}>
            <Button
              className={styles.button}
              type="primary"
              icon={<UploadOutlined />}
            >
              原图上传
            </Button>
          </Upload>
          <Button className={styles.button}>取消</Button>
          <Button className={styles.button}>上一页</Button>
          <Button className={styles.button}>下一页</Button>
        </div>
      </Drawer>
    </>
  );
}

export default Picture;
