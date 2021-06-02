
export default {
    namespace: 'Test1_demo',
    state: {
        tableCfg: { // 列表基础配置
            showRowNumber: true,
            checkbox: true,
            autoLoad: false,
            loading: true,
            pagination: { // 分页属性
                pageSize: 15
            },
            confKey: ['grid', 'billList'],
        },
        gridConfig: {
            desTitle: '班组列表',
            columnLines: true,
            name: 'EnterpriseAddressGrid',
            region: 'center',
            header: '班组列表',
            children: [
              {
                header: '班组名称',
                text: '班组名称',
                dataIndex: 'Cname',
                width: 120,
                sortable: false,
                hidden: false,
              },
              {
                header: '所属企业',
                text: '所属企业',
                dataIndex: 'Cno',
                width: 220,
                sortable: false,
                hidden: false,
              },
              {
                width: 220,
                dataIndex: 'InvestPer',
                text: '班组长',
                langKey: 'AddrType',
                header: '班组长',
                sortable: false,
              },
              {
                width: 110,
                text: '联系方式',
                editor: { allowBlank: true },
                datafield: 'BadfinPer',
                langKey: 'Cname',
                header: '联系方式',
                sortable: false,
              },
              {
                header: '班组类型',
                text: '班组类型',
                dataIndex: 'ProfitPer',
                width: 100,
                sortable: false,
                hidden: false,
              },
              {
                header: '班组状态',
                text: '班组状态',
                dataIndex: 'BeginDate',
                width: 130,
                sortable: false,
                hidden: false,
              },
              {
                header: '黑名单',
                text: '黑名单',
                dataIndex: 'BeginDate1',
                width: 130,
                sortable: false,
                hidden: false,
              },
              {
                header: '首次合作时间',
                text: '首次合作时间',
                dataIndex: 'BeginDate2',
                width: 130,
                sortable: false,
                hidden: false,
              },
              {
                header: '末次退场时间',
                text: '末次退场时间',
                dataIndex: 'BeginDate2',
                width: 130,
                sortable: false,
                hidden: false,
              },
              {
                header: '参建人数(在岗/在册)',
                text: '参建人数(在岗/在册)',
                dataIndex: 'BeginDate3',
                width: 130,
                sortable: false,
                hidden: false,
              },
              {
                header: '参建项目数(在建/累计)',
                text: '参建项目数(在建/累计)',
                dataIndex: 'BeginDate4',
                width: 130,
                sortable: false,
                hidden: false,
              }
            ],
            buskey: 'PhId',
          }
    },
    reducers: {
    },
    effects: {
    }
}