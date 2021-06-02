import { Menu, Dropdown } from 'antd';
import { DownOutlined,UserAddOutlined } from '@ant-design/icons';

const menu = (
    <Menu>
        <Menu.Item key="0">
            <span>1</span>
        </Menu.Item>
        <Menu.Item key="1">
            <span>1</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);

export default function (props: any) {
    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <UserAddOutlined></UserAddOutlined>
                <DownOutlined />
            </a>
        </Dropdown>
    )
}