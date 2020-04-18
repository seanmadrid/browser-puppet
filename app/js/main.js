var ElementCursor = {
    cursorElement: "",
    setCursor: function (cursorId) {
        $('html').css({
            'cursor': 'none',
        });
        ElementCursor.cursorElement = cursorId;
        ElementCursor.updateCursor();
    },
    removeCursor: function () {
        $('html').css({
            'cursor': ''
        });
        ElementCursor.cursorElement = '';
    },
    updateCursor: function () {
        $(document).mousemove(function (e) {

            $('#' + ElementCursor.cursorElement).css({
                'position': 'fixed',
                'user-select': 'none',
                'top': e.pageY + 2 + 'px',
                'left': e.pageX + 2 + 'px'
            });

            var halfWinX = $(window).width() / 2;
            var halfWinY = $(window).height() / 2;

            $('#' + ElementCursor.cursorElement).removeClass('screen-right').removeClass('screen-left').removeClass('screen-top').removeClass('screen-bottom');

            if(e.pageX >= halfWinX){
            	$('#' + ElementCursor.cursorElement).addClass('screen-right');
            }else{
            	$('#' + ElementCursor.cursorElement).addClass('screen-left');
            }

            if(e.pageY >= halfWinY){
            	$('#' + ElementCursor.cursorElement).addClass('screen-bottom');
            }else{
            	$('#' + ElementCursor.cursorElement).addClass('screen-top');
            }

        });
    }
};

var puppetId = 'shapeMachineBrowserPuppet53';

ElementCursor.setCursor(puppetId);

function puppetAction(action) {
	var classArray = ["fall", "run", "dance", "sit", "walk"];

	$(classArray).each(function(){
		var actionClass = "action-" + this;
		$('#' + puppetId).removeClass(actionClass);
	});

	$('#' + puppetId).addClass("action-" + action);

}

function puppetScale(operator) {

	var currentScale = parseFloat($('#' + puppetId).attr('data-scale'));
	var newScale;

	if(operator == "shrink") {
		if(currentScale >= .2) {
			newScale = currentScale - .1;
		}
	}

	if(operator == "grow") {
		if(currentScale <= 2.9) {
			newScale = currentScale + .1;
		}
	}

	$('#' + puppetId).attr('data-scale', newScale);

	$('#' + puppetId).css({
		transform: "scale(" + newScale + ")"
	});
}

$(document).on("keypress", function (e) {

	// 1 for Shrink
	if(e.keyCode == 49) {
		puppetScale('shrink');
	}

	// 2 for Grow
	if(e.keyCode == 50) {
		puppetScale('grow');
	}

	// F for Fall
    if (e.keyCode == 102) {
        puppetAction('fall');
    }

    // W for Walk
    if (e.keyCode == 119) {
    	puppetAction('walk');
    }

    // R for Run
    if (e.keyCode == 114) {
        puppetAction('run');
    }
    // D for Dance
    if (e.keyCode == 100) {
        puppetAction('dance');
    }
    // S for Sit
    if (e.keyCode == 115) {
        puppetAction('sit');
    }
    // X is for Stop
    if (e.keyCode == 120) {
        puppetAction('stop');
    }
});

