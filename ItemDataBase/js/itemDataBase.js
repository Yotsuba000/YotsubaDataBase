
(function () {
    "use strict";

    //Defines a Operation mode State of the item database.
    var OperationModeState = {
        Search_of_ItemType: 1,
        Search_of_ItemName: 2,
        Search_of_SetName: 3,
        Search_of_OptionName: 4,
        Search_of_ItemID: 5,

        is: function (value) {
            return value === this.Search_of_ItemType ||
                   value === this.Search_of_ItemName ||
                   value === this.Search_of_SetName ||
                   value === this.Search_of_OptionName ||
                   value === this.Search_of_ItemID;
        }
    };

    Yotsuba.Namespace.define("Yotsuba.ItemDataBase", {

        _INVALID_PARAMETER: -1,

        _INVALID_INDEX: -1,

        _UNINITIALIZED: -1,

        Resources: {
            common_next: "next ≫",
            common_prev: "≪ prev",
            common_status_loading: "Now Loading...",
            common_status_success: "OK",
            common_status_fail: "ERROR",
            common_invalid_image: "none",
            common_bullet: "- ",
            common_nonbullet: "　",
            group_basic_information: "<基本情報>",
            group_crest_information: "<クレスト能力値>",
            group_enhanced_information: "<錬成 オプション 情報>",
            group_set_information: "<セット情報>",
            group_instruction: "<説明>",
            group_required_ability: "<要求能力値>",
            group_job_available: "<着用/使用可能な職業>",
            content_non_trade: "<font color='#d080f8'>取引不可アイテム</font>",
            content_specific_restriction: "<font color='#d080f8'>装備時、取引不可のアイテムに変更(装備を解除しても取引不可状態になります。)</font>",
            content_extraitem_rank0: "<font color='#f8f800'>Rank10</font>エキストラアイテム",
            content_extraitem_rank1: "<font color='#f8f800'>Rank9</font>エキストラアイテム",
            content_extraitem_rank2: "<font color='#f8f800'>Rank8</font>エキストラアイテム",
            content_extraitem_rank3: "<font color='#f8f800'>Rank7</font>エキストラアイテム",
            content_extraitem_rank4: "<font color='#f8f800'>Rank6</font>エキストラアイテム",
            content_extraitem_rank5: "<font color='#f8f800'>Rank5</font>エキストラアイテム",
            content_extraitem_rank6: "<font color='#f8f800'>Rank4</font>エキストラアイテム",
            content_extraitem_rank7: "<font color='#f8f800'>Rank3</font>エキストラアイテム",
            content_extraitem_rank8: "<font color='#f8f800'>Rank2</font>エキストラアイテム",
            content_extraitem_rank9: "<font color='#f8f800'>Rank1</font>エキストラアイテム",
            content_extraitem_rank10: "<font color='#f8f800'>特等</font>エキストラアイテム",
            content_extraitem_rank11: "<font color='#f8f800'>最上</font>エキストラアイテム",
            content_extraitem_rank12: "<font color='#f8f800'>至高</font>エキストラアイテム",
            content_offense_point: "攻撃力 <font color='#f8f800'>%d~%d</font>",
            content_offense_speed: "<font color='#f8f800'>%f</font>秒",
            content_shooting_range: "射程距離 <font color='#f8f800'>%d</font>",
            content_minipet_foodtype: "ミニペットエサ分類 <font color='#F8F800'>%s</font>",
            content_expiration_date: "有効期限 <font color='#f8f800'>%s</font>",
            content_format: "型",
            content_gold: "Gold",
            content_set_count: "個",
            content_without: "無し",
            article_deluxe_option: "<font color='#00f8f8'>DX </font>",
            article_ultimate_option: "<font color='#00f8f8'>ULT </font>",
            header_base_item: "Base Item",
            header_efficacy_level: "セット効果",
            header_baseitem_id: "Base ItemID",
            header_item_id: "ItemID",
            header_setitem_id: "Set ItemID",
            header_stack_size: "重ね置き可能個数",
            header_durability_decrease: "耐久減少型式",
            header_drop_level: "Drop Level",
            header_drop_factor: "Drop係数",
            header_price: "純価格",
            header_price_format: "価格計算式",
            header_item_property: "アイテム特性",
            message_search_result_1: "%d件のアイテムが該当しました。",
            message_search_result_2: "%d件目から%d件目までの表示",
            error_read_file: "データの読み込みに失敗しました。",
            error_invalid_param: "URL引数の指定が正しくありません。",
            error_unexpected: "予期せぬエラーが発生しました。"
        },

        DataBaseManager: Yotsuba.Class.define(function DataBase_ctor() {
            // Constructor.
            this._interfacePath = "./Interface/";
            this._itemImagePath = "./ItemImage/";
            this._itemPath = "./ItemList.json";
            this._setitemPath = "./SetItemList.json";

            this._operationMode = OperationModeState.Search_of_ItemName;
            this._keyword = "";
            this._result = [];

            this._items = null;
            this._setitems = null;
            this._$showing = null;

            this._BACKGROUND_IMAGE = 10;
            this._DEFAULT_CONTENT_DISPLAY_COUNT = 10;
            this._DEFAULT_PAGEINDEX_DISPLAY_COUNT = 20;

            this._createTemplate();

        }, {
            // Instance members.

            OperationMode: {
                get: function () {
                    return this._operationMode;
                },
                set: function (value) {
                    if (OperationModeState.is(parseInt(value))) {
                        this._operationMode = parseInt(value);
                    }
                }
            },

            Keyword: {
                get: function () {
                    return this._keyword;
                },
                set: function (value) {
                    if (typeof value === "string") {
                        this._keyword = value;
                    }
                }
            },

            _isDisplayableBasicInformation: function (item) {
                if (item.isNX || item.isEX) { return true; }
                if (item.AtParameter.AtMinValue != 0 || item.AtParameter.AtMaxValue != 0) { return true; }
                if (item.AtParameter.AtRange != 0) { return true; }
                if (item.OpParameter.isNotTrade) { return true; }
                if (item.OpParameter.ExpirationDate || item.OpParameter.MiniPetFoodType) { return true; }
                if (item.OpParameter.OpPrt1 || item.OpParameter.OpPrt2 || item.OpParameter.OpPrt3 || item.OpParameter.OpPrt4) { return true; }
                if (item.OpParameter.OpBit1 || item.OpParameter.OpBit2 || item.OpParameter.OpBit3 ||
                    item.OpParameter.OpBit4 || item.OpParameter.OpBit5 || item.OpParameter.OpBit6) { return true; }
                if (item.OpParameter.OpEnt1 || item.OpParameter.OpEnt2 || item.OpParameter.OpEnt3 || item.OpParameter.OpEnt4) { return true; }
                return false;
            },

            _isDisplayableCrestInformation: function (item) {
                if (item.itemType == 59) { return true; }
                return false;
            },

	    _isDisplayableCrestInfoWithout: function (item) {
                if (item.itemType == 59 &&	
		    !item.OpParameter.OpPrt1 && !item.OpParameter.OpPrt2 && !item.OpParameter.OpPrt3 && !item.OpParameter.OpPrt4 &&
		    !item.OpParameter.OpBit1 && !item.OpParameter.OpBit2 && !item.OpParameter.OpBit3 &&
		    !item.OpParameter.OpBit4 && !item.OpParameter.OpBit5 && !item.OpParameter.OpBit6) { return true; }
		return false;
	    },

            _isDisplayableEnhancedInformation: function (item) {
                if (item.OpParameter.OpNxt1 || item.OpParameter.OpNxt2 || item.OpParameter.OpNxt3 || item.OpParameter.OpNxt4) { return true; }
                return false;
            },

            _isDisplayableSetInformation: function (item) {
                if (item.isT) { return true; }
                return false;
            },

            _isDisplayableInstruction: function (item) {
                if (item.Instruction) { return true; }
                if (item.SetItemInstruction || item.SetInstruction) { return true; }
                return false;
            },

            _isDisplayableRequiredAbility: function (item) {
                if (item.RequiredAbility && item.RequiredAbility.length) { return true; }
                return false;
            },

            _isDisplayableJobAvailable: function (item) {
                if (item.JobAvailable && item.JobAvailable.length) { return true; }
                return false;
            },

            _createTemplate: function () {

                //A template of item contents frame.
                this._$frameTemplate = (function () {

                    var $mainTable = $("<table class='main-table'>");
                    var $mainTR = $("<tr>");
                    var $mainTD_ToolTip = $("<td>");
                    var $mainTD_ItemInfo = $("<td>");

                    var $itemToolTip = $("<div class='item-tooltip'>");
                    var $itemInfo = $("<div class='item-information'>");

                    var $frameTable = $("<table class='tooltip-frame'>");
                    var $frameTR_Top = $("<tr>");
                    var $frameTR_Center = $("<tr>");
                    var $frameTR_Bottom = $("<tr>");
                    var $frameTD_TopLeft = $("<td class='frame-topleft'>");
                    var $frameTD_TopCenter = $("<td class='frame-topcenter'>");
                    var $frameTD_TopRight = $("<td class='frame-topright'>");
                    var $frameTD_CenterLeft = $("<td class='frame-centerleft'>");
                    var $frameTD_Content = $("<td class='frame-content'>");
                    var $frameTD_CenterRight = $("<td class='frame-centerright'>");
                    var $frameTD_BottomLeft = $("<td class='frame-bottomleft'>");
                    var $frameTD_BottomCenter = $("<td class='frame-bottomcenter'>");
                    var $frameTD_BottomRight = $("<td class='frame-bottomright'>");

                    var $itemDetail = $("<div class='item-details'>");

                    $mainTable
                        .append($mainTR
                            .append($mainTD_ToolTip
                                .append($itemToolTip
                                    .append($frameTable
                                        .append($frameTR_Top
                                            .append($frameTD_TopLeft)
                                            .append($frameTD_TopCenter)
                                            .append($frameTD_TopRight))
                                        .append($frameTR_Center
                                            .append($frameTD_CenterLeft)
                                            .append($frameTD_Content
                                                .append($itemDetail))
                                            .append($frameTD_CenterRight))
                                        .append($frameTR_Bottom
                                            .append($frameTD_BottomLeft)
                                            .append($frameTD_BottomCenter)
                                            .append($frameTD_BottomRight)))))
                            .append($mainTD_ItemInfo
                                .append($itemInfo)));

                    return $mainTable;

                })();

                //A template of item details.
                this._$itemTemplate = (function () {

                    var $detailTable = $("<table>");

                    for (var i = 0; i < 60; i++) {
                        $detailTable.append($("<tr>").append($("<td>").append($("<div>").addClass("hide"))));
                    }
                            
                    return $detailTable;

                })();

                //A template of item information.
                this._$itemInfoTemplate = (function () {

                    var $infoTable = $("<table>");

                    for (var i = 0; i < 20; i++) {
                        $infoTable
                            .append($("<tr>")
                                .append($("<th>")
                                    .append($("<div>").addClass("hide")).addClass("hide"))
                                .append($("<td>")
                                    .append($("<div>").addClass("hide")).addClass("hide")));
                    }

                    return $infoTable;

                })();

                //A template of drop down control.
                this._$efficacyBoxTemplate = (function () {

                    var $efficacyBox = $("<select class='efficacy-box'>");

                    for (var i = 1; i <= 10; i++) {
                        $efficacyBox
                            .append($("<option>").text(i + Yotsuba.ItemDataBase.Resources.content_set_count));
                    }

                    return $efficacyBox;

                })();
            },

            _createContents: function (items) {
                var that = this;
                var $itemContainer = $("<div id='itemContainer'>");

                items.forEach(function (item) {
                    if (item.isT) {
                        var setitemId = item.setId + "-" + item.itemId;
                        $itemContainer.append($("<div>").attr({
                            "id": "setitemID-" + setitemId,
                            "data-setitemid": setitemId
                        }));
                    } else {
                        $itemContainer.append($("<div>").attr({
                            "id": "itemID-" + item.itemId,
                            "data-itemid": item.itemId
                        }));
                    }
                });

                return $itemContainer;
            },

            _getExtraText: function (rank) {
                var obj = { rank: null, text: "" };

                if (rank == 0) { obj.rank = "Ex10"; obj.text = Yotsuba.ItemDataBase.Resources.content_extraitem_rank0; }
                if (rank == 1) { obj.rank = "Ex9"; obj.text = Yotsuba.ItemDataBase.Resources.content_extraitem_rank1; }
                if (rank == 2) { obj.rank = "Ex8"; obj.text = Yotsuba.ItemDataBase.Resources.content_extraitem_rank2; }
                if (rank == 3) { obj.rank = "Ex7"; obj.text = Yotsuba.ItemDataBase.Resources.content_extraitem_rank3; }
                if (rank == 4) { obj.rank = "Ex6"; obj.text = Yotsuba.ItemDataBase.Resources.content_extraitem_rank4; }
                if (rank == 5) { obj.rank = "Ex5"; obj.text = Yotsuba.ItemDataBase.Resources.content_extraitem_rank5; }
                if (rank == 6) { obj.rank = "Ex4"; obj.text = Yotsuba.ItemDataBase.Resources.content_extraitem_rank6; }
                if (rank == 7) { obj.rank = "Ex3"; obj.text = Yotsuba.ItemDataBase.Resources.content_extraitem_rank7; }
                if (rank == 8) { obj.rank = "Ex2"; obj.text = Yotsuba.ItemDataBase.Resources.content_extraitem_rank8; }
                if (rank == 9) { obj.rank = "Ex1"; obj.text = Yotsuba.ItemDataBase.Resources.content_extraitem_rank9; }
                if (rank == 10) { obj.rank = "ExP"; obj.text = Yotsuba.ItemDataBase.Resources.content_extraitem_rank10; }
                if (rank == 11) { obj.rank = "ExA"; obj.text = Yotsuba.ItemDataBase.Resources.content_extraitem_rank11; }
                if (rank == 12) { obj.rank = "ExU"; obj.text = Yotsuba.ItemDataBase.Resources.content_extraitem_rank12; }

                return obj;
            },

            _setNavText: function (pages, items) {
                var resource1 = Yotsuba.ItemDataBase.Resources.message_search_result_1.replace("%d", items.count);
                var resource2 = Yotsuba.ItemDataBase.Resources.message_search_result_2.replace("%d", (items.range.end != 0 ? items.range.start : 0)).replace("%d", items.range.end);

                return resource1 + " " + resource2;
            },

            _setItemDetails: function (item, efficacy_level) {
                var $detailContainer = this._$itemTemplate.clone(false);
                var $rows = $detailContainer.find("td > div");
                var used_rows = 0;

                var bullet = Yotsuba.ItemDataBase.Resources.common_bullet;
                var nonbullet = Yotsuba.ItemDataBase.Resources.common_nonbullet;
                var invalid_image = Yotsuba.ItemDataBase.Resources.common_invalid_image;
                var item_uid = item.id;

                //images
                if (item.itemImageId !== Yotsuba.ItemDataBase._INVALID_PARAMETER) {
                    var image_path = this._itemImagePath + item.itemImageId + ".png";
                    $($rows.eq([used_rows])).append($("<img src='" + image_path + "' alt='" + invalid_image + "'>")).addClass("item-image").removeClass("hide");

                    //item rank
                    var rank_path = null;
                    if (item.isU && !item.isNX) {
                        rank_path = this._interfacePath + "U.gif";
                    }
                    if (item.isNX) {
                        rank_path = this._interfacePath + "NX.gif";
                    }
                    if (item.isEX && item.itemExRank !== null && item.itemExRank !== Yotsuba.ItemDataBase._INVALID_PARAMETER) {
                        var ex = this._getExtraText(item.itemExRank);
                        if (ex.rank) {
                            rank_path = this._interfacePath + ex.rank + ".gif";
                        }
                    }
                    if (item.isT) {
                        rank_path = this._interfacePath + "T.gif";
                    }
                    if (item.itemType == 49) {
                        rank_path = this._interfacePath + "Q.gif";
                    }
                    if (item.itemType == 59) {
			if (item.isR) {
				rank_path = this._interfacePath + "R.gif";
			}
			if (item.isPR) {
				rank_path = this._interfacePath + "PR.gif";
			}
			if (item.isU) {
				rank_path = this._interfacePath + "U.gif";
			}
                    }

                    if (rank_path) {
                        $($rows.eq([used_rows])).append($("<img class='item-rank' src='" + rank_path + "' alt='" + invalid_image + "'>"));
                    }

                    //item grade
                    var grade_path = null;
                    if (item.isDX) {
                        grade_path = this._interfacePath + "DX.gif";
                    }
                    if (item.isUM) {
                        grade_path = this._interfacePath + "UM.gif";
                    }

                    if (grade_path) {
                        $($rows.eq([used_rows])).append($("<img class='item-grade' src='" + grade_path + "' alt='" + invalid_image + "'>"));
                    }

                    used_rows++;
                }

                //itemName
                if (item.itemName) {
                    var item_name = item.itemName;
                    if (item.isU && !item.isNX) {
                        item_name = "<font color='#e8c898'>" + item.itemName + "</font>";
                    }
                    if (item.isNX) {
                        item_name = "<font color='#800000'>" + item.itemName + "</font>";
                    }
                    if (item.isEX && item.itemExRank !== null && item.itemExRank !== Yotsuba.ItemDataBase._INVALID_PARAMETER) {
                        item_name = "<font color='#b2b2f8'>" + item.itemName + "</font>";
                    }
                    if (item.isT) {
                        item_name = "<font color='#00f800'>" + item.setItemName + "</font>" + "(<font color='#50a0f8'>" + item.setName + "</font>)";
                    }
                    if (item.itemType == 59) {
			if (item.isPR) {
                        	item_name = "<font color='#d080f8'>" + item.itemName + "</font>";
			}
			if (item.isU) {
                        	item_name = "<font color='#e8c898'>" + item.itemName + "</font>";
			}
                    }

                    $($rows.eq([used_rows])).html(item_name).addClass("item-name").removeClass("hide");
                    used_rows++;
                }

                //basic information
                if (this._isDisplayableBasicInformation(item)) {
                    $($rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.group_basic_information).addClass("info-tag").removeClass("hide");
                    used_rows++;

                    //is not Trade
                    if (item.OpParameter.isNotTrade && (item.itemType != 49)) {
                        $($rows.eq([used_rows])).html(bullet + Yotsuba.ItemDataBase.Resources.content_non_trade).removeClass("hide");
                        used_rows++;
                    }

                    //specific restriction
                    if (item.OpParameter.SpecificRestriction && (item.itemType != 49)) {
                        $($rows.eq([used_rows])).html(bullet + Yotsuba.ItemDataBase.Resources.content_specific_restriction).removeClass("hide");
                        used_rows++;
                    }

                    // extra item
                    if (item.isEX && item.itemExRank !== null && item.itemExRank !== Yotsuba.ItemDataBase._INVALID_PARAMETER) {
                        var ex = this._getExtraText(item.itemExRank);
                        if (ex.rank) {
                            $($rows.eq([used_rows])).html(bullet + ex.text).removeClass("hide");
                            used_rows++;
                        }
                    }

                    //enhanced information
                    if (this._isDisplayableCrestInformation(item)) {
                        $($rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.group_crest_information).addClass("info-tag").removeClass("hide");
                        used_rows++;	
		    }
                    if (this._isDisplayableCrestInfoWithout(item)) {
                        $($rows.eq([used_rows])).html(bullet + Yotsuba.ItemDataBase.Resources.content_without).removeClass("hide");
                        used_rows++;	
		    }   		    

                    //O.P & O.S
                    if (item.AtParameter.AtMinValue != 0 || item.AtParameter.AtMaxValue != 0) {
                        var OP = Yotsuba.ItemDataBase.Resources.content_offense_point.replace("%d", item.AtParameter.AtMinValue).replace("%d", item.AtParameter.AtMaxValue);
                        var OS = Yotsuba.ItemDataBase.Resources.content_offense_speed.replace("%f", item.AtParameter.AtSpeed.toFixed(2));

                        if (item.AtParameter.AtSpeed != 0) {
                            $($rows.eq([used_rows])).html(bullet + OP + "(" + OS + ")").removeClass("hide");
                        } else {
                            $($rows.eq([used_rows])).html(bullet + OP).removeClass("hide");
                        }
                        used_rows++;
                    }
                    //shooting range
                    if (item.AtParameter.AtRange != 0) {
                        var range = Yotsuba.ItemDataBase.Resources.content_shooting_range.replace("%d", item.AtParameter.AtRange);
                        $($rows.eq([used_rows])).html(bullet + range).removeClass("hide");
                        used_rows++;
                    }

                    //prt1
                    if (item.OpParameter.OpPrt1) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpPrt1).removeClass("hide");
                        used_rows++;
                    }
                    //prt2
                    if (item.OpParameter.OpPrt2) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpPrt2).removeClass("hide");
                        used_rows++;
                    }
                    //prt3
                    if (item.OpParameter.OpPrt3) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpPrt3).removeClass("hide");
                        used_rows++;
                    }
                    //prt4
                    if (item.OpParameter.OpPrt4) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpPrt4).removeClass("hide");
                        used_rows++;
                    }
                    //minipet foodtype
                    if (item.OpParameter.MiniPetFoodType && !item.isT) {
                        var food_type = Yotsuba.ItemDataBase.Resources.content_minipet_foodtype.replace("%s", item.OpParameter.MiniPetFoodType);
                        $($rows.eq([used_rows])).html(bullet + food_type).removeClass("hide");
                        used_rows++;
                    }
                    //expiration date
                    if (item.OpParameter.ExpirationDate) {
                        var expiration_date = Yotsuba.ItemDataBase.Resources.content_expiration_date.replace("%s", item.OpParameter.ExpirationDate);
                        $($rows.eq([used_rows])).html(bullet + expiration_date).removeClass("hide");
                        used_rows++;
                    }
                    //bit1
                    if (item.OpParameter.OpBit1) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpBit1).removeClass("hide");
                        used_rows++;
                    }
                    //bit2
                    if (item.OpParameter.OpBit2) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpBit2).removeClass("hide");
                        used_rows++;
                    }
                    //bit3
                    if (item.OpParameter.OpBit3) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpBit3).removeClass("hide");
                        used_rows++;
                    }
                    //bit4
                    if (item.OpParameter.OpBit4) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpBit4).removeClass("hide");
                        used_rows++;
                    }
                    //bit5
                    if (item.OpParameter.OpBit5) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpBit5).removeClass("hide");
                        used_rows++;
                    }
                    //bit6
                    if (item.OpParameter.OpBit6) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpBit6).removeClass("hide");
                        used_rows++;
                    }
                    //ent1
                    if (item.OpParameter.OpEnt1) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpEnt1).removeClass("hide");
                        used_rows++;
                    }
                    //ent2
                    if (item.OpParameter.OpEnt2) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpEnt2).removeClass("hide");
                        used_rows++;
                    }
                    //ent3
                    if (item.OpParameter.OpEnt3) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpEnt3).removeClass("hide");
                        used_rows++;
                    }
                }

                //enhanced information
                if (this._isDisplayableEnhancedInformation(item)) {
                    $($rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.group_enhanced_information).addClass("info-tag").removeClass("hide");
                    used_rows++;

                    //nxt1
                    if (item.OpParameter.OpNxt1) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpNxt1).removeClass("hide");
                        used_rows++;
                    }
                    //nxt2
                    if (item.OpParameter.OpNxt2) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpNxt2).removeClass("hide");
                        used_rows++;
                    }
                    //nxt3
                    if (item.OpParameter.OpNxt3) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpNxt3).removeClass("hide");
                        used_rows++;
                    }
                    //nxt4
                    if (item.OpParameter.OpNxt4) {
                        $($rows.eq([used_rows])).html(bullet + item.OpParameter.OpNxt4).removeClass("hide");
                        used_rows++;
                    }
                }

                //set information
                if (this._isDisplayableSetInformation(item)) {
                    $($rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.group_set_information).addClass("info-tag").removeClass("hide");
                    used_rows++;

                    if (item.SetEfficacy && item.SetEfficacy.setItems) {
                        item.SetEfficacy.setItems.forEach(function (setitem) {
                            if (setitem == item.setItemName) {
                                setitem = "<font color='#008000'>" + setitem + "</font>";
                            } else {
                                setitem = "<font color='#808080'>" + setitem + "</font>";
                            }
                            $($rows.eq([used_rows])).html(nonbullet + setitem).removeClass("hide");
                            used_rows++;
                        });
                    }
                    
                    if (item.SetEfficacy && item.SetEfficacy.setEfficacy) {
                        if (item.SetEfficacy.setEfficacy["Set" + efficacy_level]) {
                            item.SetEfficacy.setEfficacy["Set" + efficacy_level].forEach(function (efficacy) {
                                $($rows.eq([used_rows])).html(bullet + efficacy).removeClass("hide");
                                used_rows++;
                            });
                        }
                    }
                }

                //instruction
                if (this._isDisplayableInstruction(item)) {
                    $($rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.group_instruction).addClass("info-tag").removeClass("hide");
                    used_rows++;

                    if (item.isT) {
                        if (item.SetInstruction) {
                            $($rows.eq([used_rows])).html(bullet + item.SetInstruction).addClass("item-instruction").removeClass("hide");
                            used_rows++;
                        }
                        if (item.SetItemInstruction) {
                            $($rows.eq([used_rows])).html(bullet + item.SetItemInstruction).addClass("item-instruction").removeClass("hide");
                            used_rows++;
                        }
                    } else {
                        if (item.Instruction) {
                            $($rows.eq([used_rows])).html(bullet + item.Instruction).addClass("item-instruction").removeClass("hide");
                            used_rows++;
                        }
                    }
                }

                //required ability
                if (this._isDisplayableRequiredAbility(item)) {
                    $($rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.group_required_ability).addClass("info-tag").removeClass("hide");
                    used_rows++;

                    if (item.RequiredAbility) {
                        item.RequiredAbility.forEach(function (ability) {
                            $($rows.eq([used_rows])).html(bullet + ability).removeClass("hide");
                            used_rows++;
                        });
                    }
                }

                //job available
                if (this._isDisplayableJobAvailable(item)) {
                    $($rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.group_job_available).addClass("info-tag").removeClass("hide");
                    used_rows++;

                    if (item.JobAvailable) {
                        item.JobAvailable.forEach(function (job) {
                            $($rows.eq([used_rows])).html(bullet + job).removeClass("hide");
                            used_rows++;
                        });
                    }
                }

                return $detailContainer;
            },

            _setItemAddInfo: function (item, efficacy_level) {
                var that = this;
                var $infoContainer = this._$itemInfoTemplate.clone(true);
                var $th_rows = $infoContainer.find("th > div");
                var $rows = $infoContainer.find("td > div");
                var used_rows = 0;

                //setitem id 
                if (item.isT) {
                    $($th_rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.header_setitem_id).removeClass("hide").parent().removeClass("hide");
                    $($rows.eq([used_rows])).text(item.setId).removeClass("hide").parent().removeClass("hide");
                    used_rows++;
                }

                //item id 
                if (item.isT) {
                    $($th_rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.header_baseitem_id).removeClass("hide").parent().removeClass("hide");
                } else {
                    $($th_rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.header_item_id).removeClass("hide").parent().removeClass("hide");
                }
                $($rows.eq([used_rows])).text(item.itemId).removeClass("hide").parent().removeClass("hide");
                used_rows++;

                //base item
                if (item.isT) {
                    var baseitem = "<font color='#00f800'>" + item.Article + "</font> <font color='#50a0f8'>" + item.itemName + "</font>";
                    if (item.isDxOPEnchant && !item.isUltOPEnchant) { baseitem = Yotsuba.ItemDataBase.Resources.article_deluxe_option + baseitem; }
                    if (item.isUltOPEnchant) { baseitem = Yotsuba.ItemDataBase.Resources.article_ultimate_option + baseitem; }

                    $($th_rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.header_base_item).removeClass("hide").parent().removeClass("hide");
                    $($rows.eq([used_rows])).html(baseitem).removeClass("hide").parent().removeClass("hide");
                    used_rows++;

                    //efficacy level
                    var $efficacyBox = this._$efficacyBoxTemplate.clone(false);
                    $efficacyBox.val(efficacy_level).attr("data-setitemid", item.setId + "-" + item.itemId);
                    $efficacyBox.find("option").each(function (i) {
                        if (item.SetEfficacy.setItems && i >= item.SetEfficacy.setItems.length) {
                            $(this).attr("disabled", "disabled");
                        }
                    });
                    $efficacyBox.on("change", function (evt) {
                        that.onSelectionChanged(evt);
                    });

                    $($th_rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.header_efficacy_level).removeClass("hide").parent().removeClass("hide");
                    $($rows.eq([used_rows])).append($efficacyBox).removeClass("hide").parent().removeClass("hide");
                    used_rows++;
                }

                //stack size
                $($th_rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.header_stack_size).removeClass("hide").parent().removeClass("hide");
                $($rows.eq([used_rows])).text(item.AddInformation.StackSize).removeClass("hide").parent().removeClass("hide");
                used_rows++;

                //durability decrease format
                var format = item.AddInformation.DurabilityDecreaseFormat + Yotsuba.ItemDataBase.Resources.content_format;
                $($th_rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.header_durability_decrease).removeClass("hide").parent().removeClass("hide");
                $($rows.eq([used_rows])).text(format).removeClass("hide").parent().removeClass("hide");
                used_rows++;

                //drop level
                $($th_rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.header_drop_level).removeClass("hide").parent().removeClass("hide");
                $($rows.eq([used_rows])).text(item.AddInformation.DropLevel).removeClass("hide").parent().removeClass("hide");
                used_rows++;

                //drop factor
                $($th_rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.header_drop_factor).removeClass("hide").parent().removeClass("hide");
                $($rows.eq([used_rows])).text(item.AddInformation.DropFactor).removeClass("hide").parent().removeClass("hide");
                used_rows++;

                //price
                var price = item.AddInformation.Price + " " + Yotsuba.ItemDataBase.Resources.content_gold;
                $($th_rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.header_price).removeClass("hide").parent().removeClass("hide");
                $($rows.eq([used_rows])).text(price).removeClass("hide").parent().removeClass("hide");
                used_rows++;

                //price format
                var formula = Yotsuba.ItemDataBase.Resources.header_price + " * " + item.AddInformation.PriceFactor + "%";
                $($th_rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.header_price_format).removeClass("hide").parent().removeClass("hide");
                $($rows.eq([used_rows])).text(formula).removeClass("hide").parent().removeClass("hide");
                used_rows++;

                //item property
                var property = "";
                item.AddInformation.itemProperty && item.AddInformation.itemProperty.forEach(function (prop) {
                    property += " [" + prop + "]";
                });
                $($th_rows.eq([used_rows])).text(Yotsuba.ItemDataBase.Resources.header_item_property).removeClass("hide").parent().removeClass("hide");
                $($rows.eq([used_rows])).text(property).removeClass("hide").parent().removeClass("hide");
                used_rows++;

                return $infoContainer;
            },

            _search_of_ItemType: function () {
                var that = this;
                var result = [];

                if (this._keyword != "") {
                    this._items && this._items.forEach(function (item) {
                        if (item.itemType == that.Keyword) {
                            result.push(item);
                        }
                    });
                    this._setitems && this._setitems.forEach(function (setitem) {
                        if (setitem.itemType == that.Keyword) {
                            result.push(setitem);
                        }
                    });
                }

                return result;
            },

            _search_of_ItemName: function () {
                var that = this;
                var result = [];

                if (this._keyword != "") {
                    this._items && this._items.forEach(function (item) {
                        if (item.itemName) {
                            var itemName = item.itemName.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
                            if (itemName.indexOf(that.Keyword) != Yotsuba.ItemDataBase._INVALID_INDEX) {
                                result.push(item);
                            }
                        }
                    });
                    this._setitems && this._setitems.forEach(function (setitem) {
                        if (setitem.setItemName) {
                            var setItemName = setitem.setItemName.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
                            if (setItemName.indexOf(that.Keyword) != Yotsuba.ItemDataBase._INVALID_INDEX) {
                                result.push(setitem);
                            }
                        }
                    });
                }

                return result;
            },

            _search_of_ItemID: function () {
                var that = this;
                var result = [];

                if (this._keyword != "") {
                    this._items && this._items.forEach(function (item) {
                        if (item.itemId == that.Keyword) {
                            result.push(item);
                        }
                    });
                    this._setitems && this._setitems.forEach(function (setitem) {
                        if (setitem.setId == that.Keyword) {
                            result.push(setitem);
                        }
                    });
                }

                return result;
            },

            _search_of_SetName: function () {
                var that = this;
                var result = [];

                if (this._keyword != "") {
                    this._setitems && this._setitems.forEach(function (setitem) {
                        if (setitem.setName) {
                            var setName = setitem.setName.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
                            if (setName.indexOf(that.Keyword) != Yotsuba.ItemDataBase._INVALID_INDEX) {
                                result.push(setitem);
                            }
                        }
                    });
                }

                return result;
            },

            _search_of_OptionName: function () {
                var that = this;
                var result = [];

                if (this._keyword != "") {
                    this._items && this._items.forEach(function (item) {
                        var OpParameter = item.OpParameter;

                        Object.keys(OpParameter).some(function (key) {
                            if (key.match("OpPrt") && OpParameter[key]) {
                                var OpPrt = OpParameter[key].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
                                if (OpPrt.indexOf(that.Keyword) != Yotsuba.ItemDataBase._INVALID_INDEX) {
                                    result.push(item);
                                    return true;
                                }
                            }
                            if (key.match("OpBit") && OpParameter[key]) {
                                var OpBit = OpParameter[key].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
                                if (OpBit.indexOf(that.Keyword) != Yotsuba.ItemDataBase._INVALID_INDEX) {
                                    result.push(item);
                                    return true;
                                }
                            }
                            if (key.match("OpEnt") && OpParameter[key]) {
                                var OpEnt = OpParameter[key].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
                                if (OpEnt.indexOf(that.Keyword) != Yotsuba.ItemDataBase._INVALID_INDEX) {
                                    result.push(item);
                                    return true;
                                }
                            }
                            if (key.match("OpNxt") && OpParameter[key]) {
                                var OpNxt = OpParameter[key].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
                                if (OpNxt.indexOf(that.Keyword) != Yotsuba.ItemDataBase._INVALID_INDEX) {
                                    result.push(item);
                                    return true;
                                }
                            }
                            return false;
                        });
                    });
                    this._setitems && this._setitems.forEach(function (setitem) {
                        var OpParameter = setitem.OpParameter;

                        Object.keys(OpParameter).some(function (key) {
                            if (key.match("OpPrt") && OpParameter[key]) {
                                var OpPrt = OpParameter[key].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
                                if (OpPrt.indexOf(that.Keyword) != Yotsuba.ItemDataBase._INVALID_INDEX) {
                                    result.push(setitem);
                                    return true;
                                }
                            }
                            if (key.match("OpBit") && OpParameter[key]) {
                                var OpBit = OpParameter[key].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
                                if (OpBit.indexOf(that.Keyword) != Yotsuba.ItemDataBase._INVALID_INDEX) {
                                    result.push(setitem);
                                    return true;
                                }
                            }
                            if (key.match("OpEnt") && OpParameter[key]) {
                                var OpEnt = OpParameter[key].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
                                if (OpEnt.indexOf(that.Keyword) != Yotsuba.ItemDataBase._INVALID_INDEX) {
                                    result.push(setitem);
                                    return true;
                                }
                            }
                            if (key.match("OpNxt") && OpParameter[key]) {
                                var OpNxt = OpParameter[key].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
                                if (OpNxt.indexOf(that.Keyword) != Yotsuba.ItemDataBase._INVALID_INDEX) {
                                    result.push(setitem);
                                    return true;
                                }
                            }
                            return false;
                        });
                    });
                }

                return result;
            },

            initialize: function () {
                var that = this;
                var index = Math.floor(Math.random() * this._BACKGROUND_IMAGE);

                $(".background-image").css("background-image", "url('../MainInterface/back_" + index + ".jpg')");

                $("#page-top span").on("click", function (evt) {
                    $('.Yotsuba.itemDataBase').animate({ scrollTop: 0 }, 'fast');
                });

                $("#search input").on("keydown", function (evt) {
                    if (evt.keyCode === 13) {
                        var keyword = $(this).val();
                        that.onSearch(keyword);
                    }
                });
                $("#search button").on("click", function (evt) {
                    var keyword = $("#search input").val();
                    that.onSearch(keyword);
                });
            },

            getUrlArguments: function () {
                var that = this;
                var hashes = [];

                if ((window.location.href.indexOf('#')) == Yotsuba.ItemDataBase._INVALID_INDEX) {
                    hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                } else {
                    hashes = window.location.href.slice(window.location.href.indexOf('?') + 1, window.location.href.indexOf('#')).split('&');
                }
                hashes.forEach(function (hash) {
                    hash = hash.split('=');
                    if (hash[0] == "Mode") { that.OperationMode = decodeURI(hash[1]); }
                    if (hash[0] == "keyword") { that.Keyword = decodeURI(hash[1]); }
                });
            },

            load: function () {
                var that = this;
                var dfd1 = new $.Deferred();
                var dfd2 = new $.Deferred();

                $.ajax({
                    type: "GET",
                    url: this._itemPath,
                    dataType: "text"
                }).done(function (res) {
                    try {
                        that._items = JSON.parse(res);
                        dfd1.resolve();
                    } catch (exception) {
                        dfd1.reject();
                    }
                }).fail(function (res) {
                    dfd1.reject();
                });

                $.ajax({
                    type: "GET",
                    url: this._setitemPath,
                    dataType: "text"
                }).done(function (res) {
                    try {
                        that._setitems = JSON.parse(res);
                        dfd2.resolve();
                    } catch (exception) {
                        dfd2.reject();
                    }
                }).fail(function (res) {
                    dfd2.reject();
                });

                return $.when(dfd1, dfd2);
            },

            search: function () {
                switch (this.OperationMode) {
                    case OperationModeState.Search_of_ItemType:
                        return this._search_of_ItemType();
                        break;
                    case OperationModeState.Search_of_ItemName:
                        return this._search_of_ItemName();
                        break;
                    case OperationModeState.Search_of_SetName:
                        return this._search_of_SetName();
                        break;
                    case OperationModeState.Search_of_OptionName:
                        return this._search_of_OptionName();
                        break;
                    case OperationModeState.Search_of_ItemID:
                        return this._search_of_ItemID();
                        break;
                    default:
                        break;
                };
            },

            show: function (result_items) {
                var that = this;
                
                //dispose of the old content, and then insert the new content.
                function callback_showing(pages, items) {
                    if (items.showing) {
                        that._$showing && that._$showing.each(function () {
                            this.innerHTML = "";
                        });
                        that._$showing = items.showing;
                        that._$showing.each(function () {
                            var item_id = $(this).attr("data-itemid");
                            var setitem_id = $(this).attr("data-setitemid");

                            if (item_id || setitem_id) {
                                var data = null;
                                that._result.some(function (item) {
                                    if (item_id && item.itemId == item_id) {
                                        data = item;
                                        return true;
                                    }
                                    if (setitem_id && (item.setId + "-" + item.itemId) == setitem_id) {
                                        data = item;
                                        return true;
                                    }
                                    return false;
                                });

                                if (data) {
                                    var $itemElm = that._$frameTemplate.clone(false);

                                    $itemElm.find(".item-details").append(that._setItemDetails(data, 1));
                                    $itemElm.find(".item-information").append(that._setItemAddInfo(data, 1));
                                    $(this).append($itemElm);
                                }
                            }
                        });
                    }
                    $(".search-result").text(that._setNavText(pages, items));
                }

                //Stores the search results.
                this._result = result_items;

                $("section[role=main] .frame-body").empty().append(this._createContents(result_items));
                $("section[role=main] .holder").jPages({
                    containerID: "itemContainer",
                    previous: Yotsuba.ItemDataBase.Resources.common_prev,
                    next: Yotsuba.ItemDataBase.Resources.common_next,
                    keyBrowse: true,
                    minHeight: false,
                    midRange: this._DEFAULT_PAGEINDEX_DISPLAY_COUNT,
                    perPage: this._DEFAULT_CONTENT_DISPLAY_COUNT,
                    callback: callback_showing
                });
                $(".holder > a").removeAttr("href");
            },

            onSearch: function (keyword) {
                this.OperationMode = OperationModeState.Search_of_ItemName;
                this.Keyword = keyword;

                var result = this.search();
                if (result) {
                    this.show(result);
                } else {
                    window.alert && window.alert(Yotsuba.ItemDataBase.Resources.error_invalid_param);
                }
            },

            onSelectionChanged: function (evt) {
                var value = $(evt.target).find("option:selected").val();
                if (value) {
                    var setitem_id = $(evt.target).attr("data-setitemid");
                    value = parseInt(value);

                    var data = null;
                    this._result.some(function (item) {
                        if ((item.setId + "-" + item.itemId) == setitem_id) {
                            data = item;
                            return true;
                        }
                        return false;
                    });

                    if (data) {
                        $("#setitemID-" + setitem_id).find(".item-details").empty().append(this._setItemDetails(data, value));
                    }
                }
            },

            doLoadingAnimate: function (element, delay) {
                var that = this;

                $(element).css("opacity", 0).each(function (i) {
                    $(this).delay(delay * i).animate({ opacity: "1" }, 1000);
                });
                $(element).promise().done(function () {
                    $(element).animate({ opacity: "0" }, 500).promise().done(that.doLoadingAnimate(element, delay));
                });
            },

            startLoadingAnimate: function (element) {
                var html = "";
                var text = $(element).text();
                
                for (var i = 0; i < text.length; i++) {
                    html += "<span>" + text.substring(i, i + 1) + "</span>";
                }
                $(element).html(html);
                this.doLoadingAnimate($(element).find("span"), 100);
            },

            endLoadingAnimate: function (element) {
                var text = "";
                var span = $(element).find("span");

                span.each(function () {
                    text += $(this).text();
                });
                $(element).empty();
                $(element).text(text);
            },

        }, {
            // Static members.
        })
    });

})();


(function () {

    var Resources = Yotsuba.ItemDataBase.Resources;
    var DataBaseManager = new Yotsuba.ItemDataBase.DataBaseManager();

    DataBaseManager.getUrlArguments();

    $(document).ready(function () {
        var $status = $(".status");

        DataBaseManager.initialize();

        $status.text(Resources.common_status_loading);
        DataBaseManager.startLoadingAnimate($status, 100);
        DataBaseManager.load()
           .done(function () {
                DataBaseManager.endLoadingAnimate($status);
                $status.text(Resources.common_status_success);
                
                var result = DataBaseManager.search();
                if (result) {
                    DataBaseManager.show(result);
                } else {
                    window.alert && window.alert(Resources.error_invalid_param);
                }
           })
           .fail(function () {
                DataBaseManager.endLoadingAnimate($status);
                $status.text(Resources.common_status_fail);

                window.alert && window.alert(Resources.error_read_file);
        });
    });

})();