var successAlert = `
    <div class="alert alr success-alr">
        <div class="img">
            <img src="/media/img/success.png" />
        </div>

        <span class="title">
            Success! <br>
            <span class="text">a new character has been created</span>
        </span>
    </div>
`;
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
$('.create').on('click', (e) => {
    e.preventDefault();

    var data = {
        login: $('.field-login').val(),
        password: $('.field-pass').val(),
        passRepeat: $('.field-repe').val(),
    }

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/auth/create'
    }).done( (data) => {
        console.log(data);
        if (data.ok == true) {
            $('.create-form .alert').remove();
            $('.create-form .create').replaceWith(successAlert)
        } else {
            $('.create-form .alert').remove();
            $('.create-form .create').after(errorAlert0 + data['error'] + errorAlert1)
        }
    });
});