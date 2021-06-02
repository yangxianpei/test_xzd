import {getList} from "./service";

export default {
    namespace: 'Module1_model_demo_list',
    state: {
        busType: 'Customer', // 业务类型，用于获取layout UI元数据，配置生效
        toolbarCfg: {       // toolbar基础配置
            buttons: ['add', 'edit', 'delete', 'view', '->', 'help', 'close'],
        },
        queryCfg: {   // 内嵌查询
            pageId: 'Web:holidayRecord'
        },
        tableCfg: { // 列表基础配置
            showRowNumber: true,
            checkbox: true,
            autoLoad: false,
            loading: true,
            pagination: { // 分页属性
                pageSize: 15
            },
            confKey: ['grid', 'billList'],
            request: getList
        }
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload};
        }
    },
    effects: {
    }
};
