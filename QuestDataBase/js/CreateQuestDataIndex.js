
(function () {
    "use strict";

    var QuestHash = [];

    function Initialize(result) {
       
        var Target = $(result).find("Quest");

        for (var i = 0; i < Target.length; i++) {
            var id = $(Target[i]).attr("id");
            QuestHash.push(Target[i]);
            QuestHash[id] = Target[i];
        };

        $("#hQuestCategory").bind("click", function () {
            $("#QuestCategory").show();
            $("#QuestList").hide();
            $("#Search").hide();
            $("#Details").hide();
            $("#hQuestCategory").addClass("Selected");
            $("#hQuestList").removeClass("Selected");
            $("#hSearch").removeClass("Selected");
            $("#hDetails").removeClass("Selected");
        });
        $("#hQuestList").bind("click", function () {
            $("#QuestCategory").hide();
            $("#QuestList").show();
            $("#Search").hide();
            $("#Details").hide();
            $("#hQuestCategory").removeClass("Selected");
            $("#hQuestList").addClass("Selected");
            $("#hSearch").removeClass("Selected");
            $("#hDetails").removeClass("Selected");
        });
        $("#hSearch").bind("click", function () {
            $("#QuestCategory").hide();
            $("#QuestList").hide();
            $("#Search").show();
            $("#Details").hide();
            $("#hQuestCategory").removeClass("Selected");
            $("#hQuestList").removeClass("Selected");
            $("#hSearch").addClass("Selected");
            $("#hDetails").removeClass("Selected");
        });
        $("#hDetails").bind("click", function () {
            $("#QuestCategory").hide();
            $("#QuestList").hide();
            $("#Search").hide();
            $("#Details").show();
            $("#hQuestCategory").removeClass("Selected");
            $("#hQuestList").removeClass("Selected");
            $("#hSearch").removeClass("Selected");
            $("#hDetails").addClass("Selected");
        });

        $("#bSearch").bind("click", function () {
            var keyword = $("#input-search").val();
            var result = SearchKeyWord(keyword);
            CreateSearchResult(result, keyword);
            $("#QuestCategory").hide();
            $("#QuestList").hide();
            $("#Search").show();
            $("#Details").hide();
            $("#hQuestCategory").removeClass("Selected");
            $("#hQuestList").removeClass("Selected");
            $("#hSearch").addClass("Selected");
            $("#hDetails").removeClass("Selected");
        });
        $("#input-search").bind("keydown", function (e) {
            if (e.keyCode == 13) {
                var keyword = $("#input-search").val();
                var result = SearchKeyWord(keyword);
                CreateSearchResult(result, keyword);
                $("#QuestCategory").hide();
                $("#QuestList").hide();
                $("#Search").show();
                $("#Details").hide();
                $("#hQuestCategory").removeClass("Selected");
                $("#hQuestList").removeClass("Selected");
                $("#hSearch").addClass("Selected");
                $("#hDetails").removeClass("Selected");
            }
        });

        $("#hQuestCategory").addClass("Selected");

        $("#QuestCategory").show();
        $("#QuestList").hide();
        $("#Search").hide();
        $("#Details").hide();
    }

    function InitializeCategory() {
        var CategoryBody = [];

        CategoryBody.push($("#Category0"));
        CategoryBody.push($("#Category1"));
        CategoryBody.push($("#Category2"));
        CategoryBody.push($("#Category3"));
        CategoryBody.push($("#Category4"));
        CategoryBody.push($("#Category5"));

        for (var i = 0; i < QuestHash.length; i++) {
            var List = $("<div/>");
            var QuestName = $(QuestHash[i]).find("Title").text();
            var QuestId = $(QuestHash[i]).attr("id");
            var Category = $(QuestHash[i]).find("QuestCategory").text();
            var span = $("<span/>").text(QuestName).addClass("Qtext");
            span.attr("data-id", QuestId);
            span.bind("click", function () {
                var Id = $(this).data("id");
                CreateDetails(Id);

                $("#Details").show();
                $("#QuestCategory").hide();
                $("#QuestList").hide();
                $("#Search").hide();
                $("#hQuestCategory").removeClass("Selected");
                $("#hQuestList").removeClass("Selected");
                $("#hSearch").removeClass("Selected");
                $("#hDetails").addClass("Selected");

            });
            List.append($("<div/>").text("- ").append(span));
            List.addClass("mapList");
            $(CategoryBody[Category]).append(List);
        }

    }

    function InitializeQuestList() {
        var ListBody = $("#QuestList");

        for (var i = 0; i < QuestHash.length; i++) {
            var List = $("<div/>");
            var QuestName = $(QuestHash[i]).find("Title").text();
            var QuestId = $(QuestHash[i]).attr("id");
            var span = $("<span/>").text(QuestName).addClass("Qtext");
            span.attr("data-id", QuestId);
            span.bind("click", function () {
                var Id = $(this).data("id");
                CreateDetails(Id);

                $("#Details").show();
                $("#QuestCategory").hide();
                $("#QuestList").hide();
                $("#Search").hide();
                $("#hQuestCategory").removeClass("Selected");
                $("#hQuestList").removeClass("Selected");
                $("#hSearch").removeClass("Selected");
                $("#hDetails").addClass("Selected");

            });
            List.append($("<div/>").text("- ").append(span));
            List.addClass("mapList");
            ListBody.append(List);
        }
    }

    function SearchKeyWord(keyword) {
        var Match = [];
        if (typeof keyword !== "undefined" && keyword != "") {
            for (var i = 0; i < QuestHash.length; i++) {
                var title = $(QuestHash[i]).find("Title").text();
                if (typeof title !== "undefined") {
                    if (title.match(keyword) != null) {
                        Match.push(QuestHash[i]);
                    }
                }
            }
        }
        return Match;
    }

    function CreateSearchResult(result, keyword) {
        var ListBody = $("#Search");
        ListBody.empty();
        ListBody.append($("<h1/>").text("■マップ検索"));
        ListBody.append($("<h2/>").text("\"" + keyword + "\"の検索結果 " + result.length + " 件の該当がありました。"));
        for (var i = 0; i < result.length; i++) {
            var List = $("<div/>");
            var QuestName = $(result[i]).find("Title").text();
            var QuestId = $(result[i]).attr("id");
            var span = $("<span/>").text(QuestName).addClass("Qtext");
            span.attr("data-id", QuestId);
            span.bind("click", function () {
                var Id = $(this).data("id");
                CreateDetails(Id);

                $("#Details").show();
                $("#QuestCategory").hide();
                $("#QuestList").hide();
                $("#Search").hide();
                $("#hQuestCategory").removeClass("Selected");
                $("#hQuestList").removeClass("Selected");
                $("#hSearch").removeClass("Selected");
                $("#hDetails").addClass("Selected");

            });
            List.append($("<div/>").text("- ").append(span));
            List.addClass("mapList");
            ListBody.append(List);
        }
    }

    function CreateDetails(id) {

        var CreateSection = function (Section ,elmName) {
            var field = $(Section).find("field").text().replace("/\r\n|\n/", "<br />");
            var item = $(Section).find("item").text().replace("/\r\n|\n/", "<br />");
            var monster = $(Section).find("monster").text().replace("/\r\n|\n/", "<br />");
            var npc = $(Section).find("npc").text().replace("/\r\n|\n/", "<br />");
            var value = $(Section).find("value").text().replace("/\r\n|\n/", "<br />");
            var text = $(Section).find("text").text().replace("/\r\n|\n/", "<br />");

            if (field != "") { field += "<br />"; }
            if (item != "") { item += "<br />"; }
            if (monster != "") { monster += "<br />"; }
            if (npc != "") { npc += "<br />"; }
            //if (value != "") { value += "<br />"; }

            var Str1 = field + item + monster + npc + value;

            $("#" + elmName).html(Str1);
            $("#" + elmName + "-text").html("- " + text);

            if (Str1 == "" && text == "") {
                $("#" + elmName).hide();
                $("#" + elmName + "-text").hide();
            }
            else {
                $("#" + elmName).show();
                $("#" + elmName + "-text").show();
            }

        }

        var QuestTitle = $(QuestHash[id]).find("Title").text();
        var ClientNPCMap = $(QuestHash[id]).find("ClientNPCMap").text();
        var ClientNPC = $(QuestHash[id]).find("ClientNPC").text();
        var AcceptLV = $(QuestHash[id]).find("AcceptLV").text();
        var AcceptPeriod = $(QuestHash[id]).find("AcceptPeriod").text();
        var NPC = $(QuestHash[id]).find("NPC").text();

        $("#quest-id").text(id);
        $("#quest-title").text(QuestTitle);
        $("#client-NPC-Map").text(ClientNPCMap);
        $("#client-NPC").text(ClientNPC);
        $("#Accept-LV").text("Lv: " + AcceptLV);
        $("#Accept-Period").text(AcceptPeriod);

        for (var i = 1; i <= 6 ; i++) {
            var Section = $(QuestHash[id]).find("Section" + i);
            CreateSection(Section, "Section" + i);
        }
        
    }


    $(document).ready(function () {

        var FilePath = "QuestList.xml"

        $.ajax({
            type: "GET",
            url: FilePath,
            dataType: "xml",
            success: function (result) {
                Initialize(result);
                InitializeCategory();
                InitializeQuestList();
            },
            error: function (result) {
                alert("データの読み込みに問題が発生しました。");
            }
        });
    });

})();