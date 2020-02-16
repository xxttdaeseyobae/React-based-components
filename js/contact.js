$(document).ready(function() {

    $("#form1").submit(function(event) {
        event.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/api/contact',
            data: $('#form1').serialize(),
            dataType: "json",
            success: function(response) {
                alert("Successfully Send Message")
                console.log(response);
                location.reload();

            },
            error: function() {}
        })
    })
});