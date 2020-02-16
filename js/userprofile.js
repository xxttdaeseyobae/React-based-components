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
            $('#user').html(response.name);
            $('#name').val(response.name);
            $('#username').val(response.username);
            $('#email').val(response.email);
            $('#desc').val(response.desc);
            $('#imgProfile').attr('src', 'http://localhost:5000/' + response.image);
        }
    })
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:5000/api/users/postbyid/' + id,
        data: data,
        success: function(res) {
            var datas = "";
            $.each(res, function(index) {
                datas += "<tr>";
                datas += "<td>" + res[index].SN + "</td>";
                datas += "<td>" + res[index].title + "</td>";
                datas += "<td>" + res[index].location + "</td>";
                datas += "<td>" + res[index].user.username + "</td>";
                datas += "<td>" + res[index].description + "</td>";
                datas += "  <td class='img-td'><img src='http://localhost:5000/" + res[index].image + "'class='img-thumbnail'></td>";
                datas += "<td> <a href='editpost.html?id=" + res[index]._id + "'class='btn btn-primary'><i class='fa fa-edit fa-lg' aria-hidden='true'></i></a></td>";
                datas += "<td><button   type='button' class='btn btn-danger' id='delete' value=" + res[index]._id + "><i class='fa fa-trash fa-lg' aria-hidden='true'></i></button></td>";
                datas += "</tr>";
            });
            $("#tabledata").append(datas);
            $("#tabledata").on('click', '#delete', function() {
                var ids = $('#delete').val();
                var data = {

                    token: localStorage.getItem("token"),
                    id: localStorage.getItem("_id")
                };
                $.ajax({
                    type: "POST",
                    url: "http://127.0.0.1:5000/api/users/postdelete/" + ids,
                    data: data,
                    success: function(responseData, textStatus, jqXHR) {
                        console.log(responseData);
                        alert("Deleted");
                        console.log(data);
                        // location.href = "userprofile.html"
                        window.location.reload();

                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                        alert(errorThrown);
                    }

                });
                return false;

            })
            console.log(res);
        },

        error: function() {
            document.getElementById("table_data").innerHTML = "No data Available";
        }
    });


    $('#updateuser').on('click', function(e) {
        e.preventDefault();

        if (imageName == '') {
            var dataupdate = {
                'token': localStorage.getItem("token"),
                '_id': localStorage.getItem("_id"),
                'username': $('input[name=username]').val(),
                'email': $('input[name=email]').val(),
                'name': $('input[name=name]').val(),
                'desc': $('input[name=desc]').val()


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
                    // location.href('userprofile.html');
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