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
 * lamp.conf
 * @Author  : lanbery
 * @Version : v1.0
 * @Date    : 2018-01-31
 */
var LampDefaultConfig = {
    "ui" :{
        fontFamily : [
            {id:"Microsoft YaHei",text:"微软雅黑",disabled:true},
            {id:"SimSun",text:"宋体",disabled:true},
            {id:"Microsoft JhengHei",text:"微软正黑体",disabled:true},
            {id:"NSimSun",text:"新宋体",disabled:true},
            {id:"PMingLiU",text:"新细明体",disabled:true},
            {id:"KaiTi",text:"楷体",disabled:true},
            {id:"FangSong_GB2312",text:"仿宋_GB2312",disabled:true},
            {id:"KaiTi_GB2312",text:"楷体_GB2312",disabled:true},
            {id:"Arial",text:"Arial",disabled:true},
            {id:"Helvetica",text:"Helvetica",disabled:true},
            {id:"sans-serif",text:"sans-serif",disabled:true},
            {id:"Times New Roman",text:"Times New Roman",disabled:true},
            {id:"Times",text:"Times",disabled:true},
            {id:"serif",text:"serif",disabled:true},
            {id:"Verdana",text:"Verdana",disabled:true},
            {id:"Geneva",text:"Geneva",disabled:true}
        ]
    },
    cfg : {
        barcode : {
            settings : {
                barWidth    : 1,
                barHeight   : 40,
                color        : "",
                bgColor     : "",
                showHRI     : true,
                fontSize    : 10
            },
            codeType: [
                {id:"code11",text:"code11"} ,
                {id:"code39",text:"code39"},
                {id:"code93",text:"code93"},
                {id:"code128",text:"code128"},
                {id:"ean8",text:""},
                {id:"ean13",text:"EAN-13"},
                {id:"std25",text:""},
                {id:"int25",text:""},
                {id:"codabar",text:""},
                {id:"msi",text:""},
                {id:"datamatrix",text:"Datamatrix二维条码"}
            ]
        },

    }
}