$(document).ready(function() {
    var id = "";
    var imageName = "";
    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id')) {
        id = searchParams.get('id');
    }
    var data = {
        'token': localStorage.getItem("token"),
        'id': localStorage.getItem("_id"),
        '_id': id
    };
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5000/api/users/postedit/',
        data: data,
        success: function(response) {
            // console.log(response);
            $('#title').val(response.title);
            $('#location').val(response.location);
            $('#description').val(response.description);
            // $('#image').val(response.image);
            $('#imgProfile').attr('src', 'http://localhost:5000/' + response.image);
        },
        error: function() {}
    })
    $("#updateuserform").submit(function(event) {
        event.preventDefault();
        var _form = $(this);
        var id = "";
        var searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('id')) {
            id = searchParams.get('id');
        };
        if (imageName == '') {
            var update = { //Fetch form data

                'token': localStorage.getItem("token"),
                'id': localStorage.getItem("_id"),
                '_id': id,
                'title': $('input[name=title]').val(),
                'location': $('input[name=location]').val(),
                'description': $('input[name=description]').val()
            };
        } else {
            var update = { //Fetch form data

                'token': localStorage.getItem("token"),
                'id': localStorage.getItem("_id"),
                '_id': id,
                'title': $('input[name=title]').val(),
                'location': $('input[name=location]').val(),
                'description': $('input[name=description]').val(),
                'image': imageName
            };
        }
        $.ajax({
            type: 'PUT',
            url: 'http://127.0.0.1:5000/api/users/postupdate/',
            data: update,
            success: function(response) {
                alert("Successfully Update")
                console.log(response);
            },
            error: function() {
                alert("update failed")
            }
        })
    })
    $("#image").on('change', function() {
        let formData = new FormData();
        let files = $("#image").get(0).files;
        if (files.length > 0) {
            formData.append("imageName", files[0]);
        }
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/api/uploadimage',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            dataType: 'JSON',
            success: function(response) {
                imageName = response;
            },
            error: function() {
                alert("Image upload failed!");
            }
        });
    });
})