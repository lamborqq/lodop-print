/**
 * lodop-print
 * Copyright (c) 2018-2025 lanbery Lambor.Inc. All rights Reserved.
 * Statement ：模板设计器
 * The lamp-table (lambor-print-table) control follows the GPL v3 open source contract
 * And can be developed by any company or individual based on the source extension,
 * But the original author information needs to be retained.
 * As for commercial use, components based on this component extension also need open source.
 * dual licence : LICENSE
 */
/**
 * lamp.designer.js
 * @Author  : lanbery
 * @Version : v1.0
 * @Date    : 2018-03-13
 */
;!function ($,lampController,document,win) {
    "use strict";

    if(!$){
        console.error('设计器运行依赖jQuery,请引入依赖文件.');
        return;
    };
    var $DesignedContainer = $(".DesignedContainer");
    if(!$DesignedContainer.length){
        console.error('设计器容器不存在,请检查设计器Html代码。');
        return ;
    }
    if(!lampController){
        console.warn('控制器未初始化...');
        return;
    }
    var GlobalOptions = {
        defItemType : 'text',
        defItemRole : 'item',
        tableDataRows : 3,
        ItemSelectedClass : "item-selected",
        defTpl : {
            tplName : '自定义模板',
            items : []
        },
        barcode : {
            showOrigin : true,
            volume : '2010131031311',
            mode :'ean8',
            "settings" : {
                barWidth : 2,
                barHeight : 26,
                showHRI:false
            }
        }
    };

    var methods = ['lampDesigner','destroy'];

    var Settings = {

    };


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

    var InitializedDesigner = function (options) {
        Settings = $.extend(true,{},Settings,options);

        /* 加载Item */
        var tpl = lampController.getTemplate();
        if(tpl){
            if(!tpl.items)tpl.items = [];
            $DesignedContainer.find('[role="item"]').each(function (index,el) {
                var itemName = $(this).attr('name');
                if(!itemName)return true;
                var elItemType = $(this).data('type')||'text';
                var item = findItem(tpl,itemName);
                if(item&&item.type&&elItemType&&item.type!=elItemType){
                    item.type = elItemType||'text';
                    $(this).attr('data-type',elItemType);
                    $(this).data('type',elItemType);
                }else if(!item&&elItemType){
                    var content,alias,code,mItem;
                    code = $(this).data('code');
                    mItem = lampController.getMetaItem(code);
                    if(mItem){
                        item = $.extend(true,{},mItem,{'name':itemName,'type':elItemType});
                    }else {
                        switch (elItemType){
                            case 'text':
                                content = $(this).text()||'';
                                alias =  $(this).data('alias')||content;

                                break;
                            case 'barcode':
                                content = $(this).data('alias')||'';
                                alias =  $(this).data('alias')||content;
                                break;
                            case 'table':
                                break;
                            default:
                                break;
                        }
                        item = {
                            'name':itemName,
                            'content':content||'',
                            'alias':alias||'',
                            'type':elItemType
                        }
                    }
                    if($(this).attr('height'))item.height =$(this).attr('height');
                    if(item)tpl.items.push(item);


                }
                if(item&&item.type)
                switch (item.type){
                    case 'text':
                        drawSpan($(this),item);
                        break;
                    case 'barcode':
                        drawBarcode($(this),item);
                        break;
                    case 'table':
                        drawLampTable($(this),item,[]);
                        break;
                    default:
                        break;
                }
            });
        }
        /* */
        lampController.selectItem();

        return this;
    }



    /* -------------------------------------- LampDesigner Utils Start ---------------------------------------------- */

    /**
     *
     * @param $e
     * @param item
     * @param data
     */
    function drawLampTable($e,item,data) {
        if($e.length&&item&&$e.is('table')&&item.content){
            $e.empty();
            $e.attr('data-content',item.content);
            $e.data('content',item.content);
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
                //if(item.css)$caption.css(item.css);
                $e.append($caption);
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
                var $th = $('<th name="col'+idx+'" data-name="'+name+'"' +
                    ' data-index="'+index+'" data-sort="'+idx+'" ' +
                    ' >'+label+'</th>');
                if(model.thCss)$th.css(model.thCss);
                if(model.width)$th.css('width',model.width);
                $thr.append($th);
            });
            $thead.append($thr);
            $e.append($thead);

            var $tbody = $('<tbody></tbody>');
            //fillData

            if(data&&data.length){
                for(var i=0,len=data.length;i<len;i++){
                    var $btr = $('<tr data-rowid="'+i+'"></tr>');
                    var d = data[i];
                    $.each(SortColModel,function (idx,m) {
                        if(m.hidden)return true;
                        var index,name,text;
                        name = m.name||m.index;
                        index = m.index||(name+idx);
                        text = d[name]||m.defVal||'';
                        var $td = $('<td data-index="'+index+'" data-name="'+name+'">'
                            + text+'</td>');
                        if(m.tdCss)$td.css(m.tdCss);
                        $btr.append($td);
                    });
                    $tbody.append($btr);
                }
            }else {
                for(i=0;i<GlobalOptions.tableDataRows;i++){
                    var $btr = $('<tr data-rowid="'+i+'"></tr>');

                    $.each(SortColModel,function (idx,m) {
                        if(m.hidden)return true;
                        var index,name,text;
                        name = m.name||m.index;
                        index = m.index||(name+idx);
                        text = m.defVal||'';
                        var $td = $('<td data-index="'+index+'" data-name="'+name+'">'
                            + text+'</td>');
                        if(m.tdCss)$td.css(m.tdCss);
                        $btr.append($td);
                    });
                    $tbody.append($btr);
                }
            }
            $e.append($tbody);
            //tbody end
            if(item.tfoot){
                $e.append(item.tfoot);
            }

        }
    }

    /**
     *
     * @param $el
     * @param item
     */
    function drawSpan($el,item) {
        if($el.length&&item){
            var content = item.content||'';
            $el.empty();
            var $span = $('<span data-type="'+(item.type||'text')+'" data-alias="'+(item.alias||'')+'" ></span>');
            $span.text(content);
            if(item.width){
                var eW = $el.css('width')||$el.width()||'';
                if(eW){
                    /*$el.css('width',lampController.convertUnit(item.width,'px'));
                    $el.attr('width',lampController.convertUnit(item.width,'px'));*/
                }
                $span.css('width',lampController.convertUnit(item.width,'px',0));
            }
            if(item.height){
                var eH = $el.css('height')||$el.height();
                if(eH){
                    $el.css('height',lampController.convertUnit(item.height,'px',1));
                }
                $span.css('height',lampController.convertUnit(item.height,'px',1));
            }

            if(item.fontName){
                $span.css('font-family',item.fontName);
            }else {
                $span.css('font-family',"");
            }
            item.fontSize ? $span.css('font-size',item.fontSize):$span.css('font-size','');
            if(item.zIndex)$span.css('z-index',item.zIndex);

            $el.append($span);

        }
    }

    /**
     *
     * @param $e
     * @param item
     */
    function drawBarcode($e,item) {
        if($e.length&&item){
            $e.empty();
            var _type = item.type||'barcode';
            var barMode = item.barcode||GlobalOptions.barcode.mode;
            var _alias = item.alias||item.content||'';
            var _content = item.content||'';
            var tmp = {};
            if($e.closest('caption').height()){
                tmp.barHeight = $e.closest('caption').height();
            }
            if($e.closest('caption').css('height')){
                tmp.barHeight = $e.closest('caption').css('height');
            }

            var bcSettings = $.extend(true,{},GlobalOptions.barcode.settings,tmp);
            var demoVal = barMode!='code39' ? GlobalOptions.barcode.volume : (GlobalOptions.barcode.volume+"921882138912839812381287312738123781238");
            var $barcodeDIV = $('<div></div>').barcode(demoVal,barMode,bcSettings);
            $e.data('type',_type);
            $e.data('alias',_alias);
            $e.data('barcode',barMode);
            var $span = $('<span data-type="'+_type+'" data-alias="'+_alias+'" data-barcode="'+barMode+'"></span>');
            $span.text(item.content||'');
            $barcodeDIV.append($span);
            $e.attr('data-alias',_alias);
            $e.attr('data-code',item.code||item.alias);
            $e.append($barcodeDIV);
            //make sure last
        }
    }

    /**
     *
     * @param tpl
     * @param itemName
     * @returns {*}
     */
    function findItem(tpl,itemName) {
        var item = null;
        if(!tpl||!tpl.items||!tpl.items.length)return item;
        for(var i=0,len=tpl.items.length;i<len;i++){
            if(tpl.items[i].name==itemName)return tpl.items[i];
        }
        return item;
    }


    /* -------------------------------------- LampDesigner Utils End   ---------------------------------------------- */

    jQuery.lampDesigner = {
        initializer :InitializedDesigner,
        redrawItem : function (item) {
            if(!item||!item.name||!item.type)return this;
            var $item = $DesignedContainer.find('[role="item"][name="'+item.name+'"]');
            if($item.length){
                switch (item.type){
                    case 'text':
                        drawSpan($item,item);
                        break;
                    case 'barcode':
                        drawBarcode($item,item);
                        break;
                    case 'table':
                        drawLampTable($item,item,[]);
                        break;
                    default:
                        break;
                }
            }
            return this;
        }
    };

    jQuery.fn.extend({
        lampDesigner : $.lampDesigner.initializer,
        redraw : $.lampDesigner.redrawItem
    });

}(jQuery,window.lampController,window.document,window);