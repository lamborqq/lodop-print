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
 * 设计器
 * lamp.designer.js
 * @Author  : lanbery
 * @Version : v1.0
 * @Date    : 2018-03-09
 */
/**
 * 1.初始化容器
 * 2.加载item
 * 3.获取模板：getTemplate
 * 4.获取当前选中item或选中：selectionItem(itemName)
 * 5.重画item：redrawItem(itemName)
 * 6.更新或添加item：addItem(item)
 */
;!function ($,document,win) {
    /*if(!lodop){
        console.error('Lodop 控件未安装,设计器无法使用.');
        //return;
    }*/
    var $DesignedContainer = $(".DesignedContainer");
    if(!$DesignedContainer.length){
        console.error('设计器容器不存在,请检查设计器Html代码。');
        return ;
    }

    var lampCtrl = win.lampController;
    if(!lampCtrl){
        console.warn('控制器未初始化...');
    }


    /**
     * 默认设置
     * @type {{}}
     */
    var Defaults = {
        defItemType : 'text',
        defItemRole : 'item',
        tableDataRows : 20,
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
        },
        cfg : {
            data: "type",
            roleAttr:''
        },
        opts : {

        }
    }

    var TPL = Defaults.defTpl;
    var selection = '';

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

    /**
     * 初始化
     * @param tpl
     * @param options
     * @returns {InitializedDesigner}
     * @constructor
     */
    var InitializedDesigner = function (tpl,options) {
        if(options&&typeof options =='object'){
            this.settings = $.extend(true,{},Defaults.opts,options);
        }else if(options&&typeof options =='string'){
            this.settings = $.extend(true,{},Defaults.opts,{'tplName':options});
        }

        TPL = $.extend(true,{},Defaults.defTpl,tpl);

        /**
         * 处理页面与tpl
         */
        processHtmlItem(TPL);

        //加载items
        $DesignedContainer.find('[role="item"]').each(function (index,el) {
            var itemName = $(this).attr('name');
            if(!itemName)return true;
            var elItemType = $(this).data('type');
            var item = findItemByName(TPL,itemName);
            if(item.type&&item.type!=elItemType){
                $(this).attr('data-type',item.type);
                $(this).data('type',item.type);
            }else {

            }
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

        /* ================================Banding ItemCfg Start ====================================== */
        var $ItemCfg = $('table.lampTTP[name="itemCfg"]');
        if($ItemCfg.length){
            $ItemCfg.find('[role="itemCtl"]').on('change',function (e) {
                var itemName = $ItemCfg.find('[role="itemCtl"][name="itemPK"]').text();
                if(!itemName)return;
                var item = findItemByName(TPL,itemName);
                if(!item)return;
                var name = $(this).attr('name');
                var prop = $(this).data('ctrl-type');
                switch (name){
                    case 'itemAlias':
                    case 'itemContent':
                    case 'itemWidth':
                    case 'itemHeight':
                    case 'tableCaption':
                        updateItem(item,prop,$(this).val()||'');
                        break;
                    case 'itemFontName':
                        var fontFamily = $(this).val();
                        var valueStr = '';
                        if(fontFamily&&fontFamily.length>0&& fontFamily instanceof Array){
                            valueStr = fontFamily.join(',');
                        }else {
                            valueStr = fontFamily||'';
                        }
                        updateItem(item,prop,valueStr);
                        break;
                    case 'barcodeMode':
                        var barMode = item.type == 'barcode' ? $(this).val()||Defaults.barcode.mode : '';
                        updateItem(item,prop,barMode);
                        break;
                    default :
                        break;
                }
                var $item = $DesignedContainer.find('[role="item"][name="'+itemName+'"]');
                if($item.length){
                    //重画
                    switch (item.type){
                        case 'text':
                            drawSpan($item,item);
                            break;
                        case 'barcode':
                            drawBarcode($item,item);
                            break;
                        case 'table':
                            drawLampTable($item,item,{});
                            break;
                        default :
                            break;
                    }
                }

            });
        }
        /* ================================Banding ItemCfg End ====================================== */

        return this;
    };

    function redrawItem(itemName,item) {
        if(!itemName)return;
        var $item = $('.DesignedContainer[role="item"][name="'+itemName+'"]');
        if($item.length){
            //重画
            switch (item.type){
                case 'text':
                    drawSpan($item,item);
                    break;
                case 'barcode':
                    drawBarcode($item,item);
                    break;
                case 'table':
                    drawLampTable($item,item,{});
                    break;
                default :
                    break;
            }
        }
    }

    /**
     *
     * @param item
     * @param props
     * @param value
     */
    function updateItem(item,props,value) {
        if(!item||!props||typeof props!='string')return false;
        item[props]= value;
    }

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
                if(item.fontName)$caption.css('font-family',item.fontName);
                if(item.fontSize)$caption.css('font-size',item.fontSize);
                if(item.css)$caption.css(item.css);
                //if(item.width)$caption.css('width',item.width);
                //if(item.height)$caption.css('height',item.height);
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
                $thr.append($th);
            });
            $thead.append($thr);
            $e.append($thead);

            var $tbody = $('<tbody></tbody>');
            //fillData

            if(data&&data.length){
                for(i=0,len=data.length;i<len;i++){
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
                        $btr.append($td);
                    });
                    $tbody.append($btr);
                }
            }else {
                for(i=0;i<Defaults.tableDataRows;i++){
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
            $e.append($tbody);
            //tbody end
            if(item.tfoot){
                $e.append(item.tfoot);
            }

            //bandingClick
            $e.on('click',function (e) {
                ItemOnclick($(this),item,lampCtrl);
            });

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
            var $span = $('<span data-type="'+(item.type||'text')+'" data-alias="'+(item.alias||'')+'"></span>');
            $span.text(content);
            if(item.width){
                var eW = $el.css('width')||$el.width()||'';
                if(eW){
                    /*$el.css('width',ConvertUnit(item.width,'px'));
                    $el.attr('width',ConvertUnit(item.width,'px'));*/
                }
                $span.css('width',ConvertUnit(item.width,'px',0));
            }
            if(item.height){
                var eH = $el.css('height')||$el.height();
                if(eH){
                    $el.css('height',ConvertUnit(item.height,'px',1));
                }
                $span.css('height',ConvertUnit(item.height,'px',1));
            }

            if(item.fontName)$span.css('font-family',item.fontName);
            if(item.fontSize)$span.css('font-size',item.fontSize);
            if(item.zIndex)$span.css('z-index',item.zIndex);

            $el.append($span);
            $el.on('click',function (e) {
                ItemOnclick($el,item,lampCtrl);
            });
        }
    }

    function drawBarcode($e,item) {
        if($e.length&&item){
            $e.empty();
            var _type = item.type||'barcode';
            var barMode = item.barcode||Defaults.barcode.mode;
            var _alias = item.alias||item.content||'';
            var _content = item.content||'';
            var tmp = {};
            if($e.closest('caption').height()){
                tmp.barHeight = $e.closest('caption').height();
            }
            if($e.closest('caption').css('height')){
                tmp.barHeight = $e.closest('caption').css('height');
            }

            var bcSettings = $.extend(true,{},Defaults.barcode.settings,tmp);
            var demoVal = barMode!='code39' ? Defaults.barcode.volume : (Defaults.barcode.volume+"921882138912839812381287312738123781238");
            var $barcodeDIV = $('<div></div>').barcode(demoVal,barMode,bcSettings);
            $e.data('type',_type);
            $e.data('alias',_alias);
            $e.data('barcode',barMode);
            var $span = $('<span data-type="'+_type+'" data-alias="'+_alias+'" data-barcode="'+barMode+'"></span>');
            $span.text(item.content||'');
            $barcodeDIV.append($span);
            $e.append($barcodeDIV);

            //make sure last
            $e.on('click',function (event) {
                ItemOnclick($e,item,lampCtrl);
            });
        }
    }

    /**
     *
     * @param tpl
     */
    function processHtmlItem() {
        if(!TPL)return true;
        if(!TPL.items)TPL.items=[];
        $DesignedContainer.find('[role="item"]').each(function (index,element) {
            var itemName = $(this).attr('name');
            if(!itemName)return true;
            var type = $(this).data('type');
            var item;
            item = findItemByName(TPL,itemName);
            if(!item){
                item = {'name':itemName,'type':type};
                var content = '',$tableEl,caption;
                if(type=='table'){
                    $tableEl = $(this).is('table') ? $(this) : $(this).find('table:first');
                    if($tableEl.length){
                        caption = $tableEl.find('caption').text()||'';
                        if(caption)item.caption = caption;
                        var $thead = $tableEl.find('table:first thead');
                        var cols = [];
                        if($thead.length){
                            $thead.find('th').each(function (index,el) {
                                var colIndex = $(this).data('index')||$(this).attr('name');
                                if(!colIndex)return true;
                                var name = $(this).attr('name')||colIndex;
                                var label = $(this).text()||name;
                                var width = $(this).attr('width')||$(this).css('width');
                                var model = {
                                    'index':colIndex,
                                    'name':name,
                                    'label':label,
                                    'sortno': index
                                };
                                if(width)model.width = width;
                                cols.push(model);
                            });
                        }
                        item.colModel = cols;
                    }
                }else {
                    content = $(this).text()||'';
                }
                TPL.items.push(item);
            }
        });
    }

    var SelectionClicker = function ($item,callback) {

    };

    /**
     * 选中事件
     * @param $item
     * @param item
     * @param controller
     * @constructor
     */
    function ItemOnclick($item,item,controller) {
        var name = $item.attr('name');
        if(!name||!item)return;
        $DesignedContainer.find('[role="item"]').each(function (index,element) {
            $(this).removeClass(Defaults.ItemSelectedClass);
        });
        $item.addClass(Defaults.ItemSelectedClass);
        selection = item.name||'';
        if(controller&& typeof (controller.setProperties) == 'function'){
            controller.setProperties(item,this);
        }
    }

    /**
     * 在模板查找
     * @param tpl
     * @param itemName
     * @returns {*}
     */
    function findItemByName(tpl,itemName) {
        if(!tpl||!tpl.items||!itemName)return null;
        if(!tpl.items.length)return null;
        for(i=0,len=tpl.items.length;i<len;i++){
            if(tpl.items[i].name&&tpl.items[i].name==itemName)return tpl.items[i];
        }
        return null;
    }

    /* --------------------------------------------------------- */
    /**
     *
     * @param source
     * @param destUnit
     * @param type
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

    /**
     *
     * @param insrc
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

    jQuery.lampDesigner = {
        settings : {},
        initializer : InitializedDesigner,
        getTemplate : function () {
            return TPL;
        },
        selectionClick : function ($item,callback) {

        },
        refreshItem : redrawItem,
        test : function () {
            lampCtrl.setProperties({id:"text"});
        }
    };

    jQuery.fn.extend({
        lampDesigner : $.lampDesigner.initializer,
        getTemplate : $.lampDesigner.getTemplate,
        selectedItem : $.lampDesigner.selectionClick,
        refreshItem : $.lampDesigner.refreshItem,
        test : $.lampDesigner.test
    });

}(jQuery,window.document,window);