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
 * designed.properties.js
 * @Author  : lanbery
 * @Version : v1.0
 * @Date    : 2018-03-06
 */
var Properties = function ($,window,metas) {
    var defaults = {
        metaOps : {
            width : 260,
            "minWidth":"160",
            "html" : '<div style="position: fixed;height: 36px;z-index: 999;" id="operateCtl">'
            +'<select role="itemCtl" data-forName="itemContent" name="metaOps">'
            +'<option></option>'
            +'</select>'
            +'</div>'
        },
        metaSelect : {
            allowClear: false,
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
        }
    }

    var metaItems = {};
    var metaSelector = $.extend(true,{},defaults.metaSelect,{"data":metas});
    var ProcessMeta = function (metaData) {
        /**
         * 初始化metaItems
         */
        if(metaData&&metaData.length&& metaData instanceof Array){
            for(i=0,len = metaData.length;i<len;i++){
                var id,alias,content,type,disabled=true;
                id = metaData[i].id||'';
                type = (metaData[i].type == 'list') ? 'table': 'text';
                if(!id){
                    //metaData.splice(i,1);
                    continue;
                }
                if(metaData[i].disabled){
                   // metaData.splice(i,1);
                    metaData[i]= undefined;
                    continue;
                }
                alias = metaData[i].text||id;
                content = "@{"+id+'}';
                var _item = {
                    "type" : type,
                    "alias":alias,
                    "content":content
                };
                if(metaData[i].list&&metaData[i].list.length){
                    var cms = [];
                    for(j=0,lengthJ =metaData[i].list.length;j<lengthJ;j++ ){
                        var m = metaData[i].list[j];
                        if(!m.id||m.disabled){
                            continue;
                        }

                        var index,label,colName;
                        index = m.id;colName=m.id;label=m.text||m.id;
                        cms.push({
                            'index':index,
                            'name':colName,
                            'label':label,
                            'align':'center',
                            'sortno':j
                        });
                    }
                    _item.colModel = cms;
                }
                metaItems[id] = _item;
            }
        }

        return {
            getMetaItem : function (key) {
                if(!key)return false;
                return metaItems[key]||false;
            }
        };
    }(metas);

    var $container = $("#PropertyContainer");
    var panelbodyWidth = $('.panel-body').width()||$('.panel-body').css('width');
    $(window).resize(function () {
        panelbodyWidth = $('.panel-body').width()||$('.panel-body').css('width');
    });
    var pp = this;
    $container.find('[role="hideBtn"]').on('click',function (el) {
        $(this).closest('div.panel').hide();
    });


    var BandMetaOps = function (tpl) {
        var $metaOpsContainer = $container.find('#operateCtl');
        var itemName = $container.find('[role="itemCtl"][name="itemPK"]').text();
        $container.find('.btn[role="operateCtl"][name="selectMetaOps"]').on('click',function (e) {
            var fullW = panelbodyWidth;
            var $tr = $(this).closest('td').next('td');

            var o = $tr.offset(),w = $tr.width()||$tr.css('width'),
                h = $tr.height()||$tr.css('height'),top,left,right='10px';
            if(defaults.metaOps.minWidth<(w-20))defaults.metaOps.minWidth = w-20;
            top = o.top+h;
            left = (defaults.metaOps.width + o.left)> fullW ? (fullW - defaults.metaOps.width -6) : (o.left);

            var curType = $container.find('[role="itemCtl"][name="itemType"]').text();
            filterOptions(curType=='table');

            if(!$metaOpsContainer.length){
                $metaOpsContainer = $(defaults.metaOps.html);
                $metaOpsContainer.css({'top':top,'left':left,'min-width':defaults.metaOps.minWidth});
                $tr.append($metaOpsContainer);
            }else {
                $metaOpsContainer.css({'top':top,'left':left,'min-width':defaults.metaOps.minWidth});
            }
            $metaOpsContainer.show();

            //Select2
            var $metaSelect2 = $metaOpsContainer.find('select[role="itemCtl"]');
            var metaSelect2Instance =  $metaSelect2.data('select2');
            if(metaSelect2Instance){
                $metaSelect2.select2('destroy').empty();
            }
            $metaSelect2.select2(metaSelector).val(null).trigger('change');
            //TODO reload select hide
            $metaSelect2.on('select2:select',function (e) {
                var val = this.value;
                var itemMeta = ProcessMeta.getMetaItem(val);
                var fillResult = fillProperties(itemMeta);
                if(fillResult)mergeMeta(itemMeta,tpl,itemName,curType);
                //$metaSelect2.select2('destroy');
                console.log(itemMeta);
                $metaOpsContainer.hide();
            });

            /* */


        });


    }

    function fillProperties(item) {
        if(!item||!('content' in item))return false;
        var $content = $container.find('textarea[role="itemCtl"][name="itemContent"]');
        var $alias = $container.find('input[role="itemCtl"][name="itemAlias"]');
        var alias = item.alias||$alias.val()||'';
        var content = item.content;
        $content.val(content);
        $alias.val(alias);
        //$content.trigger('change');
        return true;
    }

    /**
     *
     * @param metaItem : 选中元数据
     * @param tpl 模板
     * @param itemName 模板item标识
     * @param type 模板类型
     * @returns {boolean}
     */
    function mergeMeta(metaItem,tpl,itemName,type) {
        if(!metaItem||!metaItem.content||!tpl||!itemName)return true;
        var items = tpl.items;
        if(!items){
            items = tpl.items=[];
        }
        var item = findAndBuildItem(items,itemName,type,metaItem.alias||'',metaItem.content);
        if(metaItem.list&&metaItem.list.length){
            //TODO list

        }
    }

    /**
     *
     * @param items
     * @param itemName
     * @param type itemType:text,barcode,table
     * @param alias
     * @param content
     * @returns {*}
     */
    function findAndBuildItem(items,itemName,type,alias,content) {
        var len = items.length,item;
        if(len){
            for(i=0;i<len;i++){
                if(items[i].name==itemName){
                    item = items[i];
                    break;
                }
            }
            if(!item){
                item = {
                    'name':itemName,
                    'alias':alias,
                    'content':content,
                    'type':type
                };
                items.push(item);
            }else {
                item.content = content;
                item.alias = alias;
            }
        }else {
            item = {
                'name':itemName,
                'alias':alias,
                'content':content,
                'type':type
            };
            items.push(item);
        }
        return item;
    }

    return {
        getMetaOptions : function () {
            return metaItems;
        },
        show : function ($btn,showSelector){
            if(!$btn[0])return;
            $btn.on('click',function (element) {
                $container.find(showSelector).closest('div.panel').show();
                $container.find(showSelector).closest('div.panel').removeClass('hide');
            });

        },
        hideMetaDiv : function (t) {
            $("#operateCtl").css('display',t||'none');
        },
        btnBand : function (btnid,callback) {
            if(!btnid)return false;
            $('.btn[role="btn"]').each(function (idx,el) {
               var isFun = (!callback&&typeof callback == 'function');
               var elbtnid = $(el).data('btnid');
               if(elbtnid&&elbtnid==btnid){

               }
            });

        },
        buildMetaOps : BandMetaOps,
        reloadMetaOptions : function (ops,tpl) {
            //role="itemCtl" data-forName="itemContent" name="metaOps"
            var itemName = $container.find('span[role="itemCtl"][name="itemPK"]').text();
            var itemType = $container.find('span[role="itemCtl"][name="itemType"]').text();
            if(ops&&itemType&&itemName){
                filterOptions(ops,itemType=='table');
                $container.find('select[role="itemCtl"][name="metaOps"]').select2(ops);
                $container.find('select[role="itemCtl"][name="metaOps"]').on('select2:select',function (e) {
                    if(!this.value)return;
                    var option = e.params.data;
                    var content = buildContent(this.value);
                    var $contentCtrl = $container.find('textarea[role="itemCtl"][name="itemContent"]');
                    $contentCtrl.val(this.value);
                });
            }else{
                $container.find('select[role="itemCtl"][name="metaOps"]').select2("destroy");
                $container.find('select[role="itemCtl"][name="metaOps"]').empty();
                $container.find('select[role="itemCtl"][name="metaOps"]').append('<option></option>');
            }
        }
    }

    /**
     * 处理表格
     * @param ops
     * @param isTable
     */
    function filterOptions(isTable) {
        if(metaSelector.data&&metaSelector.data.length>0){
            for(i=0,len=metaSelector.data.length;i<len;i++){
                if(isTable){
                    if(metaSelector.data[i].list&&metaSelector.data[i].list.length){
                        metaSelector.data[i].disabled = false;
                    }else {
                        metaSelector.data[i].disabled = true;
                    }
                }else {
                    if(metaSelector.data[i].list&&metaSelector.data[i].list.length){
                        metaSelector.data[i].disabled = true;
                    }else {
                        metaSelector.data[i].disabled = false;
                    }
                }
            }
        }
        return metaSelector.data||[];
    }

    /**
     *
     * @param val
     * @returns {string}
     */
    function buildContent(val) {
        return val ? ('@{'+val+"}") : '';
    }

    /**
     *
     * @param tpl 模板
     * @param name item1
     * @param attr
     * @param val
     */
    function updateTplItem(tpl,name,option) {
        if(!tpl||!tpl.items||tpl.items.length==0||!name)return;
        for(i=0,len=tpl.items.length;i<len;i++){
            if(tpl.items[i].name&&tpl.items[i].name==name){
                tpl.items[i][attr]=val;
                break;
            }
        }
    }

    /**
     * 合并更新item
     * @param tpl
     * @param name
     * @param option
     */
    function mergeItem(tpl,name,option) {
        if(!tpl||!tpl.items||tpl.items.length==0||!name||!option||!option.id)return;
        for(i=0,len=tpl.items.length;i<len;i++) {
            if(tpl.items[i].name&&tpl.items[i].name==name){
                var originContent = tpl.items[i].content;
                var changed = (originContent == buildContent(option.id));
                if(option.type=='list'){
                    //TODO
                }else {

                }
                break;
            }
        }
    }

}(jQuery,window,TEST_META);