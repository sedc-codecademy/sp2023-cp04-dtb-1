document.addEventListener('DOMContentLoaded', function () {
    var submitButton = document.getElementById('btnSubscribe');
    var form = document.querySelector('.newletter-form');
    var alertMessage = document.getElementById('success-alert');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        alertMessage.style.display = "block";
        submitButton.style.display = "none";
        submitButton.disabled = true;
        form.reset();

        setTimeout(function () {
            alertMessage.style.display = "none";
            submitButton.style.display = "block";
        }, 2000);
    });
});