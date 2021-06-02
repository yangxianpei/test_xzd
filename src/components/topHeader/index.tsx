import React, { useMemo, FC, useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserAddOutlined } from '@ant-design/icons';
import { useSelector } from 'umi';
import routeConfig from '../../../route';
import { NGLayout } from 'ng-lib-tsx';
import DropMenu from '../dropMenu';

import './index.less'

function getRouteInfo(pathname, routes) {
    if (!(routes && routes.length)) {
        return null;
    }
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].path === pathname) {
            return routes[i];
        }
        const route = getRouteInfo(pathname, routes[i].children);
        if (route) {
            return route;
        }
    }
    return null;
}

interface IHeader {
    toggle: () => void;
    collapsed: boolean;
    pathname: string;
}

const TopHeader: FC<IHeader> = ({ toggle, collapsed, pathname }) => {
    const state = useSelector<any, any>(m => m.model_global);
    const route = useMemo(() => getRouteInfo(pathname, routeConfig), [pathname]);
    const [flag, setFlag] = useState(false)
    return (
        <NGLayout direction="row" style={{ alignItems: 'center', height: '100%' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                style: { fontSize: '18px', marginRight: 20 },
                onClick: toggle,
            })}
            {/* <NGLayout.Flex style={{overflow: 'hidden', whiteSpace: "nowrap", textOverflow: "ellipsis", marginRight: 20}}>
                <span>当前页面信息：{JSON.stringify(route)}</span>
            </NGLayout.Flex> */}
            {/* <div>
                <div style={{textAlign: 'right', flex: 1}}>
                    {state.userId}
                </div>
            </div> */}
            <div>
                <DropMenu />
            </div>
        </NGLayout>
    );
};

export default TopHeader;
