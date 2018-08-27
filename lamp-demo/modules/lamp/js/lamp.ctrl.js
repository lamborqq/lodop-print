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
;!function ($,win,pager) {
    "use strict";

    var GlobalSettings = {
        "containerId"           : "CtrlContainer",
        "ctrlSectionClass"      : "lampTTP",
        "lampTTPShowName"       : true,
        "ItemCodeRegx"          : /^\@\{[\w\W|\u4e00-\u9fa5]+\}$/,
        "selector"              : {
            allowClear: true,
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
            }
        },
        "fontFamilySelector"    : {

        }
    };
    var $CtrlContainer = $('#'+GlobalSettings.containerId);
    if(!$CtrlContainer.length)$CtrlContainer = $('.'+GlobalSettings.containerId);

    if(!$CtrlContainer.length){
        console.error('控制器容器不存在.');
        return;
    }
    var $TplSetting = $CtrlContainer.find('table.lampTTP[name="tplSetting"]');
    var $PrintSetting = $CtrlContainer.find('table.lampTTP[name="printSetting"]');
    var $ItemCfg = $CtrlContainer.find('table.lampTTP[name="printSetting"]');
    var $ItemTTP = $CtrlContainer.find('table.lampTTP[name="lampTTP"]');
    if(!$TplSetting.length||!$PrintSetting.length||!$ItemCfg.length||!$ItemTTP.length){
        console.error('控制器容器不存在.');
        return;
    }

    var $TBDND = null;
    var Settings = {
        "ctrlWidth" : '98%',
        "metaItems" : [],
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
                {"id":"qrcode","text":"二维码"}
            ]
        },
        "barcodeOpts"   : {
            defVolume   : "952725025031",
            defMode     : "code11",
            settings    : {
                barWidth : 2,
                barHeight : 26,
                showHRI:false
            }
        }
    };

    var TPL = {};

    var TBCtrlManager = function () {

        var metaItems = Settings.metaItems;


        /**
         * 初始化
         * @param item
         * @param metaItems
         * @returns {InitializerTTP}
         * @constructor
         */
        function InitializerTTP(item,designer) {
            if(!item||!item.type||!item.colModel||!item.colModel.length||item.type !='table')return this;
            TBCtrlManager.Designer = designer;

            var propsModel = [];
            for(var i in item.colModel){
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

            $TBDND = null;
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
                tr += '</tr>';
                $TTPTbody.append(tr);
            });
            $ItemTTP.append($TTPTbody);
           //
            if($TBDND){
                $TBDND.tableDnDUpdate();
            }else {
                $TBDND = $ItemTTP.tableDnD({
                    onDrop : function (table,row) {
                        $(table).find('tbody:first>tr').each(function (idx,tr) {
                            var $row = $(tr);
                            var _index = $row.data('index');
                            $.each(item.colModel,function (i,m) {
                                if(_index==m.index){
                                    m.sortno = idx;
                                    if($row.find('td>input[type="checkbox"][name="hidden"]').is(':checked')){
                                        m.hidden = true;
                                    }else {
                                        m.hidden = false;
                                    }
                                    m.width = $row.find('td>input[type="text"][name="colWidth"]').val()||'';
                                    return false;
                                }
                            });

                            if(designer)designer.refreshItem(item.name,item);
                        });
                        //触发重画

                    }
                });
            }

            return this;
        }

        /**
         * 更新item colModel 返回item
         * @param item
         * @param index
         * @param attr
         * @param val
         * @returns {*}
         */
        function updateItemColModel(item,index,attr,val) {
            if(!item||!item.colModel||!item.colModel.length)return item;
            if(!attr||typeof attr !='string'||!index||typeof index != 'string')return item;
            for(var i = 0,len = item.colModel.length;i<len;i++){
                if(item.colModel[i].index==index){
                    if(typeof val != 'undefined'){
                        item.colModel[i][attr] = val;
                    }else {
                        if(attr in item.colModel[i]) item.colModel[i][attr] = undefined;
                    }
                    return item;
                }
            }
            return item;
        }

        /**
         * 合并item
         * @param item
         * @param metaItem
         */
        function mergeItem(item,metaItem,mergeTableOnly) {
            mergeTableOnly = mergeTableOnly || false;
            if(!mergeTableOnly){
                if('alias' in metaItem|| 'code' in metaItem)item.alias = metaItem.alias||metaItem.code;
                if('content' in metaItem)item.content = metaItem.content;
            }

            var propColModel = metaItem.colModel||[];
            if(propColModel.length>0&&item.type=='table'){
                var colModel = [];
                var jLength = item.colModel ? 0 : item.colModel.length;
                for(var i=0,len=propColModel.length;i<len;i++){
                    var pModel = propColModel[i];
                    if(jLength>0){
                        var find = false;
                        for(var j=0;j<jLength;j++){
                            var jModel = item.colModel[j];
                            if(jModel.name==pModel.name){
                                jModel = $.extend(jModel,pModel);
                                find = true;
                                colModel.push(jModel);
                                break;
                            }
                        }
                        if(!find){
                            pModel.sortno = i;
                            colModel.push(pModel);
                        }
                    }else {
                        pModel.sortno = i;
                        colModel.push(pModel);
                    }
                }
                item.colModel = colModel;
            }
            return item;
        }

        return {
            Designer : null,
            build : InitializerTTP,
            mergeItem : mergeItem
        }
    }();

    /**
     *
     * @param metaItems
     * @constructor
     */
    var Initializer = function (metaItems) {

        var $fontFamily = $CtrlContainer.find('select[role="itemCtl"][name="itemFontName"]');
        $fontFamily.val(null);
        var fontSelectOption = Settings.fontSelector = $.extend(true,{},Settings.fontSelector,GlobalSettings.selector);
        $fontFamily.select2(fontSelectOption);

        var $barcodeSelector = $CtrlContainer.find('select[role="itemCtl"][name="barcodeMode"]');
        var barcodeOption = Settings.barcodeSelector
            = $.extend(true,{},Settings.barcodeSelector,GlobalSettings.selector,{allowClear: false});
        $barcodeSelector.val(null).select2(barcodeOption);


        var name = $CtrlContainer.find('[role="itemCtl"][name="itemPK"]').text();
        var type = $CtrlContainer.find('[role="itemCtl"][name="itemType"]').text();
        if(!name&&!type){

        }

    }



    var FillControllerProperties = function ($container,item) {
        //console.log(item);
        if(!item||!item.name||!item.type)return;
        tollgerDiv(item.type);
        $container.find('[role="itemCtl"]').each(function (index,element) {
            var $ctrlProps = $(this);
            var name = $ctrlProps.attr('name');
            if(!name)return true;

            switch (name){
                case 'itemType':
                    $ctrlProps.text(item.type);
                    break;
                case 'itemPK':
                    $ctrlProps.text(item.name);
                    break;
                case 'itemAlias':
                    $ctrlProps.val(item.alias||'');
                    break;
                case 'itemContent':
                    $ctrlProps.val(item.content||'');
                    break;
                case 'itemFontName' :
                    var fontName = item.fontName||null;
                    $ctrlProps.val(fontName).trigger('change');
                    break;
                case 'itemFontSize':
                    $ctrlProps.val(item.fontSize||null).trigger('change');
                    break;
                case 'itemWidth' :
                    $ctrlProps.val(item.width||'');
                    break;
                case 'itemHeight':
                    $ctrlProps.val(item.height||'');
                    break;
                case 'tableCaption':
                    $ctrlProps.val(item.caption||'');
                    break;
                case 'comment':
                    $ctrlProps.html(item.comment||'');
                    break;
                default:
                    break;
            }
        });

        if(item.type=='table'){
            TBCtrlManager.build(item);
        }else if(item.type=='barcode'){

        }else {

        }

    };


    function tollgerDiv(type) {
        var $ItemCfgDiv = $ItemCfg.closest('div');
        var $ItemTTPDiv = $ItemTTP.closest('div');
        var $TplSettingDiv = $TplSetting.closest('div');
        switch (type){
            case 'table':
                $ItemCfgDiv.show();
                $ItemTTPDiv.show();
                $TplSettingDiv.hide();
                $CtrlContainer.find('input[role="itemCtl"][name="tableCaption"]').closest('tr').show();
                $CtrlContainer.find('select[role="itemCtl"][name="barcodeMode"]').closest('tr').hide();
                break;
            case 'barcode':
                $ItemCfgDiv.show();
                $ItemTTPDiv.hide();
                $TplSettingDiv.hide();
                $CtrlContainer.find('input[role="itemCtl"][name="tableCaption"]').closest('tr').hide();
                $CtrlContainer.find('select[role="itemCtl"][name="barcodeMode"]').closest('tr').show();
                break;
            case 'text':
                $ItemCfgDiv.show();
                $ItemTTPDiv.hide();
                $TplSettingDiv.hide();
                $CtrlContainer.find('input[role="itemCtl"][name="tableCaption"]').closest('tr').hide();
                $CtrlContainer.find('select[role="itemCtl"][name="barcodeMode"]').closest('tr').hide();
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




    /*---------------------------------------------------------------------*/
    /**
     * 查找metaItem ,不存在返回null
     * @param code
     * @returns {*}
     */
    function findMetaItemByCode(code) {
        var metaItem = null;
        if(code&&(code in Settings.metaItems))metaItem = Settings.metaItems[code];
        return metaItem;
    }
    /**
     *
     * @param content
     * @returns {*}
     */
    function getItemCode(content) {
        if(!content||typeof content !='string')return content;
        var result = content;
        if(typeof (content) !='undefined' && content!=null && content != "" && GlobalSettings.ItemCodeRegx.test(content)){
            var start = content.indexOf('{') + 1;
            var end = content.lastIndexOf('}');
            result = content.substring(start,end);
            if(typeof result == 'undefined'){
                return content;
            }
        }
        return content;
    }
    /*---------------------------------------------------------------------*/
    /**
     *
     * @type {{init, setProperties}}
     */
    var lampController = function () {
        return {
            init : function (options) {
                if(options&&typeof options == 'string'){
                    
                }else if(options&&typeof options=='object'){
                    Settings = $.extend(true,{},Settings,options);
                }

                Initializer();
                return this;
            },
            reloadTPL : function (tpl) {
                if(tpl)TPL = tpl;
            },
            getTemplate : function () {
                return TPL||{};
            },

            setProperties : function(item,lampDesigner){
                var designer = lampDesigner;
                FillControllerProperties($CtrlContainer,item);
            },
            reloadMeta : function () {

            }

        }
    }();

    win.lampController = lampController;

}(jQuery,window,{});

window.lampController.init({});
