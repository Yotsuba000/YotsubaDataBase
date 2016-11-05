

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
        0: "プレイヤー",
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
        20: "クエスト依頼人",
        21: "クエスト関連人",
        22: "クエストモンスター",
        23: "武器商人<br/>(剣士/戦士)",
        24: "武器商人<br/>(ウィザード/ウルフマン)",
        25: "武器商人<br/>(ビショップ/追放天使)",
        26: "武器商人<br/>(シーフ/武道家)",
        27: "武器商人<br/>(アーチャー/ランサー)",
        28: "武器商人<br/>(ビーストテイマー/サマナー)",
        29: "武器商人<br/>(プリンセス/リトルウィッチ)",
        30: "武器商人<br/>(ネクロマンサー/悪魔)",
        31: "決戦報酬商人",
        32: "武器商人<br/>(霊術師/闘士)",
        33: "ギルドホールテレポーター",
        34: "イベント案内人",
        35: "冒険家協会",
        36: "武器商人<br/>(光奏師/獣人)",
        37: "1Dayクエスト",
        38: "錬成案内人",
        39: "武器商人<br/>(メイド/黒魔術師)"
    };

    var A_Type = {
        0: "システム",
        1: "",
        2: "扉",
        3: "ワープポータル",
        4: "システム領域",
        5: "システム転送位置",
        6: "エリア",
        7: "PvP転送位置",
        8: "○×クイズ領域(○)",
        9: "○×クイズ領域(×)",
        10: "",
        11: "トラップ床",
        12: "イベントオブジェクト",
        13: "宝箱",
        14: "",
        15: "",
        16: "",
        17: "冒険家協会推奨狩場",
        18: "システムエリア",
        19: "",
        20: ""
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
        35: "抵抗力弱化",
        36: ""
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
        8: "宝箱",
        9: "○×クイズ領域(○)",
        10: "○×クイズ領域(×)",
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
        27: "※特殊出現MOB",
        28: "PvP転送ポイント",
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
    var bMultiSelect = false;
    var bDetails = false;

    function Initialize(Data, MapPath) {

        _Xml = Data;
        _mapPath = MapPath;

        $("#bZoomUp").bind("click", function () {
            ZoomUp_ViewArea();
        });
        $("#bZoomOut").bind("click", function () {
            ZoomOut_ViewArea();
        });
        $("#bReset").bind("click", function () {
            Reset_ViewArea();
        });
        $("#bChangeImage").attr("checked", false).bind("click", function () {
            ChangeImage_ViewArea();
        });
        $("#cImageChecked").attr("checked", false).bind("click", function () {
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

        $("#cMultiSelect").bind("click", function () {
            if ($(this).attr('checked')) {
                bMultiSelect = true;
            }
            else {
                bMultiSelect = false;
            }
        });

        $("#cDetails").bind("click", function () {
            if ($(this).attr('checked')) {
                bDetails = true;
            }
            else {
                bDetails = false;
            }
            MapDataBase.Set_CharacterObject();
            MapDataBase.Set_AreaObject();
            MapDataBase.Set_CharacterTable();
            MapDataBase.Set_AreaTable();
            MapDataBase.Update_CSS();
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

        $("#mapName").text(MapName);
        $("#fileName").text(FileName);

        $("#ImapCreatorValue").text(MapView_Lv);
        var str = MapDataBase.ParamTable.App_Type[30];
        $("#ImapCreator").attr("title", str.replace(/%s/g, MapView_Lv));
        if (isPvPMap == 1) { $("#IPvPMap").show(); }
        if (isPremiumMap == 1) { $("#IPremiumMap").show(); }
        if (isLocationStrage == 0) { $("#ILocationStrage").show(); }

        $("#pReg1").text(-p_Reg1);
        if (p_Reg1 != 0) { $("#pReg1").addClass("value") }
        $("#pReg2").text(-p_Reg2);
        if (p_Reg2 != 0) { $("#pReg2").addClass("value") }
        $("#pReg3").text(-p_Reg3);
        if (p_Reg3 != 0) { $("#pReg3").addClass("value") }
        $("#pReg4").text(-p_Reg4);
        if (p_Reg4 != 0) { $("#pReg4").addClass("value") }
        $("#pReg5").text(-p_Reg5);
        if (p_Reg5 != 0) { $("#pReg5").addClass("value") }
        $("#pReg6").text(-p_Reg6);
        if (p_Reg6 != 0) { $("#pReg6").addClass("value") }

    }

    function Set_MapImage() {

		var ImageUrl;
		var ImageUrlSys;
        var Img1 = $("<img/>");
        var Img2 = $("<img/>");
        var width = $(_Xml).find("TgaWidth").text() * _Scale;
        var height = $(_Xml).find("TgaHeight").text() * _Scale;

        if (typeof _mapPath !== "undefined") {
		    _mapPath = _mapPath.replace(/\\|\\\\/g, "/");
		    if (_mapPath.indexOf("expansion/") != -1) {
			    var expMapPath = _mapPath.split("/")[1];
			    ImageUrl = "./Map/expansion/" + expMapPath + "/" + expMapPath + ".png";
			    ImageUrlSys = "./Map/expansion/" + expMapPath + "/" + expMapPath + "Sys.png";
		    }
		    else {
			    ImageUrl = "./Map/" + _mapPath + "/" + _mapPath + ".png";
			    ImageUrlSys = "./Map/" + _mapPath + "/" + _mapPath + "Sys.png";
		    }
	    }	

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

        var Charactor = $("#Character");

        Charactor.empty();

		var TgaWidth = $(_Xml).find("TgaWidth").text();
		var TgaHeight = $(_Xml).find("TgaHeight").text();
		var SysWidth = $(_Xml).find("SysWidth").text();
		var SysHeight = $(_Xml).find("SysHeight").text();

        $(_Xml).find("Character").each(function () {
            var elm = $("<div/>");

            var uid = $(this).find("CharacterUID").text();
            var Name = $(this).find("CharacterName").text();
            var InternalID = $(this).find("InternalID").text();
            var CType = $(this).find("CharacterType").text();
            var popSpeed = $(this).find("PopSpeed").text();
            var Pop_X = $(this).find("PopPoint_X").text();
            var Pop_Y = $(this).find("PopPoint_Y").text();
			var PSys_X = Math.floor(Pop_X / (TgaWidth / SysWidth));
			var PSys_Y = Math.floor(Pop_Y / (TgaHeight / SysHeight));
			var isPTBoss = $(this).find("isPTBoss").text();

            var Pop_XS = Pop_X * _Scale;
            var Pop_YS = Pop_Y * _Scale;

            var str = Name + "\n" + MapDataBase.ParamTable.App_Type[11] + PSys_X + ", " + PSys_Y + "\n";
			str += MapDataBase.ParamTable.App_Type[24] + popSpeed + MapDataBase.ParamTable.App_Type[23];
			if(isPTBoss == 1){
				str += "\n" + MapDataBase.ParamTable.App_Type[27];
			}

            elm.addClass("Char").css({
                "left": Pop_XS + "px",
                "top": Pop_YS + "px"
            }).attr({
                "title": str,
                "data-cUid": uid,
                "data-InternalID": InternalID,
                "data-cName": Name
            });

            switch (CType) {
                case "0":
                case "1":
                case "2":
                    elm.text("●");
                    break;
                case "3":
                case "23":
                case "24":
                case "25":
                case "27":
                case "28":
                case "29":
                case "30":
                case "36":
                case "39":
                    elm.addClass("CImage00");
                    break;
                case "4":
                    elm.addClass("CImage01");
                    break;
                case "5":
                    elm.addClass("CImage02");
                    break;
                case "6":
                    elm.addClass("CImage03");
                    break;
                case "7":
                    elm.addClass("CImage04");
                    break;
                case "8":
                    elm.addClass("CImage05");
                    break;
                case "9":
                    elm.addClass("CImage06");
                    break;
                case "10":
                    elm.addClass("CImage07");
                    break;
                case "11":
                    elm.addClass("CImage08");
                    break;
                case "12":
                    elm.addClass("CImage26");
                    break;
                case "13":
                    elm.addClass("CImage10");
                    break;
                case "14":
                    elm.addClass("CImage11");
                    break;
                case "15":
                    elm.addClass("CImage12");
                    break;
                case "16":
                    elm.addClass("CImage13");
                    break;
                case "17":
                    elm.addClass("CImage14");
                    break;
                case "18":
                    elm.addClass("CImage15");
                    break;
                case "19":
                    elm.addClass("CImage11");
                    break;
                case "20":
                case "21":
                    elm.addClass("CImage17");
                    break;
                case "22":
                    elm.addClass("CImage19");
                    break;
                case "33":
                    elm.addClass("CImage24");
                    break;
                case "34":
                    elm.addClass("CImage25");
                    break;
                case "35":
                    elm.addClass("CImage21");
                    break;
                case "37":
                    elm.addClass("CImage22");
                    break;
                case "38":
                    elm.addClass("CImage23");
                    break;
                default:
                    elm.text("●");
                    break;
            }

            _Char[uid] = { X: Pop_X, Y: Pop_Y };

            Charactor.append(elm);
        });

    }

    function Set_AreaObject() {

        var Area = $("#Area");

        Area.empty();

        $(_Xml).find("Area").each(function () {
            var elm = $("<div/>");

			var TgaWidth = $(_Xml).find("TgaWidth").text();
			var TgaHeight = $(_Xml).find("TgaHeight").text();
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
					var width = (TgaWidth / 300) * 20 * _Scale;
					var height = (TgaHeight / 150) * 10 * _Scale;
					if(parseInt(TgaWidth) > parseInt(TgaHeight)) { 
					    if (width > 30) { width = 30; }
					    if (width < 15) { width = 15; }
						height = width / 2;
					}
					else{
					    if (height > 15) { height = 15; }
					    if (height < 8) { height = 8; }
						width = height * 2;
					}
					var img = $("<img/>");
					img.attr("src", "./images/portal.png");
					img.css({
						"width": width,
						"height": height
					});
					img.bind("click", function () {
					    var Uid = $(this).parent().parent().data("auid");
					    var Access = $(_Xml).find("Area[id='aUid" + uid + "']").find("AccessMap").text();
					    if (typeof Access !== "undefined" && Access != "") {
					        location.href = MapDataBase.ParamTable.App_Type[35] + "?Map=" + Access;
					    }
					});

					elm.append($("<div/>").addClass("portalImg").append(img));
	                elm.addClass("Type03").css({
	                    "left": (P_X1S - (width / 2)) + "px",
	                    "top": (P_Y1S - (height / 2)) + "px"
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
	            if (AType == 0) {
	                elm.addClass("Type00");
	            }
	            if (AType == 2) {
       				var isSecretDungeonEntrance = $(this).find("isSecretDungeonEntrance").text();
					
	                elm.addClass("Type02");
					if(isSecretDungeonEntrance == 1){
						var width = (TgaWidth / 300) * 20 * _Scale;
						var height = (TgaHeight / 300) * 20 * _Scale;
						if(parseInt(TgaWidth) > parseInt(TgaHeight)) { 
						    if (width > 30) { width = 30; }
						    if (width < 15) { width = 15; }
							height = width;
						}
						else{
						    if (height > 30) { height = 30; }
						    if (height < 15) { height = 15; }
							width = height;
						}
						var img = $("<img/>");
						img.attr("src", "./images/SecretDungeonEntrance.png");
						img.css({
							"width": width,
							"height": height
						});
						elm.append($("<div/>").addClass("SecretDungeonEntrance").append(img));
			            elm.css({
	                    	"left": (P_X1S - (width / 2)) + "px",
	                    	"top": (P_Y1S - (height / 2)) + "px",
			                "width": "",
			                "height": ""
			            }).addClass("Secret");
					}
	            }
	            if (AType == 4) {
	                elm.addClass("Type04");
	            }
	            if (AType == 11) {
	                elm.addClass("Type11");
	            }
	            if (AType == 18) {
	                elm.addClass("Type18");
	            }
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

            if (!bDetails) {
                if (AType == 0 || AType == 4 || AType == 18) { elm.hide(); }
            }

            elm.bind("click", function () {
                var AType = $(this).data("atype");
                var Uid = $(this).data("auid");

                if ($(this).find(".tooltip").length) {
                    $(this).css("z-index", "");
                    $(this).find(".tooltip").remove();
                    $("#ATable .name[data-auid='" + Uid + "']").removeClass("Selected");
                }
                else {
                	if (AType != 3) { 
                    	CreateToolTip_For_Area($(this));
                    	$("#ATable .name[data-auid='" + Uid + "']").addClass("Selected");
					}
                }
            });

            _Area[uid] = { X1: P_X1, X2: P_X2, Y1: P_Y1, Y2: P_Y2 };

            Area.append(elm);
        });
    }

    function Set_CharacterTable() {
        var CharTable = $("#CTable");

        CharTable.empty();

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

            Td.text(SortObject[i].CharacterName).addClass("name");
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
        CharTable.append($("<span>/").text("NPC関連情報"));
        CharTable.append(Table);
    }

    function Set_AreaTable() {
        var AreaTable = $("#ATable");

        AreaTable.empty();

        var SortObject = [];

        $(_Xml).find("Area").each(function () {
            var uid = $(this).find("AreaUID").text();
            var AreaName = $(this).find("AreaName").text();
            var AreaType = $(this).find("AreaType").text();
            var DetectSecretDoor_Lv = $(this).find("DetectSecretDoor_Lv").text();
            var TrapId1 = $(this).find("TrapID1").text();
            var TrapId2 = $(this).find("TrapID2").text();
            var isSecretDungeonEntrance = $(this).find("isSecretDungeonEntrance").text();

            if (bDetails) {
	        }
			else{
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
	            if (AreaType == 7) {
	                AreaName = MapDataBase.ParamTable.App_Type[28];
	            }
	            if (AreaType == 8) {
	                AreaName = MapDataBase.ParamTable.App_Type[9];
	            }
	            if (AreaType == 9) {
	                AreaName = MapDataBase.ParamTable.App_Type[10];
	            }
	            if (AreaType == 11) {
	                AreaName = MapDataBase.ParamTable.App_Type[7];
	            }
	            if (AreaType == 13) {
	                AreaName = MapDataBase.ParamTable.App_Type[8];
	            }
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

            if (bDetails) {
                if (SortObject[i].AreaType != Now) {
                    var Trh = $("<tr/>");
                    var Th = $("<th/>");
                    var Text = typeof MapDataBase.ParamTable.A_Type[SortObject[i].AreaType] !== "undefined" ? MapDataBase.ParamTable.A_Type[SortObject[i].AreaType] : "undefined";

                    Th.html(Text).attr("colspan", "2");
                    Trh.append(Th);
                    Table.append(Trh);
                    Now = SortObject[i].AreaType;
                }
                Td.text(SortObject[i].AreaName).addClass("name");
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
                if (!(SortObject[i].AreaType == 0 || SortObject[i].AreaType == 4 || SortObject[i].AreaType == 18)) {
                    if (SortObject[i].AreaType != Now) {
                        var Trh = $("<tr/>");
                        var Th = $("<th/>");
                        var Text = typeof MapDataBase.ParamTable.A_Type[SortObject[i].AreaType] !== "undefined" ? MapDataBase.ParamTable.A_Type[SortObject[i].AreaType] : "undefined";

                        Th.html(Text).attr("colspan", "2");
                        Trh.append(Th);
                        Table.append(Trh);
                        Now = SortObject[i].AreaType;
                    }
                    Td.text(SortObject[i].AreaName).addClass("name");
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
        AreaTable.append($("<span>/").text("オブジェクト関連情報"));
        AreaTable.append(Table);
    }

    function Set_DetailsTable() {

        var m_Reg0 = $(_Xml).find("M_AddElement1").text();
        var m_Reg1 = $(_Xml).find("M_AddElement2").text();
        var m_Reg2 = $(_Xml).find("M_AddElement3").text();
        var m_Reg3 = $(_Xml).find("M_AddElement4").text();
        var m_Reg4 = $(_Xml).find("M_AddElement5").text();
        var m_Reg5 = $(_Xml).find("M_AddElement6").text();

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

        $("#mReg0").text(m_Reg0);
        if (m_Reg0 != 0) { $("#mReg0").addClass("value") }
        $("#mReg1").text(m_Reg1);
        if (m_Reg1 != 0) { $("#mReg1").addClass("value") }
        $("#mReg2").text(m_Reg2);
        if (m_Reg2 != 0) { $("#mReg2").addClass("value") }
        $("#mReg3").text(m_Reg3);
        if (m_Reg3 != 0) { $("#mReg3").addClass("value") }
        $("#mReg4").text(m_Reg4);
        if (m_Reg4 != 0) { $("#mReg4").addClass("value") }
        $("#mReg5").text(m_Reg5);
        if (m_Reg5 != 0) { $("#mReg5").addClass("value") }

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
            if (AreaType == 18) {
                body = Create_ToolTipBody_For_Area18(Target);
            }
            if (AreaType == 19) {
                body = Create_ToolTipBody_For_Area19(Target);
            }
            if (AreaType == 20) {
                body = Create_ToolTipBody_For_Area20(Target);
            }
        }
        if (typeof body !== "undefined") {
            body.addClass("body");
            tail.addClass("tail");
            tooltip.append(body);
            tooltip.append(tail);
            $(elm).append(tooltip.addClass("tooltip"));
            $(elm).css("z-index", "1000");

            var tipWidth_Mov = ($(tooltip).width() / 2) - ($(elm).width() / 2);
            var tipHeight_Mov = $(tooltip).height() + 10;
            var tailWidth_Mov = $(tooltip).width() / 2
            var revision_X = 0;

            var a = $(elm).offset().left;
            if(($(elm).offset().left - tipWidth_Mov) < 0 ){
                revision_X = (tipWidth_Mov - $(elm).offset().left) + 10;
                revision_X -= $("body").scrollLeft();
            }

            tooltip.css({
                "top": -tipHeight_Mov + "px",
                "left": -tipWidth_Mov + revision_X + "px"
            });
            tail.css("left", tailWidth_Mov - 4 - revision_X + "px");
        }
    }
    /*private*/
    function Create_ToolTipBody_For_Area00(Target) {
        var body = $("<div/>");

		var TgaWidth = $(_Xml).find("TgaWidth").text();
		var TgaHeight = $(_Xml).find("TgaHeight").text();
		var SysWidth = $(_Xml).find("SysWidth").text();
		var SysHeight = $(_Xml).find("SysHeight").text();
        var Ax = $(Target).find("AreaPos_X").text();
        var Ay = $(Target).find("AreaPos_Y").text();
        var AreaName = $(Target).find("AreaName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[0]));
        if (bDetails) {
            body.append($("<div/>").text(AreaName));
        }
		var PosX = Math.floor(Ax / (TgaWidth / SysWidth));
		var PosY = Math.floor(Ay / (TgaHeight / SysHeight));
        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + PosX + ", " + PosY));

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

		var TgaWidth = $(_Xml).find("TgaWidth").text();
		var TgaHeight = $(_Xml).find("TgaHeight").text();
		var SysWidth = $(_Xml).find("SysWidth").text();
		var SysHeight = $(_Xml).find("SysHeight").text();
        var Ax = $(Target).find("AreaPos_X").text();
        var Ay = $(Target).find("AreaPos_Y").text();
        var AreaName = $(Target).find("AreaName").text();
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

        if (bDetails) {
	        body.append($("<div/>").text(AreaName));
		}

		var PosX = Math.floor(Ax / (TgaWidth / SysWidth));
		var PosY = Math.floor(Ay / (TgaHeight / SysHeight));
        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + PosX + ", " + PosY));

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

		var TgaWidth = $(_Xml).find("TgaWidth").text();
		var TgaHeight = $(_Xml).find("TgaHeight").text();
		var SysWidth = $(_Xml).find("SysWidth").text();
		var SysHeight = $(_Xml).find("SysHeight").text();
        var Ax = $(Target).find("AreaPos_X").text();
        var Ay = $(Target).find("AreaPos_Y").text();
        var AreaName = $(Target).find("AreaName").text();
        var Access = $(Target).find("AccessMap").text();
        var AccessMapName = $(Target).find("AccessMapName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[3]));
        if (bDetails) {
            body.append($("<div/>").text(AreaName));
        }

		var PosX = Math.floor(Ax / (TgaWidth / SysWidth));
		var PosY = Math.floor(Ay / (TgaHeight / SysHeight));
        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + PosX + ", " + PosY));

        if (Access != "") {
            var span = $("<span/>").text(MapDataBase.ParamTable.App_Type[26]).append($("<a/>").attr("href", MapDataBase.ParamTable.App_Type[35] + "?Map=" + Access).text(AccessMapName));
            body.append($("<div/>").append(span));
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
        if (bDetails) {
            body.append($("<div/>").text(AreaName));
        }
        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area05(Target) {
        var body = $("<div/>");

		var TgaWidth = $(_Xml).find("TgaWidth").text();
		var TgaHeight = $(_Xml).find("TgaHeight").text();
		var SysWidth = $(_Xml).find("SysWidth").text();
		var SysHeight = $(_Xml).find("SysHeight").text();
        var Ax = $(Target).find("AreaPos_X").text();
        var Ay = $(Target).find("AreaPos_Y").text();
        var AreaName = $(Target).find("AreaName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[5]));
        if (bDetails) {
            body.append($("<div/>").text(AreaName));
        }

		var PosX = Math.floor(Ax / (TgaWidth / SysWidth));
		var PosY = Math.floor(Ay / (TgaHeight / SysHeight));
        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + PosX + ", " + PosY));

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
	
        var AreaName = $(Target).find("AreaName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[7]));
        if (bDetails) {
            body.append($("<div/>").text(AreaName));
        }

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area08(Target) {
        var body = $("<div/>");

        var AreaName = $(Target).find("AreaName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[8]));
        if (bDetails) {
            body.append($("<div/>").text(AreaName));
        }

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area09(Target) {
        var body = $("<div/>");

        var AreaName = $(Target).find("AreaName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[9]));
        if (bDetails) {
            body.append($("<div/>").text(AreaName));
        }

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

		var TgaWidth = $(_Xml).find("TgaWidth").text();
		var TgaHeight = $(_Xml).find("TgaHeight").text();
		var SysWidth = $(_Xml).find("SysWidth").text();
		var SysHeight = $(_Xml).find("SysHeight").text();
        var Ax = $(Target).find("AreaPos_X").text();
        var Ay = $(Target).find("AreaPos_Y").text();
        var AreaName = $(Target).find("AreaName").text();
        var RecoveryTime = $(Target).find("RecoveryTime").text();
        var DetectTrap_Lv = $(Target).find("DetectTrap_Lv").text();
        var DisarmTrap_Lv = $(Target).find("DisarmTrap_Lv").text();
        var TrapId1 = $(Target).find("TrapID1").text();
        var TrapId2 = $(Target).find("TrapID2").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.App_Type[7]));

        if (bDetails) {
	        body.append($("<div/>").text(AreaName));
		}

		var PosX = Math.floor(Ax / (TgaWidth / SysWidth));
		var PosY = Math.floor(Ay / (TgaHeight / SysHeight));
        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + PosX + ", " + PosY));

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

		var TgaWidth = $(_Xml).find("TgaWidth").text();
		var TgaHeight = $(_Xml).find("TgaHeight").text();
		var SysWidth = $(_Xml).find("SysWidth").text();
		var SysHeight = $(_Xml).find("SysHeight").text();
        var Ax = $(Target).find("AreaPos_X").text();
        var Ay = $(Target).find("AreaPos_Y").text();
        var AreaName = $(Target).find("AreaName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[12]));
        body.append($("<div/>").text(AreaName));

		var PosX = Math.floor(Ax / (TgaWidth / SysWidth));
		var PosY = Math.floor(Ay / (TgaHeight / SysHeight));
        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + PosX + ", " + PosY));

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area13(Target) {
        var body = $("<div/>");

		var TgaWidth = $(_Xml).find("TgaWidth").text();
		var TgaHeight = $(_Xml).find("TgaHeight").text();
		var SysWidth = $(_Xml).find("SysWidth").text();
		var SysHeight = $(_Xml).find("SysHeight").text();
        var Ax = $(Target).find("AreaPos_X").text();
        var Ay = $(Target).find("AreaPos_Y").text();
        var AreaName = $(Target).find("AreaName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[13]));
        if (bDetails) {
            body.append($("<div/>").text(AreaName));
        }

		var PosX = Math.floor(Ax / (TgaWidth / SysWidth));
		var PosY = Math.floor(Ay / (TgaHeight / SysHeight));
        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + PosX + ", " + PosY));

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

		var TgaWidth = $(_Xml).find("TgaWidth").text();
		var TgaHeight = $(_Xml).find("TgaHeight").text();
		var SysWidth = $(_Xml).find("SysWidth").text();
		var SysHeight = $(_Xml).find("SysHeight").text();
        var Ax = $(Target).find("AreaPos_X").text();
        var Ay = $(Target).find("AreaPos_Y").text();
        var AreaName = $(Target).find("AreaName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[17]));
        body.append($("<div/>").text(AreaName));

		var PosX = Math.floor(Ax / (TgaWidth / SysWidth));
		var PosY = Math.floor(Ay / (TgaHeight / SysHeight));
        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + PosX + ", " + PosY));

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area18(Target) {
        var body = $("<div/>");

		var TgaWidth = $(_Xml).find("TgaWidth").text();
		var TgaHeight = $(_Xml).find("TgaHeight").text();
		var SysWidth = $(_Xml).find("SysWidth").text();
		var SysHeight = $(_Xml).find("SysHeight").text();
        var Ax = $(Target).find("AreaPos_X").text();
        var Ay = $(Target).find("AreaPos_Y").text();
        var AreaName = $(Target).find("AreaName").text();

        body.append($("<h1/>").text("■" + MapDataBase.ParamTable.A_Type[18]));
        if (bDetails) {
            body.append($("<div/>").text(AreaName));
        }

		var PosX = Math.floor(Ax / (TgaWidth / SysWidth));
		var PosY = Math.floor(Ay / (TgaHeight / SysHeight));
        body.append($("<div/>").text(MapDataBase.ParamTable.App_Type[11] + PosX + ", " + PosY));

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area19(Target) {
        var body = $("<div/>");

        return body;
    }
    /*private*/
    function Create_ToolTipBody_For_Area20(Target) {
        var body = $("<div/>");

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
		var TgaWidth = $(_Xml).find("TgaWidth").text();
		var TgaHeight = $(_Xml).find("TgaHeight").text();

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
					    var img = $(Target[i]).children(".portalImg").children("img");
						var width = (TgaWidth / 300) * 20 * _Scale;
						var height = (TgaHeight / 150) * 10 * _Scale;
						if(parseInt(TgaWidth) > parseInt(TgaHeight)) { 
						    if (width > 30) { width = 30; }
						    if (width < 15) { width = 15; }
							height = width / 2;
						}
						else{
						    if (height > 15) { height = 15; }
						    if (height < 8) { height = 8; }
							width = height * 2;
						}
						$(img).css({
							"width": width,
							"height": height
						});
	                    $(Target[i]).css({
	                        "left": (Px1S - (width / 2)) + "px",
	                        "top": (Py1S - (height / 2)) + "px"
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
	                        "top": Py1S + "px"
	                    });
					}
					if (AType == 13) {
					    $(Target[i]).css({
					        "left": Px1S + "px",
					        "top": Py1S + "px"
					    });
					}
					if (AType == 17) {
					    $(Target[i]).css({
					        "left": Px1S + "px",
					        "top": Py1S + "px"
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
					
					if(AType == 2){
					    var img = $(Target[i]).children(".SecretDungeonEntrance").children("img");
						if(img.length){
							var width = (TgaWidth / 300) * 20 * _Scale;
							var height = (TgaHeight / 300) * 20 * _Scale;
							if(parseInt(TgaWidth) > parseInt(TgaHeight)) { 
							    if (width > 30) { width = 30; }
							    if (width < 15) { width = 15; }
								height = width;
							}
							else{
							    if (height > 30) { height = 30; }
							    if (height < 15) { height = 15; }
								width = height;
							}
							$(img).css({
								"width": width,
								"height": height
							});
		                    $(Target[i]).css({
		                        "left": (Px1S - (width / 2)) + "px",
		                        "top": (Py1S - (height / 2)) + "px",
			                    "width": "",
			                    "height": ""
		                    });	
						}					
					}
                }
            }
        }
    }

    function Selected_CharacterObject(SeedElement) {
        var SeedUid = $(SeedElement).data("cuid");
        var SeedInternalId = $(SeedElement).data("internalid");
        var SeedCName = $(SeedElement).text();

        var Target = $("#Character > .Char");

        if (!bMultiSelect) {
            $(Target).removeClass("Selected");
            $("#CTable .name").removeClass("Selected");
            $(SeedElement).addClass("Selected");
        }
        else {
            if ($(SeedElement).hasClass("Selected")) {
                $(SeedElement).removeClass("Selected");
            }
            else{
                $(SeedElement).addClass("Selected");
            }
        }

        for (var i = 0; i < Target.length; i++) {
            var TargetCName = $(Target[i]).data("cname");;
            var TargetInternaiId = $(Target[i]).data("internalid");

            if ((TargetCName == SeedCName) && (TargetInternaiId == SeedInternalId)) {
                if (!bMultiSelect) {
                    $(Target[i]).addClass("Selected");
                    $(Target[i]).css("z-index", "1000");
                }
                else {
                    if ($(Target[i]).hasClass("Selected")) {
                        $(Target[i]).removeClass("Selected");
                        $(Target[i]).css("z-index", "");
                    }
                    else {
                        $(Target[i]).addClass("Selected");
                        $(Target[i]).css("z-index", "1000");
                    }
                }
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

        $("#Character > .Char").css("z-index", "");
        $("#Character > .Char").removeClass("Selected");
        $("#CTable .name").removeClass("Selected");
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
    "use strict";

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
        getUrlVar: function (key) {
            return $.getUrlVars()[key];
        }
    });


    $(document).ready(function () {
        var MapPath = "";
	    var URL = "";

	    MapPath = $.getUrlVar("Map");
	    if(typeof MapPath !== "undefined"){
		    MapPath = MapPath.replace(/\\|\\\\/g, "/");
		    if(MapPath.indexOf("expansion/") != -1){
			    var expMapPath = MapPath.split("/")[1];
			    URL = "./Map/expansion/" + expMapPath + "/" + expMapPath + ".xml";
		    }
		    else{
			    URL = "./Map/" + MapPath + "/" + MapPath + ".xml";
		    }
	    }

        $.ajax({
            type: "GET",
            url: URL,
            dataType: "xml",
            success: function (result) {
                if (MapPath != "" && typeof MapPath !== "undefined") {
                    Yotsuba.MapDataBase.Initialize(result, MapPath);
                    Yotsuba.MapDataBase.Set_Information();
                    Yotsuba.MapDataBase.Set_MapImage();
                    Yotsuba.MapDataBase.Set_CharacterObject();
                    Yotsuba.MapDataBase.Set_AreaObject();
                    Yotsuba.MapDataBase.Set_CharacterTable();
                    Yotsuba.MapDataBase.Set_AreaTable();
                    Yotsuba.MapDataBase.Set_DetailsTable();
                    Yotsuba.MapDataBase.Update_CSS();
                }
                else {
                    alert("URL引数の指定が正しくありません。");
                }
            },
            error: function (result) {
                alert("データの読み込みに問題が発生したか、URL引数の指定が正しくありません。");
            }
        });
    });

})();
