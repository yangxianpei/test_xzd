import { request } from "ng-lib-tsx";

export async function getDetail(params) {
  return await request.get({ url: "test/get", data: params });
}
