var errorAlert0 = `
    <div class="alert alr error-alr">
        <div class="img">
            <img src="/media/img/error.png" />
        </div>

        <span class="title">
            Errore! <br>
            <span class="text">
`;
var errorAlert1 = `
            </span>
        </span>
    </div>
`;

// Отправляем данные форма на бэк
$('.login-btn').on('click', (e) => {
    e.preventDefault();

    var data = {
        login: $('.field-login').val(),
        password: $('.field-pass').val()
    }

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/auth/in'
    }).done( (data) => {
        console.log(data);
        if (data.ok == true) {
            console.log(data);
            $(location).attr("href","/")
        } else {
            $('.login-form .alert').remove();
            $('.login-form .login-btn').after(errorAlert0 + data['error'] + errorAlert1)
        }
    });
});