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
 * 封装控制面板
 * lamp.ctrl.js
 * @Author  : lanbery
 * @Version : v1.0
 * @Date    : 2018-03-09
 */
/**
 * 1.初始化metaItems
 * 2.加载模板设置panel
 * 3.加载itemCtrl控制panel
 * 4.加载table控制panel
 */
;!function (metaData,lodop,$,window) {
    "use strict";

    var needSave = false;
    if(!lodop){
        console.error('打印控件未安装，请先安装...');
        return;
    }

    /**
     * 默认全局配置
     * @type {{
     * containerId: string, ctrlSectionClass: string, lampTTPShowName:
     * boolean, ItemCodeRegx: RegExp,
     * selector: {allowClear: boolean, width: string, language: string, placeholder: string, templateResult: templateResult}, fontFamilySelector: {}}}
     */
    var GlobalSettings = {
        "containerId"           : "CtrlContainer",
        "ctrlSectionClass"      : "lampTTP",
        "itemSelectedClass"     : "item-selected",
        "lampTTPShowName"       : true,
        "placeholder"           : '@',
        "ItemCodeRegx"          : /^\@\{[\w\W|\u4e00-\u9fa5]+\}$/,
        "selector"              : {
            allowClear: true,
            width:'98%',
            "max-width":'130px',
            language: "zh-CN",
            placeholder:'请选择...',
            templateResult : function (state){
                if(state.disabled){
                    var $text = $('<span>'+state.text+'<i class="fa fa-ban text-danger" aria-hidden="true"></i>'+'</span>');
                    return $text;
                }else {
                    return state.text;
                }
            }
        },
        "metaData" : [],
        "demoTableRows"     : 100,
        "thCss" : {
            "text-align":"center",
            "font-weight": "bold",
            "border": "1px solid #8c8c8c"
        },
        "tdCss" : {
            "text-align":"center",
            "border": "1px solid #8c8c8c"
        }
    };
    var $CtrlContainer = $('#'+GlobalSettings.containerId);
    if(!$CtrlContainer.length)$CtrlContainer = $('.'+GlobalSettings.containerId);

    var $DesignedContainer = $(".DesignedContainer");
    if(!$DesignedContainer.length){
        console.error('设计器容器不存在,请检查设计器Html代码。');
        return ;
    }

    if(!$CtrlContainer.length){
        console.error('控制器容器不存在.');
        return;
    }
    var $TplSetting = $CtrlContainer.find('table.lampTTP[name="tplSetting"]');
    var $PrintSetting = $CtrlContainer.find('table.lampTTP[name="printSetting"]');
    var $ItemCfg = $CtrlContainer.find('table.lampTTP[name="itemCfg"]');
    var $ItemTTP = $CtrlContainer.find('table.lampTTP[name="lampTTP"]');

    if(!$TplSetting.length||!$PrintSetting.length||!$ItemCfg.length||!$ItemTTP.length){
        console.error('控制器容器不存在.');
        return;
    }

    $('span[role="hideBtn"]').on('click',function (e) {
        $(this).closest('div.panel').hide();
    });
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

    var selectedItemName = null;

    /**
     *
     * @type {{ctrlWidth: string, metaItems: Array, paperSelector: {allowClear: boolean, width: string, data: *[]}, fontSelector: {allowClear: boolean, tokenSeparators: string[], maximumSelectionLength: number, tags: boolean, data: *[]}, barcodeSelector: {data: *[]}, barcodeOpts: {defVolume: string, defMode: string, settings: {barWidth: number, barHeight: number, showHRI: boolean}}}}
     */
    var Settings = {
        "ctrlWidth" : '98%',
        "selectors" : {
            "paperSelector" : {
                allowClear: true,
                width:'98%',
                data : [
                    {id:'A0',text:'A0 841×1189',pageWidth:'841',pageHeight:'1189'},
                    {id:'A1',text:'A1 594×841',pageWidth:'594',pageHeight:'841'},
                    {id:'A2',text:'A2 420×594',pageWidth:'420',pageHeight:'594'},
                    {id:'A3',text:'A3 297×420',pageWidth:'297',pageHeight:'420'},
                    {id:'A4',text:'A4 210×297',pageWidth:'210',pageHeight:'297'},
                    {id:'A5',text:'A5 148×210',pageWidth:'148',pageHeight:'210'},
                    {id:'A6',text:'A6 105×148',pageWidth:'105',pageHeight:'148'},
                    {id:'A7',text:'A7 74×105',pageWidth:'74',pageHeight:'105'},
                    {id:'A8',text:'A8 52×74',pageWidth:'52',pageHeight:'74'},
                    {id:'A9',text:'A9 37×52',pageWidth:'37',pageHeight:'52'},
                    {id:'A10',text:'A10 26×37',pageWidth:'26',pageHeight:'37'},
                    {id:'B0',text:'B0 1000×1414',pageWidth:'1000',pageHeight:'1414'},
                    {id:'B1',text:'B1 707×1000',pageWidth:'707',pageHeight:'1000'},
                    {id:'B2',text:'B2 500×707',pageWidth:'500',pageHeight:'707'},
                    {id:'B3',text:'B3 353×500',pageWidth:'353',pageHeight:'500'},
                    {id:'B4',text:'B4 250×353',pageWidth:'250',pageHeight:'353'},
                    {id:'B5',text:'B5 176×250',pageWidth:'176',pageHeight:'250'},
                    {id:'B6',text:'B6 125×176',pageWidth:'125',pageHeight:'176'},
                    {id:'B7',text:'B7 88×125',pageWidth:'88',pageHeight:'125'},
                    {id:'B8',text:'B8 62×88',pageWidth:'62',pageHeight:'88'},
                    {id:'B9',text:'B9 44×62',pageWidth:'44',pageHeight:'62'},
                    {id:'B10',text:'B10 31×44',pageWidth:'31',pageHeight:'44'}
                ]
            },
            "fontSelector"  : {
                allowClear: true,
                tokenSeparators : [',',' '],
                maximumSelectionLength : 3,
                tags : true,
                data : [
                    {'id':'Arial','text':'Arial'},
                    {'id':"'Microsoft YaHei'",'text':'微软雅黑'},
                    {'id':"'Microsoft JhengHei'",'text':'微软正黑体'},
                    {'id':"'黑体'",'text':'黑体','disabled':true},
                    {'id':"'宋体'",'text':'宋体'},
                    {'id':'FangSong','text':'仿宋'},
                    {'id':'NSimSun','text':'新宋体'},
                    {'id':'sans-serif','text':'sans-serif'},
                    {'id':'MingLiU','text':'细明体'},
                    {'id':'PMingLiU','text':'新细明体'},
                    {'id':'KaiTi','text':'楷体'},
                    {'id':'DFKai-SB','text':'标楷体'},
                    {'id':'PingFangSC-Regular' ,'text':'PingFangSC-Regular',disabled:true},
                    {'id':'Verdana' ,'text':'Verdana'}
                ]
            },
            "barcodeSelector" : {
                data : [
                    {"id":"code11","text":"Code 11"},
                    {"id":"Code39","text":"Code 39",'disabled':true},
                    {"id":"ean8","text":"EAN 8"},
                    {"id":"ean13","text":"EAN 13"},
                    {"id":"code128","text":"code 128"},
                    {"id":"std25","text":"标准2-5位"},
                    {"id":"int25","text":"工业2-5位"},
                    {"id":"qrcode","text":"二维码",'disabled':true}
                ]
            },
            "metaSelector" : {},
            "textAlignSelector":{
                "data" : [
                    {"id":"cc","text":"标题居中，数据居中",thCss:{"text-align":"center"},tdCss:{"text-align":"center"}},
                    {"id":"cl","text":"标题居中，数据居左",thCss:{"text-align":"center"},tdCss:{"text-align":"left"}},
                    {"id":"cr","text":"标题居中，数据居右",thCss:{"text-align":"center"},tdCss:{"text-align":"right"}},
                    {"id":"ll","text":"标题居左，数据居左",thCss:{"text-align":"left"},tdCss:{"text-align":"left"}},
                    {"id":"lr","text":"标题居左，数据居右",thCss:{"text-align":"left"},tdCss:{"text-align":"right"}},
                    {"id":"rr","text":"标题居右，数据居右",thCss:{"text-align":"right"},tdCss:{"text-align":"right"}},
                    {"id":"rl","text":"标题居右，数据居左",thCss:{"text-align":"right"},tdCss:{"text-align":"left"}}
                ]
            }
        },
        "barcodeOpts"   : {
            defVolume   : "952725025031",
            defMode     : "code11",
            settings    : {
                barWidth : 2,
                barHeight : 26,
                showHRI:false
            }
        },
        "metaItem":{}
    };

    /**
     *
     */
    for(var sel in Settings.selectors){
        var allowClear = Settings.selectors[sel].allowClear ? true : false;
        $.extend(true,Settings.selectors[sel],GlobalSettings.selector,{"allowClear":allowClear});
    }
    /**
     * 模板缓存
     * @type {{}}
     */
    var TPL = {};

    var ControllerAutoLoader = function () {
        $TplSetting.on('change','[role="setupCtl"][name!="paperType"]',function (e) {
            var v = $(this).val();
            var attrName = $(this).attr('name');
            switch (attrName){
                case 'tplName':
                    TPL.tplName = v||'';
                    break;
                case 'left' :
                case 'right' :
                case 'top' :
                case 'bottom' :
                    if(typeof v == 'undefined'||v==''||v==null)v=0;
                    TPL[attrName]=v;
                    break;
                case 'pageWidth' :
                    TPL[attrName]=v||2100;
                    break;
                case 'pageHeight' :
                    TPL[attrName]=v||2970;
                    break;
                default:
                    break;
            }
        });
    }();

    /* --------------------------------Util start ----------------------------- */






    /**
     *
     * @param content
     */
    /**
     * 通过content 解析code
     * @param content
     * @returns {*}
     */
    function parseCode(content) {
        if(typeof content=='undefied'||content=='')return null;
        if(GlobalSettings.ItemCodeRegx.test(content)){
            var start = content.indexOf('{')+1;
            var end = content.lastIndexOf('}');
            return content.substring(start,end);
        }
        return null;
    }

    /**
     *
     * @param tpl
     * @param itemName
     * @returns {*}
     */
    function findItemByName(itemName) {
        var tpl = TPL;
        if(!itemName||!tpl.items||!tpl.items.length)return null;
        for(var i = 0,len = tpl.items.length;i<len;i++){
            if(itemName==tpl.items[i].name)return tpl.items[i];
        }
        return null;
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
    /* --------------------------------Util end ----------------------------- */

    /**
     * item管理器
     * @type {{}}
     */
    var ItemManager = function () {
        var $TTPDnd = null;
        $ItemCfg.on('change','input[role="itemCtl"][name],textarea[role="itemCtl"][name]',function (e) {
            var itemName = $ItemCfg.find('[role="itemCtl"][name="itemPK"]').text();
            if(!itemName)return;
            needSave = true;
            var dtype = $(this).data('ctrl-type');
            var item = findItemByName(itemName);
            if(item){
                var v;
                if($(this).attr('type')=='checkbox'){
                    v = $(this).is(":checked");
                }else{
                    v = $(this).val();
                }
                item[dtype] = v==null ? undefined : v;
                if(dtype=='cellStyle'&&item.type=='table'){
                    //
                    updateColModelCellStyle(item,v);
                }
                $ItemCfg.redraw(item);
            }
        });

        function ClickItem(selected) {
            $DesignedContainer.on('click','[role="item"][name]',function (e) {
                var itemName = $(this).attr('name');
                $DesignedContainer.find('[role="item"][name]').removeClass(GlobalSettings.itemSelectedClass);
                var item = findItemByName(itemName);
                if(item==null){
                    var tagItemType = $(this).data('type')||'text';
                    var content = '';
                    if(tagItemType != 'table')content = $(this).text();
                    item = {
                        'type':tagItemType,
                        'name':itemName,
                        'alias':content,
                        'content':content
                    };
                    var h = $(this).height();
                    if(h&&!item.height)item.height =h;
                    if(!TPL.items){
                        TPL.items = [];
                        TPL.items.push(item);
                    }else {
                        TPL.items.push(item);
                    }
                }

                //TODO css
                if(item.type =='table'){
                    var $tb = $(this).is('table') ? $(this) : $(this).find('table:first');
                    if($tb.length){
                        var style = $tb.prop('style');
                        var css = convertStyle2Css(style);
                        if(css!=null)item.css = css;
                        //console.log(style);
                    }
                    $tb.find('tr:first>th').each(function (idx,el) {
                        var cssStr = $(this).prop('style').cssText;
                        //console.log(cssStr);
                    });
                }
                $(this).addClass(GlobalSettings.itemSelectedClass);

                ToggleDiv(item.type);
                setCtrlProperties(item);
                if(item.type=='table')buildTTP(item);

            });
            
            if(typeof selected !='undefined'&& selected!=''&&selected!=null){
                var $selection =null;
                $selection = $DesignedContainer.find('[role="item"][name="'+selected+'"]');
                if(!$selection.length){
                    if(selected=='first'|| selected == '0'||selected == 0){
                        $selection = $DesignedContainer.find('[role="item"][name]:first');
                    }else if(selected=='last'){
                        $selection = $DesignedContainer.find('[role="item"][name]:last');
                    }
                }
                if($selection.length){
                    selectedItemName = selected;
                    $selection.trigger('click');
                }

            }
        }

        function convertStyle2Css(style) {
            var css = null;
            if(!style||!style.cssText)return null;
            css = {};
            var cssArr = style.cssText.split(';');
            for(var i=0,len = cssArr.length;i<len;i++){
                var cssStr = cssArr[i];
                if(!cssStr||cssStr.indexOf(':')<=0)continue;
                var key = cssStr.substring(0,cssStr.indexOf(':')).trim();
                var val = cssStr.substring(cssStr.indexOf(':')+1,cssStr.length).trim();
                //console.log(val);
                css[key]=val;
            }
            return css;
        }

        /**
         *
         * @param item
         * @param val
         */
        function updateColModelCellStyle(item,styleCss){
            if(!item||!item.colModel||!item.colModel.length||!styleCss)return;
            var cssArr = styleCss.split(';');
            if(!cssArr.length)return;
            var tmpCss = null;
            for(var j= 0,jlen = cssArr.length;j<jlen;j++){
                if(cssArr[j].indexOf(':')>0){
                    var k = cssArr[j].substring(0,cssArr[j].indexOf(':')).trim();
                    var v = cssArr[j].substring(cssArr[j].indexOf(':')+1,cssArr[j].length).trim();
                    if(k){
                        if(!tmpCss)tmpCss = {};
                        tmpCss[k] = v;
                    }
                }
            }

            if(tmpCss){
                for(var i=0,len = item.colModel.length;i<len;i++){
                    if(item.colModel[i].thCss){
                        item.colModel[i].thCss = $.extend(true,{},item.colModel[i].thCss,tmpCss);
                    }else {
                        item.colModel[i].thCss = tmpCss;
                    }
                    if(item.colModel[i].tdCss){
                        item.colModel[i].tdCss = $.extend(true,{},item.colModel[i].tdCss,tmpCss);
                    }else {
                        item.colModel[i].tdCss = tmpCss;
                    }
                }
            }
        }
        /**
         *
         * @param item
         * @param index
         * @param cssKey th td
         * @param val
         * @returns {*}
         */
        function updateColModelAlign(item,index,cssKey,val) {
            if(!item||!item.colModel||!item.colModel.length||!index||!cssKey)return;
            for(var i =0,len = item.colModel.length;i<len;i++){
                if(item.colModel[i].index == index){
                    switch (cssKey){
                        case 'th':
                            var thCss = {};
                            if(item.colModel[i].thCss){
                                item.colModel[i].thCss['text-align'] = val;
                            }else{
                                item.colModel[i].thCss = (val ? {'text-align':val}:undefined);
                            }
                            break;
                        case 'td':
                            var tdCss = {};
                            if(item.colModel[i].tdCss){
                                item.colModel[i].tdCss['text-align'] = val;
                            }else{
                                item.colModel[i].tdCss = (val ? {'text-align':val} : undefined) ;
                            }
                            break;
                    }
                    return item;
                }
            }
            return false;
        }
        function buildTTP(item) {
            if(!item||!item.type||!item.colModel||!item.colModel.length||item.type !='table')return;
            var propsModel = [];
            for(var i=0,len=item.colModel.length;i<len;i++){
                var model = item.colModel[i];
                var name = item.colModel[i].name;
                var label = item.colModel[i].label||name;
                if(!label||!name){
                    continue;
                }
                model.name = name;
                model.label = label;
                var index = ('index' in item.colModel[i]) ? item.colModel[i].index : (name+i);
                model.index = index;
                if(!'sortno' in model)model.sortno = i;
                propsModel.push(model);
            }
            var SortModel = propsModel.sort(function (a,b) {
                if(!a.sortno&&b.sortno)return -1;
                if(a.sortno&&!b.sortno)return 1;
                if(a.sortno&&b.sortno)return (parseInt(a.sortno)-parseInt(b.sortno)>0) ? 1 : -1;
                return 0;
            });
            $ItemTTP.find('tbody').each(function (idx,el) {
                $(this).remove();
            });
            $TTPDnd = null;
            var $TTPTbody = $('<tbody></tbody>');
            /**
             *
             */
            $.each(SortModel,function (idx,model) {
                var index = model.index,name = model.name,label=model.label;
                var tr = '<tr data-index="'+index+'" data-name="'+name+'" id="'+idx+'">';
                tr += '<td>'+model.label +(GlobalSettings.lampTTPShowName ? ('['+model.name+']'):'') +'</td>';
                tr += '<td><input type="checkbox" name="hidden" data-index="'+model.index+'" '+ (model.hidden ? 'checked' : '')+'></td>';
                tr += '<td><input type="text" name="colWidth" data-index="'+model.index+'" value="'+(model.width||'')+'"></td>';
                tr += '<td>' +
                    '<input type="radio" value="left" name="textAlignH-'+name+'"  data-index="' +model.index+'" alt="居左">' +
                    '<input type="radio" value="center" name="textAlignH-'+name+'" data-index="' +model.index+'">' +
                    '<input type="radio" value="right" name="textAlignH-'+name+'" data-index="' +model.index+'">' +
                    '</td>';
                tr += '<td>' +
                    '<input type="radio" value="left" name="textAlignD-'+name+'" data-index="' +model.index+'">' +
                    '<input type="radio" value="center" name="textAlignD-'+name+'" data-index="' +model.index+'">' +
                    '<input type="radio" value="right" name="textAlignD-'+name+'" data-index="' +model.index+'">' +
                    '</td>';
                tr += '</tr>';
                var $trd = $(tr);
                if(model.thCss&&model.thCss["text-align"]){
                    $trd.find('input[type="radio"][name="textAlignH-"]').removeAttr('checked');
                    $trd.find('input[type="radio"][name="textAlignH-"][value="'+model.thCss["text-align"]+'"]').attr('checked','checked');
                }else{
                    $trd.find('input[type="radio"][name="textAlignH-"]').removeAttr('checked');
                }
                if(model.tdCss&&model.tdCss["text-align"]){
                    $trd.find('input[type="radio"][name="textAlignD-'+name+'"]').removeAttr('checked');
                    $trd.find('input[type="radio"][name="textAlignD-'+name+'"][value="'+model.thCss["text-align"]+'"]').attr('checked','checked');
                }else{
                    $trd.find('input[type="radio"][name="textAlignD-'+name+'"]').removeAttr('checked');
                }
                $TTPTbody.append($trd);
            });
            $ItemTTP.append($TTPTbody);
            /**
             *
             */
            $TTPTbody.on('change','input[type="checkbox"][name="hidden"]',function (e) {
                needSave = true;
                var mIndex = $(this).data("index");
                var v = $(this).is(':checked') ? true : false;
                updateColModelVol(item,mIndex,'hidden',v);
                $DesignedContainer.redraw(item);
            });
            $TTPTbody.on('change','input[type="text"][name="colWidth"]',function (e) {
                needSave = true;
                var mIndex = $(this).data("index");
                var v = $(this).val()||'';
                updateColModelVol(item,mIndex,'width',v);
                $DesignedContainer.redraw(item);
            });
            /**
             * 处理居中
             */
            $TTPTbody.on('click','input[type="radio"][name^="textAlignH-"]',function (e) {
                //$(this).closest('td').find('input[type="radio"]').removeAttr('checked');
                var index = $(this).data('index'),val = $(this).val();
                needSave = true;
                if(updateColModelAlign(item,index,'th',val)){
                    $DesignedContainer.redraw(item);
                }
            });
            $TTPTbody.on('click','input[type="radio"][name^="textAlignD-"]',function (e) {
                //$(this).closest('td').find('input[type="radio"]').removeAttr('checked');
                var index = $(this).data('index'),val = $(this).val();
                needSave = true;
                if(updateColModelAlign(item,index,'td',val)){
                    $DesignedContainer.redraw(item);
                }
            });
            //TODO
            //var $TextAlignSelector = $TTPTbody.find('select[name="textAlign"]').select2(Settings.selectors.textAlignSelector);


            $TTPDnd = $ItemTTP.tableDnD({
                onDrop: function (table, row) {
                    $(table).find('tbody:first>tr').each(function (idx, tr) {
                        needSave = true;
                        var $row = $(tr);
                        var _index = $row.data('index');
                        $.each(item.colModel, function (i, m) {
                            if (_index == m.index) {
                                m.sortno = idx;
                                if ($row.find('td>input[type="checkbox"][name="hidden"]').is(':checked')) {
                                    m.hidden = true;
                                } else {
                                    m.hidden = false;
                                }
                                m.width = $row.find('td>input[type="text"][name="colWidth"]').val() || '';
                                return false;
                            }
                        });
                    });
                    $DesignedContainer.redraw(item);
                }
            });
        }

        function updateColModelVol(item,index,prop,value) {
            if(!item||!item.colModel||!item.colModel.length||!index||!prop)return;
            for(var i=0,len = item.colModel.length;i<len;i++){
                if(item.colModel[i].index==index){
                    item.colModel[i][prop] = value==null? undefined : value;
                    break;
                }
            }
        }
        /**
         * 设置Item
         * @param item
         */
        function setCtrlProperties(item) {
            if(!item||!item.type||!item.name)return;
            $ItemCfg.find('[role="itemCtl"][name]').each(function (index,el) {
                var name = $(this).attr('name');
                var dtype = $(this).data('ctrl-type');
                switch (name){
                    case 'itemType':
                    case 'itemPK':
                        $(this).text(item[dtype]||'');
                        break;
                    case 'itemAlias':
                    case 'itemContent':
                    case 'itemWidth':
                    case 'itemHeight':
                    case 'itemFontSize':
                    case 'tableCaption':
                    case 'tableCell':
                        $(this).val(item[dtype]||'');
                        break;
                    case 'itemFontName':
                        var v =  (item[dtype]!=null&&item[dtype]!=''&& typeof item[dtype] !='undefined') ? item[dtype].split(',') : null;
                        if(v instanceof Array){
                            for(var i in v){
                                v[i] = v[i].trim();
                            }
                        }
                        $(this).val(v).trigger('change');
                        break;
                    case 'barcodeMode':
                        var v = item[dtype]||null;
                        $(this).val(v).trigger('change');
                        break;
                    default :
                        break;
                }
            });
        }
        return {
            "clickItem" : ClickItem ,
            "rebuildTTP": function (item) {
                buildTTP(item);
            },
            "fillItemCfg" : setCtrlProperties
        }
    }();

    /**
     * 元数据管理器
     *
     */
    var MetaItemManager = function (metadata,itemManager) {
        var MetaDefaults = {
            'metaDiv' : {
                html : function (mw) {
                    return '<div style="display: none;" id="operateCtlDiv">'
                        +'<select role="itemCtl" data-forName="itemContent" name="metaOps">'
                        +'<option></option>'
                        +'</select>'
                        +'</div>';
                }
            },
            nullDefVal :'-'
        }
        var $MetaOperator = $ItemCfg.find('[name="selectMetaOps"][role="operateCtl"]');
        var $MetaOperatorTR = $MetaOperator.closest('tr');
        if(!$MetaOperator.length||!$MetaOperatorTR.length)return this;

        var $OperateCtlDiv = $('#operateCtlDiv');
        if(!$OperateCtlDiv.length)$MetaOperator.closest('td').next('td').append(MetaDefaults.metaDiv.html());

        var width = $MetaOperatorTR.closest('table').css('width')||$MetaOperatorTR.closest('table').width();

        var MetaSettings = {
            metaSelector : {
                allowClear: true,
                cache : false,
                width:'98%',
                language: "zh-CN",
                placeholder:'请选择...',
                templateResult : function (state){
                    if(state.disabled){
                        var $text = $('<span>'+state.text+'<i class="fa fa-ban text-danger" aria-hidden="true"></i>'+'</span>');
                        return $text;
                    }else {
                        return state.text;
                    }
                },
                data : []
            },
            metaItems : {
            }
        };

        /**
         * 过滤无效数据
         * @param metaData
         * @returns {Array}
         */
        function validMetaData(inMetaData) {
            var data = [];
            if(!inMetaData||!inMetaData.length)return data;
            for(var i=0,len= inMetaData.length;i<len;i++){
                if(inMetaData[i].id&&inMetaData[i].type&&inMetaData[i].text){
                    if(inMetaData[i].disabled)continue;
                    data.push(inMetaData[i]);
                }
            }
            return data;
        }


        /**
         * 转换元数据
         * @param inMetaData
         * @returns {{}}
         */
        function transMeta2Items(inMetaData){
            var _metaItem = {};
            inMetaData = validMetaData(inMetaData);
            if(!inMetaData||!inMetaData.length)return _metaItem;
            for(var i= 0,len=inMetaData.length;i<len;i++){
                var data = inMetaData[i];
                if(data.disabled)continue;
                var type = (data.type=='list'&&data.list&&data.list.length) ? 'table':'text';
                var dataType = data.type || '';
                var item = {
                    "type"      : type,
                    "alias"     : data.text,
                    "code"      : data.id,
                    "dataType"  : dataType,
                    "content"   : GlobalSettings.placeholder+'{'+data.id+'}'
                };
                if(data.pattern)item.pattern = data.pattern;
                if(type=='table'){
                    var sortno = 0;
                    var models = [];
                    for(var j=0,length = data.list.length;j<length;j++){
                        var index = data.list[j].id;
                        var label = data.list[j].text||index;
                        if(!index&& data.list[j].disabled)continue;
                        var model ={
                            "index": index,
                            "name":index,
                            "label":label,
                            "sortno":sortno,
                            "defVal":data.list[j].defVal||MetaDefaults.nullDefVal||'',
                            "thCss" : GlobalSettings.thCss,
                            "tdCss" : GlobalSettings.tdCss
                        };
                        sortno++;
                        models.push(model);
                    }
                    item.colModel = models;
                }

                _metaItem[item.code] = item;
            }

            return _metaItem;
        }

        /**
         * 处理可选项
         * @param type:table/text/barcode
         */
        function filterMetaSelector(isTable) {
            var len=MetaSettings.metaSelector.data.length;
            if(!len)return;
            for(var i=0;i<len;i++){
                var d = MetaSettings.metaSelector.data[i];
                switch (d.type){
                    case 'string':
                    case 'money':
                    case 'number':
                    case 'time':
                        if(isTable){
                            d.disabled = true;
                        }else {
                            d.disabled = false;
                        }
                        break;
                    case 'list':
                        if(isTable){
                            d.disabled = false;
                        }else {
                            d.disabled = true;
                        }
                        break;
                    default:
                        break;
                }
            }
        }


        function toggleMetaSelector(itemType) {
            if(!itemType){
                $('#operateCtlDiv').hide();
                return;
            }
            $('#operateCtlDiv').toggle();
        }

        function initialMetaSelector(itemType) {
            var $MetaSelector = $ItemCfg.find('select[role="itemCtl"][name="metaOps"]');
            var mType = $MetaSelector.data('itemtype');
            var metaSelInstance = $MetaSelector.data('select2');
            if(mType&&mType==itemType&&metaSelInstance)return;
            var isTable = 'table'==itemType ? true : false;
            filterMetaSelector(isTable);
            if(metaSelInstance){
                $MetaSelector.select2('destroy').empty();
                $MetaSelector.append('<option></option>');
            }
            $MetaSelector.data('itemtype',itemType);
            $MetaSelector.select2(MetaSettings.metaSelector);
            $MetaSelector.on('select2:select',function (e) {
                var itemName = $ItemCfg.find('span[role="itemCtl"][name="itemPK"]').text();
                var itentype = $ItemCfg.find('span[role="itemCtl"][name="itemType"]').text();
                if(!itemName)return;
                var val = this.value;
                var metaItem = MetaItemManager.getMetaItem(val);
                if(metaItem){
                    var nit = mergeMeta2Item(metaItem,itemName,itentype);
                    $DesignedContainer.find('[role="item"][name="'+itemName+'"]').trigger('click');
                    $DesignedContainer.redraw(nit);
                    //itemManager.fillItemCfg(nit);
                   // itemManager.rebuildTTP(nit);
                }
                $('#operateCtlDiv').hide();
            });

        }

        /**
         * 合并
         * @param metaItem
         * @param itemName
         * @param itemType
         * @returns {*}
         */
        function mergeMeta2Item(metaItem,itemName,itemType) {
            if(!TPL||!metaItem||!itemName)return null;
            if(!TPL.items)TPL.items = [];
            var it = LampController.getItem(itemName);
            if(it){
                it.alias = metaItem.alias;
                it.code = metaItem.code;
                it.content = metaItem.content;
                if(metaItem.dataType)it.dataType = metaItem.dataType;
                if(metaItem.pattern)it.pattern = metaItem.pattern;
                if(itemType=='table'){
                    var nColModels = [];
                    var hasOrigin = (it.colModel&&it.colModel instanceof Array);
                    if(metaItem.colModel&&metaItem.colModel.length){
                        var ilen = metaItem.colModel.length;
                        for(var i=0;i<ilen;i++){
                            var metaCol = metaItem.colModel[i];
                            var itCol = {};
                            var unfind = true;
                            if(it.colModel&&it.colModel.length){
                                for(var j=0,jlen =it.colModel.length;j<jlen;j++ ){
                                    if(metaCol.name==it.colModel[j].name){
                                        itCol = $.extend(true,{},metaCol,it.colModel[j]);
                                        unfind = false;
                                        break;
                                    }
                                }
                            }

                            if(unfind){
                                itCol = $.extend(true,{},metaCol);
                            }
                            nColModels.push(itCol);
                        }
                        it.colModel = nColModels;
                    }else {
                        //不存在，未清空原始的
                        it.colModel = nColModels;
                    }
                }
            }else {
                it = $.extend(true,{},metaItem,{'name':itemName,'type':itemType||'text'});
                TPL.items.push(it);
            }
            return it;
        }

        /**
         *
         * @param m
         */
        function initialMetaData(m) {
            m = validMetaData(m);
            MetaSettings.metaItems = transMeta2Items(m);
            MetaSettings.metaSelector.data = m;
            //console.log(MetaSettings);
        }

        /**
         *
         */
        initialMetaData(metadata);
        //itemContent
        $ItemCfg.on('click','textarea[role="itemCtl"][name="itemContent"]',function (e) {
            var itemName = $ItemCfg.find('[role="itemCtl"][name="itemPK"]').text();
            var itemType = $ItemCfg.find('[role="itemCtl"][name="itemType"]').text();
            if(!itemName||!itemType)return;
            initialMetaSelector(itemType);
            toggleMetaSelector(1);
        });
    /*    $ItemCfg.on('click','tr,td,input,span,p',function (e) {
            $('#operateCtlDiv').hide();
        });*/




        /**
         *
         */
        return {
            refreshMetaData : initialMetaData,
            /**
             *
             * @param key
             * @returns {*}
             */
            getMetaItem : function (key) {
                if(key&&MetaSettings.metaItems&&key in MetaSettings.metaItems)return MetaSettings.metaItems[key];
                return null;
            },
            resize : function () {
                this.width = $MetaOperatorTR.closest('table').css('width')||$MetaOperatorTR.closest('table').width();
            }

        }
    }(metaData,ItemManager);
    /* ---------------------------- Utils Function start ----------------------------------- */

    /**
     *
     * @param tabType
     * @constructor
     */
    function ToggleDiv(tabType) {
        var $ItemCfgDiv = $ItemCfg.closest('div');
        var $ItemTTPDiv = $ItemTTP.closest('div');
        var $TplSettingDiv = $TplSetting.closest('div');
        switch (tabType){
            case 'table':
                $ItemCfgDiv.show();
                $ItemTTPDiv.show();
                $TplSettingDiv.hide();
                $CtrlContainer.find('input[role="itemCtl"][name="tableCaption"]').closest('tr').show();
                $CtrlContainer.find('select[role="itemCtl"][name="barcodeMode"]').closest('tr').hide();
                $CtrlContainer.find('input[role="itemCtl"][name="tableCell"]').closest('tr').show();
                break;
            case 'barcode':
                $ItemCfgDiv.show();
                $ItemTTPDiv.hide();
                $TplSettingDiv.hide();
                $CtrlContainer.find('input[role="itemCtl"][name="tableCaption"]').closest('tr').hide();
                $CtrlContainer.find('input[role="itemCtl"][name="tableCell"]').closest('tr').hide();
                $CtrlContainer.find('select[role="itemCtl"][name="barcodeMode"]').closest('tr').show();
                break;
            case 'text':
                $ItemCfgDiv.show();
                $ItemTTPDiv.hide();
                $TplSettingDiv.hide();
                $CtrlContainer.find('input[role="itemCtl"][name="tableCaption"]').closest('tr').hide();
                $CtrlContainer.find('select[role="itemCtl"][name="tableCell"]').closest('tr').hide();
                $CtrlContainer.find('input[role="itemCtl"][name="barcodeMode"]').closest('tr').hide();
                break;
            case 'tplSetting':
                $TplSettingDiv.show();
                $ItemTTPDiv.hide();
                $ItemCfgDiv.hide();
                break;
            default:
                $ItemCfgDiv.show();
                $ItemTTPDiv.hide();
                $TplSettingDiv.hide();
                $CtrlContainer.find('input[role="itemCtl"][name="tableCaption"]').closest('tr').hide();
                $CtrlContainer.find('select[role="itemCtl"][name="barcodeMode"]').closest('tr').hide();
                break;
        }
    }



    /**
     *
     */
    function fillTplSetting() {
        if(TPL){
            $TplSetting.find('[role="setupCtl"][name]').each(function (index,el) {
                var ctlName = $(this).attr('name');
                switch (ctlName){
                    case 'tplName':
                    case 'left':
                    case 'right':
                    case 'top':
                    case 'bottom':
                    case 'pageHeight':
                    case 'pageWidth':
                        $(this).val(TPL[ctlName]||'');
                        break;
                    case 'paperType':
                        var v = TPL.paperType || null;
                        $(this).val(v).trigger('change');
                        break;

                }
            });
        }
    }

    /**
     * 构建Select2
     */
    var BuildSelector = function () {
        var $PaperTypeSelect2 = $TplSetting.find('select[name="paperType"][role="setupCtl"]')
            .select2(Settings.selectors.paperSelector);
        $PaperTypeSelect2.on('select2:select',function (e) {
            var value = this.value;
            var option = e.params.data;
            //TPL.paperType = value;
            TPL.pageWidth = option.pageWidth*10;
            TPL.pageHeight = option.pageHeight*10;
            $TplSetting.find('input[name="pageWidth"][role="setupCtl"]').val(TPL.pageWidth);
            $TplSetting.find('input[name="pageHeight"][role="setupCtl"]').val(TPL.pageHeight);
        });

        /* 字体*/
        var $FontNameSelect2 = $ItemCfg.find('select[name="itemFontName"][role="itemCtl"]')
            .select2(Settings.selectors.fontSelector);
        $FontNameSelect2.on('select2:select',function (e) {
            var itemName = $ItemCfg.find('[role="itemCtl"][name="itemPK"]').text();
            if(!itemName)return;
            var item = findItemByName(itemName);
            if(!item)return;
            var fontName = this.value;
            if(this.value&& this.value instanceof Array){
                for(var s  in this.value){
                    this.value[s] = this.value[s].trim();
                }
                fontName = this.value.join(',');
            }
            item.fontName = fontName;
            $DesignedContainer.redraw(item);
        });

        /* barcodeMode*/
        var $barcodeSelect2 = $ItemCfg.find('select[name="barcodeMode"][role="itemCtl"]')
            .select2(Settings.selectors.barcodeSelector);
        $barcodeSelect2.on('select2:select',function (e) {
            var itemName = $ItemCfg.find('[role="itemCtl"][name="itemPK"]').text();
            if(!itemName)return;
            var item = findItemByName(itemName);
            if(!item)return;
            var mode = this.value;
            item.barcode = mode;
            $DesignedContainer.redraw(item);
        });
    }();
    /**
     * 更新Item属性
     * @param item
     * @param props
     * @param obj
     * @returns {null}
     */
    function updateItemProps(item,props,obj) {
        if(!item||typeof item!='object'||!props||typeof props!='string')return null;
        if(obj==null)obj = undefined;
        item[props]=obj;
    };
    /**
     *
     * @returns {*}
     */
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g,"");
    }

    function drawPrewTable(item,data){
        var html = '';
        if(!item||!item.name)return html;
        var code = item.code||parseCode(item.content)||item.alias||'';
        var border = item.border ? (' border="'+item.border+'" '):'';
        var $table = $('<table lamp="lodop" '+border+' name="'+item.name+'" data-code="'+code+'" data-lodop="table"' +
            ' style="border-collapse: collapse;border-spacing:0;" ' +
            'cellspacing="0px" cellpadding="0px" ' +
            '></table>');
        var colModels = item.colModel||[];
        var SortColModel = colModels.sort(function (a,b) {
            if(!a.sortno&&b.sortno)return -1;
            if(a.sortno&&!b.sortno)return 1;
            if(a.sortno&&b.sortno)return (parseInt(a.sortno)-parseInt(b.sortno)>0) ? 1 : -1;
            return 0;
        });
        if(item.caption){
            var $caption = $('<caption style="text-align:center">'+item.caption+'</caption>');
            (item.fontName) ? $caption.css('font-family',item.fontName):$caption.css('font-family','');
            (item.fontSize) ? $caption.css('font-size',item.fontSize):$caption.css('font-size','');
            if(item.css)$caption.css(item.css);
            $table.append($caption);
        }
        var $thead = $('<thead></thead>');
        var $thr = $('<tr></tr>');
        $.each(SortColModel,function (idx,model) {
            if(!model||(!model.name&&!model.index))return true;
            if(model.hidden)return true;
            var index,name,label;
            name = model.name||model.index;
            index = model.index||(name+idx);
            label = model.label||name;
            var $th = $('<th  name="col'+idx+'" data-name="'+name+'"' +
                ' data-index="'+index+'" data-sort="'+idx+'" ' +
                ' >'+label+'</th>');
            if(model.width)$th.css('width',model.width);
            if(model.thCss)$th.css(model.thCss)
            $thr.append($th);
        });
        $thead.append($thr);
        $table.append($thead);

        //body Begin
        var $tbody = $('<tbody></tbody>');
        if(data&&(code in data)&&data[code].length){
            for(var i=0,len=data[code].length;i<len;i++){
                var $btr = $('<tr data-rowid="'+i+'"></tr>');
                var d = data[code][i];
                $.each(SortColModel,function (idx,m) {
                    if(m.hidden)return true;
                    var index,name,text;

                    name = m.name||m.index;
                    index = m.index||(name+idx);
                    text = d[name]||m.defVal||'';

                    var $td = $('<td data-index="'+index+'" data-name="'+name+'">'
                        + text+'</td>');
                    if(m.tdCss)$td.css(m.tdCss)
                    //if(m.align)$td.css('text-align',m.align);
                    $btr.append($td);
                });
                $tbody.append($btr);
            }
        }else {
            for(i=0;i<GlobalSettings.demoTableRows;i++){
                var $btr = $('<tr data-rowid="'+i+'"></tr>');

                $.each(SortColModel,function (idx,m) {
                    if(m.hidden)return true;
                    var index,name,text;
                    name = m.name||m.index;
                    index = m.index||(name+idx);
                    text = m.defVal||'';
                    var $td = $('<td data-index="'+index+'" data-name="'+name+'">'
                        + text+'</td>');
                    $btr.append($td);
                });
                $tbody.append($btr);
            }
        }
        $table.append($tbody);
        //tbody end
        if(item.tfoot){
            $table.append(item.tfoot);
        }
        if(item.css)$table.css(item.css);
        if($table.height()<item.height)$table.css('height',item.height);
        html = $table.prop('outerHTML');
        return html;
    }

    /**
     *
     * @param insrc px
     * @param type
     * @returns {number}
     */
    function getScreenRate(insrc,type) {
        if(!insrc)return 0;
        var fullPX = (!type) ? $DesignedContainer.outerWidth() : $DesignedContainer.outerHeight();
        var vpx = ConvertUnit(insrc,'px',type);
        if(fullPX==0)return 0;
        return parseFloat(vpx/fullPX);
    }

    /**
     *
     */
    function convertSectionTPL(){
        var sectionItems = [];
        var paperWidth,paperLength
            ,orient = (typeof TPL.orient =='undefined') ? 1 :TPL.orient;
        paperWidth = TPL.pageWidth||2100;
        paperLength = TPL.pageHeight||2970;
        var itemWidth,itemHeight,itemLeft = ConvertUnit(TPL.left||0,'px');
        var paperXpx = ConvertUnit((paperWidth/10)+'mm','px');
        var xRate = getScreenRate(paperXpx);
        //TODO
        $DesignedContainer.find('[lamp="lodop"][name]').each(function (idx,el) {
            var type = $(this).data('lodop')||'html';
            var elW = $(this).outerWidth();
            elW = ConvertUnit(elW,'px')*xRate;
            var elH = $(this).height();
            elH = ConvertUnit(elH,'px',true);

            var lodopItem = {
                'name':$(this).attr('name')||('div'+idx),
                'id':idx,
                'type':type,
                'width':elW,
                'height':elH,
                'left':itemLeft*xRate
            };

            if(type=='table'){
                var _tname = $(this).is('table') ?
                    $(this).attr('name'): $(this).find('table:first').attr('name');
                if(_tname){
                    var tableItem = findItemByName(_tname);
                    if(tableItem){
                        lodopItem.tableItem = tableItem;
                        if(tableItem.height)lodopItem.height = tableItem.height;
                    }
                }
                lodopItem.html = '';
            }else {
                //lodopItem.height = $(this).outerHeight();
                var lodopItemType = $(this).data('itemtype');
                if(typeof (lodopItemType) != 'undefined')lodopItem.itemtype = lodopItemType;
                lodopItem.html = $(this).prop('outerHTML');
            }
            sectionItems.push(lodopItem);
        });
        if ("string" == typeof TPL) {
            TPL = $.parseJSON(TPL);
        }
        TPL.lampItems=sectionItems;
        TPL['lampItems'] = sectionItems;
    }
    /* ---------------------------- Utils Function End   ----------------------------------- */

    /**
     * 控制器
     * @type {{init, loadTpl, getTemplate, getSelection, selectItem}}
     */
    var LampController = function(){

        return {
            init : function(options){
                if(options&&typeof options=='object'){
                    Settings = $.extend(true,{},Settings,options||{});
                }
                return this;
            },
            convertUnit : ConvertUnit,
            loadTpl : function (tpl) {
                if(tpl)TPL = typeof tpl ==='string' ? JSON.parse(tpl):tpl;
                var t = '';
                if(TPL.tplName)t += TPL.tplName;
                if(TPL.tplNo&&t){
                    t +='('+ TPL.tplNo+')';
                }else if(TPL.tplNo){
                    t +=TPL.tplNo;
                }
                if(t)$('span.designer-title').text('['+t+']');

                fillTplSetting();
                return this;
            },
            getTemplate : function () {
                convertSectionTPL();
                return TPL;
            },
            getSelection : function () {
                var name = $ItemCfg.find('[role="itemCtl"][name="itemPK"]').text();
                return findItemByName(name);
            },
            selectItem :ItemManager.clickItem,
            getItem : function (itemName) {
                return findItemByName(itemName);
            },
            getMetaItem : MetaItemManager.getMetaItem,
            reloadMetaData : MetaItemManager.refreshMetaData,
            needSaved : function (flag) {
                if(typeof flag == 0)needSave =false;
                return needSave;
            }
        }

    }(metaData);

    window.lampController = LampController;
    $('button[type="button"][role="btn"]').each(function (idx,el) {
        var btnID = $(this).data('btnid');
        switch (btnID){
            case 'tplSettings':
                $(this).on('click',function () {
                    $TplSetting.closest('div').show();
                });
                break;
            case 'printSetting' :
                $(this).on('click',function () {
                    $PrintSetting.closest('div').show();
                });
                break;
            case 'preview':
                $(this).on('click',function () {
                    var tpl = lampController.getTemplate();
                    var top = tpl.top||0;
                    lodop.PRINT_INIT(tpl.tplName);
                    var pageW = tpl.pageWidth,pageH = tpl.pageHeight;
                    var paperHpx = (typeof pageH =='number') ? ConvertUnit((pageH/10+'mm'),'px',true) : ConvertUnit(pageH,'px',true);
                    lodop.SET_PRINT_PAGESIZE(tpl.orient||1,pageW,pageH,'');
                    var lampItems = tpl.lampItems ||[];
                    if(lampItems.length){
                        for(var i in lampItems){
                            var lampItem = lampItems[i];
                            var h = lampItem.height;
                            h = ConvertUnit(h,'px',true);
                            if(lampItem.type=='table'&&lampItem.tableItem){
                                var tableHtml = drawPrewTable(lampItem.tableItem,AJAX_SINGLE_DATA);
                                //console.log(tableHtml);
                                lodop.ADD_PRINT_TABLE(top,lampItem.left,'99%',h,tableHtml);
                                lodop.SET_PRINT_STYLEA((parseInt(i)+1),'Top',top);
                            }else{
                                lodop.ADD_PRINT_HTM(top,lampItem.left,lampItem.width||'99%',h,lampItem.html||'');
                                lodop.SET_PRINT_STYLEA((parseInt(i)+1),'Top',top);
                                if('itemtype' in lampItem){
                                    lodop.SET_PRINT_STYLEA((parseInt(i)+1),"ItemType",lampItem.itemtype);
                                }

                            }
                            top = parseFloat(top)+parseFloat(h);
                            if(parseFloat(top)>parseFloat(paperHpx))top=tpl.top||0;
                        }
                    }
                    lodop.PREVIEW();
                });
                break;
            case 'print':
                $(this).on('click',function () {
                    var tpl = lampController.getTemplate();
                    var top = tpl.top||0;
                    lodop.PRINT_INIT(tpl.tplName);
                    var pageW = tpl.pageWidth,pageH = tpl.pageHeight;
                    var paperHpx = (typeof pageH =='number') ? ConvertUnit((pageH/10+'mm'),'px',true) : ConvertUnit(pageH,'px',true);
                    lodop.SET_PRINT_PAGESIZE(tpl.orient||1,pageW,pageH,'');
                    var lampItems = tpl.lampItems ||[];
                    if(lampItems.length){
                        for(var i in lampItems){
                            var lampItem = lampItems[i];
                            var h = lampItem.height;
                            h = ConvertUnit(h,'px',true);
                            if(lampItem.type=='table'&&lampItem.tableItem){
                                var tableHtml = drawPrewTable(lampItem.tableItem,AJAX_SINGLE_DATA);
                                //console.log(tableHtml);
                                lodop.ADD_PRINT_TABLE(top,lampItem.left,'99%',h,tableHtml);
                                lodop.SET_PRINT_STYLEA((parseInt(i)+1),'Top',top);
                            }else{
                                lodop.ADD_PRINT_HTM(top,lampItem.left,lampItem.width||'99%',h,lampItem.html||'');
                                lodop.SET_PRINT_STYLEA((parseInt(i)+1),'Top',top);
                                if('itemtype' in lampItem){
                                    lodop.SET_PRINT_STYLEA((parseInt(i)+1),"ItemType",lampItem.itemtype);
                                }

                            }
                            top = parseFloat(top)+parseFloat(h);
                            if(parseFloat(top)>parseFloat(paperHpx))top=tpl.top||0;
                        }
                    }
                    lodop.PRINT();
                });
                break;
            case 'getTemplate':
                $(this).on('click',function () {
                    var tplData = lampController.getTemplate();
                    console.log(tplData);
                    var tplStr = JSON.stringify(tplData);
                    console.log(tplStr);
                });
                break;
            case 'saveTemplate':
                $(this).on('click',function () {
                    var c = lampController.needSaved();
                    console.log(c);
                    console.log('saveTemplate....');
                });
                break;
            case 'closeDesigner':
                $(this).on('click',function () {
                    var data = {
                        "vipName" : 'lanbery',
                        "orderNo" : '981234567899'
                    };
                    var tpl = lampController.getTemplate();
                    console.log(tpl);
                    regexReplace(tpl.lampItems,data);
                    console.log(tpl);
                    if(needSave){
                        console.log('请先保存!');
                    }
                    console.log('close....');
                });
                break;
            default:
                break;

        }
    });

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
                    return data[k];
                }
                return content;
            });

        });

    }

}([],LODOP,jQuery,window);

