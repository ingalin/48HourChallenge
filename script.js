const app = {};

// Change the text color on mouseover
app.changeTextColor = function (classToReplace, classToChange, classNew, newColor) {
    // Split by letters
    $(classToReplace).one("mouseover", function () {
        $(classToReplace).hide();
        $(classToChange).show();

        for (let i = 0; i < $(this).text().length; i++) {
            $(classToChange).append(`<span class=${classNew}>${($(this).text().charAt(i))}</span>`);
        }
        // Change the color
        $(`.${classNew}`).one("mouseover", function () {
            for (let i = 0; i < $(this).text().length; i++) {
                $(this).addClass(newColor);
            }
        })
    })
}


// Append "cicles" to html
app.drawCircle = function (x, y) {
    let $svg = $("#myClip");
    function SVG(tag) {
        return document.createElementNS('http://www.w3.org/2000/svg', tag);
    }
    $(SVG('circle'))
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 100)
        .appendTo($svg);
};

app.drawCircles = function () {
    // Circles Section 2, add clipping paths on mouse move
    $(".section2").on("mouseover", function (event) {
        // Find out coordinates
        let x = event.clientX;
        let y = event.clientY;
        app.drawCircle(x, y);
    });
}

app.buttonStyle = function () {
    // Buttons Style
    document.querySelector('.button').onmousemove = function (e) {
        let x = e.pageX - e.target.offsetLeft;
        let y = e.pageY - e.target.offsetTop;
        e.target.style.setProperty('--x', x + 'px');
        e.target.style.setProperty('--y', y + 'px');
    };
}

app.music = function () {
    // Audio
    // for cross browser
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    // load some sound
    const audioElement = document.querySelector('audio');
    const track = audioCtx.createMediaElementSource(audioElement);
    const playButton = document.querySelector('.tape-controls-play');
    // play pause audio
    playButton.addEventListener('click', function () {
        // check if context is in suspended state (autoplay policy)
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        if (this.dataset.playing === 'false') {
            audioElement.play();
            this.dataset.playing = 'true';
            // if track is playing pause it
        } else if (this.dataset.playing === 'true') {
            audioElement.pause();
            this.dataset.playing = 'false';
        }
        let state = this.getAttribute('aria-checked') === "true" ? true : false;
        this.setAttribute('aria-checked', state ? "false" : "true");
    }, false);
    // if track ends
    audioElement.addEventListener('ended', () => {
        playButton.dataset.playing = 'false';
        playButton.setAttribute("aria-checked", "false");
    }, false);
    // volume
    const gainNode = audioCtx.createGain();
    // panning
    const pannerOptions = { pan: 0 };
    const panner = new StereoPannerNode(audioCtx, pannerOptions);
    track.connect(gainNode).connect(panner).connect(audioCtx.destination);
    // Track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons 
}

app.changeColorNav = function () {
    // Change color menu, check if it's scorlled, if it is, change color
    $(window).scroll(function () {
        const heightHeader = $("header").height();
        const secOneHeight = $(".section1").height() + heightHeader;
        const secTwoHeight = $(".section2").height() + secOneHeight;
        const secThreeHeight = $(".section3").height() + secTwoHeight;
        const footerHeight = $("footer").height() + secThreeHeight;
        let docScroll = $(document).scrollTop();

        if (docScroll > footerHeight - 40) {
            $(".headerMenuDrop ul.mobileSubMenu").removeClass("colorChange4").addClass("colorChange1");
            $(".menuButton").removeClass("buttonColor4").addClass("buttonColor1");
        }
        else if (docScroll > secThreeHeight - 40 && docScroll < footerHeight - 40) {
            $(".headerMenuDrop ul.mobileSubMenu").removeClass("colorChange1").addClass("colorChange4");
            $(".menuButton").removeClass("buttonColor1").addClass("buttonColor4");
        }
        else if (docScroll > secTwoHeight - 40 && docScroll < secThreeHeight - 40) {
            $(".headerMenuDrop ul.mobileSubMenu").removeClass("colorChange3").removeClass("colorChange4").addClass("colorChange1");
            $(".menuButton").removeClass("buttonColor3").removeClass("buttonColor4").addClass("buttonColor1");
        }
        else if (docScroll > secOneHeight - 40 && docScroll < secTwoHeight - 40) {
            $(".headerMenuDrop ul.mobileSubMenu").removeClass("colorChange2").addClass("colorChange3");
            $(".menuButton").removeClass("buttonColor2").addClass("buttonColor3");
        }
        else if (docScroll < (secOneHeight - 40) && docScroll > heightHeader - 40) {
            $(".headerMenuDrop ul.mobileSubMenu").removeClass("colorChange3").addClass("colorChange2");
            $(".menuButton").removeClass("buttonColor3").addClass("buttonColor2");
        }
        else {
            $(".headerMenuDrop ul.mobileSubMenu").removeClass("colorChange2").addClass("colorChange1");
            $(".menuButton").removeClass("buttonColor2").addClass("buttonColor1");
        }
    });
}

app.skitterSlides = function () {
    // Init Skitter (slider), header
    $('.skitter-large').skitter({
        responsive: {
            small: {
                animation: 'fade',
                max_width: 768,
                suffix: '-small'
            },
            medium: {
                animation: 'directionRight',
                max_width: 1024,
                suffix: '-medium'
            }
        }
    });
}

//Start
app.init = function () {
    app.skitterSlides();
    app.changeColorNav();
    app.music();
    app.buttonStyle();
    app.drawCircles();
    $(".changeTextColor2").hide();
    $(".changeTextColor2P").hide();
    // Change color h2
    app.changeTextColor(".changeTextColor", ".changeTextColor2", "changeText", "changeColor");
    // // Change color p
    app.changeTextColor(".changeTextColorP", ".changeTextColor2P", "changeTextP", "changeColorP");
};

$(() => app.init());