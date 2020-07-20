import require from "../utils/require";

function getClassify() {
   return require.get("/goods/classify");
}

// /goods/list?sorts=hits+asc&tid=0200000000&pageNo=2
function getClassifyList(tid,pageNo) {
    return require.get(`/goods/list?sorts=hits+asc&tid=${tid}&pageNo=${pageNo}`);
}

export default {
    getClassify,
    getClassifyList
}