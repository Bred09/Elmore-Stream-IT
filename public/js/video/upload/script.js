var successAlert = `
    <div class="alert alr success-alr">
        <div class="img">
            <img src="/media/img/success.png" />
        </div>

        <span class="title">
            Success! <br>
            <span class="text">a new video has been uploaded</span>
        </span>
    </div>
`;

// При изменении значения полей будет очищаться div alert
$('.green-inp').on('input keyup', (e) => {
    $('.upload-form .alert').html('');
});

// Отправляем данные форма на бэк
$('.upload-btn').on('click', function(e) {
    e.preventDefault();

    var data = {
        poster: $('.poster-fld').val(),
        title: $('.title-fld').val()
    }
    console.log(data);

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/video/upload'
    }).done( function(data) {
        console.log(data);
        if (data.ok == true) {
            $('.upload-form .alert').html(successAlert)
        } else {
            $('.upload-form .alert').html('Error!')
        }
    });
});

// Отправляем видео
$('.vid-upl').on('submit', function(e) {
    e.preventDefault();

    var formData = new FormData(this);
    console.log(formData);

    $.ajax({
        type: 'POST',
        data: formData,
        contentType: false,
        url: '/video/upload',
        processData: false,
        success: function (r) {
            console.log(r);
        },
        error: function (e) {
            console.log(e);
        }
    })
});