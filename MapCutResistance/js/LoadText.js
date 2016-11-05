$(function() {
	$.ajax({
		type: 'GET',
		url: 'Map_PlayerCutRegstance.txt',
		dataType: "text",
		success: function(data) {
			$('#result_1').append(CreateData(data));
		},
		error:function() {
			alert('ファイルの読み込みに失敗しました。');
		}
	});

	$.ajax({
		type: 'GET',
		url: 'expansion_Map_PlayerCutRegstance.txt',
		dataType: "text",
		success: function(data) {
			$('#result_2').append(CreateData(data));
		},
		error:function() {
			alert('ファイルの読み込みに失敗しました。');
		}
	});	
	
	function CreateData(tData){
		var $table = $('<table />');
		var TextObj = tData;
		var Sentence = TextObj.split('\r\n');
    	for(var i = 0; i < Sentence.length; i++)
   		{
   			var $tr = $('<tr />');
   			var Word = Sentence[i].split('\t');
   			for(var j = 0; j < Word.length; j++)
   			{
   				if(j == (Word.length -1))
   				{
   					var $td = $('<th />').append(Word[j]);
   				}
   				else
   				{
   					var $td = $('<td />').append(Word[j]);
   				}
   				if(i == 0)
   				{ 
   					$td.css({
   						"font-weight": "bold",
   						"background-color": "#eeff00"
   					});
   				}
   				if(i != 0 && j != (Word.length -1))
   				{
   					if(Word[j] != "0")
   					{
	   					$tr.css({
	   						"background-color": "#c0c0ff"
	   					});	
   					}
   				}
   				$tr.append($td);
    		}
    		$table.append($tr);
    	}
    	$table.addClass('table-01');
    	return $table;
	}
	
});