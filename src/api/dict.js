import request from "@/utils/request";

export function getDictMap(dictName) {
  return request.get("/dict/map", { params: { dictName } });
}
