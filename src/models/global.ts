function createKeyItem(layout, keyItem = {}) {
    layout.forEach(item => {
        if (item.name) {
            keyItem[item.name] = { _item_: item };
        }
        if (item.children) {
            createKeyItem(item.children, keyItem[item.name] || keyItem);
        }
    });
    return keyItem;
}

/**
 * 更新layout
 * @param layout 原始layout
 * @param uiInfo 更新字段，格式：[{p_form0000000025_m#asr_flg: 0}]， 0只读 1可编辑 2不可见 3必输项
 */
function uiLayout(layout, uiInfo) {
    const newLayout = [...layout];
    const keyItem: any = createKeyItem(newLayout);
    let isUpdate = false;

    uiInfo.forEach(info => {
        Object.keys(info).forEach(field => {
            const ctlOption = Number(info[field]);
            const ids = field.split('#');
            const item = ids.reduce((p, id) => {
                return p[id] ?? p;
            }, keyItem)?._item_;
            if (item) {
                switch (ctlOption) {
                    case 0: // 只读
                        if (!item.disabled) {
                            isUpdate = true;
                            item.disabled = true;
                        }
                        break;
                    case 1: // 可编辑
                        if (item.disabled) {
                            isUpdate = true;
                            item.disabled = false;
                        }
                        break;
                    case 2: // 不可见
                        if (!item.hidden) {
                            isUpdate = true;
                            item.hidden = true;
                        }
                        break;
                    case 3: // 必输项
                        if (item.disabled || !item.required) {
                            isUpdate = true;
                            item.disabled = false;
                            item.required = true;
                        }
                        break;
                    default:
                        break;
                }
            } else {
                console.log('无法识别字段：' + field);
            }
        });
    });

    return isUpdate ? newLayout : layout;
}

export default {
    namespace: "model_global",
    state: {
        userId: "Developer",
        version: '',
        layout: undefined,
        busType: ''
    },
    reducers: {
        update(state, { newState }) {
            return { ...state, ...newState };
        },
        saveLayout(state: any, { layout, busType }: any) {
            if (busType === state.busType && JSON.stringify(layout) === JSON.stringify(state.layout)) {
                return state;
            }
            return { ...state, layout, busType };
        },
        updateLayout(state: any, { uiInfo }) {
            if (!uiInfo || uiInfo.length === 0) return state;
            const layout = uiLayout(state.layout, uiInfo);
            if (layout === state.layout) {
                return state;
            }
            return { ...state, layout };
        }
    },
    effects: {},
    subscriptions: {
        changeTitle({ history }) {
            history.listen((p) => {
                console.log(p)
                document.title = p
            })
        }
    }
};
