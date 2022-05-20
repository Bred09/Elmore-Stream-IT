// Coming soon function
function comingSoon() {
    let box = `<div class="coming-soon" style="position:  fixed; top: 0; left: 0; width: 100%; height: 100%; text-align: center; background: rgba(0,0,0,0.8)"><img style="margin-top: 2%; width: 80%;" src="/media/comingsoon.png" alt="Cooming soon..."></div>`;
    $('body').append(box);
    $('.coming-soon').on('click', (e) => {
        $('.coming-soon').remove();
    })
}