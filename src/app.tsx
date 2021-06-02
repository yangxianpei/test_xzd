import React from 'react';
import {dynamic} from 'umi';
import routeConfig from '../route';
import {NGMessage, NG, NGRootContainer} from "ng-lib-tsx";
import { injectBusinessComponents } from 'ng-business-library';

injectBusinessComponents();

const loadingCpt = require('@/components/pageLoading').default;

export const dva = {
    config: {
        onError(e: Error) {
            NGMessage.error(e.message, 3).then();
        },
    },
};

/**
 * antd 汉化
 * @param container 根组件
 */
export function rootContainer(container) {
    return <NGRootContainer>{container}</NGRootContainer>;
}

/**
 * 动态加载页面组件
 * webpackExclude不要删除，该配置可以屏蔽加载多余的依赖，
 * 详情可以参考： https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import
 * @param path 组件路径
 */
function loadComponent(path) {
    const realPath = path.replace('@', '');
    return dynamic({
        loader: () =>
            import(
                /* webpackExclude: /\.*\.(ts|ejs|js|json|css|less|scss)$/, webpackChunkName:'p' */
                `@/pages/${realPath}`
                ),
        loading: loadingCpt,
    });
}

/**
 * 格式化路由
 * @param menus 路由数组
 */
function parseRoute(menus) {
    const newRoutes: any = [];
    menus.forEach(({path, name, component, children, routes}) => {
        const routeChild = children || routes;
        if (component) {
            const route: any = {
                exact: true,
                path,
                title: name,
                component: loadComponent(component)
            };
            if (routeChild && routeChild.length > 0) {
                route.routes = parseRoute(routeChild);
                route.exact = false;
            }
            newRoutes.push(route);
        } else if (routeChild && routeChild.length > 0) {
            Array.prototype.push.apply(newRoutes, parseRoute(routeChild));
        }
    });
    return newRoutes;
}

/**
 * 动态修改路由
 * @param routes 默认路由
 */
export function patchRoutes({routes}) {
    const childRoutes = parseRoute(routeConfig);
    const routeLen = routes.length;
    if (routeLen > 0) {
        routes[routeLen - 1].routes = childRoutes;
    } else {
        Array.prototype.push.apply(routes, childRoutes);
    }
    if (childRoutes.length > 0 && routeLen === 1) {
        routes.unshift({path: '/', exact: true, redirect: childRoutes[0].path});
    }
}

/**
 * 在初始加载和路由切换时做一些事情
 */
export function onRouteChange() {
}

/**
 * 初始化数据， 配合 useModel('@@initialState') 获取初始值
 */
export async function getInitialState() {
    return {user: NG.getUser()};
}
