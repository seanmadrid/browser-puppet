var puppetMarkup = "<div id='shapeMachineBrowserPuppet53' class='smbrowserpuppet53' data-scale='1'> <div class='sm-puppet-container'> <div class='sm-puppet-head'> <div class='sm-puppet-eyes'> <div class='sm-puppet-eye sm-puppet-eye-left'></div><div class='sm-puppet-eye sm-puppet-eye-right'></div></div></div><div class='sm-puppet-torso'> <div class='sm-puppet-arm sm-puppet-arm-left'> <div class='sm-puppet-upper-arm'></div><div class='sm-puppet-forearm'> </div></div><div class='sm-puppet-arm sm-puppet-arm-right'> <div class='sm-puppet-upper-arm'></div><div class='sm-puppet-forearm'> </div></div></div><div class='sm-puppet-legs'> <div class='sm-puppet-leg-container'> <div class='sm-puppet-leg sm-puppet-leg-right'> <div class='sm-puppet-upper-leg'></div><div class='sm-puppet-lower-leg'> <div class='sm-puppet-foot'></div></div></div><div class='sm-puppet-leg sm-puppet-leg-left'> <div class='sm-puppet-upper-leg'></div><div class='sm-puppet-lower-leg'> <div class='sm-puppet-foot'></div></div></div></div></div></div></div>";

$(document).ready(function() {

    $('html').append(puppetMarkup);

    var puppet = $('#shapeMachineBrowserPuppet53');

    $(document).mousemove(function(e) {

        var elemHeight = $(puppet).find('.sm-puppet-container').height();

        if(e.pageX <= $(window).width() && e.pageY <= $(window).height()){
            puppet.css({
                'position': 'fixed',
                'user-select': 'none',
                'top': e.pageY + 2 + 'px',
                'left': e.pageX + 2 + 'px'
            });
        }

        var halfWinX = $(window).width() / 2;
        var halfWinY = $(window).height() / 2;

        $(puppet).removeClass('screen-right').removeClass('screen-left').removeClass('screen-top').removeClass('screen-bottom');

        if (e.pageX >= halfWinX) {
            $(puppet).addClass('screen-right');
        } else {
            $(puppet).addClass('screen-left');
        }

        if (e.pageY >= halfWinY) {
            $(puppet).addClass('screen-bottom');
        } else {
            $(puppet).addClass('screen-top');
        }

    });

    function puppetAction(action) {
        var classArray = ["fall", "run", "dance", "sit", "walk"];

        $(classArray).each(function() {
            var actionClass = "action-" + this;
            $(puppet).removeClass(actionClass);
        });

        $(puppet).addClass("action-" + action);

    }

    function puppetScale(operator) {

        var currentScale = parseFloat($(puppet).attr('data-scale'));
        var newScale;

        if (operator == "shrink") {
            if (currentScale >= .2) {
                newScale = currentScale - .1;
            }
        }

        if (operator == "grow") {
            if (currentScale <= 2.9) {
                newScale = currentScale + .1;
            }
        }

        $(puppet).attr('data-scale', newScale);

        $(puppet).css({
            transform: "scale(" + newScale + ")"
        });
    }

    $(document).on("keypress", function(e) {

        // 1 for Shrink
        if (e.keyCode == 49) {
            puppetScale('shrink');
        }

        // 2 for Grow
        if (e.keyCode == 50) {
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

});