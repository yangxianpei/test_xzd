import { Button } from 'antd';
import { getHelpInfo } from './service'
import { useEffect } from 'react'
import {
    NGLayout, definePage, BaseComponent, borderStyle
} from "ng-lib-tsx";
import model from './store'
import { NGQueryPanel, NGProjectTree } from "ng-business-library";
import { GridView } from 'ng-layout-form';

const Record = [
    {
        PhId: 122,
        IsParent: '你猜1',
        IsSelfComp: true,
        InvestPer: '55',
        BadfinPer: false,
        ProfitPer: '测试1',
        BeginDate: '13:30:56',
        SerCode: 1,
        DwCode: '2104-01-14 13:30:56',
        RelOrgId: '23423423423',
        hiddenContainer: '测试数据',
    },
    {
        PhId: 2342,
        IsParent: '你猜2',
        IsSelfComp: true,
        InvestPer: '55',
        BadfinPer: false,
        ProfitPer: '测试2',
        BeginDate: '13:30:56',
        SerCode: 1,
        DwCode: '2104-01-14 13:30:56',
        RelOrgId: '23423423423',
        hiddenContainer: '测试数据',
    }
]
const data = { Record: Record, totalRows: 2 }
const { Flex, Slider } = NGLayout;
function TestCom({ page }: any) {
    console.log(page)
    const { tableCfg, gridConfig } = page.getDvaState();
    console.log(tableCfg, 'tableCfg')
    // useEffect(() => {
    //     getHelpInfo('BDB.SimpleData').then((e) => {
    //         console.log(e)
    //     })

    // })
    return (
        <NGLayout>
            <Flex direction="row" style={borderStyle('top')}>
                {/* <Slider><NGProjectTree id="tree" /></Slider> */}
                {/* <Flex style={borderStyle('left')}>
                  
                </Flex> */}
                <GridView id="grid" {...tableCfg} formConf={gridConfig} dataSource={data} />
            </Flex>
        </NGLayout>
    )
}

export default definePage({
    model,
    component: class extends BaseComponent {
        /**
         * toolbar点击事件(箭头函数解决react事件绑定导致作用域丢失的问题)
         */
        // toolbarClick = async ({id, text}) => {
        //     switch (id) {
        //         case "add":
        //             safePush('/Module1/demo/detail');
        //             break;
        //         case "edit":
        //             alert(`edit`);
        //             break;
        //         default:
        //             alert(`${id}:${text}`);
        //             break;
        //     }
        // };

        render() {
            return <TestCom page={this} />;
        }
    }
});
