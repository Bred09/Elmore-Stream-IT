const player = videojs('my-video');


const controlPanel = player.controlBar;

const prevBtn = controlPanel.addChild('button', { className: 'vjs-text-visible' });
// prevBtn.controlText('<');
prevBtn.addClass('prev-btn');
const nextBtn = controlPanel.addChild('button', { className: 'vjs-text-visible' });
// nextBtn.controlText('>');
nextBtn.addClass('next-btn');
const complaintBtn = controlPanel.addChild('button', { className: 'vjs-text-visible' });
// complaintBtn.controlText('!');
complaintBtn.addClass('complaint-btn');
const loopBtn = controlPanel.addChild('button', { className: 'vjs-text-visible' });
// loopBtn.controlText('↺');
loopBtn.addClass('loop-btn');



// var player1 = videojs('my-video', {
//     controlBar: {
//         volumePanel: {
//             inline: false
//         }
//     }
// });

// var Component = videojs.getComponent('Component');
// var myComponent = new Component(player);
// var myButton = myComponent.addChild('button', {
//   text: 'Press Me',
//   buttonChildExample: {
//     buttonChildOption: true
//   }
// });


// // Добавление коробобки

// // Get the Component base class from Video.js
// var Component = videojs.getComponent('Component');


// var TitleBar = videojs.extend(Component, {
//     varructor: function (player, options) {
//         Component.apply(this, arguments);

//         if (options.text) {
//             this.updateTextContent(options.text);
//         }
//     },

//     createEl: function () {
//         return videojs.createEl('div', {
//             className: 'vjs-title-bar'
//         });
//     },

//     updateTextContent: function (text) {

//         if (typeof text !== 'string') {
//             text = 'Элемент не найден';
//         }
//         videojs.emptyEl(this.el());
//         videojs.appendContent(this.el(), text);
//     }
// });

// videojs.registerComponent('TitleBar', TitleBar);

// player.addChild('TitleBar', { text: 'The Title of The Video!' });
