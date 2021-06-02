import {Menu, Spin} from 'antd';
import React, {memo, useEffect, useState} from 'react';
import {history} from 'umi';
import routeConfig from '../../../route';

const routeMap = new Map();

function menuClick({key}) {
  history.push(key);
}

function hasName(childRoutes) {
  return childRoutes.some(({children, routes, name}) => {
    if (name) return true;
    if (children || routes) {
      return hasName(children || routes);
    }
    return false;
  });
}

/**
 * 递归生成左侧菜单项
 * @param menus 菜单配置
 * @param key 唯一标识
 * @param parentKeys 父级keys
 */
const createMenuItems = (menus, key = 'menu', parentKeys: any = []) => {
  const items: any = [];
  menus.forEach(({children, routes, path, name}, index) => {
    if (name) {
      const menuChildren = children || routes;
      if (menuChildren && menuChildren.length > 0 && hasName(menuChildren)) {
        const mKey = `${key  }_${  index}`;
        items.push(
            <Menu.SubMenu
                key={mKey}
                title={name}
            >
              {createMenuItems(menuChildren, mKey, [...parentKeys, mKey])}
            </Menu.SubMenu>
        );
      } else {
        routeMap.set(path, parentKeys);
        items.push(
            <Menu.Item key={path}>
              {name}
            </Menu.Item>
        );
      }
    }
  });
  return items;
};

/**
 * 菜单初始状态
 * @param pathname 路由
 */
const initMenuSelected: any = (pathname) => {
  return {
    selectKeys: [pathname] || [],
    openKeys: routeMap.get(pathname) || [],
  };
};

/**
 * 生成菜单及状态
 * @param pathname 路由
 * @param menus 菜单配置项
 */
const initMenus = (pathname, menus) => {
  const menuArray = createMenuItems(menus);
  return {
    menus: menuArray,
    ...initMenuSelected(pathname),
  };
};

/**
 * 导出左侧菜单树
 */
export default memo(({pathname}: any) => {
  const [state] = useState(() => initMenus(pathname, routeConfig));

  const [selectedKeys, setSelectedKeys] = useState([pathname]);

  useEffect(() => {
    if (routeMap.has(pathname)) {
      setSelectedKeys([pathname]);
    }
  }, [pathname]);

  return state.menus ? (
      <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={state.openKeys}
          defaultSelectedKeys={state.selectKeys}
          onClick={menuClick}
      >
        {state.menus}
      </Menu>
  ) : (
      <div style={{textAlign: 'center', marginTop: '20px'}}>
        <Spin/>
      </div>
  );
});
