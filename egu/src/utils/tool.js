/**
 * 生成订单号
 * 返回：时间戳 + j位随机数
 * j:随机数位数
 * preFix: 前缀自定义字符,默认为空
 * */ 
export function orderId(preFix = "",j) {
    var random_no = "";
    for (var i = 0; i < j; i++) { //j位随机数，用以加在时间戳后面。
        random_no += Math.floor(Math.random() * 10);
    }
    random_no = preFix + new Date().getTime() + random_no;
    return random_no;
};
