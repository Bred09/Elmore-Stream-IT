

// Отправляем данные форма на бэк
$('.more').on('click', (e) => {

    var quantity = {
        videos: $('.video-box').length
    }

    $.ajax({
        type: 'POST',
        data: JSON.stringify(quantity),
        contentType: 'application/json',
        url: '/'
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