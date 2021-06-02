import React from "react";
import {definePage, BaseComponent, NGLayout, NGToolBar} from "ng-lib-tsx";
import {FormLayout} from 'ng-layout-form';
import model from "./store";

const {Flex} = NGLayout;

function PageLayout({page}) {
    const {toolbarCfg, formCfg} = page.getDvaState();
    return (
        <NGLayout>
            <NGToolBar id="toolbar" buttons={toolbarCfg.buttons} onClick={page.toolbarClick}/>
            <Flex>
                <FormLayout id="form" {...formCfg}/>
            </Flex>
        </NGLayout>
    );
}

/**
 * model数据层自动和page组件绑定
 * this.umiDispatch 执行effects方法更新数据状态
 */
export default definePage({
    model,
    component: class extends BaseComponent {
        /**
         * toolbar点击事件(箭头函数解决react事件绑定导致作用域丢失的问题)
         */
        toolbarClick = ({id, text}) => {
            switch (id) {
                case "save":
                    alert(`保存`);
                    break;
                default:
                    alert(`${id}:${text}`);
                    break;
            }
        };

        render() {
            return <PageLayout page={this}/>;
        }
    }
});
