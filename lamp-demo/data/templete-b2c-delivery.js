/**
 * lodop-print
 * Copyright (c) 2018-2025 lanbery Lambor.Inc. All rights Reserved.
 * Statement ：
 * The lamp-table (lambor-print-table) control follows the GPL v3 open source contract
 * And can be developed by any company or individual based on the source extension,
 * But the original author information needs to be retained.
 * As for commercial use, components based on this component extension also need open source.
 * dual licence : LICENSE
 */
/**
 * templete-b2c-delivery
 * @Author  : lanbery
 * @Version : v1.0
 * @Date    : 2018-02-06
 */
var DeliveryTpl1 = {
    "tplName":"B2C发货单模板",
    "tplNo":"b2c-1805310001"
}

var DeliveryTpl =
    {
        "tplName":"B2C发货单模板",
        "tplNo":"b2c-1805310001",
        "orient" : 1,//打印方向
        "printerId":'5',
        "pageWidth":2100,
        "pageHeight":2970,
        "pageName":"A4",
        "top":'10',
        "left":'10px',
        "extSign":"",
        "fontName":"  Verdana, Arial, '微软雅黑','宋体'",
        "fontSize":"14px",
       "items" : [
            {
                "type":"text",
                "name":"item1",
                "alias":"发货单",
                "content":"发货单",
                "top": "15mm",
                "left": 317.48333740234375,
                "width": "100%",
                "height": '60px',
                "foreColor":"#000000",
                "backgroundColor":"#000000",
                "fontName":"Verdana, Arial, '微软雅黑','宋体'",
                "fontSize":"20pt",
                "zIndex":2,
                "comment":"B2C 发货单打印模板,"
            },
            {
                "type":"barcode",
                "barcode":"code128",
                "name":"item2",
                "alias":"发货单条码",
                "content":"@{orderNo}",
                "top": "15mm",
                "left": 317.48333740234375,
                "width": "100%",
                "height": 16,
                "foreColor":"#444",
                "backgroundColor":"#000000",
                "fontName":"  Verdana, Arial, '微软雅黑','宋体'",
                "fontSize":"14px",
                "zIndex":10
            }
         ,
        {
            "type":"text",
            "name":"item3",
            "alias":"单据编号",
            "content":"单据编号 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":"Verdana, Arial, '微软雅黑'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item4",
            "alias":"单据编号",
            "content":"@{orderNo}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":"'黑体','宋体'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item5",
            "alias":"发货仓库",
            "content":"发货仓库 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":" Arial, 'Microsoft YaHei'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item6",
            "alias":"发货仓库",
            "content":"@{deliveryWarehouse}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":" Arial, 'Microsoft YaHei'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item7",
            "alias":"买家昵称",
            "content":"买家昵称 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":" Arial, 'Microsoft YaHei'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item8",
            "alias":"买家昵称",
            "content":"@{buyerNick}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":" Arial, 'Microsoft YaHei'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item9",
            "alias":"快递公司",
            "content":"快递公司 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":" Arial, 'Microsoft YaHei'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item10",
            "alias":"快递公司",
            "content":"@{exprCoName}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":" Arial, 'Microsoft YaHei'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item11",
            "alias":"",
            "content":"",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":" Arial, 'Microsoft YaHei'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item12",
            "alias":"",
            "content":"",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":" Arial, 'Microsoft YaHei'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item13",
            "alias":"",
            "content":"",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":" Arial, 'Microsoft YaHei'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item14",
            "alias":"",
            "content":"",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":" Arial, 'Microsoft YaHei'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item15",
            "alias":"买家地址",
            "content":"买家地址 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": "20px",
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item16",
            "alias":"买家地址",
            "content":"@{contactAddress}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": "20px",
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item17",
            "alias":"空白行",
            "content":"",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": "20px",
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "zIndex":1
        },
        {
            "type":"table",
            "name":"item18",
            "alias":"发货单商品列表",
            "content":"@{goodsList}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": '200mm',
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":"  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize":"12pt",
            "zIndex":1,
            "cellStyle":'border: 1px solid #8c8c8c;border-collapse: collapse;border-spacing:0;',
            "caption":"发货单商品明细",
            "comment":"发货单商品列表属性",
            "colModel" :[
                {
                    "index":"goodsName",
                    "name":"goodsName",
                    "label":"商品名称",
                    "align":"center",
                    "defVal":"--",
                    "width":"20%",
                    "sortno":1,
                    "thCss" : {
                        "text-align":"center",
                        "font-weight": "bold",
                        "border": "1px solid #8c8c8c"
                    },
                    "tdCss": {
                        "text-align":"left"
                    }
                },
                {
                    "index":"goodsCode",
                    "name":"goodsCode",
                    "label":"商品编码",
                    "align":"center",
                    "defVal":"--",
                    "width":"",
                    "sortno":2,
                    "thCss" : {
                        "text-align":"center",
                        "font-weight": "bold",
                        "border": "1px solid #8c8c8c"
                    },
                    "tdCss": {
                        "text-align":"left"
                    }
                },
                {
                    "index":"specDesc",
                    "name":"specDesc",
                    "label":"规格描述",
                    "align":"left",
                    "defVal":"--",
                    "width":"",
                    "sortno":3,
                    "hidden":true,
                    "thCss" : {
                        "text-align":"center",
                        "font-weight": "bold",
                        "border": "1px solid #8c8c8c"
                    },
                },
                {
                    "index":"category",
                    "name":"category",
                    "label":"商品分类",
                    "align":"center",
                    "defVal":"--",
                    "width":"",
                    "sortno":4,
                    "thCss" : {
                        "text-align":"center",
                        "font-weight": "bold",
                        "border": "1px solid #8c8c8c"
                    },
                },
                {
                    "index":"barcode",
                    "name":"barcode",
                    "label":"商品条码",
                    "align":"center",
                    "defVal":"--",
                    "width":"",
                    "sortno":5,
                    "thCss" : {
                        "text-align":"center",
                        "font-weight": "bold",
                        "border": "1px solid #8c8c8c"
                    },
                },
                {
                    "index":"specName1",
                    "name":"specName1",
                    "label":"规格1",
                    "align":"center",
                    "defVal":"--",
                    "width":"",
                    "sortno":6,
                    "thCss" : {
                        "text-align":"center",
                        "font-weight": "bold",
                        "border": "1px solid #8c8c8c"
                    },
                },
                {
                    "index":"specName2",
                    "name":"specName2",
                    "label":"规格2",
                    "align":"center",
                    "defVal":"--",
                    "width":"",
                    "sortno":7,
                    "thCss" : {
                        "text-align":"center",
                        "font-weight": "bold",
                        "border": "1px solid #8c8c8c"
                    },
                },
                {
                    "index":"specName3",
                    "name":"specName3",
                    "label":"规格3",
                    "align":"center",
                    "defVal":"--",
                    "width":"",
                    "sortno":8,
                    "thCss" : {
                        "text-align":"center",
                        "font-weight": "bold",
                        "border": "1px solid #8c8c8c"
                    },
                },
                {
                    "index":"amount",
                    "name":"amount",
                    "label":"数量",
                    "align":"center",
                    "defVal":"--",
                    "width":"",
                    "sortno":9,
                    "thCss" : {
                        "text-align":"center",
                        "font-weight": "bold",
                        "border": "1px solid #8c8c8c"
                    },
                },
                {
                    "index":"unitPrice",
                    "name":"unitPrice",
                    "label":"单价(元)",
                    "align":"center",
                    "defVal":"1.58",
                    "width":"",
                    "sortno":10,
                    "formatter":"money",
                    "thCss" : {
                        "text-align":"center",
                        "font-weight": "bold",
                        "border": "1px solid #8c8c8c"
                    },
                },
                {
                    "index":"subtotal",
                    "name":"subtotal",
                    "label":"金额（元）",
                    "align":"center",
                    "defVal":"200.00",
                    "width":"",
                    "sortno":11,
                    "formatter":"money",
                    "thCss" : {
                        "text-align":"center",
                        "font-weight": "bold",
                        "border": "1px solid #8c8c8c"
                    }
                }
            ]
        },
        {
            "type":"text",
            "name":"item19",
            "alias":"空白行",
            "content":"",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": "70px",
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item20",
            "alias":"店铺",
            "content":"店铺 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":"  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item21",
            "alias":"店铺",
            "content":"@{shopName}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":"  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item22",
            "alias":"运费",
            "content":"运费 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":"  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item23",
            "alias":"运费金额",
            "content":"@{exprMoney}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":"  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item24",
            "alias":"商家备注",
            "content":"商家备注 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":"  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item25",
            "alias":"商家备注内容",
            "content":"@{sellerMsg}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":"  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize":"14px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item26",
            "alias":"合计",
            "content":"合计 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":"  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize":"16px",
            "zIndex":1
        },
        {
            "type":"text",
            "name":"item27",
            "alias":"合计",
            "content":"@{totalMoney}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor":"#000000",
            "backgroundColor":"#000000",
            "fontName":"Verdana, Arial, '微软雅黑','宋体'",
            "fontSize":"14px",
            "zIndex":1
        }
    ]
    };

var AJAX_SINGLE_DATA = {
    orderNo                  : '980128828278376',
    deliveryWarehouse       : '京东发货仓',
    buyerNick                   : 'jacky',
    exprCoName              : '顺丰快递',
    contactAddress          :'北京市海淀区西三环北路50号院',
    shopName                : '京东期间网店',
    totalMoney              :'910.00',
    goodsList               :[
        {goodsName:'足球',goodsCode:'517250',specDesc:'2#足球，牛皮，nike',category:'体育用品',barcode:'5172500201001',specName1:'2#足球',specName2:'牛皮',specName3:'',amount:2,unitPrice:105.00,subtotal:210.00},
        {goodsName:'上衣',goodsCode:'517251',specDesc:'M号，纯棉，短款，nike',category:'服装',barcode:'5172510304001',specName1:'M号',specName2:'纯棉',specName3:'短款',amount:1,unitPrice:699.00,subtotal:699.00},
        {goodsName:'康师傅纯净水',goodsCode:'517259',specDesc:'120ml，康师傅纯净水',category:'饮料',barcode:'5172590304001',specName1:'120ml',specName2:'纯净水',specName3:'',amount:1,unitPrice:1.00,subtotal:1.00}
    ]
}

var TEST_META =[
    {
        "disabled": false,
        "id": "deliveryNo",
        "pattern": "",
        "text": "发货单编号",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "orderNo",
        "pattern": "",
        "text": "订单编号",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "transNo",
        "pattern": "",
        "text": "交易号",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "orderTime",
        "pattern": "yyyy-MM-dd HH:mm:ss",
        "text": "下单时间",
        "type": "time"
    },
    {
        "disabled": true,
        "id": "paymentStatus",
        "pattern": "",
        "text": "付款状态Code",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "paymentStatusDesc",
        "pattern": "",
        "text": "付款状态",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "vipName",
        "pattern": "",
        "text": "会员名称",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "shopName",
        "pattern": "",
        "text": "店铺",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "buyerMessage",
        "pattern": "",
        "text": "买家留言",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "sellerMessage",
        "pattern": "",
        "text": "卖家留言",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "orderRemark",
        "pattern": "",
        "text": "订单备注",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "whName",
        "pattern": "",
        "text": "仓库名称",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "expressName",
        "pattern": "",
        "text": "快递公司",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "expressNumber",
        "pattern": "",
        "text": "快递单号",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "exprFee",
        "pattern": "",
        "text": "快递费",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "recName",
        "pattern": "",
        "text": "收货人",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "recMobile",
        "pattern": "",
        "text": "收货人手机",
        "type": "string"
    },
    {
        "disabled": false,
        "id": "pickingTime",
        "pattern": "yyyy-MM-dd HH:mm:ss",
        "text": "收货人手机",
        "type": "time"
    },
    {
        "disabled": false,
        "id": "totalMoney",
        "pattern": "#000000",
        "text": "商品名称",
        "type": "money"
    },
    {
        "disabled": false,
        "id": "listGoods",
        "list": [
            {
                "disabled": false,
                "id": "goodsName",
                "pattern": "",
                "text": "商品名称",
                "type": "string"
            },
            {
                "disabled": false,
                "id": "goodsCode",
                "pattern": "",
                "text": "商品编码",
                "type": "string"
            },
            {
                "disabled": false,
                "id": "goodsSpecDesc",
                "pattern": "",
                "text": "商品规格编码",
                "type": "string"
            },
            {
                "disabled": false,
                "id": "barcode",
                "pattern": "",
                "text": "商品条码",
                "type": "string"
            },
            {
                "disabled": false,
                "id": "platSpec",
                "pattern": "",
                "text": "平台规格",
                "type": "string"
            },
            {
                "disabled": false,
                "id": "specDesc",
                "pattern": "",
                "text": "销售属性（规格描述）",
                "type": "string"
            },
            {
                "disabled": false,
                "id": "amount",
                "pattern": "",
                "text": "订购件数",
                "type": "string"
            },
            {
                "disabled": false,
                "id": "subtotal",
                "pattern": "#000000",
                "text": "商品单价 * 数量",
                "type": "money"
            },
            {
                "disabled": false,
                "id": "stock",
                "pattern": "",
                "text": "库存描述",
                "type": "string"
            },
            {
                "disabled": false,
                "id": "category",
                "pattern": "",
                "text": "商品类型Code",
                "type": "string"
            },
            {
                "disabled": false,
                "id": "goodsType",
                "pattern": "",
                "text": "商品类型",
                "type": "string"
            }
        ],
        "pattern": "",
        "text": "商品清单",
        "type": "list"
    }
];

var OMS_TPL =
    {
        "tplName": "B2C发货单模板",
        "tplNo": "b2c-1805310001",
        "orient": 1,
        "printerId": "5",
        "pageWidth": 2100,
        "pageHeight": 2970,
        "pageName": "A4",
        "top": "10px",
        "left": "10px",
        "extSign": "",
        "fontName": "  Verdana, Arial, '微软雅黑','宋体'",
        "fontSize": "14px",
        "items": [{
            "type": "text",
            "name": "item1",
            "alias": "发货单",
            "content": "发货单",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": "60px",
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": "Verdana, Arial, '微软雅黑','宋体'",
            "fontSize": "20pt",
            "zIndex": 2,
            "comment": "B2C 发货单打印模板,"
        }, {
            "type": "barcode",
            "barcode": "code128",
            "name": "item2",
            "alias": "发货单条码",
            "content": "@{orderNo}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#444",
            "backgroundColor": "#000000",
            "fontName": "  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize": "14px",
            "zIndex": 10
        }, {
            "type": "text",
            "name": "item3",
            "alias": "单据编号",
            "content": "单据编号 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": "Verdana, Arial, '微软雅黑'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item4",
            "alias": "单据编号",
            "content": "@{orderNo}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": "'黑体','宋体'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item5",
            "alias": "发货仓库",
            "content": "发货仓库 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": " Arial, 'Microsoft YaHei'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item6",
            "alias": "发货仓库",
            "content": "@{deliveryWarehouse}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": " Arial, 'Microsoft YaHei'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item7",
            "alias": "买家昵称",
            "content": "买家昵称 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": " Arial, 'Microsoft YaHei'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item8",
            "alias": "买家昵称",
            "content": "@{buyerNick}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": " Arial, 'Microsoft YaHei'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item9",
            "alias": "快递公司",
            "content": "快递公司 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": " Arial, 'Microsoft YaHei'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item10",
            "alias": "快递公司",
            "content": "@{exprCoName}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": " Arial, 'Microsoft YaHei'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item11",
            "alias": "",
            "content": "",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": " Arial, 'Microsoft YaHei'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item12",
            "alias": "",
            "content": "",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": " Arial, 'Microsoft YaHei'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item13",
            "alias": "",
            "content": "",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": " Arial, 'Microsoft YaHei'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item14",
            "alias": "",
            "content": "",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": " Arial, 'Microsoft YaHei'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item15",
            "alias": "买家地址",
            "content": "买家地址 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": "20px",
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item16",
            "alias": "买家地址",
            "content": "@{contactAddress}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": "20px",
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item17",
            "alias": "空白行",
            "content": "",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": "20px",
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "zIndex": 1
        }, {
            "type": "table",
            "name": "item18",
            "alias": "商品清单",
            "content": "@{listGoods}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": "200mm",
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": "  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize": "12pt",
            "zIndex": 1,
            "cellStyle": "border: 1px solid",
            "caption": "发货单商品明细",
            "comment": "发货单商品列表属性",
            "colModel": [{
                "index": "goodsName",
                "name": "goodsName",
                "label": "商品名称",
                "sortno": 0,
                "defVal": "--",
                "thCss": {
                    "text-align": "center",
                    "font-weight": "bold",
                    "border": "1px solid"
                },
                "tdCss": {
                    "text-align": "left",
                    "border": "1px solid"
                },
                "align": "center",
                "width": "20%",
                "hidden": false
            }, {
                "index": "goodsCode",
                "name": "goodsCode",
                "label": "商品编码",
                "sortno": 1,
                "defVal": "--",
                "thCss": {
                    "text-align": "center",
                    "font-weight": "bold",
                    "border": "1px solid"
                },
                "tdCss": {
                    "text-align": "left",
                    "border": "1px solid"
                },
                "align": "center",
                "width": "",
                "hidden": false
            }, {
                "index": "platSpec",
                "name": "platSpec",
                "label": "平台规格",
                "sortno": 2,
                "defVal": "-",
                "thCss": {
                    "text-align": "center",
                    "font-weight": "bold",
                    "border": "1px solid"
                },
                "tdCss": {
                    "text-align": "center",
                    "border": "1px solid"
                },
                "hidden": false,
                "width": ""
            }, {
                "index": "category",
                "name": "category",
                "label": "商品分类",
                "sortno": 3,
                "defVal": "--",
                "thCss": {
                    "text-align": "center",
                    "font-weight": "bold",
                    "border": "1px solid"
                },
                "tdCss": {
                    "text-align": "center",
                    "border": "1px solid"
                },
                "align": "center",
                "width": "",
                "hidden": false
            }, {
                "index": "barcode",
                "name": "barcode",
                "label": "商品条码",
                "sortno": 4,
                "defVal": "--",
                "thCss": {
                    "text-align": "center",
                    "font-weight": "bold",
                    "border": "1px solid"
                },
                "tdCss": {
                    "text-align": "center",
                    "border": "1px solid"
                },
                "align": "center",
                "width": "",
                "hidden": false
            }, {
                "index": "goodsSpecDesc",
                "name": "goodsSpecDesc",
                "label": "商品规格编码",
                "sortno": 5,
                "defVal": "-",
                "thCss": {
                    "text-align": "center",
                    "font-weight": "bold",
                    "border": "1px solid"
                },
                "tdCss": {
                    "text-align": "center",
                    "border": "1px solid"
                },
                "hidden": true,
                "width": ""
            }, {
                "index": "subtotal",
                "name": "subtotal",
                "label": "金额（元）",
                "sortno": 6,
                "defVal": "200.00",
                "thCss": {
                    "text-align": "center",
                    "font-weight": "bold",
                    "border": "1px solid"
                },
                "tdCss": {
                    "text-align": "center",
                    "border": "1px solid"
                },
                "align": "center",
                "width": "",
                "formatter": "money",
                "hidden": false
            }, {
                "index": "goodsType",
                "name": "goodsType",
                "label": "商品类型",
                "sortno": 7,
                "defVal": "-",
                "thCss": {
                    "text-align": "center",
                    "font-weight": "bold",
                    "border": "1px solid"
                },
                "tdCss": {
                    "text-align": "center",
                    "border": "1px solid"
                },
                "hidden": false,
                "width": ""
            }, {
                "index": "stock",
                "name": "stock",
                "label": "库存描述",
                "sortno": 8,
                "defVal": "-",
                "thCss": {
                    "text-align": "center",
                    "font-weight": "bold",
                    "border": "1px solid"
                },
                "tdCss": {
                    "text-align": "center",
                    "border": "1px solid"
                },
                "hidden": false,
                "width": ""
            }, {
                "index": "specDesc",
                "name": "specDesc",
                "label": "规格描述",
                "sortno": 9,
                "defVal": "--",
                "thCss": {
                    "text-align": "center",
                    "font-weight": "bold",
                    "border": "1px solid"
                },
                "tdCss": {
                    "text-align": "center",
                    "border": "1px solid"
                },
                "align": "left",
                "width": "",
                "hidden": true
            }, {
                "index": "amount",
                "name": "amount",
                "label": "数量",
                "sortno": 10,
                "defVal": "--",
                "thCss": {
                    "text-align": "center",
                    "font-weight": "bold",
                    "border": "1px solid"
                },
                "tdCss": {
                    "text-align": "center",
                    "border": "1px solid"
                },
                "align": "center",
                "width": "",
                "hidden": false
            }],
            "css": {
                "border": "1px solid rgb(140, 140, 140)",
                "border-collapse": "collapse",
                "border-spacing": "0px",
                "margin": "0px"
            },
            "tableStyle": true,
            "code": "listGoods",
            "dataType": "list"
        }, {
            "type": "text",
            "name": "item19",
            "alias": "空白行",
            "content": "",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": "70px",
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item20",
            "alias": "店铺",
            "content": "店铺 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": "  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item21",
            "alias": "店铺",
            "content": "@{shopName}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": "  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item22",
            "alias": "运费",
            "content": "运费 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": "  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item23",
            "alias": "运费金额",
            "content": "@{exprMoney}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": "  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item24",
            "alias": "商家备注",
            "content": "商家备注 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": "  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item25",
            "alias": "商家备注内容",
            "content": "@{sellerMsg}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": "  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item26",
            "alias": "合计",
            "content": "合计 : ",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": "  Verdana, Arial, '微软雅黑','宋体'",
            "fontSize": "16px",
            "zIndex": 1
        }, {
            "type": "text",
            "name": "item27",
            "alias": "合计",
            "content": "@{totalMoney}",
            "top": "15mm",
            "left": 317.48333740234375,
            "width": "100%",
            "height": 16,
            "foreColor": "#000000",
            "backgroundColor": "#000000",
            "fontName": "Verdana, Arial, '微软雅黑','宋体'",
            "fontSize": "14px",
            "zIndex": 1
        }, {
            "name": "item30",
            "content": "",
            "alias": "",
            "type": "text"
        }],
        "lampItems": [{
            "name": "div01",
            "id": 0,
            "type": "html",
            "width": 776.8850927532364,
            "height": 20,
            "left": 5.605231549446151,
            "itemtype": 1,
            "html": "<div name=\"div01\" lamp=\"lodop\" data-lodop=\"html\" data-itemtype=\"1\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\" style=\"width:99%;float:right;right: 40px;padding-right: 40px;text-align: right\">第<span tdata=\"PageNO\">##</span>页，共<span tdata=\"PageCount\">##</span>页</div>\n                </div>\n            </div>"
        }, {
            "name": "div06",
            "id": 1,
            "type": "html",
            "width": 776.8850927532364,
            "height": 20,
            "left": 5.605231549446151,
            "itemtype": 1,
            "html": "<div lamp=\"lodop\" data-lodop=\"html\" name=\"div06\" data-itemtype=\"1\">\n                <table width=\"99%\"><tbody><tr><td role=\"item\" style=\"height: 20px;\" name=\"item30\"><span data-type=\"text\" data-alias=\"\"></span></td></tr></tbody></table>\n            </div>"
        }, {
            "name": "div01",
            "id": 2,
            "type": "html",
            "width": 776.8850927532364,
            "height": 120,
            "left": 5.605231549446151,
            "itemtype": 1,
            "html": "<div name=\"div01\" lamp=\"lodop\" data-lodop=\"html\" data-itemtype=\"1\">\n                <div role=\"item\" class=\"tplBarcode\" style=\"z-index:99;position: absolute;right: 10px;text-align: center;padding-right: 2px;padding-top: 4px;min-width:30px;min-height: 20px;\" name=\"item2\" data-type=\"barcode\"><div style=\"padding: 0px; overflow: auto; width: 286px;\"><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 20px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 4px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 6px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 4px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 4px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 4px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 6px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 4px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 6px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 4px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 4px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 6px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 4px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 4px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 6px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 4px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 6px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 6px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 8px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 6px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 4px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 6px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 4px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 8px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 6px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 6px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 6px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 2px\"></div><div style=\"float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 26px;\"></div><div style=\"float: left; font-size: 0px; background-color: #FFFFFF; height: 26px; width: 20px\"></div><span data-type=\"barcode\" data-alias=\"发货单条码\" data-barcode=\"code128\">@{orderNo}</span></div></div><table name=\"tplTop\" width=\"99%\">\n                    <caption role=\"item\" class=\"tplCaption\" name=\"item1\" style=\"height: 60px;\"><span data-type=\"text\" data-alias=\"发货单\" style=\"width: 100%; height: 60px; font-family: Verdana, Arial, 微软雅黑, 宋体; font-size: 20pt; z-index: 2;\">发货单</span></caption>\n                    \n                    <tbody>\n                        <tr>\n                            <td role=\"item\" style=\"text-align: right; height: 16px;\" name=\"item3\"><span data-type=\"text\" data-alias=\"单据编号\" style=\"width: 100%; height: 16px; font-family: Verdana, Arial, 微软雅黑; font-size: 14px; z-index: 1;\">单据编号 : </span></td><td role=\"item\" style=\"text-align: left; height: 16px;\" name=\"item4\" class=\"\"><span data-type=\"text\" data-alias=\"单据编号\" style=\"width: 100%; height: 16px; font-family: 黑体, 宋体; font-size: 14px; z-index: 1;\">@{orderNo}</span></td>\n                            <td role=\"item\" style=\"text-align: right; height: 16px;\" name=\"item5\"><span data-type=\"text\" data-alias=\"发货仓库\" style=\"width: 100%; height: 16px; font-family: Arial, &quot;Microsoft YaHei&quot;; font-size: 14px; z-index: 1;\">发货仓库 : </span></td><td role=\"item\" style=\"text-align: left; height: 16px;\" name=\"item6\"><span data-type=\"text\" data-alias=\"发货仓库\" style=\"width: 100%; height: 16px; font-family: Arial, &quot;Microsoft YaHei&quot;; font-size: 14px; z-index: 1;\">@{deliveryWarehouse}</span></td>\n                            <td role=\"item\" style=\"text-align: right; height: 16px;\" name=\"item7\"><span data-type=\"text\" data-alias=\"买家昵称\" style=\"width: 100%; height: 16px; font-family: Arial, &quot;Microsoft YaHei&quot;; font-size: 14px; z-index: 1;\">买家昵称 : </span></td><td role=\"item\" style=\"text-align: left; height: 16px;\" name=\"item8\"><span data-type=\"text\" data-alias=\"买家昵称\" style=\"width: 100%; height: 16px; font-family: Arial, &quot;Microsoft YaHei&quot;; font-size: 14px; z-index: 1;\">@{buyerNick}</span></td>\n                        </tr>\n                        <tr>\n                            <td role=\"item\" style=\"text-align: right; height: 16px;\" name=\"item9\"><span data-type=\"text\" data-alias=\"快递公司\" style=\"width: 100%; height: 16px; font-family: Arial, &quot;Microsoft YaHei&quot;; font-size: 14px; z-index: 1;\">快递公司 : </span></td><td role=\"item\" style=\"text-align: left; height: 16px;\" name=\"item10\"><span data-type=\"text\" data-alias=\"快递公司\" style=\"width: 100%; height: 16px; font-family: Arial, &quot;Microsoft YaHei&quot;; font-size: 14px; z-index: 1;\">@{exprCoName}</span></td>\n                            <td role=\"item\" style=\"text-align: right; height: 16px;\" name=\"item11\"><span data-type=\"text\" data-alias=\"\" style=\"width: 100%; height: 16px; font-family: Arial, &quot;Microsoft YaHei&quot;; font-size: 14px; z-index: 1;\"></span></td><td role=\"item\" style=\"text-align: left; height: 16px;\" name=\"item12\"><span data-type=\"text\" data-alias=\"\" style=\"width: 100%; height: 16px; font-family: Arial, &quot;Microsoft YaHei&quot;; font-size: 14px; z-index: 1;\"></span></td>\n                            <td role=\"item\" style=\"text-align: right; height: 16px;\" name=\"item13\"><span data-type=\"text\" data-alias=\"\" style=\"width: 100%; height: 16px; font-family: Arial, &quot;Microsoft YaHei&quot;; font-size: 14px; z-index: 1;\"></span></td><td role=\"item\" style=\"text-align: left; height: 16px;\" name=\"item14\"><span data-type=\"text\" data-alias=\"\" style=\"width: 100%; height: 16px; font-family: Arial, &quot;Microsoft YaHei&quot;; font-size: 14px; z-index: 1;\"></span></td>\n                        </tr>\n                        <tr>\n                            <td role=\"item\" style=\"text-align: right; height: 20px;\" name=\"item15\"><span data-type=\"text\" data-alias=\"买家地址\" style=\"width: 100%; height: 20px; z-index: 1;\">买家地址 : </span></td><td role=\"item\" style=\"text-align: left; height: 20px;\" colspan=\"5\" name=\"item16\" class=\"\"><span data-type=\"text\" data-alias=\"买家地址\" style=\"width: 100%; height: 20px; z-index: 1;\">@{contactAddress}</span></td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>"
        }, {
            "name": "div02",
            "id": 3,
            "type": "html",
            "width": 776.8850927532364,
            "height": 20,
            "left": 5.605231549446151,
            "itemtype": 1,
            "html": "<div lamp=\"lodop\" data-lodop=\"html\" name=\"div02\" data-itemtype=\"1\">\n                <table width=\"99%\"><tbody><tr><td role=\"item\" style=\"height: 20px;\" name=\"item17\"><span data-type=\"text\" data-alias=\"空白行\" style=\"width: 100%; height: 20px; z-index: 1;\"></span></td></tr></tbody></table>\n            </div>"
        }, {
            "name": "div03",
            "id": 4,
            "type": "table",
            "width": 776.8850927532364,
            "height": "200mm",
            "left": 5.605231549446151,
            "tableItem": {
                "type": "table",
                "name": "item18",
                "alias": "商品清单",
                "content": "@{listGoods}",
                "top": "15mm",
                "left": 317.48333740234375,
                "width": "100%",
                "height": "200mm",
                "foreColor": "#000000",
                "backgroundColor": "#000000",
                "fontName": "  Verdana, Arial, '微软雅黑','宋体'",
                "fontSize": "12pt",
                "zIndex": 1,
                "cellStyle": "border: 1px solid",
                "caption": "发货单商品明细",
                "comment": "发货单商品列表属性",
                "colModel": [{
                    "index": "goodsName",
                    "name": "goodsName",
                    "label": "商品名称",
                    "sortno": 0,
                    "defVal": "--",
                    "thCss": {
                        "text-align": "center",
                        "font-weight": "bold",
                        "border": "1px solid"
                    },
                    "tdCss": {
                        "text-align": "left",
                        "border": "1px solid"
                    },
                    "align": "center",
                    "width": "20%",
                    "hidden": false
                }, {
                    "index": "goodsCode",
                    "name": "goodsCode",
                    "label": "商品编码",
                    "sortno": 1,
                    "defVal": "--",
                    "thCss": {
                        "text-align": "center",
                        "font-weight": "bold",
                        "border": "1px solid"
                    },
                    "tdCss": {
                        "text-align": "left",
                        "border": "1px solid"
                    },
                    "align": "center",
                    "width": "",
                    "hidden": false
                }, {
                    "index": "platSpec",
                    "name": "platSpec",
                    "label": "平台规格",
                    "sortno": 2,
                    "defVal": "-",
                    "thCss": {
                        "text-align": "center",
                        "font-weight": "bold",
                        "border": "1px solid"
                    },
                    "tdCss": {
                        "text-align": "center",
                        "border": "1px solid"
                    },
                    "hidden": false,
                    "width": ""
                }, {
                    "index": "category",
                    "name": "category",
                    "label": "商品分类",
                    "sortno": 3,
                    "defVal": "--",
                    "thCss": {
                        "text-align": "center",
                        "font-weight": "bold",
                        "border": "1px solid"
                    },
                    "tdCss": {
                        "text-align": "center",
                        "border": "1px solid"
                    },
                    "align": "center",
                    "width": "",
                    "hidden": false
                }, {
                    "index": "barcode",
                    "name": "barcode",
                    "label": "商品条码",
                    "sortno": 4,
                    "defVal": "--",
                    "thCss": {
                        "text-align": "center",
                        "font-weight": "bold",
                        "border": "1px solid"
                    },
                    "tdCss": {
                        "text-align": "center",
                        "border": "1px solid"
                    },
                    "align": "center",
                    "width": "",
                    "hidden": false
                }, {
                    "index": "goodsSpecDesc",
                    "name": "goodsSpecDesc",
                    "label": "商品规格编码",
                    "sortno": 5,
                    "defVal": "-",
                    "thCss": {
                        "text-align": "center",
                        "font-weight": "bold",
                        "border": "1px solid"
                    },
                    "tdCss": {
                        "text-align": "center",
                        "border": "1px solid"
                    },
                    "hidden": true,
                    "width": ""
                }, {
                    "index": "subtotal",
                    "name": "subtotal",
                    "label": "金额（元）",
                    "sortno": 6,
                    "defVal": "200.00",
                    "thCss": {
                        "text-align": "center",
                        "font-weight": "bold",
                        "border": "1px solid"
                    },
                    "tdCss": {
                        "text-align": "center",
                        "border": "1px solid"
                    },
                    "align": "center",
                    "width": "",
                    "formatter": "money",
                    "hidden": false
                }, {
                    "index": "goodsType",
                    "name": "goodsType",
                    "label": "商品类型",
                    "sortno": 7,
                    "defVal": "-",
                    "thCss": {
                        "text-align": "center",
                        "font-weight": "bold",
                        "border": "1px solid"
                    },
                    "tdCss": {
                        "text-align": "center",
                        "border": "1px solid"
                    },
                    "hidden": false,
                    "width": ""
                }, {
                    "index": "stock",
                    "name": "stock",
                    "label": "库存描述",
                    "sortno": 8,
                    "defVal": "-",
                    "thCss": {
                        "text-align": "center",
                        "font-weight": "bold",
                        "border": "1px solid"
                    },
                    "tdCss": {
                        "text-align": "center",
                        "border": "1px solid"
                    },
                    "hidden": false,
                    "width": ""
                }, {
                    "index": "specDesc",
                    "name": "specDesc",
                    "label": "规格描述",
                    "sortno": 9,
                    "defVal": "--",
                    "thCss": {
                        "text-align": "center",
                        "font-weight": "bold",
                        "border": "1px solid"
                    },
                    "tdCss": {
                        "text-align": "center",
                        "border": "1px solid"
                    },
                    "align": "left",
                    "width": "",
                    "hidden": true
                }, {
                    "index": "amount",
                    "name": "amount",
                    "label": "数量",
                    "sortno": 10,
                    "defVal": "--",
                    "thCss": {
                        "text-align": "center",
                        "font-weight": "bold",
                        "border": "1px solid"
                    },
                    "tdCss": {
                        "text-align": "center",
                        "border": "1px solid"
                    },
                    "align": "center",
                    "width": "",
                    "hidden": false
                }],
                "css": {
                    "border": "1px solid rgb(140, 140, 140)",
                    "border-collapse": "collapse",
                    "border-spacing": "0px",
                    "margin": "0px"
                },
                "tableStyle": true,
                "code": "listGoods",
                "dataType": "list"
            },
            "html": ""
        }, {
            "name": "div04",
            "id": 5,
            "type": "html",
            "width": 776.8850927532364,
            "height": 70,
            "left": 5.605231549446151,
            "itemtype": 1,
            "html": "<div lamp=\"lodop\" data-lodop=\"html\" name=\"div04\" data-itemtype=\"1\">\n                <table width=\"99%\"><tbody><tr><td role=\"item\" style=\"height: 70px;\" name=\"item19\"><span data-type=\"text\" data-alias=\"空白行\" style=\"width: 100%; height: 70px; z-index: 1;\"></span></td></tr></tbody></table>\n            </div>"
        }, {
            "name": "div05",
            "id": 6,
            "type": "html",
            "width": 776.8850927532364,
            "height": 42,
            "left": 5.605231549446151,
            "itemtype": 1,
            "html": "<div id=\"tplBottomContainer\" lamp=\"lodop\" data-lodop=\"html\" name=\"div05\" data-itemtype=\"1\">\n                <table name=\"tt\" width=\"99%\" min-height=\"50px\">\n                    <thead>\n                        <tr><th></th><th></th><th></th><th></th><th></th><th></th></tr>\n                    </thead>\n                    <tbody>\n                    <tr>\n                        <td role=\"item\" style=\"text-align: left; height: 16px;\" name=\"item20\"><span data-type=\"text\" data-alias=\"店铺\" style=\"width: 100%; height: 16px; font-family: Verdana, Arial, 微软雅黑, 宋体; font-size: 14px; z-index: 1;\">店铺 : </span></td>\n                        <td role=\"item\" style=\"text-align: left; height: 16px;\" name=\"item21\" colspan=\"3\"><span data-type=\"text\" data-alias=\"店铺\" style=\"width: 100%; height: 16px; font-family: Verdana, Arial, 微软雅黑, 宋体; font-size: 14px; z-index: 1;\">@{shopName}</span></td>\n                        <td role=\"item\" style=\"text-align: right; height: 16px;\" name=\"item22\"><span data-type=\"text\" data-alias=\"运费\" style=\"width: 100%; height: 16px; font-family: Verdana, Arial, 微软雅黑, 宋体; font-size: 14px; z-index: 1;\">运费 : </span></td>\n                        <td role=\"item\" name=\"item23\" style=\"height: 16px;\"><span data-type=\"text\" data-alias=\"运费金额\" style=\"width: 100%; height: 16px; font-family: Verdana, Arial, 微软雅黑, 宋体; font-size: 14px; z-index: 1;\">@{exprMoney}</span></td></tr>\n                    <tr min-height=\"24px\">\n                        <td role=\"item\" style=\"text-align: left; height: 16px;\" name=\"item24\"><span data-type=\"text\" data-alias=\"商家备注\" style=\"width: 100%; height: 16px; font-family: Verdana, Arial, 微软雅黑, 宋体; font-size: 14px; z-index: 1;\">商家备注 : </span></td>\n                        <td role=\"item\" style=\"text-align: left; height: 16px;\" name=\"item25\" colspan=\"3\"><span data-type=\"text\" data-alias=\"商家备注内容\" style=\"width: 100%; height: 16px; font-family: Verdana, Arial, 微软雅黑, 宋体; font-size: 14px; z-index: 1;\">@{sellerMsg}</span></td>\n                        <td role=\"item\" style=\"text-align: right; height: 16px;\" name=\"item26\"><span data-type=\"text\" data-alias=\"合计\" style=\"width: 100%; height: 16px; font-family: Verdana, Arial, 微软雅黑, 宋体; font-size: 16px; z-index: 1;\">合计 : </span></td>\n                        <td role=\"item\" style=\"text-align: left; height: 16px;\" name=\"item27\"><span data-type=\"text\" data-alias=\"合计\" style=\"width: 100%; height: 16px; font-family: Verdana, Arial, 微软雅黑, 宋体; font-size: 14px; z-index: 1;\">@{totalMoney}</span></td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>"
        }]
    };