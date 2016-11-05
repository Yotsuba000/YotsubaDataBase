
(function rootInit(global, undefined) {
    "use strict";

	(function (rootNamespace) {
	    "use strict";

		if (!global[rootNamespace]) {
		    global[rootNamespace] = Object.create(Object.prototype);

		    if (!global[rootNamespace].MapDataBaseIndex) {
		        global[rootNamespace].MapDataBaseIndex = Object.create(Object.prototype);
		    }
		}
	})("Yotsuba");

})(this);

(function (MapDataBaseIndex) {
	var HashAllMap = [];
	var Tile = [];
	var WorldMapExp01 = "";
	var WorldMapExp02 = "";

	Tile[0] = { x: 23, y: 63, wi: 19, hi: 19, isTown: true, name: "オアシス都市アリアン", path: "[193]T08.rmd", related: "" };
	Tile[1] = { x: 43, y: 54, wi: 52, hi: 55, isTown: false, name: "西プラトン街道 / アリアン東部地域", path: "[154]D01.rmd", related: "" };
	Tile[2] = { x: 96, y: 54, wi: 57, hi: 42, isTown: false, name: "ガディウス大砂漠 / リンケン北部地域", path: "[155]D02.rmd", related: "" };
	Tile[3] = { x: 96, y: 97, wi: 11, hi: 12, isTown: true, name: "砂漠村リンケン", path: "[171]T18.rmd", related: "" };
	Tile[4] = { x: 52, y: 110, wi: 55, hi: 18, isTown: false, name: "ガディウス大砂漠 / デフヒルズ北側", path: "[169]D05.rmd", related: "" };
	Tile[5] = { x: 52, y: 129, wi: 55, hi: 32, isTown: false, name: "デフヒルズ", path: "[364]D07.rmd", related: "" };
	Tile[6] = { x: 34, y: 170, wi: 17, hi: 17, isTown: true, name: "荒廃都市ダメル", path: "[376]T07.rmd", related: "" };
	Tile[7] = { x: 52, y: 162, wi: 55, hi: 60, isTown: false, name: "ガディウス大砂漠 / モリネルタワー付近", path: "[365]D09.rmd", related: "" };
	Tile[8] = { x: 108, y: 97, wi: 49, hi: 31, isTown: false, name: "西プラトン街道 / グレートフォレスト入口", path: "[156]D06.rmd", related: "" };
	Tile[9] = { x: 108, y: 129, wi: 33, hi: 41, isTown: false, name: "ウェテンロード / デフヒルズ東部地域", path: "[322]D08.rmd", related: "" };

	Tile[0].related = "[200]T08_I01.rmd,[196]T08_S01_B01.rmd,[197]T08_S01_B02.rmd";
	Tile[1].related = "[419]D01_S01_B01.rmd,[466]D01_B01.rmd,expansion\\[dracolich]000.rmd";
	Tile[2].related = "[157]D02_D01_B01.rmd,[159]D02_D02_B01.rmd,[161]D02_D03_B01.rmd,[163]D02_D04_B01.rmd,[165]D02_D05_B01.rmd,[167]D02_D06_B01.rmd,expansion\\[patrol_tomb]000.rmd,expansion\\[Magic_tomb_curse]000.rmd,expansion\\[mercenary_big]000.rmd,expansion\\[curse_tomb_tower]000.rmd,expansion\\[dead_treasure]000.rmd,expansion\\[glory_display_relic]000.rmd";
	Tile[3].related = "";
	Tile[4].related = "[426]D05_D01_B01.rmd,[181]D05_S01_F01.rmd,[182]D05_S01_F02.rmd,[183]D05_S01_F03.rmd,[184]D05_S01_F04.rmd,[185]D05_S01_F05.rmd,[186]D05_S01_F06.rmd,[187]D05_S01_F07.rmd,[188]D05_S01_F08.rmd,[189]D05_S01_F09.rmd,[190]D05_S01_F10.rmd,[191]D05_S01_F11.rmd,[192]D05_S01_F12.rmd,[180]D05_S01_B01.rmd,[179]D05_S01_B02.rmd,[178]D05_S01_B03.rmd,[177]D05_S01_B04.rmd,[176]D05_S01_B05.rmd,[175]D05_S01_B06.rmd,[174]D05_S01_B07.rmd,expansion\\[sealedarea_of_darksoul]000.rmd";
	Tile[5].related = "[405]D07_S01_B01.rmd,[508]D07_S01_B02.rmd,[505]D18.rmd";
	Tile[6].related = "[395]T07_E01.rmd,[404]T07_D01_F01.rmd,[509]T07_D02_B01.rmd,[510]T07_D02_B02.rmd,[511]T07_D02_B03.rmd,[512]T07_D02_B04.rmd,expansion\\[damel]000.rmd";
	Tile[7].related = "[380]D09_S01_F01.rmd,[381]D09_S01_F02.rmd,[382]D09_S01_F03.rmd,[383]D09_S01_F04.rmd,[384]D09_S01_F05.rmd,[471]D09_S01_F06.rmd,expansion\\[moliner tower]000.rmd,expansion\\[spacetime]000.rmd";
	Tile[8].related = "[427]D81.rmd,";
	Tile[9].related = "[329]D08_C01_B01.rmd,[330]D08_C01_B02.rmd";

	Tile[10] = { x: 41, y: 312, wi: 24, hi: 42, isTown: false, name: "ナラダ平原 / ウエストスワンプ", path: "[435]S12.rmd", related: "" };
	Tile[11] = { x: 66, y: 303, wi: 34, hi: 51, isTown: false, name: "グレートマウンテン北部", path: "[434]S13.rmd", related: "" };
	Tile[12] = { x: 101, y: 303, wi: 60, hi: 41, isTown: false, name: "ナラダ平原の沼地帯 / ノーススワンプ", path: "[436]S14.rmd", related: "" };
	Tile[13] = { x: 101, y: 345, wi: 15, hi: 15, isTown: true, name: "山麓村ウムバ", path: "[438]T17.rmd", related: "" };
	Tile[14] = { x: 130, y: 171, wi: 33, hi: 44, isTown: false, name: "ウェテンロード / ケルチ大橋付近", path: "[323]D11.rmd", related: "" };
	Tile[15] = { x: 144, y: 216, wi: 15, hi: 15, isTown: true, name: "小都市ビッグアイ", path: "[374]T09.rmd", related: "" };
	Tile[16] = { x: 160, y: 216, wi: 22, hi: 25, isTown: true, name: "新興王国ビガプール", path: "[373]T02.rmd", related: "" };
	Tile[17] = { x: 154, y: 54, wi: 59, hi: 42, isTown: false, name: "ガディウス大砂漠 / グレートフォレスト北部地域", path: "[168]D03.rmd", related: "" };
	Tile[18] = { x: 214, y: 75, wi: 36, hi: 21, isTown: false, name: "グレートフォレスト　ネイブ滝付近", path: "[353]G01.rmd", related: "" };
	Tile[19] = { x: 251, y: 81, wi: 15, hi: 15, isTown: true, name: "伐木町ブレンティル", path: "[347]T14.rmd", related: "" };

	Tile[10].related = "[429]T02_D01_B01.rmd,[430]T05_D01_B01.rmd,[446]S12_C01_B01.rmd,expansion\\[wast_swamp]000.rmd";
	Tile[11].related = "";
	Tile[12].related = "[468]S14_T01_B01.rmd,expansion\\[water_dragon]000.rmd";
	Tile[13].related = "";
	Tile[14].related = "[325]D11_S01_B01.rmd,[326]D11_S01_B02.rmd,[327]D11_S01_B03.rmd,[328]D11_S01_B04.rmd,expansion\\[Big_rat_king]000.rmd";
	Tile[15].related = "[378]T09_K01.rmd,";
	Tile[16].related = "[397]T02_I01.rmd,";
	Tile[17].related = "[170]D03_D01_B01.rmd,[467]D03_B01.rmd,expansion\\[tiamath]000.rmd";
	Tile[18].related = "[354]G01_C01_B01.rmd,";
	Tile[19].related = "[352]T14_G01_F01.rmd,";

	Tile[20] = { x: 158, y: 97, wi: 61, hi: 42, isTown: false, name: "グレートフォレスト / プラトン街道", path: "[129]G04.rmd", related: "" };
	Tile[21] = { x: 220, y: 97, wi: 42, hi: 42, isTown: false, name: "クェレスプリング湖", path: "[341]M01.rmd", related: "" };
	Tile[22] = { x: 158, y: 140, wi: 38, hi: 30, isTown: false, name: "グレートフォレスト/ 妖精達の蜘蛛の糸", path: "[324]G06.rmd", related: "" };
	Tile[23] = { x: 197, y: 140, wi: 51, hi: 52, isTown: false, name: "中央プラトン街道 / グレートフォレスト入口付近", path: "[001]G07.rmd", related: "" };
	Tile[24] = { x: 249, y: 140, wi: 35, hi: 52, isTown: false, name: "バヘル大河 / 北、東バヘル大河の交差地点", path: "[006]G08.rmd", related: "" };
	Tile[25] = { x: 236, y: 193, wi: 30, hi: 24, isTown: false, name: "中央プラトン街道 / ブルンネンシュティグ入口付近", path: "[010]G13.rmd", related: "" };
	Tile[26] = { x: 267, y: 193, wi: 24, hi: 24, isTown: true, name: "古都ブルンネンシュティグ", path: "[000]T01.rmd", related: "" };
	Tile[27] = { x: 285, y: 120, wi: 51, hi: 50, isTown: false, name: "バヘル大河 / 東バヘル川", path: "[130]G09.rmd", related: "" };
	Tile[28] = { x: 337, y: 94, wi: 46, hi: 46, isTown: false, name: "バヘル大河 / 東バヘル川上流", path: "[278]M07.rmd", related: "" };
	Tile[29] = { x: 357, y: 50, wi: 44, hi: 43, isTown: false, name: "ファウンティンス・ハイランド", path: "[279]M05.rmd", related: "" };

	Tile[20].related = "[358]G04_D01_B01.rmd,[359]G04_D01_B02.rmd,[360]G04_D01_B03.rmd,[361]G04_D01_B04.rmd,[362]G04_D01_B05.rmd,[363]G04_D01_B06.rmd,expansion\\[gigastemple]000.rmd";
	Tile[21].related = "[342]M01_C01_B01.rmd,[343]M01_D01_B01.rmd,[344]M01_D01_B02.rmd,[345]M01_D01_B03.rmd,[346]M01_D01_B04.rmd,[355]M01_D01_B05.rmd,[356]M01_D01_B06.rmd,[357]M01_D01_B07.rmd";
	Tile[22].related = "[334]G06_H01_F01.rmd,[335]G06_H01_B01.rmd,[333]G06_G01_N03.rmd,[332]G06_G01_N02.rmd,[331]G06_G01_N01.rmd,[336]G06_H02_B01.rmd,[337]G06_H03_F01.rmd,[338]G06_H03_F02.rmd,[339]G06_H03_F03.rmd,expansion\\[mysteryarea_of_darkelf]000.rmd";
	Tile[23].related = "[002]G07_C01_B01.rmd,[003]G07_D01_B01.rmd,[004]G07_D01_B02.rmd,[005]G07_D01_B03.rmd,expansion\\[wolf_cave]000.rmd,expansion\\[redeye_laboratory]000.rmd";
	Tile[24].related = "[007]G08_C01_B01.rmd,[008]G08_C02_B01.rmd,[009]G08_C02_B02.rmd,expansion\\[bug_cave]001.rmd,expansion\\[oger_jail]000.rmd";
	Tile[25].related = "[011]G13_C01_B01.rmd,[012]G13_C01_B02.rmd,[013]G13_D01_B01.rmd,[014]G13_D01_B02.rmd,[015]G13_D01_B03.rmd,expansion\\[kobolt_cave]000.rmd,expansion\\[tomb]000.rmd";
	Tile[26].related = "[502] T01_I01.rmd,[433]chobozone.rmd,[152]T01_D01_B01.rmd,[412]T01_D01_B02.rmd,[413]T01_D01_B03.rmd,[447]T01_D01_B04.rmd,[424]T01_D03_B01.rmd,[463]T01_D01_B04_.rmd,[461]T01_D04_B01.rmd,[462]T01_D05_B01.rmd,expansion\\[ruins_of_oldcastle]000.rmd";
	Tile[27].related = "[133]G09_C01_F01.rmd,expansion\\[cave_of_bloodogre]000.rmd";
	Tile[28].related = "[282]M07_C01_B01.rmd,expansion\\[Bachel_Lizard_cave]000.rmd";
	Tile[29].related = "[283]M05_C01_B01.rmd,[284]M05_C02_B01.rmd,[285]M05_C02_B02.rmd,[286]M05_C03_B01.rmd,[287]M05_C03_B02.rmd,[288]M05_C03_B03.rmd,[289]M05_C03_B04.rmd,[290]M05_C03_B05.rmd,[291]M05_C03_B06.rmd,[292]M05_D01_B01.rmd,[293]M05_D01_B02.rmd,[294]M05_D01_B03.rmd,expansion\\[Hilander_cave]000.rmd,expansion\\[miznacave_hide]000.rmd,expansion\\[demon_king]000.rmd";

	Tile[30] = { x: 292, y: 193, wi: 29, hi: 30, isTown: false, name: "東プラトン街道 / イースタンブリッジ付近", path: "[016]G16.rmd", related: "" };
	Tile[31] = { x: 285, y: 171, wi: 36, hi: 21, isTown: false, name: "バヘル台地 / 丸太いかだ丘", path: "[132]G14.rmd", related: "" };
	Tile[32] = { x: 322, y: 171, wi: 29, hi: 30, isTown: false, name: "東プラトン街道 / 道の中間地点", path: "[029]G15.rmd", related: "" };
	Tile[33] = { x: 337, y: 141, wi: 28, hi: 29, isTown: false, name: "バヘル台地 / エルベルグ山脈西部地域", path: "[131]G10.rmd", related: "" };
	Tile[34] = { x: 366, y: 141, wi: 17, hi: 29, isTown: false, name: "エルベルグ山脈 / ハノブ西部地域", path: "[031]M12.rmd", related: "" };
	Tile[35] = { x: 384, y: 153, wi: 16, hi: 17, isTown: true, name: "鉱山町ハノブ", path: "[036]T06.rmd", related: "" };
	Tile[36] = { x: 412, y: 88, wi: 60, hi: 30, isTown: false, name: "タトバ山", path: "[206]M09.rmd", related: "" };
	Tile[37] = { x: 412, y: 119, wi: 45, hi: 20, isTown: false, name: "ヘムクロス高原 / アラク湖付近", path: "[205]M10.rmd", related: "" };
	Tile[38] = { x: 406, y: 140, wi: 14, hi: 14, isTown: true, name: "魔法都市スマグ", path: "[214]T11.rmd", related: "" };
	Tile[39] = { x: 421, y: 140, wi: 36, hi: 30, isTown: false, name: "ヘムクロス高原 / 高原南部地域", path: "[204]M14.rmd", related: "" };

	Tile[30].related = "[017]G16_D01_B01.rmd,[018]G16_D02_B01.rmd,[019]G16_D02_B02.rmd,[020]G16_D02_B03.rmd,[114]G16_D02_B04.rmd,[021]G16_D03_B01.rmd,[022]G16_D03_B02.rmd,[023]G16_D03_B03.rmd,expansion\\[well_of_hide]000.rmd,expansion\\[secret_fortress]000.rmd,expansion\\[alphas_hide_jail]000.rmd";
	Tile[31].related = "";
	Tile[32].related = "[032]G15_D01_F01.rmd,[054]G15_D01_F02.rmd,[033]G15_D01_B01.rmd,[034]G15_D01_B02.rmd,[035]G15_D01_B03.rmd,expansion\\[robber_hideway]000.rmd";
	Tile[33].related = "";
	Tile[34].related = "[037]M12_M01_B01.rmd,[038]M12_M01_B02.rmd,[039]M12_M01_B03.rmd,[040]M12_M01_B04.rmd,[041]M12_M01_B05.rmd,[042]M12_M01_B06.rmd,[043]M12_M01_B07.rmd,[044]M12_M01_B08.rmd,[045]M12_M01_B09.rmd,[046]M12_M01_B10.rmd,[209]M12_M02_B1.rmd,[210]M12_M02_B2.rmd,expansion\\[ruin_goldmine]000.rmd";
	Tile[35].related = "[063]T06_M01_B01.rmd,[064]T06_M01_B02.rmd,[065]T06_M01_B03.rmd,[066]T06_M01_B04.rmd,[067]T06_M01_B05.rmd,[119]T06_M02_F1.rmd,[120]T06_M02_F2.rmd,[121]T06_M02_F3.rmd,expansion\\[ironmine_hide]000.rmd,expansion\\[mythrimine_hide]000.rmd";
	Tile[36].related = "[491]M09_H01_F01.rmd,[207]M80.rmd,[208]M80_D01_F1.rmd,[211]M09_M01_B1.rmd,expansion\\[mine_of_tatba]000.rmd";
	Tile[37].related = "[232]M10_S01_F01.rmd,[233]M10_S01_F02.rmd,[234]M10_S01_F03.rmd,[235]M10_S01_F04.rmd,[236]M10_S01_F05.rmd,[237]M10_S01_F06.rmd,[238]M10_S01_F07.rmd,[239]M10_S01_F08.rmd,[240]M10_S01_F09.rmd,[241]M10_S01_F10.rmd,[242]M10_S01_F11.rmd,[243]M10_S01_F12.rmd,[244]M10_S01_F13.rmd,[245]M10_S01_F14.rmd,[246]M10_S01_F15.rmd,[247]M10_S01_F16.rmd,[248]M10_S01_F17.rmd,[249]M10_S01_F18.rmd,[250]M10_S01_F19.rmd,[258]M10_S01_F20.rmd,[231]M10_S01_B01.rmd,[230]M10_S01_B02.rmd,[229]M10_S01_B03.rmd,[228]M10_S01_B04.rmd,[227]M10_S01_B05.rmd,[226]M10_S01_B06.rmd,[225]M10_S01_B07.rmd,[224]M10_S01_B08.rmd,[223]M10_S01_B09.rmd,[222]M10_S01_B10.rmd,[221]M10_S01_B11.rmd,[220]M10_S01_B12.rmd,[219]M10_S01_B13.rmd,[212]M10_C01_B01.rmd,[213]M10_D01_B01.rmd,[464]M10_H01_F01.rmd,expansion\\[supernatural]000.rmd,expansion\\[swebtower]000.rmd";
	Tile[38].related = "[215]T11_D01_B01.rmd,[216]T11_D01_B02.rmd,[217]T11_D01_B03.rmd,[218]T11_D01_B04.rmd,expansion\\[smug_under]000.rmd";
	Tile[39].related = "";

	Tile[40] = { x: 458, y: 119, wi: 60, hi: 60, isTown: false, name: "ハンヒ山脈 / ドレム川付近", path: "[259]M11.rmd", related: "" };
	Tile[41] = { x: 352, y: 171, wi: 45, hi: 60, isTown: false, name: "東プラトン街道 / エルベルグ山脈 峠", path: "[030]M19.rmd", related: "" };
	Tile[42] = { x: 398, y: 171, wi: 59, hi: 45, isTown: false, name: "鉄の道 / ハノブ入口付近", path: "[068]G24.rmd", related: "" };
	Tile[43] = { x: 414, y: 217, wi: 60, hi: 38, isTown: false, name: "鉄の道 / 道の中間地点", path: "[069]G26.rmd", related: "" };
	Tile[44] = { x: 446, y: 256, wi: 45, hi: 19, isTown: false, name: "鉄の道 / アウグスタ入口付近", path: "[070]G27.rmd", related: "" };
	Tile[45] = { x: 475, y: 276, wi: 24, hi: 24, isTown: true, name: "神聖都市アウグスタ", path: "[071]T03.rmd", related: "" };
	Tile[46] = { x: 452, y: 301, wi: 51, hi: 30, isTown: false, name: "テンドペンド平原 / ブンド川", path: "[072]G29.rmd", related: "" };
	Tile[47] = { x: 532, y: 242, wi: 33, hi: 33, isTown: false, name: "スパインビーチ", path: "[302]D16.rmd", related: "" };
	Tile[48] = { x: 557, y: 276, wi: 55, hi: 53, isTown: false, name: "オロイン森", path: "[300]G28.rmd", related: "" };
	Tile[49] = { x: 504, y: 321, wi: 9, hi: 10, isTown: true, name: "ロマ村 ビスル", path: "[340]T16.rmd", related: "" };

	Tile[40].related = "[999]Guild_vs_09.rmd,[269]P01_H01_F01.rmd,[270]P01_H02_B01.rmd,[271]P01_H02_F01.rmd,[272]P01_H02_F02.rmd,[273]P01_H03_F01.rmd,[274]P01_H03_F02.rmd,[275]P01_H04_F01.rmd,[276]P01_H04_F02.rmd,[277]P01_H05_F01.rmd,[260]M11_C01_B01.rmd,[261]M11_C01_B02.rmd,[262]M11_C01_B03.rmd,[263]M11_C02_B01.rmd,[264]M11_C02_B02.rmd,[265]M11_C03_B01.rmd,[266]M11_C04_B01.rmd,[267]M11_C04_B02.rmd,expansion\\[hagu_treasure]000.rmd,expansion\\[Cave_La]000.rmd";
	Tile[41].related = "[047]M19_C01_B01.rmd,[048]M19_C01_B02.rmd,[049]M19_C01_B03.rmd,[050]M19_C01_B04.rmd,[051]M19_C01_B05.rmd,[052]M19_C01_B06.rmd,[053]M19_C01_B07.rmd,[055]M19_D01_F01.rmd,[056]M19_D01_F02.rmd,[057]M19_D01_B01.rmd,[058]M19_D01_B02.rmd,[059]M19_D01_B03.rmd,expansion\\[hanov_pillow_hide]000.rmd";
	Tile[42].related = "[096]G24_H01_F01.rmd,[097]G24_H01_F02.rmd,[098]G24_H01_B01.rmd,[099]G24_H01_B02.rmd,[100]G24_H01_B03.rmd,expansion\\[hanov_stower]000.rmd";
	Tile[43].related = "[075]G26_G01.rmd,[093]G26_C01.rmd,[115]G26_D01.rmd";
	Tile[44].related = "[101]G27_H01_F01.rmd,[102]G27_H01_B01.rmd,[103]G27_H01_B02.rmd,[104]G27_H01_B03.rmd,expansion\\[drug_laboratory]000.rmd";
	Tile[45].related = "[495]T03_C01_B01.rmd,";
	Tile[46].related = "";
	Tile[47].related = "[303]D16_C01_B01.rmd,[304]D16_C02_B01.rmd,[305]D16_C03_B01.rmd,[306]D16_C04_B01.rmd,[307]D16_C05_B01.rmd,[308]D16_C06_B01.rmd,[309]D16_C07_B01.rmd,[321]D16_C08_B01.rmd,expansion\\[mysteryarea_of_Spain hall]000.rmd";
	Tile[48].related = "[301]G28_C01_B01.rmd,[517]G28_G01_D01.rmd,[518]G28_G01_D02.rmd,[519]G28_G01_D03.rmd,[520]G28_G01_D04.rmd";
	Tile[49].related = "";

	Tile[50] = { x: 514, y: 321, wi: 42, hi: 47, isTown: false, name: "ソゴム山脈赤山", path: "[281]M24.rmd", related: "" };
	Tile[51] = { x: 557, y: 352, wi: 18, hi: 16, isTown: true, name: "大きな町 バリアート", path: "[310]T12.rmd", related: "" };
	Tile[52] = { x: 576, y: 352, wi: 30, hi: 46, isTown: false, name: "オカー三角州", path: "[317]S24.rmd", related: "" };
	Tile[53] = { x: 452, y: 332, wi: 61, hi: 36, isTown: false, name: "テンドペンド平原 / トワイライト滝付近", path: "[127]G31.rmd", related: "" };
	Tile[54] = { x: 487, y: 369, wi: 56, hi: 40, isTown: false, name: "半島の海辺", path: "[280]D17.rmd", related: "" };
	Tile[55] = { x: 440, y: 369, wi: 46, hi: 40, isTown: false, name: "ルリリバー / 川河口", path: "[128]G32.rmd", related: "" };
	Tile[56] = { x: 421, y: 369, wi: 18, hi: 18, isTown: true, name: "港街ブリッジヘッド", path: "[074]T04.rmd", related: "" };
	Tile[57] = { x: 397, y: 313, wi: 54, hi: 55, isTown: false, name: "テンドペンド平原 / ブリッジヘッド北部地域", path: "[073]G30.rmd", related: "" };
	Tile[58] = { x: 347, y: 240, wi: 15, hi: 15, isTown: true, name: "農村ガリムト", path: "[451]T13.rmd", related: "" };
	Tile[59] = { x: 350, y: 256, wi: 42, hi: 52, isTown: false, name: "ミルトリムの道 / シュトラセラト入口付近", path: "[444]S22.rmd", related: "" };

	Tile[50].related = "[295]M81.rmd,expansion\\[nest_of_ifrit]000.rmd";
	Tile[51].related = "";
	Tile[52].related = "[493]S24_C02_B01.rmd,[494]S24_C02_B02.rmd,[318]S24_C01_B01.rmd,[319]S24_C01_B02.rmd,[320]S24_C01_B03.rmd,expansion\\[cave_of_Hesopar]000.rmd";
	Tile[53].related = "[134]G31_D01_F01.rmd,[135]G31_C01_F01.rmd,[136]G31_C01_B01.rmd,[137]G31_C01_B02.rmd,[138]G31_C01_B03.rmd,[139]G31_C01_B04.rmd,[140]G31_C01_B05.rmd,[141]G31_C01_B06.rmd,[142]G31_C02_F01.rmd,[143]G31_C02_B01.rmd,[144]G31_C02_B02.rmd,[145]G31_C02_B03.rmd,[146]G31_C02_B04.rmd,[147]G31_C02_B05.rmd,[148]G31_C02_B06.rmd,[149]G31_C02_B07.rmd,[150]G31_C02_B08.rmd,expansion\\[twilight_waterfall]000.rmd,expansion\\[salty_cave]000.rmd,expansion\\[queen]000.rmd,expansion\\[confession]000.rmd";
	Tile[54].related = "[296]D17_C01_B01.rmd,[297]D17_C01_B02.rmd,[298]D17_C01_B03.rmd,[299]D17_C01_B04.rmd,[513]D17_H01_B1.rmd,[514]D17_H01_B2.rmd,[515]D17_H01_B3.rmd,[516]D17_H01_B4.rmd,expansion\\[nest_of_kingcrab]000.rmd";
	Tile[55].related = "";
	Tile[56].related = "[105]T04_H01_F01.rmd,[106]T04_H01_B01.rmd,[107]T04_H02_F01.rmd,[108]T04_H02_B01.rmd,[109]T04_H02_B02.rmd,[110]T04_H03_F01.rmd,[111]T04_H03_B01.rmd,[112]T04_H03_B02.rmd,[113]T04_H03_B03.rmd,[416]T04_H04_F01.rmd,[417]T04_H04_F02.rmd,expansion\\[theif_warehouse_hide]000.rmd";
	Tile[57].related = "[122]G30_C01_F01.rmd,[123]G30_H01_F01.rmd,[124]G30_H01_B01.rmd,[125]G30_H01_B02.rmd,[126]G30_H01_B03.rmd,[151]G30_H01_B04.rmd";
	Tile[58].related = "[387]S09_G01_F01.rmd,[388]G23_G01_F01.rmd,[389]T13_G01_F01.rmd,[390]M17_G01_F01.rmd,[391]G21_G01_F01.rmd,[472]G21_G02_F01.rmd,[473]G21_G03_F01.rmd,[474]G21_G04_F01.rmd,expansion\\[vampirekingdom]000.rmd";
	Tile[59].related = "[497]S22_C01_B01.rmd,[498]S22_C01_B02.rmd,[449]blanka.rmd";

	Tile[60] = { x: 350, y: 309, wi: 20, hi: 20, isTown: true, name: "港街シュトラセラト", path: "[375]T05.rmd", related: "" }
	Tile[61] = { x: 300, y: 291, wi: 49, hi: 38, isTown: false, name: "南フォーリンロード / シュトラセラト西部地域", path: "[367]G23.rmd", related: "" }
	Tile[62] = { x: 292, y: 254, wi: 29, hi: 36, isTown: false, name: "南フォーリンロード / エルン山南部地域", path: "[372]S09.rmd", related: "" }
	Tile[63] = { x: 292, y: 224, wi: 29, hi: 29, isTown: false, name: "エルベルグ山脈 / エルン山", path: "[450]M17.rmd", related: "" }
	Tile[64] = { x: 267, y: 218, wi: 24, hi: 23, isTown: false, name: "ギルディル川 / ナス橋付近", path: "[024]G19.rmd", related: "" }
	Tile[65] = { x: 267, y: 242, wi: 24, hi: 23, isTown: false, name: "エルベルグ山脈 / テレット・トンネル付近", path: "[368]M16.rmd", related: "" }
	Tile[66] = { x: 267, y: 266, wi: 24, hi: 24, isTown: false, name: "南フォーリンロード / テレット・トンネル出口付近", path: "[371]S08.rmd", related: "" }
	Tile[67] = { x: 237, y: 266, wi: 29, hi: 50, isTown: false, name: "北フォーリンロード / 西リットリン半島", path: "[370]S07.rmd", related: "" }
	Tile[68] = { x: 201, y: 242, wi: 35, hi: 34, isTown: false, name: "北フォーリンロード / ネイダック平原地帯", path: "[369]S04.rmd", related: "" }
	Tile[69] = { x: 162, y: 242, wi: 38, hi: 34, isTown: false, name: "北フォーリンロード / ビガプール南部地域", path: "[366]G20.rmd", related: "" }

	Tile[60].related = "";
	Tile[61].related = "[387]S09_G01_F01.rmd,[388]G23_G01_F01.rmd,[389]T13_G01_F01.rmd,[390]M17_G01_F01.rmd,[391]G21_G01_F01.rmd,[472]G21_G02_F01.rmd,[473]G21_G03_F01.rmd,[474]G21_G04_F01.rmd,[448]cabin.rmd,expansion\\[vampirekingdom]000.rmd";
	Tile[62].related = "[387]S09_G01_F01.rmd,[388]G23_G01_F01.rmd,[389]T13_G01_F01.rmd,[390]M17_G01_F01.rmd,[391]G21_G01_F01.rmd,[472]G21_G02_F01.rmd,[473]G21_G03_F01.rmd,[474]G21_G04_F01.rmd,[409]S09_C01_B01.rmd,expansion\\[vampirekingdom]000.rmd";
	Tile[63].related = "[387]S09_G01_F01.rmd,[388]G23_G01_F01.rmd,[389]T13_G01_F01.rmd,[390]M17_G01_F01.rmd,[391]G21_G01_F01.rmd,[472]G21_G02_F01.rmd,[473]G21_G03_F01.rmd,[474]G21_G04_F01.rmd,[504]M29.rmd,[441]M17_C01_F05.rmd,expansion\\[arch_devil]000.rmd,expansion\\[vampirekingdom]000.rmd";
	Tile[64].related = "[025]G19_C01_B01.rmd,[026]G19_C01_B02.rmd,expansion\\[poisonbug_hive]000.rmd";
	Tile[65].related = "[401]M16_C01_F01.rmd,[402]M16_C01_B01.rmd,[403]M16_C02_F01.rmd,expansion\\[Tellet]000.rmd";
	Tile[66].related = "";
	Tile[67].related = "";
	Tile[68].related = "[385]S04_D01_B01.rmd,expansion\\[porin_oubliette]000.rmd";
	Tile[69].related = "[414]G20_D01_B01.rmd,[415]G20_D01_B02.rmd";

	Tile[70] = { x: 162, y: 277, wi: 38, hi: 36, isTown: false, name: "ネイダック平原 / ラカリフサ北部地域", path: "[439]S05.rmd", related: "" }
	Tile[71] = { x: 162, y: 314, wi: 20, hi: 42, isTown: false, name: "ゴリマ沼地", path: "[437]S15.rmd", related: "" }
	Tile[72] = { x: 183, y: 314, wi: 17, hi: 17, isTown: true, name: "農村ラカリフサ", path: "[443]T15.rmd", related: "" }
	Tile[73] = { x: 402, y: 434, wi: 17, hi: 17, isTown: true, name: "港町ボルティッシュ", path: "[480]T19.rmd", related: "" }
	Tile[74] = { x: 370, y: 452, wi: 49, hi: 41, isTown: false, name: "幻影の谷 / シトロンリバー上流", path: "[486]M27.rmd", related: "" }
	Tile[75] = { x: 327, y: 452, wi: 42, hi: 41, isTown: false, name: "幻影の谷 / ブラックファイヤーダンジョン付近", path: "[487]M26.rmd", related: "" }

	Tile[70].related = "[492]S05_D01_B01.rmd,";
	Tile[71].related = "[469]S15_D01_B01.rmd,[470]S15_D01_B02.rmd";
	Tile[72].related = "";
	Tile[73].related = "";
	Tile[74].related = "";
	Tile[75].related = "[488]BF_01.rmd,[489]otherplace_01.rmd,[490]BF_02.rmd,[506]BF_U01.rmd,[507]BF_C01.rmd,[735]BF_U02.rmd,[736]BF_D01.rmd,[737]BF_U03.rmd,[738]BF_U04.rmd,[739]BF_D02.rmd,[740]BF_U05.rmd,[741]BF_U06.rmd,[742]BF_U07.rmd";


	WorldMapExp01 = "[801]GvG_standby_0.rmd,[900]Duel_standby_0.rmd,expansion\\[GPB]000.rmd,expansion\\[GPB]001.rmd,expansion\\[GPB]002.rmd,expansion\\[GPB]003.rmd,expansion\\[GPB]004.rmd,[995]Guild_vs_05.rmd,[996]Guild_vs_06.rmd,[997]Guild_vs_07.rmd,[998]Guild_vs_08.rmd,[999]Guild_vs_09.rmd,[912]GB_LV02.rmd,[932]GB_LV03.rmd,[939]GB_LV04.rmd,[941]GB_LV05.rmd";
	WorldMapExp02 = "expansion\\[tantilless]000.rmd,expansion\\[tantillessB1]000.rmd,expansion\\[tantillessB2]000.rmd,expansion\\[tantillessB3]000.rmd,expansion\\[tantillessB4]000.rmd,expansion\\[tantillessB5]000.rmd,expansion\\[tantillessB6]000.rmd,expansion\\[tantillessB7]000.rmd,expansion\\[tantillessB8]000.rmd,expansion\\[tantillessB9]000.rmd,expansion\\[Trial_P]000.rmd,expansion\\[Trial_S]000.rmd";


	function Initialize() {
		$("#hWorldMap").bind("click", function() {
			$("#WorldMap").show();
			$("#MapList").hide();
			$("#Search").hide();
			$("#Help").hide();
			$("#hWorldMap").addClass("Selected");
			$("#hMapList").removeClass("Selected");
			$("#hSearch").removeClass("Selected");
			$("#hHelp").removeClass("Selected");
		}).addClass("Selected");
		$("#hMapList").bind("click", function() {
			$("#WorldMap").hide();
			$("#MapList").show();
			$("#Search").hide();
			$("#Help").hide();
			$("#hWorldMap").removeClass("Selected");
			$("#hMapList").addClass("Selected");
			$("#hSearch").removeClass("Selected");
			$("#hHelp").removeClass("Selected");
		});
		$("#hSearch").bind("click", function() {
			$("#WorldMap").hide();
			$("#MapList").hide();
			$("#Search").show();
			$("#Help").hide();
			$("#hWorldMap").removeClass("Selected");
			$("#hMapList").removeClass("Selected");
			$("#hSearch").addClass("Selected");
			$("#hHelp").removeClass("Selected");
		});
		$("#hHelp").bind("click", function () {
		    $("#WorldMap").hide();
		    $("#MapList").hide();
		    $("#Search").hide();
		    $("#Help").show();
		    $("#hWorldMap").removeClass("Selected");
		    $("#hMapList").removeClass("Selected");
		    $("#hSearch").removeClass("Selected");
		    $("#hHelp").addClass("Selected");
		});

		$("#bSearch").bind("click", function() {
			var keyword = $("#input-search").val();
			var result = SearchKeyWord(keyword);
			CreateSearchResult(result, keyword);
			$("#WorldMap").hide();
			$("#MapList").hide();
			$("#Search").show();
			$("#Help").hide();
			$("#hWorldMap").removeClass("Selected");
			$("#hMapList").removeClass("Selected");
			$("#hSearch").addClass("Selected");
			$("#hHelp").removeClass("Selected");
		});
		$("#input-search").bind("keydown", function(e) {
			if (e.keyCode == 13) {
				var keyword = $("#input-search").val();
				var result = SearchKeyWord(keyword);
				CreateSearchResult(result, keyword);
				$("#WorldMap").hide();
				$("#MapList").hide();
				$("#Search").show();
				$("#Help").hide();
				$("#hWorldMap").removeClass("Selected");
				$("#hMapList").removeClass("Selected");
				$("#hSearch").addClass("Selected");
				$("#hHelp").removeClass("Selected");
			}
		});
		

		$("#WorldMap").show();
		$("#MapList").hide();
		$("#Search").hide();
		$("#Help").hide();
	}

	function InitializeWorldMapTile() {
		var Target = $("#WorldMap #tileAll");
		for (var i = 0; i < Tile.length; i++) {
		    var TileWrapper = $("<div/>");
		    var Tilediv = $("<div/>");
		    var mapName = HashAllMap[Tile[i].path];
			
			Tilediv.addClass("tile").css({
			    "width": Tile[i].wi + "px",
			    "height": Tile[i].hi + "px"
			});
			if(Tile[i].isTown){
				Tilediv.addClass("Town");
			}

			TileWrapper.css({
			    "left": Tile[i].x + "px",
			    "top": Tile[i].y + "px"
			}).attr({
			    "title": mapName,
				"data-tindex": i
			}).addClass("tileWrapper");

			TileWrapper.append(Tilediv);

			TileWrapper.bind("click", function () {
			    if ($(this).find(".tooltip").length) {
			        $(this).css("z-index", "");
			        $(this).find(".tooltip").remove();
			    }
			    else {
			        $(".tooltip").remove();
			        CreateToolTip($(this));
			    }
			});
			Target.append(TileWrapper);
		}
	}

	function InitializeWorldMapExp() {
	    var Exp01Body = $("#exp01");
	    var Exp01 = WorldMapExp01.split(',');
	    for (var i = 0; i < Exp01.length; i++) {
	        var List = $("<div/>");
	        var link = Exp01[i];
	        var mapName = HashAllMap[link];
	        List.text("- ").append($("<a/>").attr("href", "MapDataBase.html?Map=" + link).text(mapName));
	        List.addClass("mapList");
	        Exp01Body.append(List);
	    }

	    var Exp02Body = $("#exp02");
	    var Exp02 = WorldMapExp02.split(',');
	    for (var i = 0; i < Exp02.length; i++) {
	        var List = $("<div/>");
	        var link = Exp02[i];
	        var mapName = HashAllMap[link];
	        List.text("- ").append($("<a/>").attr("href", "MapDataBase.html?Map=" + link).text(mapName));
	        List.addClass("mapList");
	        Exp02Body.append(List);
	    }
	}
	
	function InitializeMapName(data) {
		var TextObj = data;
		var Sentence = TextObj.split('\n');
    	for(var i = 0; i < Sentence.length; i++) {
   			var Word = Sentence[i].split(',');
			if(Word.length){
				HashAllMap.push(Word[0]);
				HashAllMap[Word[0]] = Word[1];
			}
    	}
	}

	function InitializeList() {
		var ListBody = $("#MapList");
		for(var i = 0; i < HashAllMap.length; i++) {
			var List = $("<div/>");
			var link = HashAllMap[i];
			var mapName = HashAllMap[link];
			List.text("- ").append($("<a/>").attr("href", "MapDataBase.html?Map=" + link).text(mapName));
			List.addClass("mapList");
			ListBody.append(List);
		}
	}

	function SearchKeyWord (keyword) {
		var Match = [];
		if(typeof keyword !== "undefined" && keyword != "") {
			for(var i = 0; i < HashAllMap.length; i++) {
				var hash = HashAllMap[HashAllMap[i]];
				if(typeof hash !== "undefined") {
					if(hash.match(keyword) != null) {
						Match.push(HashAllMap[i]);
					}
				}
			}
		}
		return Match;
	}

	function CreateSearchResult (result, keyword) {
		var ListBody = $("#Search");
		ListBody.empty();
		ListBody.append($("<h1/>").text("■マップ検索"));
		ListBody.append($("<h2/>").text("\"" + keyword + "\"の検索結果 " + result.length + " 件の該当がありました。"));
		for(var i = 0; i < result.length; i++) {
			var List = $("<div/>");
			var link = result[i];
			var mapName = HashAllMap[link];
			List.text("- ").append($("<a/>").attr("href", "MapDataBase.html?Map=" + link).text(mapName));
			List.addClass("mapList");
			ListBody.append(List);
		}		
	}

    /*private*/
    function CreateToolTip(elm) {
        var tooltip = $("<div/>");
        var body;
        var tail = $("<div/>");

		body = Create_ToolTipBody(elm);

        if (typeof body !== "undefined") {
            body.addClass("body");
            tail.addClass("tail");
            tooltip.append(tail);
            tooltip.append(body);
            $(elm).append(tooltip.addClass("tooltip"));

            var tipWidth_Mov = $(elm).width() + 10;
            var tipHeight_Mov = ($(elm).height() / 2) - ($(tooltip).height() / 2);
            var tailWidth_Mov = $(tooltip).width() / 2;
            var tailHeight_Mov = $(tooltip).height() / 2;
            var revision_X = 0;
            var revision_Y = 0;

            if (tipHeight_Mov < -20) {
                revision_Y = 20 + tipHeight_Mov;
            }

            //if(($(elm).offset().left - tipWidth_Mov) < 0 ){
            //    revision_X = (tipWidth_Mov - $(elm).offset().left) + 10;
            //    revision_X -= $("body").scrollLeft();
            //}
            //if (($(elm).offset().top - tipHeight_Mov) < 0) {
            //    revision_Y = (tipHeight_Mov - $(elm).offset().top) + 10;
            //    revision_Y += $("body").scrolltop();
            //}

            tooltip.css({
                "top": tipHeight_Mov - revision_Y + "px",
                "left": tipWidth_Mov + revision_X + "px"
            });
            tail.css("top", tailHeight_Mov - 4 + revision_Y + "px");
        }
    }

    /*private*/
    function Create_ToolTipBody(elm) {
        var body = $("<div/>");

		var TileIndex = $(elm).data("tindex");

		var h1 = $("<h1/>");
		var span = $("<span/>");
		var mapName = HashAllMap[Tile[TileIndex].path];
		var link = Tile[TileIndex].path;
		span.append($("<a/>").attr("href", "MapDataBase.html?Map=" + link).text(mapName));
		h1.text("■").append(span);
		
		body.append(h1);
		
		if (Tile[TileIndex].related.match(",")) {
		    body.append($("<h2/>").text("関連MAP情報"));

		    var Related = Tile[TileIndex].related.split(',');
		    for (var i = 0; i < Related.length; i++) {
		        var RelatedLink = HashAllMap[Related[i]];
		        if (typeof RelatedLink !== "undefined") {
		            if (Related[i].match("expansion")) {
		                body.append($("<div/>").text("- ").append($("<a/>").attr({
		                    "href": "MapDataBase.html?Map=" + Related[i],
		                    "title": RelatedLink
		                }).text(RelatedLink + " (秘密)")));
		            }
		            else {
		                body.append($("<div/>").text("- ").append($("<a/>").attr({
		                    "href": "MapDataBase.html?Map=" + Related[i],
		                    "title": RelatedLink
		                }).text(RelatedLink)));
		            }
		        }
		    }
		}
        return body;
    }



    Object.defineProperties(MapDataBaseIndex, {
        Initialize: { value: Initialize, writable: true, enumerable: true, configurable: true },
        InitializeWorldMapTile: { value: InitializeWorldMapTile, writable: true, enumerable: true, configurable: true },
        InitializeWorldMapExp: { value: InitializeWorldMapExp, writable: true, enumerable: true, configurable: true },
        InitializeMapName: { value: InitializeMapName, writable: true, enumerable: true, configurable: true },
        InitializeList: { value: InitializeList, writable: true, enumerable: true, configurable: true },
        SearchKeyWord: { value: SearchKeyWord, writable: true, enumerable: true, configurable: true },
    });

})(Yotsuba.MapDataBaseIndex);


(function () {
	"use strict";

	var urlMapNameFile = "MapFileDefine.txt";

    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: urlMapNameFile,
            dataType: "text",
            success: function (result) {
				Yotsuba.MapDataBaseIndex.Initialize();			
				Yotsuba.MapDataBaseIndex.InitializeMapName(result);
				Yotsuba.MapDataBaseIndex.InitializeWorldMapTile();
				Yotsuba.MapDataBaseIndex.InitializeWorldMapExp();
				Yotsuba.MapDataBaseIndex.InitializeList();
            },
            error: function (result) {
                alert("データの読み込みに問題が発生しました。");
            }
        });
	});

})();