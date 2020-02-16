$(document).ready(function() {

    let imageName = '';
    var id = localStorage.getItem("_id");
    var data = {
        'token': localStorage.getItem("token"),
        '_id': localStorage.getItem("_id"),
    };

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5000/api/users/profile',
        data: data,
        dataType: 'JSON',
        success: function(response) {
            console.log(response);
            $('#adminuser').html(response.name);
            $('#adminfname').val(response.name);
            $('#adminusername').val(response.username);
            $('#adminemail').val(response.email);
            $('#admindesc').val(response.desc);
            $('#adminimgProfile').attr('src', 'http://localhost:5000/' + response.image);
        }
    });
    $('#updateuser').on('click', function(e) {
        e.preventDefault();

        if (imageName == '') {
            var dataupdate = {
                'token': localStorage.getItem("token"),
                '_id': localStorage.getItem("_id"),
                'username': $('input[name=adminusername]').val(),
                'email': $('input[name=adminemail]').val(),
                'name': $('input[name=adminfname]').val(),
                'desc': $('input[name=admindesc]').val()

            };
        } else {
            var dataupdate = {
                'token': localStorage.getItem("token"),
                '_id': localStorage.getItem("_id"),
                'username': $('input[name=username]').val(),
                'email': $('input[name=email]').val(),
                'name': $('input[name=name]').val(),
                'desc': $('input[name=desc]').val(),
                'image': imageName
            };
        }

        $.ajax({
            type: 'PUT',
            url: 'http://127.0.0.1:5000/api/users/userupdate/',
            data: dataupdate,
            success: function(response) {
                console.log(response);
                alert('Updated Succefully')
                window.location.reload();
            },
            error: function() {

                alert(response.name);
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