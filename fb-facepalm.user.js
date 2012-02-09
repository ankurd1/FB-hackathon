// ==UserScript==
//
// @name          FB-hackathon
// @include       *.facebook.com/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	//add facepalm button
	$(".like_link").after('<a class="facepalm_but" style="color:#6D84B4">&nbsp;Facepalm</a>');
	$(".facepalm_but").click(function () {
		alert("Please comment \"Facepalm!\" ;) ...");
	});
	//parse facepalms
	setInterval(function () {
		$('.facepalmnum').remove();
		$(".mainWrapper").each(function(index) {
			//$(this) is the mainWrapper here
			var facepalms = 0;
			$(".commentList .ufiItem", $(this)).each(function(i) {
				if ($(".commentBody", $(this)).text() == "Facepalm!") {
					$(this).hide();
					facepalms++;
				}
			});
			if (facepalms > 0) {
				$(".uiStreamFooter", $(this)).after('<ul class="facepalmnum uiUfi"><li class="ufiItem uiUfiUnseenItem"><img width="16px" src="http://www.jonrb.com/emoticons/facepalm.gif"></img>'+ facepalms + " people Facepalm'd this!</li></ul>");
			}
		});
	}, 1000);	
}

// load jQuery and execute the main function
addJQuery(main);