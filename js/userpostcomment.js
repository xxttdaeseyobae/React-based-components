$(document).ready(function() {
    var url = "http://localhost:5000/api/postDetail/";
    var searchParams = new URLSearchParams(window.location.search);
    var post_id = "";
    if (searchParams.has('id')) {
        post_id = searchParams.get('id');
    }

    if (searchParams.has('id')) {
        url = url + searchParams.get('id');
    }
    var data = {
        'token': localStorage.getItem("token"),
        'id': localStorage.getItem("_id"),
    };

    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: 'JSON',
        success: function(response) {
            console.log(response);
            $('#username').html(response.post.user.username);
            $('#location').html(response.post.location);
            $('#description').html(response.post.description);
            $('#desc').html(response.post.user.desc);
            $('#image').attr("src", "http://localhost:5000/" + response.post.image);
            $('#userprofileimage').attr("src", "http://localhost:5000/" + response.post.user.image);
            // console.log(response.)

            var datas = "";
            $.each(response.comments, function(index) {

                datas += "<div class='container-fluid'>";
                datas += "<div class='row'>";
                datas += "<div class='col-md-12'>";
                datas += "<section class='comment-list'>";
                datas += "<article class='row'>";

                datas += "<div class='thumbnail'>";
                datas += "<img src = 'http://localhost:5000/" + response.comments[index].user.image + "' class = 'thumbnail-img' />";
                datas += "</div>";

                datas += "<div class='col-md-8 col-sm-8 col-8'>";

                datas += "<div class='arrow left mb-5'>";
                datas += "<div class=''>";
                datas += "<figcaption class='text-left comment-username'>" + response.comments[index].user.username + "</figcaption>";
                datas += "<p class = 'text-justify'>" + response.comments[index].comment + " </p>";
                datas += " </div>";
                datas += " </div>";
                datas += " </div>";
                datas += "  </article>";
                datas += " </section>";
                datas += "  </div>";
                datas += " </div>";
                datas += "  </div>";
            })
            $("#comment").append(datas);
        },
        error: function() {
            alert("Eroor Occured")
        }
    });
    $("#commentform").submit(function(e) {
        e.preventDefault();
        var searchParams = new URLSearchParams(window.location.search);

        var comment = {
            'token': localStorage.getItem("token"),
            '_id': localStorage.getItem("_id"),
            'post_id': post_id,
            'user': localStorage.getItem("_id"),
            'comment': $("#commentsection").val(),
        };
        // alert(comment.post_id);
        // alert(comment.token);
        // alert(comment.id)
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/api/users/comment/',
            data: comment,
            dataType: 'JSON',
            success: function(response) {
                // _form[0].reset();
                console.log(response);

                // if (response.redirect !== undefined && response.redirect) {
                //     window.location.href = response.redirect_url;
                // }
                location.href = "postcomment.html?id=" + post_id;
            },
            error: function(error) {
                console.log(error);

                alert(error.responseText);
            }
        })
    })



})