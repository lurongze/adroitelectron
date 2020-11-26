import React, { useEffect, useState } from 'react';
import { Menu, message, Tooltip, Modal } from 'antd';
import { connect } from 'umi';
import { SettingFilled } from '@ant-design/icons';
import ManageCategories from './manageCategories';
import styles from './index.less';

const { SubMenu } = Menu;

function Categories(props) {
  const {
    global: { showNav, currentNote },
    categoriesModel: { categories = [] },
  } = props;
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className={`${styles.categories} ${!showNav ? styles.hide : ''}`}>
        <div className={styles.noteHead}>
          <div className={styles.noteTitle}>
            <Tooltip title={currentNote?.title || ''} placement="right">
              {currentNote?.title || ''}
            </Tooltip>
          </div>
          <div className={styles.setting}>
            <SettingFilled onClick={() => setVisible(true)} />
          </div>
        </div>
        <Menu className={styles.menuComponent} mode="inline" theme="light">
          {categories.map(s => (
            <Menu.Item key={s.title}>N{s.title}</Menu.Item>
          ))}
          <Menu.Item key="2">Navigation Two</Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span onDoubleClick={() => message.success('弹层！')}>
                Navigation Two
              </span>
            }
          >
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
            <SubMenu key="sub1-2" title="Submenu">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub2" title="Navigation Three">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
      <Modal
        closable={false}
        footer={null}
        visible={visible}
        destroyOnClose
        onCancel={() => setVisible(false)}
      >
        <ManageCategories
          onSuccess={() => {
            setVisible(false);
          }}
          onCancel={() => setVisible(false)}
        />
      </Modal>
    </>
  );
}

export default connect(({ global, categoriesModel, loading }) => ({
  global,
  categoriesModel,
  loading: loading.models.categoriesModel,
}))(Categories);
