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
 * designed.b2c.delivery.tpl
 * @Author  : lanbery
 * @Version : v1.0
 * @Date    : 2018-02-05
 */
!function ($,document,window,properties,undefined) {

    /**
     * 默认参数
     * @type {{fontSelect: {allowClear: boolean, language: string, placeholder: string, tokenSeparators: string[], maximumSelectionLength: number, tags: boolean, templateResult: templateResult, data: *[]}, barcodeOPS: {allowClear: boolean, language: string, placeholder: string, templateResult: templateResult, data: *[]}, barcodeDefault: {value: string, defMode: string, settings: {barWidth: number, barHeight: number, showHRI: boolean}}, defaultFontSize: string, demoData: {barcode: string}, itemDefaults: {height: string}}}
     */
    var Defaults = {
        global : {
            tplName : '',//TPL 默认名称
            PrinterSetUp:'disabled'
        },
        fontSelect : {
            width:'98%',
            allowClear: true,
            language: "zh-CN",
            placeholder:'请选择...',
            tokenSeparators : [',',' '],
            maximumSelectionLength : 3,
            tags : true,
            templateResult : function (state){
                if(state.disabled){
                    var $text = $('<span>'+state.text+'<i class="fa fa-ban text-danger" aria-hidden="true"></i>'+'</span>');
                    return $text;
                }else {
                    return state.text;
                }
            },
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
        paperSelect : {
            allowClear: true,
            width:'85%',
            language: "zh-CN",
            placeholder:'请选择...',
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
        printerSelect : {
            width:'98%',
            language: "zh-CN",
            placeholder:'请选择...',
            data : []
        },
        printerOrient :{
            width:'98%',
            language: "zh-CN",
            placeholder:'请选择...',
            data : [
                {id:1,text:'纵（正）向打印，固定纸张'},
                {id:2,text:'横向打印，固定纸张'},
                {id:3,text:'纵(正)向打印，宽度固定，高度按打印内容的高度自适应'},
                {id:0,text:'打印方向由操作者自行选择或按打印机缺省设置'}
            ]
        },
        barcodeSelect : {
            width:'98%',
            allowClear: false,
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
            data : [
                {"id":"code11","text":"Code 11"},
                {"id":"Code39","text":"Code 39"},
                {"id":"ean8","text":"EAN 8"},
                {"id":"ean13","text":"EAN 13"},
                {"id":"code128","text":"code 128"},
                {"id":"std25","text":"标准2-5位"},
                {"id":"int25","text":"工业2-5位"},
                {"id":"qrcode","text":"二维码"}
            ]
        },
        barcodeDefault :{
            "value" : "89277262662112",
            "defMode": 'ean8',
            "settings" : {
                barWidth : 2,
                barHeight : 26,
                showHRI:false
            }
        },
        defaultFontSize : '14px',
        demoData : {
            barcode : '9018282818332',
        },
        itemDefaults : {
            type: "text",
            height : '20px',
            width : "100%",
            defFontName : "Verdana, Arial, '微软雅黑','宋体'"
        }
    };

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

    var $DesignedContainer = $(".DesignedContainer");
    if(!$DesignedContainer[0]){
        console.error('设计器容器不存在,请检查设计器Html代码。');
        return ;
    }
    var $PropertyContainer = $("#PropertyContainer");
    if(!$PropertyContainer[0]){
        console.error('属性管理容器不存在。');
        return;
    }
    var $lampTTPContainer = $PropertyContainer.find("#lampTTP");



    var modifiedStatus = 0;

    var $barcodeMode = $("#barcodeMode");
    /**
     * 初始化字体选项框
     * @constructor
     */
    var LoadFontNameSelect2 = function () {
        var $fontNameSelect = $PropertyContainer.find("#itemFontName").select2(Defaults.fontSelect);
        $PropertyContainer.find('#barcodeMode').select2(Defaults.barcodeSelect);
    }
    LoadFontNameSelect2();

    var tpl = {};

    var $selectedItem = null;
    var selection = null;
    /**
     * 构建item
     * @param itemName
     * @returns {null}
     * @constructor
     */
    var BuildItem = function (itemName) {
        if(!itemName)return null;

        var itemSelctor = '[role="item"][name="'+itemName+'"]';
        var $_item = $DesignedContainer.find(itemSelctor);

        if($_item[0]){
            $selectedItem = $_item;
            /**
             * 如果找到，则返回
             */
            if(findItem(itemName)!=null)return findItem(itemName);

            var _itemData = $.extend(true,{"name" : itemName},Defaults.itemDefaults);
            var content = $_item.val()||$_item.find('>span:first').text();
            var _fontName =$_item.find(">span:first").css("font-family") ||$_item.css("font-family")||Defaults.itemDefaults.defFontName;
            _itemData.fontName = _fontName;
            _itemData.fontSize = $_item.find(">span:first").css("font-size") ||$_item.css("font-size")||"16px";

            tpl.items.push(_itemData);
            return _itemData;
        }else {
            return null;
        }
    }

    /**
     * 从tpl查找item
     * @param itemName
     * @returns {*}
     */
    function findItem(itemName) {
        if(!tpl.items||tpl.items.length==0)return null;
        for(var i in tpl.items){
            if(itemName==tpl.items[i].name)return tpl.items[i];
        }
        return null;
    }



    /**
     * 绑定change事件
     * @type {*|HTMLElement}
     */
    $PropertyContainer.find('[role="itemCtl"]').on('change',function () {
        var $itemCtl = $(this);
        var selItemName = $PropertyContainer.find("#itemPK").text();
        if(!selItemName)return this;

        var ctrlType = $itemCtl.data('ctrl-type');
        //console.log(ctrlType);

        switch (ctrlType){
            case 'itemPropRefresh':
                break;
            case 'itemAlias':
                InputChanged('alias',$(this).val()||'');
                break;
            case 'itemContent':
                InputChanged('content',$(this).val()||'');
                break;
            case 'itemFontName':
                break;
            case 'itemFontSize':
                InputChanged('fontSize',$(this).val()||'');
                break;
            case 'itemWidth':
                InputChanged('width',$(this).val());
                break;
            case 'itemHeight':
                break;
            case 'barcodeMode':
                break;
            case 'tableCaption':
                break;
            default :
                    break;
        }

        return this;
    });

    /**
     * 改变Item值
     * @param item
     * @param attr
     * @param val
     * @constructor
     */
    var InputChanged = function (item,attr,val) {
       if(item&&attr&&typeof val != 'undefined'){
           item[attr] = val;
       }
    }

    /**
     * 加载TPL
     * @constructor
     */
    var LOAD_TEMPLATE= function () {
        processItem();
        var _items = tpl.items =tpl.items ||[];
        /**/
        if(_items.length>0) {
            $DesignedContainer.find('[role="item"]').each(function () {
                var name = $(this).attr('name');
                var $item = $(this);
                var _item = findItem(name);
                if (_item == null) {
                    _item = $.extend(true, {}, Defaults.itemDefaults);
                    htmlConvertItem(_item, $item);
                    return true;
                }

                var type = _item.type || 'text';
                switch (type) {
                    case 'text':
                        drawSpan(_item, $item);
                        break;
                    case 'table':
                        DrawLampTable(_item,$item,{});
                        break;
                    case 'barcode':
                        drawBarcode(_item,$item);
                        break;
                    default:
                        break;
                }

            });
        }
        /*绑定item事件*/
        $DesignedContainer.find('[role="item"]').on('click',function () {
            $PropertyContainer.find('[role="hideBtn"]').trigger('click');
            var $this = $(this);
            var width = $this.width()||$this.css('width');
            var name = $this.attr('name');
            if (!name) return true;
            var selectionItem = findItem(name);
            /**
             * 移除选中
             */
            $DesignedContainer.find('[role="item"]').each(function () {
                $(this).removeClass("item-selected");
            });
            $this.addClass("item-selected");
            $selectedItem = $(this);
            setItemPropertoes(selectionItem,$this);
            properties.buildMetaOps(tpl);
            return this;
        });
        /*绑定itemCtl change 事件 */
        $PropertyContainer.find('[role="itemCtl"]').on('change',function () {
            var itemPK = $PropertyContainer.find('#itemPK').text();
            if(!itemPK)return this;
            var item = findItem(itemPK);
            if(!item)return this;
            var ctlName = $(this).attr('name');
            switch (ctlName){
                case 'itemAlias':
                case 'itemRemark':
                    updateItemValue(item,$(this).data("ctrl-type"), $(this).val());
                    //drawSpan(item, $DesignedContainer.find('[role="item"][name="'+itemPK+'"]'));
                    break;
                case 'itemContent':
                    updateItemValue(item,$(this).data("ctrl-type"), $(this).val());
                    //drawSpan(item, $DesignedContainer.find('[role="item"][name="'+itemPK+'"]'));
                    break;
                case 'itemWidth':
                case 'itemHeight':
                case 'itemFontSize':
                case 'tableCaption':
                    updateItemVolume(item,$(this).data("ctrl-type"),$(this).val());
                    break;
                case 'itemFontName':
                    var $selectFontFamily =  $(this).val();
                    var fontName = '';
                    if($selectFontFamily && $selectFontFamily.length>=1){
                        fontName = $selectFontFamily.join(',');
                    }
                    updateItemVolume(item,$(this).data("ctrl-type"),fontName);
                    break;
                case 'barcodeMode':
                    var barMode = $(this).val()||Defaults.barcodeDefault.defMode;
                    updateItemVolume(item,$(this).data("ctrl-type"),barMode);
                    break;
                default:
                    break;
            }
            modifiedStatus = 1;
            // mergeItem(tpl,selection);
            if(item.type=='barcode'){
                drawBarcode(item,$DesignedContainer.find('[role="item"][name="'+itemPK+'"]'));
            }else if(item.type=='table'){
                DrawPropsTable(item,$DesignedContainer.find('[role="item"][name="'+itemPK+'"]'),{});
                //draw cfg
                DrawLampTable(item,$DesignedContainer.find('[role="item"][name="'+itemPK+'"]'),{});
            }else {
                drawSpan(item, $DesignedContainer.find('[role="item"][name="'+itemPK+'"]'));
            }
            return this;
        });

        function updateItemValue(item,attr,val) {
            if(!item||!attr)return;
            item[attr]=val||'';
        }

        function updateItemVolume(item,attr,val) {
            if(!item||!attr||!val)return;
            item[attr]=val;
        }

        /**
         * 设置属性
         * @param item
         */
        function setItemPropertoes(item) {
            if (!item || !item.name || !item.type) return;
            /* 循环*/
            $PropertyContainer.find('[role="itemCtl"]').each(function () {
                var $this = $(this);
                if (!$this.data('ctrl-type')) {
                    return true;
                }
                var prop = $this.data('ctrl-type');
                var val = item[prop] || '';
                switch (prop) {
                    case 'type':
                    case 'name':
                    case 'comment':
                        $this.text(val);
                        break;
                    case 'alias':
                    case 'content':
                    case 'fontSize':
                    case 'width':
                    case 'height':
                    case 'tableCaption':
                        $this.val(val);
                        break;
                    case 'barcode':
                        var _selectVal = item.barcode || null;
                        $this.val(_selectVal).trigger('change');
                        break;
                    case 'fontName':
                        var _selectFont = item.fontName;
                        if (_selectFont) {
                            if (_selectFont.indexOf(',') != -1) {
                                var _arr = _selectFont.split(',');
                                for (var i in _arr) {
                                    _arr[i] = _arr[i].replace(/^\s+|\s+$/gm, '');
                                }
                                $this.val(_arr).trigger('change');
                            } else {
                                _selectFont = _selectFont.replace(/^\s+|\s+$/gm, '');
                                $this.val(_selectFont).trigger('change');
                            }
                        } else {
                            $this.val(null).trigger('change');
                        }
                        break;
                    case 'lampTable':
                        break;
                    default:
                        break;
                }
            });
            var $TBCfg = $("#TBCfgContainer");
            //类型处理
            switch (item.type) {
                case 'text':
                    $TBCfg.hide();
                    $PropertyContainer.find('[role="itemCtl"][data-ctrl-type="barcode"]').val(null).closest('tr').hide();
                    delete item.barcode;
                    $PropertyContainer.find('[role="itemCtl"][data-ctrl-type="caption"]').val('').closest('tr').hide();
                    delete item.colModel;
                    break;
                case 'barcode':
                case 'qrcode':
                    $TBCfg.hide();
                    $PropertyContainer.find('[role="itemCtl"][data-ctrl-type="barcode"]').val(item.barcode || Defaults.barcodeDefault).closest('tr').show();
                    $PropertyContainer.find('[role="itemCtl"][data-ctrl-type="caption"]').val('').closest('tr').hide();
                    delete item.colModel;
                    break;
                case 'table':
                    delete item.barcode;
                    $TBCfg.show();
                    $PropertyContainer.find('[role="itemCtl"][data-ctrl-type="barcode"]').val(null).closest('tr').hide();
                    var caption = item.caption ||'';
                    $PropertyContainer.find('[role="itemCtl"][data-ctrl-type="caption"]').val(caption).closest('tr').show();
                    break;
                default:
                    $TBCfg.hide();
                    $PropertyContainer.find('[role="itemCtl"][data-ctrl-type="barcode"]').val(null).closest('tr').hide();
                    $PropertyContainer.find('[role="itemCtl"][data-ctrl-type="caption"]').val('').closest('tr').hide();
                    break;
            }

        }
    }

    function processItem() {
        if(!tpl)return true;
        if(!tpl.items)tpl.items=[];
        $DesignedContainer.find('[role="item"]').each(function (index,element) {
            var name = $(this).attr('name');
            if(!name)return true;
            var type = $(this).data('type')||'text',text;
            var len = tpl.items.length;
            var exists = false;
            for(i=0;i<len;i++){
                if(name==tpl.items[i].name){
                    exists = true;
                    break;
                }
            }
            if(!exists){
                var it = {
                    'name' : name,
                    'type' : type
                };
                var w = $(this).width()||$(this).css('width');
                if(w)it.width = w;
                var h = $(this).height()||$(this).css('height');
                if(h)it.height = h;
                if(type=='table'){

                    var $thead;
                    if($(this).is('table')){
                        $thead = $(this).find('thead');
                        if($(this).find('caption').length){
                            it.caption = $(this).find('caption')[0].text()||'';
                        }
                    }else {
                        $thead = $(this).find('table:first thead');
                        if($(this).find('table:first caption').length){
                            it.caption = $(this).find('caption')[0].text()||'';
                        }
                    }
                    if($thead.length){
                        var colModel = [];
                        $thead.find('th').each(function (index,el) {
                            var index = $(this).data('index')||$(this).attr('name');
                            if(!index)return true;
                            var name = $(this).attr('name')||index;
                            var label = $(this).text()||name;
                            colModel.push({
                                "index":index,
                                "name":name,
                                "label":label,
                                "align":"center",
                                "defVal":"--",
                                "width":"",
                                "sortno":1
                            });
                        });
                        it.colModel = colModel;
                    }
                }else{
                    text = $(this).text()||'';
                    it.alias = text;
                    it.content = text;
                };
                tpl.items.push(it);
            }
        });
    }

    function mergeItem(tpl,item){
        if(!tpl||!item)return ;
        if(!tpl.items){
            tpl.items = [item];
        }else {
            for(var idx in tpl.items){
                if(tpl.items[idx].name&&tpl.items[idx].name==item.name){
                    tpl.items[idx] = item;
                    break;
                }
            }
        }
    }
    var ITEM_BANDINGONCLICK = function () {

    }

    /**
     * 通过item html 反向
     * @param item
     * @param $e
     */
    function htmlConvertItem(item,$e) {
        item.name = $e.prop('name');
        var content = $e.find('span').text()||$e.text()||'';
        var alias = $e.data('alias')||content;
        item.content = content;
        item.alias = alias;
    }

    /**
     * 绘制SpanItem
     * @param item
     * @param $e
     * @returns {boolean}
     */
    function drawSpan(item,$e) {
        if(!item||!$e[0])return true;
        if(item.type=='table')return;
        $e.empty();
        var _type = item.type||'text';
        $e.attr('data-type',_type);
        var _alias = item.alias||item.content||'';
        $e.data('type',_type);
        $e.prop('data-alias',_alias);
        var $span = $('<span data-type="'+_type+'" data-alias="'+_alias+'"></span>');
        $span.text(item.content||'');
        if(item.width){
            var eW = $e.css('width')||$e.width();
            if(eW&&eW<item.width){
                $e.css('width',ConvertUnit(item.width,'px'));
            }
            $span.css('width',ConvertUnit(item.width,'px',0));
        }
        if(item.height){
            var eH = $e.css('height')||$e.height();
            if(eH&&eH<item.height){
                $e.css('height',ConvertUnit(item.height,'px',1));
            }
            $span.css('height',ConvertUnit(item.height,'px',1));
        }

        if(item.fontName)$span.css('font-family',item.fontName);
        if(item.fontSize)$span.css('font-size',item.fontSize);
        if(item.zIndex)$span.css('z-index',item.zIndex);

        $e.append($span);
        return true;
    }

    /**
     * 绘制条码
     * @param item
     * @param $e
     * @returns {boolean}
     */
    function drawBarcode(item,$e) {
        if(!item||!$e[0])return true;
        $e.empty();
        var _type = item.type||'barcode';
        var barMode = item.barcode||Defaults.barcodeDefault.defMode;
        var _alias = item.alias||item.content||'';
        var _content = item.content||'';
        var tmp = {};
        if($e.closest('caption').height()){
            tmp.barHeight = $e.closest('caption').height();
        }
        if($e.closest('caption').css('height')){
            tmp.barHeight = $e.closest('caption').css('height');
        }

        var bcSettings = $.extend(true,{},Defaults.barcodeDefault.settings,tmp);
        var $barcodeDIV = $('<div></div>').barcode(Defaults.barcodeDefault.value,barMode,bcSettings);
        $e.data('type',_type);
        $e.data('alias',_alias);
        $e.data('barcode',barMode);
        var $span = $('<span data-type="'+_type+'" data-alias="'+_alias+'" data-barcode="'+barMode+'"></span>');
        $span.text(item.content||'');
        $barcodeDIV.append($span);
        $e.append($barcodeDIV);
    }

    /**
     *
     * @param $item
     * @param tableData
     * @returns {boolean}
     * @constructor
     */
    var DrawLampTable = function (item,$item,tableData) {
        if(!item||!item.name||!item.colModel||item.colModel==0)return;
        if(!$item[0])return;

        var selfTB = $item[0].tagName=='table';

        $item.empty();

        var colModels = item.colModel;
        var SortColModel = colModels.sort(function (a,b) {
            if(!a.sortno&&b.sortno)return -1;
            if(a.sortno&&!b.sortno)return 1;
            if(a.sortno&&b.sortno)return (parseInt(a.sortno)-parseInt(b.sortno)>0) ? 1 : -1;
            return 0;
        });

       // console.log(colModels.length);
        /**
         *
         */
        if(item.caption){
            $item.append('<caption style="text-align: center;'
                +(item.fontName? ('font-family:'+ item.fontName+';') : '')
                +(item.fontSize ? ('font-size:'+item.fontSize +';') : '')
                +'">'+item.caption+'</caption>');
        }
        var $thead = $('<thead></thead>');
        var $thr = $('<tr></tr>');
        $.each(SortColModel,function (idx,model) {
            //console.log(model);
            if(!model||(!model.name&&!model.index))return true;
            var name = model.name||model.index;
            var index = model.index||(name+idx);
            var label = model.label||name;
            if(model.hidden){
                return true;
            }
            var $th = $('<th name="'+name+'" data-index="'+index+'" data-sort="'+idx+'">' +label+'</th>');
            if(model.width)$th.css('width',model.width);
            $thr.append($th);
        });
        $thead.append($thr);
        $item.append($thead);
        var $tbody = $('<tbody></tbody>');
        if(tableData&&tableData.length>0 ){//fill data
            //initial data
            for(_i=0,len=tableData.length;_i<len;_++){
                var $tr = ('<tr rowid="'+_i+'"></tr>');
                var data = tableData[_i];
                $.each(SortColModel,function (idx,model) {
                    var prop = model.name;
                    var td = '<td>'+((prop in data) ?  data[prop] : '')+'</td>';
                    $tr.append(td);
                });
                $tbody.append($tr);
            }
        }else {
            for(var i = 0 ; i <3;i++){
                var $tr = $('<tr></tr>');
                $.each(SortColModel,function (idx,m) {
                    if(m.hidden)return true;
                    var td = '<td>'+(m.defVal||'&nbsp;&nbsp;');
                    td = td + '</td>';
                    $tr.append($(td));
                });
                $tbody.append($tr);
            }
        }
        $item.append($tbody);
    }

    /**
     * 初始化table配置
     * @param item
     * @param $item
     * @param tableData
     * @constructor
     */
    var DrawPropsTable = function (item,$item,tableData) {
        if(!item||!item.colModel||item.colModel.length==0)return true;
        var propModels = [];
        for(var i in item.colModel){
            var model = {};
            var label = item.colModel[i].label||item.colModel[i].index;
            if(!label){
                continue;//忽略不合法的模板
            }
            model.label = label;
            var index = item.colModel[i].index||('idx_'+i);
            model.index = index;
            var name = item.colModel[i].name||index;
            model.name = name;
            var hideProp = 'hidden' in item.colModel[i] ? item.colModel[i].hidden : false;
            model.hidden = hideProp;
            if(item.colModel[i].width)model.width = item.colModel[i].width;

            propModels.push(model);
        }

        /* 初始化lampTTB*/
        if(!$lampTTPContainer[0])return true;
        var $ttpBody = $lampTTPContainer.find('tbody:first');

        if(propModels.length==0){
            return true;
        }
        if($ttpBody[0])$ttpBody.empty();
        if($lampTTPContainer.find('caption')[0]&&item.caption)$lampTTPContainer.find('caption').text('['+item.caption+']列表显示设置');
        $.each(propModels,function (idx,model) {
            var index = model.index;
            var name = model.name;
            var tr = '<tr data-index="'+index+'" data-name="'+name+'" id="'+idx+'">';
            tr = tr + '<td>'+model.label+'['+name+']</td>';
            tr = tr + '<td><input type="checkbox" name="hidden" data-index="'+index+'" '+(model.hidden ? 'checked' : '')+'></td>';
            tr = tr + '<td><input type="text" name="colWidth" class="colWidth" data-index="'+index+'"></td>';
            tr = tr + '</tr>'
            $ttpBody.append(tr);
        });

        $lampTTPContainer.find('tr>td>input[type="checkbox"]').on('change',function () {
            var index = $(this).data('index');
            var val = $(this).is(':checked');
            updateItemsVolume(item.colModel,index,'hidden',val);
            //alert(index+'>>>'+val);
            DrawLampTable(item,$item,{});
        });

        $lampTTPContainer.find('tr>td>input[type="text"][name="colWidth"]').on('change',function () {
            var index = $(this).data('index');
            var val = $(this).val();
            updateItemsVolume(item.colModel,index,'width',val);
           // console.log(index+'>>>'+val);
            DrawLampTable(item,$item,{});
        });

        var tt = $lampTTPContainer.tableDnD({
            onDrop : function (table,row) {
                //console.log(item);
                if(!item.colModel||item.colModel.length==0)return ;
                $(table).find('tbody:first>tr').each(function (idx,tr) {
                    var $row = $(tr);

                    var index = $row.data('index');
                    //console.log(index+"-------"+idx);
                    $.each(item.colModel,function (i,model) {
                        if(index==model.index){
                            model.sortno = idx;
                            if($row.find('td>input[type="checkbox"]').is(':checked'))model.hidden=true;
                            if($row.find('td>input[type="text"][name="colWidth"]').val())model.width=$row.find('td>input[type="text"][name="colWidth"]').val();
                            return false;
                        }
                    });
                });
                //console.log(item);
                DrawLampTable(item,$item,{});
            }
        });

        /**
         * 更新值
         * @param item 必须为对象
         * @param index 必须string
         * @param val
         */
        function updateItemsVolume(items,index,attr,val) {
            if(!items||!index||(typeof index != 'string')||!attr||!(items instanceof Array))return;
            for(_j=0,len=items.length;_j<len;_j++ ){
                if(items[_j].index == index){
                    if(typeof val !='undefined'){
                        items[_j][attr]= val;
                    }else {
                        item[_j][attr]=undefined;
                    }
                    break;
                }
            }
        }
    }

    var InitialLampDesigner = function (options,meta) {
        tpl = $.extend(true,{},options,{"meta":meta||[]});
        var labelTitle = tpl.tplName||'';
        if(tpl.tplNo)labelTitle = labelTitle +'['+tpl.tplNo+']';
        if(tpl.tplName)$("#tplName").text(labelTitle);
        var TplItems = tpl.items ||[];

        /**
         *
         */
        if(tpl.meta&&tpl.meta.length>0){
            var metaOps = {
                allowClear: true,
                width:'98%',
                language: "zh-CN",
                placeholder:'请选择...',
                data : tpl.meta
            };
            //properties.initialMetaOptions(metaOps,tpl);
        }
        /**
         * 打印设置
         */
        var PrinterSet = function (lodop,defaults,$container,tpl) {
            if(!defaults.global.PrinterSetUp||defaults.global.PrinterSetUp=='disabled'){
                $container.find('table.lampTTP[name="printSetting"]').closest('div').hide();
                return false;
            }
            var printerDefaults = {};
            if(!lodop)return;
            var printCount = lodop.GET_PRINTER_COUNT();
            printerDefaults.printerCount = printCount;
            printerDefaults.data = [];
            if(printCount>0){
                for(i=0;i<printCount;i++){
                    var p = buildPrinterOps(lodop,i);
                    if(p)printerDefaults.data[i]=p;
                }
            }

            defaults = $.extend(true,defaults,{printerSelect:printerDefaults});

            if(defaults.printerSelect){
                var $printerSel2 = $container.find('select[role="setupCtl"][name="printer"]');
                $printerSel2.select2(defaults.printerSelect);
                $printerSel2.on('select2:select',function (e) {
                    var $this = $(this);
                    defaults.printerId = $(this).val();
                    var d = e.params.data;
                    var $showComment = $container.find('td[role="setupCtl"][name="selectionPrinter"]');
                    //console.log(d);
                    setPrinterRemark(d,$showComment);


                });
                if(tpl&&typeof tpl.printerId != 'undefined'){
                    $printerSel2.val(tpl.printerId).trigger('change');
                }

                initialPaperSize($container,defaults);
                initialOrient($container,defaults,tpl.orient);
            }

            function initialOrient($container,def,orient) {
                var $paperOrient = $container.find('select[role="setupCtl"][name="paperOrient"]');
                $paperOrient.select2(defaults.printerOrient);
                $paperOrient.on('select2:select',function (e) {
                    if($(this).val()){
                        tpl.orient = $(this).val();
                    }
                });
                if(orient){
                    $paperOrient.val(orient).trigger('change');
                }
            }

            /**
             *
             * @param lodop
             * @param idx
             * @returns {*}
             */
            function buildPrinterOps(lodop,idx) {
                var p = {};
                var printerName,driverName,portName,orientation,paperSize,paperLength,paperWidth,copies,defaultSource,printQuality,duolex,
                    formName,comment,driverVersion;
                if(!lodop)return false;
                printerName = lodop.GET_PRINTER_NAME(idx);
                p.id = idx;
                p.text = printerName;
                driverName = lodop.GET_PRINTER_NAME(idx+':DriverName');
                p.driverName = driverName;
                portName = lodop.GET_PRINTER_NAME(idx+':PortName');
                p.portName = portName;
                orientation = lodop.GET_PRINTER_NAME(idx+':Orientation');
                p.orientation = orientation;
                paperSize = lodop.GET_PRINTER_NAME(idx+':PaperSize');
                p.paperSize = paperSize;
                paperLength = lodop.GET_PRINTER_NAME(idx+':PaperLength');
                p.paperLength = paperLength;
                paperWidth = lodop.GET_PRINTER_NAME(idx+':PaperWidth');
                p.paperWidth = paperWidth;
                copies = lodop.GET_PRINTER_NAME(idx+':Copies');
                p.copies = copies||1;
                defaultSource = lodop.GET_PRINTER_NAME(idx+':DefaultSource');
                p.defaultSource = defaultSource;
                printQuality = lodop.GET_PRINTER_NAME(idx+':PrintQuality');
                p.printQuality = printQuality||'';
                formName = lodop.GET_PRINTER_NAME(idx+':FormName');
                p.formName = formName;
                comment = lodop.GET_PRINTER_NAME(idx+':Comment');
                p.comment = comment;
                driverVersion = lodop.GET_PRINTER_NAME(idx+':DriverVersion');
                p.driverVersion = driverVersion||'';

                return p;
            }

            function initialPaperSize($container,def,printerId) {
                var $paperSizeSel = $container.find('select[role="setupCtl"][name="paperSize"]');
                if(!$paperSizeSel[0]||!def)return;
                var ops = {
                    width:'98%',
                    language: "zh-CN",
                    placeholder:'请选择...'
                };
                printerId = printerId || tpl.printerId||0;
                var dataStr = lodop.GET_PAGESIZES_LIST(printerId,'\n');
                var dataList = (dataStr&&dataStr.length>0) ? dataStr.split('\n') : [];
                if(dataList.length>0){
                    var data = [];
                    for(i=0,len=dataList.length;i<len;i++){
                        var option = {
                            id : dataList[i],
                            text : dataList[i]
                        };
                        data[i] = option;
                    }
                    ops.data = data;
                }

                //console.log(data);
                $paperSizeSel.select2(ops);
                $paperSizeSel.on('select2:select',function (e) {
                    var val = $(this).val();
                    if(val){
                        lodop.SET_PRINT_PAGESIZE(1,0,0,val);
                        var printId = $container.find('select[role="setupCtl"][name="printer"]').val()||tpl.printId||0;
                        var p = buildPrinterOps(lodop,printId);
                        setPrinterRemark(defaults.printerSelect,$container.find('td[role="setupCtl"][name="selectionPrinter"]'));
                        console.log(p);
                    }
                });
            }

            function setPrinterRemark(data,$el,tpl) {
                if(!data||!$el[0])return ;
                $el.empty();
                $el.append('<span style="color: red;">'+data.text+'</span>');
                var htmt = '<p style="text-align: left;">';
                if(data.formName)htmt += '纸张名称:'+data.formName+';';
                if(data.orientation)htmt += '打印方向:'+data.orientation+';';
                if(data.paperSize)htmt += '纸张大小（编号）:'+data.paperSize+';';
                //if(data.paperLength)htmt += '纸张长度:'+data.paperLength+'(mm);';
                if(tpl){
                    if(data.paperLength)tpl.pageHeight = data.paperLength;
                    if(data.paperWidth) tpl.pageWidth = data.paperWidth;
                }
                //if(data.paperWidth)htmt += '纸张宽度:'+data.paperWidth+'(mm);';
                if(data.defaultSource)htmt += '纸张来源:'+data.defaultSource+';';
                if(data.printQuality)htmt += '打印质量:'+data.printQuality+'(dpi);';
                if(data.driverName)htmt += '<br/>驱动名称:'+data.driverName+';';
                if(data.driverVersion)htmt += '驱动程序版本号:'+data.driverVersion+';';
                htmt += '</p>';
                $el.append(htmt);
            }
        }(LODOP,Defaults,$PropertyContainer,tpl);

        /**
         *
         */
        var TPLSetter = function (lodop,defaults,$container,tpl) {
            var tplName = tpl.tplName || '';

            $container.find('input[role="setupCtl"],select[role="setupCtl"]').each(function (index,el) {
                var $this = $(el);
                var name = $this.prop('name');
                switch (name){
                    case 'tplName':
                        $this.val(tplName);
                        $this.on('change',function (el) {
                            updateTPLVolume('tplName',$(this).val()||'');
                        });
                        break;
                    case 'left':
                    case 'right':
                    case 'top':
                    case 'bottom':
                    case 'pageWidth':
                    case 'pageHeight':
                        if(name in tpl)$(this).val(tpl[name]);
                        $(this).on('change',function(el){
                            updateTPLVolume(name,$(this).val()||0);
                        });
                        break;
                    case 'paperType':
                        var $paperType = $(this).select2(defaults.paperSelect);
                        $paperType.on('select2:select',function (e) {
                            var option = e.params.data;
                            if(this.value)tpl.pageName=this.value;
                            if(option){
                                $container.find('input[role="setupCtl"][name="pageWidth"]').val(option.pageWidth||'');
                                $container.find('input[role="setupCtl"][name="pageHeight"]').val(option.pageHeight||'');
                                if(option.pageWidth)tpl.pageWidth = option.pageWidth;
                                if(option.pageHeight)tpl.pageHeight = option.pageHeight;
                            }
                        });
                        if(name in tpl)$paperType.val(tpl[name]).trigger('change');
                        break;
                    default:
                        break;
                }
            });

            function updateTPLVolume(attr,val) {
                if(!tpl||!attr)return;
                tpl[attr]=val||'';
            }
        }(LODOP,Defaults,$PropertyContainer,tpl);

        /* 加载TPL ：绑定事件*/
        LOAD_TEMPLATE();
        return this;

    }

    var PREVIEW = function (tableData) {

    }

    /*-----------------    -------------------------*/
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
    /*-----------------    -------------------------*/
    /**
     * 打印模板设计器
     * @type {{}}
     */
    jQuery.lampDesigner = {
        /*当前选中*/
        getTemplate : function () {
            var lampItems = [];
            tpl.lampItems = lampItems;
            var topPx = 40;
            $DesignedContainer.find('[lamp="lodop"]').each(function (index,element) {
                var name = $(element).attr('name')||('div'+index);
                var type = $(element).data('lodop')||'html';
                var lampItem = {"id":index,"name":name,"type":type};
                if(type=='table'){
                    var _tname = $(element).find('table:first').attr('name');
                    if(tpl.items&&tpl.items.length>0){
                        for(var idx in tpl.items){
                            if(tpl.items[idx].name&&tpl.items[idx].name==_tname
                                &&tpl.items[idx].type=='table'
                            ){
                                lampItem = $.extend(true,{},tpl.items[idx],lampItem);
                                break;
                            }
                        }
                    }
                }
                lampItem.html = $(element).html();
                lampItem.height = $(element).height()|| $(element).css('height');
                var top = ConvertUnit(topPx,'mm',1)+'mm';
                lampItem.top = top;
                topPx = topPx + lampItem.height;
                lampItems.push(lampItem);
            });
            return tpl;
        },
        init : InitialLampDesigner,
        convertUnit : ConvertUnit,
        preview : function (demoData) {
            var tplData = this.getTemplate();
            LODOP.PRINT_INIT(tplData.tplName);
            LODOP.SET_PRINT_PAGESIZE(tplData.orient,tplData.pageWidth,tplData.pageHeight,tplData.pageName);
            var lampItems = tplData.lampItems ||[];
            var left = '0mm';
            var width = "100%";
            if(lampItems.length>0){
                for(var i in lampItems){
                    var t = lampItems[i];
                    if(lampItems[i].type=="table"){
                        LODOP.ADD_PRINT_TABLE(t.top,left,width,t.height,t.html);
                    }else {
                        LODOP.ADD_PRINT_HTM(t.top,left,width,t.height,t.html);
                    }
                }
            }
            LODOP.PREVIEW();
        },
        print : function (Data) {
            alert('暂未实现');
        },
        save : function () {
            modifiedStatus=0;
            alert('暂未实现');
        },
        closed : function () {
            if(modifiedStatus){
                if(confirm('模板未保存，您是否确定要关闭？')){
                    alert('colsed');
                }
            }

        }
    };


    /**
     *
     */
    jQuery.fn.extend(
        {
            lampDesigner    : $.lampDesigner.init,
            getTemplate      : $.lampDesigner.getTemplate,
            preview          : $.lampDesigner.preview,
            print            : $.lampDesigner.print,
            saveTemplate    : $.lampDesigner.save,
            closeDesigner   : $.lampDesigner.closed,
            convertUnit     : $.lampDesigner.convertUnit
        }
    );

}(jQuery,window.document,window,Properties);