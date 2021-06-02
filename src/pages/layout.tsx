import {Layout} from 'antd';
import React, {CSSProperties, useEffect, useState} from 'react';
import LeftMenu from '@/components/leftMenu';
import TopHeader from '@/components/topHeader';
import './layout.less'

const sliderStyle: CSSProperties = {
  overflow: 'auto',
  height: '100%'
};

const logStyle: CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  lineHeight: '32px',
  cursor: 'pointer',
  transition: 'padding .2s'
};

const titleStyle: CSSProperties = {
  display: 'inline-block',
  height: '32px',
  margin: 0,
  color: '#fff',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '32px',
  verticalAlign: 'middle',
  animation: 'fade-in',
  animationDuration: '.2s',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const headStyle: CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '48px',
  lineHeight: '48px',
  padding: '0 16px',
  boxShadow: 'rgb(0 21 41 / 8%) 0px 1px 4px'
};

const addAnimationend = (el, callback) => {
  const events = ['transitionend', 'animationend'];
  events.forEach((eventName) =>
      el.addEventListener(eventName, callback, false),
  );
  return () => {
    events.forEach((eventName) =>
        el.removeEventListener(eventName, callback, false),
    );
  };
};

export default (props) => {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState((prevState) => ({
      ...prevState,
      collapsed: !prevState.collapsed,
    }));
  };

  useEffect(() => {
    let iT: any = null;
    const el = document.querySelector('.ant-layout-sider');
    return addAnimationend(el, (e) => {
      if (e.target === el) {
        // 屏蔽子元素冒泡事件触发
        iT && clearTimeout(iT);
        iT = setTimeout(() => {
          // 事件节流
          iT = null;
          window.dispatchEvent(new Event('resize')); // 触发resize事件，确保第三方插件能够及时更新视图
        }, 60);
      }
    });
  }, []);

  return (
      <Layout style={{height: '100vh'}}>
        <Layout.Sider
            breakpoint="xs"
            style={sliderStyle}
            trigger={null}
            collapsible
            collapsed={state.collapsed}
        >
          <div style={logStyle}>
            <h1 style={titleStyle}>ngreact</h1>
          </div>
          <LeftMenu pathname={props.location.pathname}/>
        </Layout.Sider>
        <Layout className="flex-column">
          <Layout.Header style={headStyle}>
            <TopHeader toggle={toggle} collapsed={state.collapsed} pathname={props.location.pathname}/>
          </Layout.Header>
          <Layout.Content style={{flex: 1, overflow: 'hidden auto', backgroundColor:'var(--component-background)'}}>
            {props.children}
          </Layout.Content>
        </Layout>
      </Layout>
  );
};
