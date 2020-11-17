import React, { useEffect, useState } from 'react';
import { Menu, message, Tooltip } from 'antd';
import { connect } from 'umi';
import styles from './index.less';
import { SettingFilled } from '@ant-design/icons';

const { SubMenu } = Menu;

function Categories(props: any) {
  const {
    global: { showNav, currentNote },
    categoriesModel: { categories = [] },
  } = props;
  return (
    <div className={`${styles.categories} ${!showNav ? styles.hide : ''}`}>
      <div className={styles.noteHead}>
        <div className={styles.noteTitle}>
          <Tooltip  title={currentNote?.title || ''} placement='right'>
            {currentNote?.title || ''}
          </Tooltip>
        </div>
        <div className={styles.setting}>
          <SettingFilled />
        </div>
      </div>
      <Menu className={styles.menuComponent} mode="inline" theme="light">
        {categories.map((s: any) => (
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
  );
}

export default connect(
  ({
    global,
    categoriesModel,
    loading,
  }: {
    global: any;
    categoriesModel: any;
    loading: any;
  }) => ({
    global,
    categoriesModel,
    loading: loading.models.categoriesModel,
  }),
)(Categories);
