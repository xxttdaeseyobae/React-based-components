$(document).ready(function() {
    let imageName = '';
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
    $("#post").on("submit", function(e) {
        e.preventDefault();
        var data = {
            token: localStorage.getItem("token"),
            _id: localStorage.getItem("_id"),
            user: localStorage.getItem("_id"),
            title: $("#title").val(),
            location: $("#location").val(),
            image: imageName,
            description: $("#description").val()
        }
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/api/users/post/',
            data: data,
            dataType: "JSON",
            success: function(response) {
                alert("Post added successfully")
                console.log(response);
                location.href = "userdashboard.html"

            },
            error: function() {
                alert("Post Failed")
            }
        })

    })
})