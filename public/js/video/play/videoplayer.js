const player = videojs('my-video', {
    autoplay: true,
    controlBar: {
        'pictureInPictureToggle': false
    }
});


var controlPanel = player.controlBar;

var videoUrlObj = location.href.split("/");
var lastObj = videoUrlObj.length;
var videoId = location.href.split("/")[--lastObj];

var prevBtn = controlPanel.addChild('button', { className: 'vjs-text-visible' });
prevBtn.addClass('prev-btn');
var prevBtnDOM = prevBtn.el();
prevBtnDOM.onclick = () => {
    if (Number(videoId) != 1) {
        window.location.href = `/video/${Number(--videoId)}`;
    }
}

var nextBtn = controlPanel.addChild('button', { className: 'vjs-text-visible' });
nextBtn.addClass('next-btn');
var nextBtnDOM = nextBtn.el();
nextBtnDOM.onclick = () => {
    window.location.href = `/video/${Number(++videoId)}`;
}

var complaintBtn = controlPanel.addChild('button', { className: 'vjs-text-visible' });
complaintBtn.addClass('complaint-btn');
let complaintBtnDOM = complaintBtn.el();
complaintBtnDOM.onclick = () => {
    let ask = confirm('You can report all errors to the channel administrator.\nhttps://t.me/elmorestreamit\n\nOpen an administrator profile?')
    if (ask == true) {
        window.open('https://t.me/ZonarTolk');
    }
}

var loopBtn = controlPanel.addChild('button', { className: 'vjs-text-visible' });
loopBtn.addClass('loop-btn');
var loopBtnDOM = loopBtn.el();
loopBtnDOM.onclick = () => {
    // Enable/Disable replay mode
    let yesOrNo = player.loop() == false ? true : false;
    player.loop(yesOrNo)
    console.log(player.loop())
    // Change style replay button
    let onOrOff = loopBtnDOM.style.backgroundImage == 'url("/media/videoplayer/repeatOff.svg")' ? 'url("/media/videoplayer/repeat.svg")' : 'url("/media/videoplayer/repeatOff.svg")';
    loopBtnDOM.style.backgroundImage = onOrOff;
    console.log(loopBtnDOM.style.backgroundImage)
}

var Component = videojs.getComponent('Component');
var myComponent = new Component(player);
var myFunc = function () {
    var myComponent = this;
    console.log('myFunc called');
};