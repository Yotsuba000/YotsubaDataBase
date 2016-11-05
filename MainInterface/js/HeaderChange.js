(function () {
    	$(document).ready(function () {
		var ImageMaxCount = 9;			//画像枚数
		var ImageNumber = Math.floor(Math.random() * ImageMaxCount);
		var Uri = "https://dl.dropbox.com/u/70568694/MainInterface/fab_title_bg_" + ImageNumber + ".png";
		
		if(ImageNumber != 0) {
			$("#header").bind("click", function () {
				location.href = "http://yotsubadiary3.blog.fc2.com/";
			});
			$("#header").bind("hover", function () {
				$("#header").css("cursor", "pointer");
			});
			$("#title > h1").hide();
		}

		$("#header").css("background-image", "url(" + Uri + ")" );
	});
})();