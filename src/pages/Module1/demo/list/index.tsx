import React from "react";
import {
    definePage, BaseComponent, NGLayout, NGToolBar, useRefCallback,
    safePush, borderStyle, NG
} from "ng-lib-tsx";
import {GridView} from 'ng-layout-form';
import {NGQueryPanel, NGProjectTree} from "ng-business-library";
import model from "./store";

const {Flex, Slider} = NGLayout;

function PageLayout({page}) {
    console.log(page,'page')
    const {toolbarCfg, queryCfg, tableCfg} = page.getDvaState();
    console.log(toolbarCfg,'toolbarCfg')
    /**
     * 组织树选择回调事件
     */
    const treeChangeCallback = useRefCallback((keys, orgList) => {
        console.log(orgList,'orgList')
        NG.getCmp('grid')
            .getApi()
            .setExtraParam({orgList: orgList.map(org => org.phId)});
    });

    return (
        <NGLayout>
            <NGToolBar id="toolbar" {...toolbarCfg} onClick={page.toolbarClick}/>
            <NGQueryPanel id="query" {...queryCfg} gridRef="grid"/>
            <Flex direction="row" style={borderStyle('top')}>
                <Slider><NGProjectTree id="tree" onSelectedChange={treeChangeCallback}/></Slider>
                <Flex style={borderStyle('left')}>
                    <GridView id="grid" {...tableCfg}  />
                </Flex>
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
        toolbarClick = async ({id, text}) => {
            switch (id) {
                case "add":
                    safePush('/Module1/demo/detail');
                    break;
                case "edit":
                    alert(`edit`);
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
