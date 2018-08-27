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
 * lamp.print.js
 * @Author  : lanbery
 * @Version : v1.0
 * @Date    : 2018-03-09
 */
/**
 *
 */
;!function ($,win,doc) {
    "use strict";
    var cldpPort = 8000;
    var ldpJS = "CLodopfuncs.js";

    var lodop = null;
    if(typeof getCLodop != 'function' &&typeof getCLodop != 'function' ){

    }
    if(typeof getCLodop == 'function'){
        lodop = getCLodop();//云控件优先
    }
    if(typeof getLodop == 'function'){
        if(!lodop)lodop=getLodop();
    }

    if(lodop==null||!lodop){
        console.error('请引入LODOP控件js....');
        return false;
    }
    var $ldpDIV = $('#ldpPrintDIV');
    if($ldpDIV.length){
        $ldpDIV = $('<div id="ldpPrintDIV" style="display:none"></div>');
        $('body').append($ldpDIV);
    }

    var changeServiceUrl = function (ldpUrl) {
        if(/^\d+$/.test(ldpUrl)){
            changeServiceUrl("http://localhost:"+ldpUrl+"/"+ldpJS);
        }
    }

    /**
     *
     */
    var GetDPI = function () {
        var dpi;
        return function () {
            if(dpi)return dpi;
            var $div =$('<div style="width:1in;height:1in;position:absolute;left: 0px;top:0px;z-index:999;visibility:hidden"/>');
            $('body').append($div);
            var xDpi = $div.width();
            var yDpi = $div.height();
            dpi = {
                "xDpi":xDpi,
                "yDpi":yDpi
            }
            return dpi;
        }
    }();
    var GlobalDefaults = {
        'printItem':'lampItems',
        barcode : {
            showOrigin : true,
            volume : '',
            mode :'ean8',
            "settings" : {
                barWidth : 2,
                barHeight : 26,
                showHRI:false
            }
        }
    };

    /**
     * 模板对象
     * @type {{}}
     */
    var TPLS = {

    }

    var Settings = {
        "nullConvert":''
    };
    /*-------------------------------------Utils--------------------------------------*/
    /**
     *
     * @param tpls
     * @returns {{}}
     */
    function addTPLs(tpls) {
        if(tpls){
            if(tpls instanceof Array){
                for(var i=0,len= tpls.length;i<len;i++){
                    var tpl = tpls[i];
                    if(tpl&&'tplNo' in tpl&& GlobalDefaults.printItem in tpl&& tpl[GlobalDefaults.printItem] instanceof Array){
                        TPLS[tpl['tplNo']] = tpl;
                    }else {
                        continue;
                    }
                }

            }else if(typeof tpls == 'object'&&'tplNo' in tpls && GlobalDefaults.printItem in tpls&& tpls[GlobalDefaults.printItem] instanceof Array){
                TPLS[tpls['tplNo']] = tpls;
            }
        }
        return TPLS;
    }

    /**
     *
     * @param tplNo
     * @returns {*}
     */
    function getPrintItems (tplNo){
        if(!TPLS||!TPLS[tplNo]||!(GlobalDefaults.printItem in  TPLS[tplNo])||! (TPLS[tplNo][GlobalDefaults.printItem] instanceof Array))return false;
        return TPLS[tplNo][GlobalDefaults.printItem];
    }

    /**
     *
     * @param tplNo
     * @returns {*}
     */
    function getTemplate(tplNo) {
        if(!tplNo||typeof tplNo==='number'){
            if(TPLS){
                for(var t in TPLS){
                    if(TPLS[t])return TPLS[t];
                }
            }
        }
        if(!TPLS||!TPLS[tplNo])return false;
        return TPLS[tplNo];
    }
    /**
     * 单位转换
     * @param source
     * @param destUnit
     * @param type :false-width(X); true-Y
     * @returns {*}
     */
    function ConvertUnit(source,destUnit,type) {
        if(!source)return source;

        var srcVol,srcUnit;
        if(typeof source == "number"){
            srcVol = source;
            srcUnit = 'px';
        }else {
            var matches = source.match(/^(\d+(\.\d+)?)([a-z|A-Z]*)$/);
            if(!matches)return source;
            srcVol = parseFloat(matches[1]);
            srcUnit = matches[3];
        }
        if(srcUnit == destUnit){
            return srcVol;
        }
        if(srcUnit=='')srcUnit='px';
        var dpi = GetDPI();
        var cmPin = 2.54;
        var mmPcm = 10;
        var mmPin = 25.4;
        var ptPin = 72;
        var rate = dpi.xDpi;
        if(type){
            rate = dpi.yDpi;
        }

        switch (srcUnit){
            case 'px':
                switch (destUnit){
                    case 'cm':
                        return srcVol/(dpi.xDpi/cmPin);
                    case 'mm':
                        return srcVol / (dpi.xDpi/mmPin);
                    case 'in' :
                        return srcVol/dpi.xDpi;
                    case 'pt':
                        return srcVol/dpi.xDpi*ptPin;
                }
                break;
            case "cm":
                switch (destUnit){
                    case 'px':
                        return srcVol/cmPin * dpi.xDpi;
                    case 'mm':
                        return srcVol*mmPcm;
                    case 'in':
                        return srcVol/cmPin;
                    case 'pt':
                        return srcVol / cmPin*ptPin;
                }
                break;
            case 'mm':
                switch (destUnit){
                    case 'px':
                        return srcVol/mmPin * dpi.xDpi;
                    case 'cm':
                        return srcVol/mmPcm;
                    case 'in':
                        return srcVol/mmPin;
                    case 'pt':
                        return srcVol/mmPin*ptPin;
                }
                break;
            case "in":
                switch (destUnit){
                    case 'px':
                        return srcVol*dpi.xDpi;
                    case 'cm':
                        return srcVol*cmPin;
                    case 'mm':
                        return srcVol*mmPin;
                    case 'pt':
                        return srcVol/cmPin * ptPin;
                }
                break;
            case 'pt':
                switch (destUnit){
                    case 'px':
                        return srcVol/ptPin*dpi.xDpi;
                    case 'cm':
                        return srcVol/ptPin*cmPin;
                    case 'mm':
                        return srcVol/ptPin*mmPin;
                    case 'in':
                        return srcVol/ptPin;
                }
                break;
        }
        return srcVol;
    }


    /**
     * 转码
     * @param str
     * @returns {string}
     */
    function utf16to8(str) { //
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }
    /*-------------------------------------Utils--------------------------------------*/

    /**
     *
     * @param tpls
     */
    function loadTemplates(tpls) {
        if(!tpls)return ;
        if(typeof tpls ==='string'&&tpls)tpls = $.parseJSON(tpls);
        $.each(tpls,function (idx,tpl) {
           if(tpl&&tpl.tplNo){
               TPLS[tpl.tplNo] = tpl;
           }else {
               return true;
           }
        });
        return this;
    }

    function findItem(tpl,key) {
        if(!tpl||!tpl.items||!tpl.items.length||!key)return null;
        for(var i=0,len= tpl.items.length;i<len;i++){
            if(key==tpl.items[i].name)return tpl.items[i];
        }
        return null;
    }
    
    function drawTable($table,lampItem,data) {
        var item = lampItem.tableItem;
        if(!item||!item.colModel||!item.colModel.length||!$table.length)return true;
        var tabKey =item.code ||( (item.content&&(item.content.indexOf('@')==0)) ? item.content.substring(2,item.content.length-1):'');
        if(!tabKey){
            return true;
        }
        var SortColModel = item.colModel.sort(function (a,b) {
            if(!a.sortno&&b.sortno)return -1;
            if(a.sortno&&!b.sortno)return 1;
            if(a.sortno&&b.sortno)return (parseInt(a.sortno)-parseInt(b.sortno)>0) ? 1 : -1;
            return 0;
        });
        if(item.caption){
            var $caption = $('<caption style="text-align:center">'+item.caption+'</caption>');
            (item.fontName) ? $caption.css('font-family',item.fontName):$caption.css('font-family','');
            (item.fontSize) ? $caption.css('font-size',item.fontSize):$caption.css('font-size','');
            $table.append($caption);
        }
        var width = (typeof item.width =='number'&&item.width) ? (item.width+'px'):'100%';
        $table.attr('width',width);
        var $thead = $('<thead></thead>');
        var $thr = $('<tr></tr>');
        $.each(SortColModel,function (idx,model) {
            if(!model||(!model.name&&!model.index))return true;
            if(model.hidden)return true;
            var index,name,label;
            name = model.name||model.index;
            index = model.index||(name+idx);
            label = model.label||name;
            var $th = $('<th name="col'+idx+'" data-name="'+name+'"' +
                ' data-index="'+index+'" data-sort="'+idx+'" ' +
                ' >'+label+'</th>');
            if(model.thCss)$th.css(model.thCss);
            if(model.width)$th.css('width',model.width);
            $thr.append($th);
        });
        $thead.append($thr);
        $table.append($thead);


        var $tbody = $('<tbody></tbody>');
        if(data&&data[tabKey]&& data[tabKey] instanceof Array){
            //fill Data
            for(var j=0,jlen =  data[tabKey].length;j<jlen;j++){
                var d = data[tabKey][j];
                if(!d)continue;
                var $btr = $('<tr data-rowid="'+j+'"></tr>');
                $.each(SortColModel,function (idxD,m) {
                   if(m.hidden||m.hidden==true)return true;
                   var _index = m.index,_name = m.name;
                   if(!_index&&!_name)return true;
                   var v = (_index in d) ?d[_index]:null;
                   if(v==null&&(_name in d))v= d[_name];
                   if(v==''&&(!m.defVal))v= m.defVal;
                   var $td = $('<td data-index="'+(_index+idxD)+'" data-name="'+_name+'">'+ v +'</td>');
                   if(m.tdCss)$td.css(m.tdCss);
                   $btr.append($td);
                });
                $tbody.append($btr);
            }

            $table.append($tbody);
        }
        lampItem.html = $table.prop('outerHTML');
        return true;
    }

    /**
     *
     * @param items
     * @param data
     */
    function regexReplace(items,data) {
        $.each(items,function (idx,item) {
            var type = item.type||'';
            if(type!='html')return true;
            var html = item.html;
            if(!html)return true;
            item.html = item.html.replace(/@\{\w+(\.\w+)*(,[^\}]+)?\}/g,function(content){
                console.log(content);
                var k = content.substring(2,content.length-1);
                if(k&&k in data){
                    var v = Settings.nullConvert||'';
                    if(typeof data[k] =='string'&& (data[k]=='null'||data[k]=='NULL'))return v;
                    return  data[k].toString();
                }
                return content;
            });
        });
    }

    var LodopPrinter = function (ldp) {

        function processHtml(tpl,data) {
            if(!tpl||!tpl.lampItems)return ;
            var lampItems = tpl.lampItems;
            if(!tpl.lampItems||!tpl.lampItems.length)return ;
            if(tpl.pageWidth)$ldpDIV.css('width',tpl.pageWidth);
            $ldpDIV.find('div[name][lamp="lodop"]').remove();
            $.each(tpl.lampItems,function (idx,lampItem) {
                if(!lampItem||!lampItem.type||lampItem.type!='html')return true;
                var $tmpDiv = $(lampItem.html);
                $ldpDIV.append($tmpDiv);
                $tmpDiv.find('[role="item"][name][data-type="barcode"]').each(function (idx,el) {
                    var name = $(this).attr('name');
                    var item = findItem(tpl,name);
                    if(!item)return true;

                    var code = item.code ||$(this).data('code');
                    var mode = item.barcode||GlobalDefaults.barcode.mode;

                    var val = data[code]||'';
                    if(val){
                        var h = $(this).find('div>div:first-child').height()||$(this).find('div>div:first-child').css('height');
                        $(this).empty();

                        var barSetting = $.extend(true,{},GlobalDefaults.barcode.settings);
                        if(h)barSetting.barHeight = h;
                        var $barcodeDiv = $('<div></div>').barcode(val,mode,barSetting);
                        var aliasStr = code ||item.alias||'';
                        var $span = $('<span data-type="barcode" data-alias="'+aliasStr+'" data-barcode="'+mode+'"></span>');
                        $span.text(val);
                        $barcodeDiv.append($span);
                        $(this).append($barcodeDiv);
                    }else {
                        $(this).empty();
                        var $span = $('<span data-type="barcode" data-alias="'+item.alias||code+'" data-barcode="'+mode+'"></span>');
                        $(this).append($span);
                    }
                });
                lampItem.html = $tmpDiv.prop('outerHTML');
            });
            //处理天充值
            regexReplace(lampItems,data);
            $.each(lampItems,function (idx,lampItem) {
                if(!lampItem||!lampItem.type||lampItem.type!='table'||!lampItem.tableItem)return true;
                var item = lampItem.tableItem;
                var itemName = item.name||'';
                var $tmpTB = $('<table name="'+itemName+'" role="item" lamp="lodop" cellspacing="0px" cellpadding="0px"></table>');
                $ldpDIV.append($tmpTB);
                drawTable($tmpTB,lampItem,data);
            });
        }

        function printLodop(tpl,isPrint) {
            var top = tpl.top||0;
            ldp.PRINT_INIT(tpl.tplNo);
            var pageW = tpl.pageWidth,pageH = tpl.pageHeight;
            var paperHpx = (typeof pageH =='number') ? ConvertUnit((pageH/10+'mm'),'px',true) : ConvertUnit(pageH,'px',true);
            var left = tpl.left||0;
            //lodop.SET_PRINT_PAGESIZE(tpl.orient||1,pageW,pageH,'');
            left = ConvertUnit(left,'px');
            var lampItems = tpl.lampItems;
            if(!lampItems){
                console.warn('模板没有设置打印内容。');
                return;
            }
            $.each(lampItems,function (idx,lampItem) {
                var h = ConvertUnit(lampItem.height,'px',true);
                var type = lampItem.type;
                if(lampItem.type=='table'){
                    console.log(lampItem.html);
                    ldp.ADD_PRINT_TABLE(top+'px',left+'px','99%',h,lampItem.html.toString());
                    ldp.SET_PRINT_STYLEA((parseInt(idx)+1),'Top',top);
                }else {
                    ldp.ADD_PRINT_HTM(top+'px',left+'px',lampItem.width||'99%',h,lampItem.html.toString()||'');
                    ldp.SET_PRINT_STYLEA((parseInt(idx)+1),'Top',top);
                    if('itemtype' in lampItem){
                        ldp.SET_PRINT_STYLEA((parseInt(idx)+1),"ItemType",lampItem.itemtype);
                    }
                }
                top = parseFloat(top)+parseFloat(h);
                if(parseFloat(top)>parseFloat(paperHpx))top=tpl.top||0;
            });
            if(isPrint=='print'){
                ldp.PRINT();
            }else {
                ldp.PREVIEW();
            }
        }

        function printLodopPagation(tpl,data){
            var top = tpl.top||0;
            var pageW = tpl.pageWidth,pageH = tpl.pageHeight;
            var paperHpx = (typeof pageH =='number') ? ConvertUnit((pageH/10+'mm'),'px',true) : ConvertUnit(pageH,'px',true);
            var left = tpl.left||0;
            //lodop.SET_PRINT_PAGESIZE(tpl.orient||1,pageW,pageH,'');
            left = ConvertUnit(left,'px');
            var lampItems = tpl.lampItems;
            if(!tpl.lampItems){
                console.warn('模板['+tpl.tplNo+']没有设置打印内容,忽略打印');
                return false;
            }
            processHtml(tpl,data);
            $.each(tpl.lampItems,function (idx,lampItem) {
                var h = ConvertUnit(lampItem.height,'px',true);
                var type = lampItem.type;
                if(lampItem.type=='table'){
                    console.log(lampItem.html);
                    ldp.ADD_PRINT_TABLE(top+'px',left+'px','99%',h,lampItem.html.toString());
                    ldp.SET_PRINT_STYLEA((parseInt(idx)+1),'Top',top);
                }else {
                    ldp.ADD_PRINT_HTM(top+'px',left+'px',lampItem.width||'99%',h,lampItem.html.toString()||'');
                    ldp.SET_PRINT_STYLEA((parseInt(idx)+1),'Top',top);
                    if('itemtype' in lampItem){
                        ldp.SET_PRINT_STYLEA((parseInt(idx)+1),"ItemType",lampItem.itemtype);
                    }
                }
                top = parseFloat(top)+parseFloat(h);
                if(parseFloat(top)>parseFloat(paperHpx))top=tpl.top||0;
            });
            return true;
        }

        return {
            printLodop : function (data,tplNo,isPrint) {
                var printer = this;
                tplNo = tplNo|| $(this).data('tplno')||'';
                var tpl = getTemplate(tplNo);
                if(!tpl||tpl==null){
                    console.error('打印模板没有查到...');
                    return;
                }
                processHtml(tpl,data);
                isPrint = isPrint||$(this).data('operated')||'';

                printLodop(tpl,isPrint);
                return this;
            },
            /**
             *
             * @param tplDatas
             * [
             *  { tplNo:'',
             *    data :{}
             *    },
             *    {tplNo:'',
             *    data:{}
             * ]
             */
            printLodopMulti : function (tplDatas,isPrint) {
                if(!tplDatas||!tplDatas.length)return;
                isPrint = isPrint||$(this).data('operated')||'preview';
                var mutilPrintSign = 'MutiPrint_'+new Date().getTime();
                ldp.PRINT_INIT(mutilPrintSign);
                for(var i = 0 ,len = tplDatas.length;i<len;i++){
                    var tplData = tplDatas[i];
                    if(!tplData||!('tplNo' in tplData)||! 'data' in tplData)continue;
                    var tpl = getTemplate(tplData['tplNo']);
                    if(!tpl||!tpl.lampItems||!tplData.data)continue;
                    var t = printLodopPagation(tpl,tplData.data);
                    if(!t)continue;
                    ldp.NEWPAGE();
                }
                if(isPrint=='print'){
                    ldp.PRINT();
                }else {
                    ldp.PREVIEW();
                }
            }
        }

    }(lodop);


/*    return {
        loadTemplates :loadTemplates,
        print:LodopPrinter.printLodop,
        printMulti : LodopPrinter.printLodopMulti
    }*/

    jQuery.lampPrinter = {
        init: function (tpls,options) {
            if(options&&typeof options=='object')Settings = $.extend(true,{},Settings,options);
            if(typeof tpls === 'string'&&tpls)tpls = $.parseJSON(tpls);
            tpls = tpls&& tpls instanceof Array ? tpls : (tpls ? [tpls]:[]);
            loadTemplates(tpls);
            $(this).data('tpls',TPLS);
            $(this).attr('lamp',"lampPrinter");
            return this;
        },
        loadTemplates :loadTemplates,
        print:LodopPrinter.printLodop,
        printMulti : LodopPrinter.printLodopMulti
    }
    jQuery.fn.extend({
        lampPrinter : $.lampPrinter.init,
        addTemplates : $.lampPrinter.loadTemplates,
        print : $.lampPrinter.print,
        printMulti:$.lampPrinter.printMulti
    });

}(jQuery,window,window.document);