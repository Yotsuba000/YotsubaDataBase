

(function rootInit(global, undefined) {
    "use strict";

	(function (rootNamespace) {
	    "use strict";

		if (!global[rootNamespace]) {
		    global[rootNamespace] = Object.create(Object.prototype);

		    if (!global[rootNamespace].MapDataBase) {
		        global[rootNamespace].MapDataBase = Object.create(Object.prototype);
		    }
		}
	})("Yotsuba");

})(this);

(function DataBaseTableInit(MapDataBase) {
    "use strict";

    var C_Type = {
        0: "",
        1: "NPC",
        2: "モンスター",
        3: "武具商人",
        4: "防具商人",
        5: "雑貨商人",
        6: "道具商人",
        7: "取引仲介人",
        8: "銀行員",
        9: "スキルマスター",
        10: "一般クエスト",
        11: "称号クエスト",
        12: "ギルドクエスト",
        13: "メインクエスト",
        14: "サポーター1",
        15: "テレポーター",
        16: "治療師",
        17: "クエスト案内人",
        18: "鍛冶屋",
        19: "サポーター2",
        20: "",
        21: "クエスト関連人",
        22: "",
        23: "武器商人<br/>(剣士/戦士)",
        24: "武器商人<br/>(ウィザード/ウルフマン)",
        25: "武器商人<br/>(ビショップ/追放天使)",
        26: "武器商人<br/>(シーフ/武道家)",
        27: "武器商人<br/>(アーチャー/ランサー)",
        28: "武器商人<br/>(ビーストテイマー/サマナー)",
        29: "武器商人<br/>(プリンセス/リトルウィッチ)",
        30: "武器商人<br/>(ネクロマンサー/悪魔)",
        31: "",
        32: "武器商人<br/>(霊術師/闘士)",
        33: "ホールテレポーター",
        34: "イベント案内人",
        35: "冒険家協会",
        36: "武器商人<br/>(光奏師/???)",
        37: "1Dayクエスト",
        38: "錬成案内人"
    };

    var A_Type = {
        0: "エントリポイント",
        1: "",
        2: "扉",
        3: "ワープポータル",
        4: "システム領域",
        5: "システム転送位置",
        6: "エリア",
        7: "",
        8: "",
        9: "",
        10: "",
        11: "トラップ床",
        12: "イベントオブジェクト",
        13: "宝箱",
        14: "",
        15: "",
        16: "",
        17: "冒険家協会推奨狩場"
    };

    var T_Type = {
        0: "火属性ダメージLv1",
        1: "火属性ダメージLv2",
        2: "火属性ダメージLv3",
        3: "水属性ダメージLv1",
        4: "水属性ダメージLv2",
        5: "水属性ダメージLv3",
        6: "土属性ダメージLv1",
        7: "土属性ダメージLv2",
        8: "土属性ダメージLv3",
        9: "風属性ダメージLv1",
        10: "風属性ダメージLv2",
        11: "風属性ダメージLv3",
        12: "光属性ダメージLv1",
        13: "光属性ダメージLv2",
        14: "光属性ダメージLv3",
        15: "闇属性ダメージLv1",
        16: "闇属性ダメージLv2",
        17: "闇属性ダメージLv3",
        18: "物理属性ダメージLv1",
        19: "物理属性ダメージLv2",
        20: "物理属性ダメージLv3",
        21: "暗闇",
        22: "コールド",
        23: "フリーズ",
        24: "悪夢",
        25: "全身麻痺",
        26: "混乱",
        27: "攻撃力低下",
        28: "防御力低下",
        29: "命中率低下",
        30: "回避率低下",
        31: "攻撃速度低下",
        32: "移動速度低下",
        33: "集中力減少",
        34: "属低抵抗低下",
        35: "抵抗力弱化"
    };

    var App_Type = {
        0: "扉",
        1: "トラップ扉",
        2: "秘密の扉",
        3: "秘密ダンジョン入口",
        4: "ワープポータル",
        5: "転送ポイント",
        6: "エントリポイント",
        7: "トラップ床",
        8: "",
        9: "",
        10: "",
        11: "座標: ",
        12: "扉耐久: ",
        13: "扉破壊: ",
        14: "ｵﾌﾞｼﾞｪｸﾄ復帰時間: ",
        15: "扉探知Lv: ",
        16: "扉開放(ｱﾝﾛｯｸ)Lv: ",
        17: "罠探知Lv: ",
        18: "罠解除(ﾃﾞｨｻﾞｰﾑ)Lv: ",
        19: "Trap1: ",
        20: "Trap2: ",
        21: "可",
        22: "不可",
        23: "秒",
        24: "沸き時間: ",
        25: "へ",
        26: "リンク: ",
        27: "",
        28: "",
        29: "",
        30: "ミニマップを表示する為には[ マップ製作者Lv %s ]が必要です。",
        31: "PvP専用マップです。",
        32: "プレミアムゾーンです。\nマップへ進入する為には\nポータルスフィアー系アイテムが必要です。",
        33: "場所記憶不可マップです。\nムーンストーン系アイテム、ポータルスフィアー等による場所記憶は利用できません。",
        34: "Not Accessible",
        35: "MapDataBase.html"
    };

    if (!MapDataBase.ParamTable) {
        MapDataBase.ParamTable = Object.create(Object.prototype);

        Object.defineProperties(MapDataBase.ParamTable, {
            C_Type: { value: C_Type, writable: false, enumerable: false, configurable: true },
            A_Type: { value: A_Type, writable: false, enumerable: false, configurable: true },
            T_Type: { value: T_Type, writable: false, enumerable: false, configurable: true },
            App_Type: { value: App_Type, writable: false, enumerable: false, configurable: true }
        });
    }


})(Yotsuba.MapDataBase);

(function (MapDataBase) {

    var _Xml = [];
    var _Char = [];
    var _Area = [];

    var _mapPath = "";
    var _Scale = 1.0;

    var bSysImage = false;
    var bSuperimpose = false;

    function Initialize(Data, MapPath) {

        _Xml = Data;
        _mapPath = MapPath;

        $("#bZoomUp").bind("click", function () {
            ZoomUp_ViewArea();
        });
        $("#bZoomOut").bind("click", function () {
            ZoomOut_ViewArea()
        });
        $("#bReset").bind("click", function () {
            Reset_ViewArea()
        });
        $("#bChangeImage").bind("click", function () {
            ChangeImage_ViewArea()
        });
        $("#cImageChecked").bind("click", function () {
            if ($(this).attr('checked')) {
                bSuperimpose = true;

                if (bSysImage) {
                    $("#NormalImage").css("opacity", "0.5").show();
                }
                else {
                    $("#SysImage").css("opacity", "0.5").show();
                }
            }
            else {
                bSuperimpose = false;

                if (bSysImage) {
                    $("#NormalImage").css("opacity", "").hide();
                }
                else {
                    $("#SysImage").css("opacity", "").hide();
                }
            }
        });

        $("#IPvPMap").attr("title", MapDataBase.ParamTable.App_Type[31]).hide();
        $("#IPremiumMap").attr("title", MapDataBase.ParamTable.App_Type[32]).hide();
        $("#ILocationStrage").attr("title", MapDataBase.ParamTable.App_Type[33]).hide();
    }

    function Set_Information() {
        var MapName = $(_Xml).find("MapName").text();
        var FileName = $(_Xml).find("FileName").text();
        var isPvPMap = $(_Xml).find("isPvPMap").text();
        var isPremiumMap = $(_Xml).find("isPremiumMap").text();
        var isLocationStrage = $(_Xml).find("isLocationStrage").text();
        var MapView_Lv = $(_Xml).find("MapView_Lv").text();

        var p_Reg1 = $(_Xml).find("P_SubElement1").text();
        var p_Reg2 = $(_Xml).find("P_SubElement2").text();
        var p_Reg3 = $(_Xml).find("P_SubElement3").text();
        var p_Reg4 = $(_Xml).find("P_SubElement4").text();
        var p_Reg5 = $(_Xml).find("P_SubElement5").text();
        var p_Reg6 = $(_Xml).find("P_SubElement6").text();

        var m_Reg1 = $(_Xml).find("M_AddElement1").text();
        var m_Reg2 = $(_Xml).find("M_AddElement2").text();
        var m_Reg3 = $(_Xml).find("M_AddElement3").text();
        var m_Reg4 = $(_Xml).find("M_AddElement4").text();
        var m_Reg5 = $(_Xml).find("M_AddElement5").text();
        var m_Reg6 = $(_Xml).find("M_AddElement6").text();

        $("#mapName").text(MapName);
        $("#fileName").text(FileName);

        $("#ImapCreatorValue").text(MapView_Lv);
        var str = MapDataBase.ParamTable.App_Type[30];
        $("#ImapCreator").attr("title", str.replace(/%s/g, MapView_Lv));
        if (isPvPMap == 1) { $("#IPvPMap").show(); }
        if (isPremiumMap == 1) { $("#IPremiumMap").show(); }
        if (isLocationStrage == 1) { $("#ILocationStrage").show(); }

        $("#pReg1").text(-p_Reg1);
        $("#pReg2").text(-p_Reg2);
        $("#pReg3").text(-p_Reg3);
        $("#pReg4").text(-p_Reg4);
        $("#pReg5").text(-p_Reg5);
        $("#pReg6").text(-p_Reg6);

        $("#mReg1").text(m_Reg1);
        $("#mReg2").text(m_Reg2);
        $("#mReg3").text(m_Reg3);
        $("#mReg4").text(m_Reg4);
        $("#mReg5").text(m_Reg5);
        $("#mReg6").text(m_Reg6);


    }

    function Set_MapImage() {

        var ImageUrl = "./Map/" + _mapPath + "/" + _mapPath + ".png";
        var ImageUrlSys = "./Map/" + _mapPath + "/" + _mapPath + "Sys.png";
        var Img1 = $("<img/>");
        var Img2 = $("<img/>");

        var width = $(_Xml).find("TgaWidth").text() * _Scale;
        var height = $(_Xml).find("TgaHeight").text() * _Scale;

        Img1.attr({
            "id": "NormalImage",
            "src": ImageUrl
        }).addClass("Map").css({
            "width": width + "px",
            "height": height + "px"
        });

        Img2.attr({
            "id": "SysImage", 
            "src": ImageUrlSys
        }).addClass("Map").css({
            "width": width + "px",
            "height": height + "px"
        });

        $("#MapImage").append(Img1).append(Img2);
        $("#viewArea").css({ "height": height });

        $("#SysImage").hide();

    }

    function Set_CharacterObject() {

        $(_Xml).find("Character").each(function () {
            var elm = $("<div/>");

            var uid = $(this).find("CharacterUID").text();
            var Name = $(this).find("CharacterName").text();
            var InternalID = $(this).find("InternalID").text();
            var popSpeed = $(this).find("PopSpeed").text();
            var Pop_X = $(this).find("PopPoint_X").text();
            var Pop_Y = $(this).find("PopPoint_Y").text();

            var Pop_XS = Pop_X * _Scale;
            var Pop_YS = Pop_Y * _Scale;

            var str = Name + "\n" + MapDataBase.ParamTable.App_Type[24] + popSpeed + MapDataBase.ParamTable.App_Type[23];

            elm.addClass("Char").css({
                "left": Pop_XS + "px",
                "top": Pop_YS + "px"
            }).text("●").attr({
                "title": str,
                "data-cUid": uid,
                "data-InternalID": InternalID,
                "data-cName": Name
            });

            _Char[uid] = { X: Pop_X, Y: Pop_Y };

            $("#Character").append(elm);
        });

    }

    function Set_AreaObject() {

        $(_Xml).find("Area").each(function () {
            var elm = $("<div/>");

            var uid = $(this).find("AreaUID").text();
            var Name = $(this).find("AreaName").text();
            var AType = $(this).find("AreaType").text();
            var P_X1 = $(this).find("AreaPos_X").text();
            var P_X2 = $(this).find("AreaPos_X2").text();
            var P_Y1 = $(this).find("AreaPos_Y").text();
            var P_Y2 = $(this).find("AreaPos_Y2").text();

            var P_X1S = P_X1 * _Scale;
            var P_X2S = P_X2 * _Scale;
            var P_Y1S = P_Y1 * _Scale;
            var P_Y2S = P_Y2 * _Scale;


            if (AType == 3 || AType == 5 || AType == 6 || AType == 13 || AType == 17) {
	            if (AType == 3) {
					var img = $("<img/>");
					img.attr("src", "./images/portal.png");
					elm.append(img);
	                elm.addClass("Type03").css({
		                "left": (P_X1S - (10 * _Scale)) + "px",
		                "top": (P_Y1S - (5 * _Scale)) + "px"
	                });
	            }
	            if (AType == 5) {
	                elm.addClass("Type05").css({
	                    "left": P_X1S + "px",
	                    "top": P_Y1S + "px"
	                }).text("○");
	            }
	            if (AType == 6) {
	                elm.addClass("Type06").css({
		                "left": P_X1S + "px",
		                "top": P_Y1S + "px"
	                }).text("+");
	            }
	            if (AType == 13) {
	                elm.addClass("Type13").css({
	                    "left": P_X1S + "px",
	                    "top": P_Y1S + "px"
	                }).text("+");
	            }
	            if (AType == 17) {
	                elm.addClass("Type17").css({
	                    "left": P_X1S + "px",
	                    "top": P_Y1S + "px"
	                }).text("+");
	            }
			}
			else {
	            elm.css({
	                "left": P_X1S + "px",
	                "top": P_Y1S + "px",
	                "width": (P_X2S - P_X1S) + "px",
	                "height": (P_Y2S - P_Y1S) + "px"
	            });
            }

            var TitleStr;
            if (AType == 3) {      
                var AccessMapName = $(this).find("AccessMapName").text();
                TitleStr = AccessMapName != "" ? (AccessMapName + MapDataBase.ParamTable.App_Type[25]) : MapDataBase.ParamTable.App_Type[34];
            }
            else {
                TitleStr = typeof MapDataBase.ParamTable.A_Type[AType] !== "undefined" ? MapDataBase.ParamTable.A_Type[AType] : "undefined"
            }
            elm.addClass("Area").attr({
                "title": TitleStr,
                "data-aUid": uid,
                "data-aType": AType
            });

            if (typeof $.getUrlVar("fullDetails") === "undefined") {
                if (AType == 0 || AType == 4) { elm.hide(); }
            }

            elm.bind("click", function () {
                var AType = $(this).data("atype");
                var Uid = $(this).data("auid");
               
                if (AType == 3) {
                    var Access = $(_Xml).find("Area[id='aUid" + uid + "']").find("AccessMap").text();
                    if (typeof Access === "undefined" || Access != "") {
                        location.href = MapDataBase.ParamTable.App_Type[35] + "?map=" + Access;
                    }
                }
                else {
                    if ($(this).find(".tooltip").length) {
                        $(this).css("z-index", "");
                        $(this).find(".tooltip").remove();
                        $("#ATable .name[data-auid='" + Uid + "']").removeClass("Selected");
                    }
                    else {
                        CreateToolTip_For_Area($(this));
                        $("#ATable .name[data-auid='" + Uid + "']").addClass("Selected");
                    }
                }
            });

            _Area[uid] = { X1: P_X1, X2: P_X2, Y1: P_Y1, Y2: P_Y2 };

            $("#Area").append(elm);
        });
    }

    function Set_CharacterTable() {
        var SortObject = [];

        $(_Xml).find("Character").each(function () {

            var uid = $(this).find("CharacterUID").text();
            var CharacterName = $(this).find("CharacterName").text();
            var CharacterType = $(this).find("CharacterType").text();
            var InternalID = $(this).find("InternalID").text();

            for (var i = 0; i < SortObject.length; i++) {
                if (CharacterName == SortObject[i].CharacterName) {
                    if (InternalID == SortObject[i].InternalID) {
                        return;
                    }
                }
            }
            var NewObj = {
                uid: uid,
                CharacterName: CharacterName,
                InternalID: InternalID,
                CharacterType: CharacterType
            };
            SortObject.push(NewObj);
        });

        SortObject.sort(function (a, b) {
            if (a.CharacterType < b.CharacterType) return 1;
            if (a.CharacterType > b.CharacterType) return -1;
            if (a.CharacterName < b.CharacterName) return -1;
            if (a.CharacterName > b.CharacterName) return 1;
        });

        var Table = $("<table/>");
        var Now = null;
        var i, count;
        for (i = 0, count = 0; i < SortObject.length; i++) {
            var Tr = $("<tr/>");
            var Td = $("<td>");

            if (SortObject[i].CharacterType != Now) {
                var Trh = $("<tr/>");
                var Th = $("<th/>");
                var Text = typeof MapDataBase.ParamTable.C_Type[SortObject[i].CharacterType] !== "undefined" ? MapDataBase.ParamTable.C_Type[SortObject[i].CharacterType] : "undefined";

                Th.html(Text).attr("colspan", "2");
                Trh.append(Th);
                Table.append(Trh);

                Now = SortObject[i].CharacterType;
            }

            Td.text(SortObject[i].CharacterName).css("padding", "0 10px").addClass("name");
            Td.attr({
                "data-cUid": SortObject[i].uid,
                "data-InternalID": SortObject[i].InternalID
            });
            Td.bind("click", function () {
                Selected_CharacterObject($(this));
            });

            Tr.append($("<td/>").text(count).addClass("number")).append(Td);
            Table.append(Tr).addClass("Dt01");
            count++;
        }
        $("#CTable").append($("<span>/").text("NPC関連情報"));
        $("#CTable").append(Table);
    }

    function Set_AreaTable() {
        var SortObject = [];

        $(_Xml).find("Area").each(function () {
            var uid = $(this).find("AreaUID").text();
            var AreaName = $(this).find("AreaName").text();
            var AreaType = $(this).find("AreaType").text();
            var DetectSecretDoor_Lv = $(this).find("DetectSecretDoor_Lv").text();
            var TrapId1 = $(this).find("TrapID1").text();
            var TrapId2 = $(this).find("TrapID2").text();
            var isSecretDungeonEntrance = $(this).find("isSecretDungeonEntrance").text();

            if(AreaType == 2){
                if (DetectSecretDoor_Lv > 0) { AreaName = MapDataBase.ParamTable.App_Type[2]; }
                else if ((TrapId1 != 0xffff && TrapId1 != "") || (TrapId2 != 0xffff && TrapId2 != "")) { AreaName = MapDataBase.ParamTable.App_Type[1]; }
                else if (isSecretDungeonEntrance == 1) { AreaName = MapDataBase.ParamTable.App_Type[3]; }
                else { AreaName = MapDataBase.ParamTable.App_Type[0]; }
            }
            if (AreaType == 3) {
                AreaName = MapDataBase.ParamTable.App_Type[4];
            }
            if (AreaType == 5) {
                AreaName = MapDataBase.ParamTable.App_Type[5];
            }
            if (AreaType == 11) {
                AreaName = MapDataBase.ParamTable.App_Type[7];
            }

            var NewObj = {
                uid: uid,
                AreaName: AreaName,
                AreaType: AreaType,
                isSecretDungeonEntrance: isSecretDungeonEntrance
            };
            SortObject.push(NewObj);
        });

        SortObject.sort(function (a, b) {
            if (a.AreaType < b.AreaType) return 1;
            if (a.AreaType > b.AreaType) return -1;
            if (a.AreaName < b.AreaName) return -1;
            if (a.AreaName > b.AreaName) return 1;
        });

        var Table = $("<table/>");
        var Now = null;
        var i, count;
        for (i = 0, count = 0; i < SortObject.length; i++) {
            var Tr = $("<tr/>");
            var Td = $("<td>");

            if (typeof $.getUrlVar("fullDetails") !== "undefined") {
                if (SortObject[i].AreaType != Now) {
                    var Trh = $("<tr/>");
                    var Th = $("<th/>");
                    var Text = typeof MapDataBase.ParamTable.A_Type[SortObject[i].AreaType] !== "undefined" ? MapDataBase.ParamTable.A_Type[SortObject[i].AreaType] : "undefined";

                    Th.html(Text).attr("colspan", "2");
                    Trh.append(Th);
                    Table.append(Trh);
                    Now = SortObject[i].AreaType;
                }
                Td.text(SortObject[i].AreaName).css("padding", "0 10px").addClass("name");
                Td.attr({
                    "data-aUid": SortObject[i].uid
                });
                Td.bind("click", function () {
                    Selected_AreaObject($(this));
                });

                Tr.append($("<td/>").text(count).addClass("number")).append(Td);
                Table.append(Tr).addClass("Dt01");
                count++;
            }
            else {
                if (!(SortObject[i].AreaType == 0 || SortObject[i].AreaType == 4)) {
                    if (SortObject[i].AreaType != Now) {
                        var Trh = $("<tr/>");
                        var Th = $("<th/>");
                        var Text = typeof MapDataBase.ParamTable.A_Type[SortObject[i].AreaType] !== "undefined" ? MapDataBase.ParamTable.A_Type[SortObject[i].AreaType] : "undefined";

                        Th.html(Text).attr("colspan", "2");
                        Trh.append(Th);
                        Table.append(Trh);
                        Now = SortObject[i].AreaType;
                    }
                    Td.text(SortObject[i].AreaName).css("padding", "0 10px").addClass("name");
                    Td.attr({
                        "data-aUid": SortObject[i].uid
                    });
                    Td.bind("click", function () {
                        Selected_AreaObject($(this));
                    });

                    Tr.append($("<td/>").text(count).addClass("number")).append(Td);
                    Table.append(Tr).addClass("Dt01");
                    count++;
                }
            }
        }
        $("#ATable").append($("<span>/").text("オブジェクト関連情報"));
        $("#ATable").append(Table);
    }

    function Set_DetailsTable() {
        var mainTable = $("<table/>");

        var regTable = $("<table/>");
        var regTr = $("<tr/>");
        regTable.append($("<tr/>").append($("<th/>").text("火")).append($("<th/>").text("水")).append($("<th/>").text("土")).append($("<th/>").text("風")).append($("<th/>").text("光")).append($("<th/>").text("闇")));

        for (var i = 0; i < 6; i++) {
            var Td = $("<td>").attr("id", "mReg" + i).text("0");
            regTr.append(Td);
        }
        regTable.append(regTr).addClass("Dt01");


        var mobTable = $("<table/>");
        var mobTr = $("<tr/>");
        mobTable.append($("<tr/>").append($("<th/>").text("モンスター名")).append($("<th/>").text("種別")).append($("<th/>").text("出現レベル")).append($("<th/>").text("サイズ")));

        for (var i = 0; i < 4; i++) {
            var Td = $("<td>").text("none");
            mobTr.append(Td);
        }
        mobTable.append(mobTr).addClass("Dt01");

        var div = $("<div/>");
        div.append($("<span>/").text("フィールド追加属性情報(MOB)")).append(regTable);

        mainTable.append($("<tr/>").append($("<td/>").append(div).attr("id", "mResistance")));
        mainTable.append($("<tr/>").append($("<td/>").append(mobTable).attr("id", "mDetails")));

        $("#DTable").append($("<span>/").text("モンスター関連情報"));
        $("#DTable").append(mainTable);
    }

    /*private*/
    function CreateToolTip_For_Area(elm) {
        var tooltip = $("<div/>");
        var body;
        var tail = $("<div/>");

        var uid = $(elm).data("auid");
        var Target = $(_Xml).find("Area[id='aUid" + uid + "']");

        if (typeof Target !== "undefined") {
            var AreaType = $(Target).find("AreaType").text();

            if (AreaType == 0) {
                body = Create_ToolTipBody_For_Area00(Target);
            }
            if (AreaType == 1) {
                body = Create_ToolTipBody_For_Area01(Target);
            }
            if (AreaType == 2) {
                body = Create_ToolTipBody_For_Area02(Target);
            }
            if (AreaType == 3) {
                body = Create_ToolTipBody_For_Area03(Target);
            }
            if (AreaType == 4) {
                body = Create_ToolTipBody_For_Area04(Target);
            }
            if (AreaType == 5) {
                body = Create_ToolTipBody_For_Area05(Target);
            }
            if (AreaType == 6) {
                body = Create_ToolTipBody_For_Area06(Target);
            }
            if (AreaType == 7) {
                body = Create_ToolTipBody_For_Area07(Target);
            }
            if (AreaType == 8) {
                body = Create_ToolTipBody_For_Area08(Target);
            }
            if (AreaType == 9) {
                body = Create_ToolTipBody_For_Area09(Target);
            }
            if (AreaType == 10) {
                body = Create_ToolTipBody_For_Area10(Target);
            }
            if (AreaType == 11) {
                body = Create_ToolTipBody_For_Area11(Target);
            }
            if (AreaType == 12) {
                body = Create_ToolTipBody_For_Area12(Target);
            }
            if (AreaType == 13) {
                body = Create_ToolTipBody_For_Area13(Target);
            }
            if (AreaType == 14) {
                body = Create_ToolTipBody_For_Area14(Target);
            }
            if (AreaType == 15) {
                body = Create_ToolTipBody_For_Area15(Target);
            }
            if (AreaType == 16) {
                body = Create_ToolTipBody_For_Area16(Target);
            }
            if (AreaType == 17) {
                body = Create_ToolTipBody_For_Area17(Target);
            }
        }

        body.addClass("body");
        tail.addClass("tail");
        tooltip.append(body);
        tooltip.append(tail);
        $(elm).append(tooltip.addClass("tooltip"));
        $(elm).css("z-index", "1000");

        var Movement_X = ($(tooltip).width() / 2) - ($(elm).width() / 2);
        var Movement_Y = $(tooltip).height() + 10;

        tooltip.css({
            "top": -Movement_Y + "px",
            "left": -Movement_X + "px"
        });
        tail.css("left", (Movement_X - 1) + "px");
    }
    /*private*/
    function Create_ToolTipBody_For_Area00(Target) {
        var body = $("<div/>");

        var AreaName = $(Target).find("AreaName").text();
        var Ax = Math.floor($(Target).find("AreaPos_X").text());
        var Ay = Math.floor($(Target).find("AreaPos_Y").text());

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[0]));
        if (typeof $.getUrlVar("fullDetails") !== "undefined") {
            body.append($("<div/>").text(AreaName));
        }
        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + Ax + ", " + Ay));

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area01(Target) {
        var body = $("<div/>");

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area02(Target) {
        var body = $("<div/>");

        var Ax = Math.floor($(Target).find("AreaPos_X").text());
        var Ay = Math.floor($(Target).find("AreaPos_Y").text());
        var Door_Endurance = $(Target).find("Door_Endurance").text();
        var DetectSecretDoor_Lv = $(Target).find("DetectSecretDoor_Lv").text();
        var UnlockDoor_Lv = $(Target).find("UnlockDoor_Lv").text();
        var RecoveryTime = $(Target).find("RecoveryTime").text();
        var isMortalObject = $(Target).find("isMortalObject").text();
        var DisarmTrap_Lv = $(Target).find("DisarmTrap_Lv").text();
        var DetectTrap_Lv = $(Target).find("DetectTrap_Lv").text();
        var TrapId1 = $(Target).find("TrapID1").text();
        var TrapId2 = $(Target).find("TrapID2").text();
        var isSecretDungeonEntrance = $(Target).find("isSecretDungeonEntrance").text();

        if (DetectSecretDoor_Lv > 0) {
            body.append($("<h1/>").text("■" + MapDataBase.ParamTable.App_Type[2]));
        }
        else if ((TrapId1 != 0xffff && TrapId1 != "") || (TrapId2 != 0xffff && TrapId2 != "")) {
            body.append($("<h1/>").text("■" + MapDataBase.ParamTable.App_Type[1]));
        }
        else if (isSecretDungeonEntrance == 1) {
            body.append($("<h1/>").text("■" + MapDataBase.ParamTable.App_Type[3]));
        }
        else {
            body.append($("<h1/>").text("■" + MapDataBase.ParamTable.App_Type[0]));
        }

        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + Ax + ", " + Ay));

        if (Door_Endurance != "") { body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[12] + Door_Endurance)); }
        if (isMortalObject != "") { body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[13] + (isMortalObject == 1 ? MapDataBase.ParamTable.App_Type[21] : MapDataBase.ParamTable.App_Type[22]))); }
        if (RecoveryTime != "") { body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[14] + RecoveryTime + MapDataBase.ParamTable.App_Type[23])); }
        if (DetectSecretDoor_Lv != "" && DetectSecretDoor_Lv > 0) { body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[15] + DetectSecretDoor_Lv)); }
        if (UnlockDoor_Lv != "" && UnlockDoor_Lv > 0) { body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[16] + UnlockDoor_Lv)); }
        if (DetectTrap_Lv != "" && DetectTrap_Lv > 0) { body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[17] + DetectTrap_Lv)); }
        if (DisarmTrap_Lv != "" && DisarmTrap_Lv > 0) { body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[18] + DisarmTrap_Lv)); }
        if (TrapId1 != "" && TrapId1 != 0xffff) {
            body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[19] + (typeof MapDataBase.ParamTable.T_Type[TrapId1] !== "undefined" ? MapDataBase.ParamTable.T_Type[TrapId1] : "undefined")));
        }
        if (TrapId2 != "" && TrapId2 != 0xffff) {
            body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[20] + (typeof MapDataBase.ParamTable.T_Type[TrapId2] !== "undefined" ? MapDataBase.ParamTable.T_Type[TrapId2] : "undefined")));
        }

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area03(Target) {
        var body = $("<div/>");

        var Ax = Math.floor($(Target).find("AreaPos_X").text());
        var Ay = Math.floor($(Target).find("AreaPos_Y").text());
        var AreaName = $(Target).find("AreaName").text();
        var Access = $(Target).find("AccessMap").text();
        var AccessMapName = $(Target).find("AccessMapName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[3]));
        if (typeof $.getUrlVar("fullDetails") !== "undefined") {
            body.append($("<div/>").text(AreaName));
        }

        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + Ax + ", " + Ay));

        if (Access != "") {
            body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[26]).append($("<a/>").attr("href", MapDataBase.ParamTable.App_Type[35] + "?map=" + Access).text(AccessMapName)));
        }
        else {
            body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[26] + MapDataBase.ParamTable.App_Type[34]));
        }


        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area04(Target) {
        var body = $("<div/>");

        var AreaName = $(Target).find("AreaName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[4]));
        if (typeof $.getUrlVar("fullDetails") !== "undefined") {
            body.append($("<div/>").text(AreaName));
        }
        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area05(Target) {
        var body = $("<div/>");

        var Ax = Math.floor($(Target).find("AreaPos_X").text());
        var Ay = Math.floor($(Target).find("AreaPos_Y").text());
        var AreaName = $(Target).find("AreaName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[5]));
        if (typeof $.getUrlVar("fullDetails") !== "undefined") {
            body.append($("<div/>").text(AreaName));
        }

        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + Ax + ", " + Ay));

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area06(Target) {
        var body = $("<div/>");

        var AreaName = $(Target).find("AreaName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[6]));
        body.append($("<div/>").text(AreaName));

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area07(Target) {
        var body = $("<div/>");

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area08(Target) {
        var body = $("<div/>");

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area09(Target) {
        var body = $("<div/>");

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area10(Target) {
        var body = $("<div/>");

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area11(Target) {
        var body = $("<div/>");

        var Ax = Math.floor($(Target).find("AreaPos_X").text());
        var Ay = Math.floor($(Target).find("AreaPos_Y").text());
        var RecoveryTime = $(Target).find("RecoveryTime").text();
        var DetectTrap_Lv = $(Target).find("DetectTrap_Lv").text();
        var DisarmTrap_Lv = $(Target).find("DisarmTrap_Lv").text();
        var TrapId1 = $(Target).find("TrapID1").text();
        var TrapId2 = $(Target).find("TrapID2").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.App_Type[7]));
        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + Ax + ", " + Ay));

        if (RecoveryTime != "") { body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[14] + RecoveryTime + MapDataBase.ParamTable.App_Type[23])); }
        if (DetectTrap_Lv != "" && DetectTrap_Lv > 0) { body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[17] + DetectTrap_Lv)); }
        if (DisarmTrap_Lv != "" && DisarmTrap_Lv > 0) { body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[18] + DisarmTrap_Lv)); }
        if (TrapId1 != "" && TrapId1 != 0xffff) {
            body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[19] + (typeof MapDataBase.ParamTable.T_Type[TrapId1] !== "undefined" ? MapDataBase.ParamTable.T_Type[TrapId1] : "undefined")));
        }
        if (TrapId2 != "" && TrapId2 != 0xffff) {
            body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[20] + (typeof MapDataBase.ParamTable.T_Type[TrapId2] !== "undefined" ? MapDataBase.ParamTable.T_Type[TrapId2] : "undefined")));
        }

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area12(Target) {
        var body = $("<div/>");

        var Ax = Math.floor($(Target).find("AreaPos_X").text());
        var Ay = Math.floor($(Target).find("AreaPos_Y").text());
        var AreaName = $(Target).find("AreaName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[12]));
        body.append($("<div/>").text(AreaName));
        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + Ax + ", " + Ay));

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area13(Target) {
        var body = $("<div/>");

        var Ax = Math.floor($(Target).find("AreaPos_X").text());
        var Ay = Math.floor($(Target).find("AreaPos_Y").text());

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[13]));
        if (typeof $.getUrlVar("fullDetails") !== "undefined") {
            body.append($("<div/>").text(AreaName));
        }

        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + Ax + ", " + Ay));

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area14(Target) {
        var body = $("<div/>");

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area15(Target) {
        var body = $("<div/>");

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area16(Target) {
        var body = $("<div/>");

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area17(Target) {
        var body = $("<div/>");

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[17]));
        if (typeof $.getUrlVar("fullDetails") !== "undefined") {
            body.append($("<div/>").text(AreaName));
        }

        return body;
    }


    function Update_CSS() {
        var max = 0;
        var height;

        height = $("#CTable").height();
        if (max < height) { max = height; }

        height = $("#ATable").height();
        if (max < height) { max = height; }

        height = $("#DTable").height();
        if (max < height) { max = height; }

        max += 30;
        $("#TableArea").css("height", max + "px");

        var cfontSize = 5 * _Scale;
        $("#Character > .Char").css("font-size", cfontSize);
        var afontSize = 10 * _Scale;
        $("#Area > .Area").css("font-size", afontSize);
    }

    function Update_MapImage() {
        var width = $(_Xml).find("TgaWidth").text() * _Scale;
        var height = $(_Xml).find("TgaHeight").text() * _Scale;

        $("#MapImage > img").css({
            "width": width + "px",
            "height": height + "px"
        });
        $("#viewArea").css({ "height": height });
    }

    function Update_CharacterObject() {
        var Target = $("#Character > .Char");

        for (var i = 0; i < Target.length; i++) {
            var uid = $(Target[i]).data("cuid");
            if (typeof uid !== "undefined") {

                var PxS = _Char[uid].X * _Scale;
                var PyS = _Char[uid].Y * _Scale;

                $(Target[i]).css({
                    "left": PxS + "px",
                    "top": PyS + "px"
                });
            }
        }
    }

    function Update_AreaObject() {
        var Target = $("#Area > .Area");

        for (var i = 0; i < Target.length; i++) {
            var uid = $(Target[i]).data("auid");
            var AType = $(Target[i]).data("atype"); 
            if (typeof uid !== "undefined") {

                var Px1S = _Area[uid].X1 * _Scale;
                var Px2S = _Area[uid].X2 * _Scale;
                var Py1S = _Area[uid].Y1 * _Scale;
                var Py2S = _Area[uid].Y2 * _Scale;

                if (AType == 3 || AType == 5 || AType == 6 || AType == 13 || AType == 17) {
					if (AType == 3) {
						var img = $(Target[i]).children();
						var width = img.width();
						var height = img.height();
						$(img).css({
							"width": 20 * _Scale,
							"height": 10 * _Scale
						});
	                    $(Target[i]).css({
	                        "left": (Px1S - (10 * _Scale)) + "px",
	                        "top": (Py1S - (5 * _Scale)) + "px",
	                    });
					}
					if (AType == 5) {
	                    $(Target[i]).css({
	                        "left": Px1S + "px",
	                        "top": Py1S + "px"
	                    });
					}
					if (AType == 6) {
	                    $(Target[i]).css({
	                        "left": Px1S + "px",
	                        "top": Py1S + "px",
	                    });
					}
                }
                else {
                    $(Target[i]).css({
                        "left": Px1S + "px",
                        "top": Py1S + "px",
                        "width": (Px2S - Px1S) + "px",
                        "height": (Py2S - Py1S) + "px"
                    });
                }
            }
        }
    }

    function Selected_CharacterObject(SeedElement) {
        var SeedUid = $(SeedElement).data("cuid");
        var SeedInternalId = $(SeedElement).data("internalid");
        var SeedCName = $(SeedElement).text();

        var Target = $("#Character > .Char");

        $(Target).removeClass("Selected");
        $("#CTable .name").removeClass("Selected");

        for (var i = 0; i < Target.length; i++) {
            var TargetCName = $(Target[i]).data("cname");;
            var TargetInternaiId = $(Target[i]).data("internalid");

            if ((TargetCName == SeedCName) && (TargetInternaiId == SeedInternalId)) {
                $(Target[i]).addClass("Selected");
                $(Target[i]).css("z-index", "1000");
                $(SeedElement).addClass("Selected");
            }
        }
    }

    function Selected_AreaObject(SeedElement) {
        var SeedUid = $(SeedElement).data("auid");
        var SeedAName = $(SeedElement).text();

        var Target = $("#Area > .Area");
        for (var i = 0; i < Target.length; i++) {
            var TargetUid = $(Target[i]).data("auid");
            var TargetAName = $(Target[i]).attr("title");

            if (TargetUid == SeedUid) {
                if ($(SeedElement).hasClass("Selected")) {
                    $(SeedElement).removeClass("Selected");
                    if ($(Target[i]).find(".tooltip").length) {
                        $(Target[i]).css("z-index", "");
                        $(Target[i]).find(".tooltip").remove();
                    }
                }
                else {
                    $(SeedElement).addClass("Selected");
                    if ($(Target[i]).find(".tooltip").length == 0) {
                        CreateToolTip_For_Area($(Target[i]));
                    }
                }
            }
        }
    }

    function ZoomUp_ViewArea() {
        if ((_Scale + 0.2) < 10.0) {

            _Scale += 0.2;

            Update_MapImage();
            Update_CharacterObject();
            Update_AreaObject();
            Update_CSS();
        }
    }

    function ZoomOut_ViewArea() {
        if ((_Scale - 0.2) > 0.1) {

            _Scale -= 0.2;

            Update_MapImage();
            Update_CharacterObject();
            Update_AreaObject();
            Update_CSS();
        }
    }

    function Reset_ViewArea() {

        _Scale = 1.0;

        Update_MapImage();
        Update_CharacterObject();
        Update_AreaObject();
        Update_CSS();
        Selected_CharacterObject(null);
        $("#Area > .Area").css("z-index", "");
        $("#Area > .Area .tooltip").remove();
        $("#ATable .name").removeClass("Selected");
    }

    function ChangeImage_ViewArea() {
        var ImageUrl ="";

        if (!bSuperimpose) {
            if (bSysImage) {
                bSysImage = false;

                var NormalImage = $("#NormalImage");
                var SysImage = $("#SysImage");

                $("#MapImage").empty();
                $("#MapImage").append(NormalImage).append(SysImage);
                $("#NormalImage").show();
                $("#SysImage").hide();
            }
            else {
                bSysImage = true;

                var NormalImage = $("#NormalImage");
                var SysImage = $("#SysImage");

                $("#MapImage").empty();
                $("#MapImage").append(SysImage).append(NormalImage);
                $("#NormalImage").hide();
                $("#SysImage").show();
            }
        }
    }


    Object.defineProperties(MapDataBase, {
        Initialize: { value: Initialize, writable: true, enumerable: true, configurable: true },
        Set_Information: { value: Set_Information, writable: true, enumerable: true, configurable: true },
        Set_MapImage: { value: Set_MapImage, writable: true, enumerable: true, configurable: true },
        Set_CharacterObject: { value: Set_CharacterObject, writable: true, enumerable: true, configurable: true },
        Set_AreaObject: { value: Set_AreaObject, writable: true, enumerable: true, configurable: true },
        Set_CharacterTable: { value: Set_CharacterTable, writable: true, enumerable: true, configurable: true },
        Set_AreaTable: { value: Set_AreaTable, writable: true, enumerable: true, configurable: true },
        Set_DetailsTable: { value: Set_DetailsTable, writable: true, enumerable: true, configurable: true },
        Update_CSS: { value: Update_CSS, writable: true, enumerable: true, configurable: true },
        Update_MapImage: { value: Update_MapImage, writable: true, enumerable: true, configurable: true },
        Update_CharacterObject: { value: Update_CharacterObject, writable: true, enumerable: true, configurable: true },
        Update_AreaObject: { value: Update_AreaObject, writable: true, enumerable: true, configurable: true },
        Selected_CharacterObject: { value: Selected_CharacterObject, writable: true, enumerable: true, configurable: true },
        Selected_AreaObject: { value: Selected_AreaObject, writable: true, enumerable: true, configurable: true },
        ZoomUp_ViewArea: { value: ZoomUp_ViewArea, writable: true, enumerable: true, configurable: true },
        ZoomOut_ViewArea: { value: ZoomOut_ViewArea, writable: true, enumerable: true, configurable: true },
        Reset_ViewArea: { value: Reset_ViewArea, writable: true, enumerable: true, configurable: true },
        ChangeImage_ViewArea: { value: ChangeImage_ViewArea, writable: true, enumerable: true, configurable: true }
    });

})(Yotsuba.MapDataBase);


(function () {

    $.extend({
        getUrlVars: function () {
            var vars = [], hash;
            var hashes;
            if ((window.location.href.indexOf('#')) == -1) {
                hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            }
            else {
                hashes = window.location.href.slice(window.location.href.indexOf('?') + 1, window.location.href.indexOf('#')).split('&');
            }
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = decodeURI(hash[1]);
            }
            return vars;
        },
        getUrlVar: function (name) {
            return $.getUrlVars()[name];
        }
    });


    $(document).ready(function () {
        var MapPath = "";
        var param = $.getUrlVar("map");
        param = 2;
        if (param == 0) { MapPath = "[471]D09_S01_F06.rmd"; }
        if (param == 1) { MapPath = "[000]T01.rmd"; }
        if (param == 2) { MapPath = "[507]BF_C01.rmd"; }
        if (param == 3) { MapPath = "[505]D18.rmd"; }

        $.ajax({
            type: "GET",
            url: "./Map/" + MapPath + "/" + MapPath + ".xml",
            dataType: "xml",
            success: function (result) {
                Yotsuba.MapDataBase.Initialize(result, MapPath);
                Yotsuba.MapDataBase.Set_Information();
                Yotsuba.MapDataBase.Set_MapImage();
                Yotsuba.MapDataBase.Set_CharacterObject();
                Yotsuba.MapDataBase.Set_AreaObject();
                Yotsuba.MapDataBase.Set_CharacterTable();
                Yotsuba.MapDataBase.Set_AreaTable();
                Yotsuba.MapDataBase.Set_DetailsTable();
                Yotsuba.MapDataBase.Update_CSS();
            },
            error: function (result) {
            }
        });
    });

})();
