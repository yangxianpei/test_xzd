import {getDetail} from "./service";

export default {
    namespace: 'Module1_model_demo_detail',
    state: {
        busType: 'Customer', // 业务类型，用于获取layout UI元数据，配置生效
        toolbarCfg: {       // toolbar基础配置
            buttons: ['save', '->', 'help', 'back'],
        },
        formCfg: {
            confKey: ['form', 'customfilebilltoform'],
            style: {padding: 5}
        },
        data: {}
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload};
        }
    },
    effects: {
        * getDetail({payload}, {call, put}) {
            const data = yield call(getDetail, payload);
            yield put({type: "updateState", payload: {data}});
        }
    }
};
