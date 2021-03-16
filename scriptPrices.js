$(document).ready(function () {

    // Change color menu, check if it's scorlled, if it is, change color
    $(window).scroll(function () {
        const heightHeader = $(".prices").height();
        let docScroll = $(document).scrollTop();

        if (docScroll > heightHeader - 40) {
            $(".headerMenuDrop ul.mobileSubMenu").removeClass("colorChange1").addClass("colorChange2");
            $(".menuButton").removeClass("buttonColor1").addClass("buttonColor2");
        }
        else {
            $(".headerMenuDrop ul.mobileSubMenu").removeClass("colorChange2").addClass("colorChange1");
            $(".menuButton").removeClass("buttonColor2").addClass("buttonColor1");
        }
    });


});