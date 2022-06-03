//Sound alert

// init bunch of sounds
ion.sound({
    sounds: [
        {name: "tap"},
        {name: "branch_break"},
        {name: "computer_error"},
        // custom sound
        {name: "msg"}
    ],

    // main config
    path: "/media/sounds/",
    preload: true,
    multiplay: true,
    volume: 0.9
});

// Уведомление
let alw = function allow(){
    // Звук error
    ion.sound.play("computer_error");
    
    $(".allow-box").append(`
            <div class="allow alert alr error-alr" style="margin-bottom: 10px;">
                <div class="img">
                    <img src="/media/img/error.png" />
                </div>

                <span class="title">
                    Errore! <br>
                    <span class="text">
                    ${msg}
                    </span>
                </span>
            </div>
        `)

    $( ".allow" ).click(function() {
        $( this ).hide( 500, function() {
            $( this ).remove();
        });
    });
}

// Отправляем данные формы на бэк
$('.add-cmt').on('click', function(e) {
    let videoId = location.href.split('/')[4];
    let body = $('.body-cmt').val();
    var data = {
        videoId,
        body
    }
    $('.body-cmt').val("")
    console.log(data);

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/video/add-comment'
    }).done( function(data) {
        console.log(data);
        if (data.ok == true) {
            console.log('OK!')
        } else {
            msg = data.msg;
            alw(msg)
            console.log(data.msg)
            console.log(data['msg'])
        }
    });
});

// Добавить лайк/дислайк видео
$(document).ready(function() {
    // Проверяет на наличие поставленной оценки
    $.ajax({
        type:"POST",
        url:"check-rate"
    }).done( function(data) {
        if (data.code == "+1") {
            $('.like-btn').addClass('active');
            $('.dislike-btn').removeClass('active');
            console.log(data.msg)
        } else if (data.code == "-1") {
            $('.like-btn').removeClass('active');
            $('.dislike-btn').addClass('active');
            console.log(data.msg)
        } else if (data.code == "N") {
            $('.like-btn').removeClass('active');
            $('.dislike-btn').removeClass('active');
            console.log(data.msg)
        }
    });
// Like
$(document).on('click', '.like-btn', function() {
    $.ajax({
        type:"POST",
        url:"like"
    }).done( function(data) {
        let likeCount = Number($('.like-count')[0].innerHTML);
        let dislikeCount = Number($('.dislike-count')[0].innerHTML);
        if (data.code == "-1") {
            $('.like-count').text(likeCount + 1)
            $('.like-btn').addClass('active');

            $('.dislike-count').text(dislikeCount - 1)
            $('.dislike-btn').removeClass('active');
            console.log(data.msg)
        } else if (data.code == "+1") {
            $('.like-count').text(likeCount - 1)
            $('.like-btn').removeClass('active');
            console.log(data.msg)
        } else if (data.code == "N") {
            $('.like-count').text(likeCount + 1)
            $('.like-btn').addClass('active');
            console.log(data.msg)
        } else if (data.code == "NL") {
            msg = data.msg
            alw(msg)
            console.log(data.msg)
        }
    });
});
// Dislike
$(document).on('click', '.dislike-btn', function() {
    $.ajax({
        type:"POST",
        url:"dislike"
    }).done( function(data) {
        let likeCount = Number($('.like-count')[0].innerHTML);
        let dislikeCount = Number($('.dislike-count')[0].innerHTML);
        if (data.code == "+1") {
            $('.dislike-count').text(dislikeCount + 1)
            $('.dislike-btn').addClass('active');
            
            $('.like-count').text(likeCount - 1)
            $('.like-btn').removeClass('active');
            console.log(data.msg)
        } else if (data.code == "-1") {
            $('.dislike-count').text(dislikeCount - 1)
            $('.dislike-btn').removeClass('active');
            console.log(data.msg)
        } else if (data.code == "N") {
            $('.dislike-count').text(dislikeCount + 1)
            $('.dislike-btn').addClass('active');
            console.log(data.msg)
        } else if (data.code == "NL") {
            msg = data.msg
            alw(msg)
            console.log(data.msg)
        }
    });
});
});


// Подгружаем еще видео
$('.more').on('click', (e) => {
    let quantity = {
        videos: $('.video-box').length
    }
    $.ajax({
        type: 'POST',
        data: JSON.stringify(quantity),
        contentType: 'application/json',
        url: 'more'
    }).then(function (result) {
        console.log(result['data']);
        let answer = result['data'];
        for(let i=0; i<answer.length; i++) {
          console.log(answer[i].author)
          console.log(answer[i].poster)
          console.log(answer[i].title)
          console.log(answer[i].views)
        }
        if (result.ok == true) {
            for(let i=0; i<answer.length; i++) {
                var video = `
                    <div class="video-box">
                        <a href="/video/${answer[i].id}" class="video-link">
                            <div class="video">
                                <img src="https://video.sibnet.ru/upload/cover/video_${answer[i].poster}_0.jpg" class="poster" alr="${answer[i].title}"></img>
                                <br>
                                <br>
                                <span class="title info">${answer[i].title}</span><br>
                                <span class="posted info">
                                    <object>
                                        posted by <a href="/character/${answer[i].author}" class="blue-lnk">${answer[i].author}</a>
                                    </object><br>
                                </span>
                                <span class="views info">${answer[i].views} views</span>
                            </div>
                        </a>
                    </div>
                `;
                $('.wrapper').append(video)
            }
            
        } else {
            console.log('Videos Not found')
        }
    }).catch(function (err) {
      console.log('err')
    })
});