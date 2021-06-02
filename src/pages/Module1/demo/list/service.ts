import {request} from "ng-lib-tsx";

export async function getList({ pageIndex, pageSize, orgList = [], ...queryFilter }) {
  try {
    return await request.post({
      url: 'DMC/Enterprise/CustomFile/GetCustomFileList',
      data: {
        page: pageIndex - 1,
        start: (pageIndex - 1) * pageSize,
        limit: pageSize,
        queryfilter: queryFilter,
        orgList: orgList.join(',')
      }
    });
  } catch (e) {
    return [];
  }
}

