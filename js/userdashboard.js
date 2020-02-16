$(document).ready(function() {
    var data = { //Fetch form data
        token: localStorage.getItem("token"),
        id: localStorage.getItem("_id"),
    };
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5000/api/users/postlist/',
        data: data,
        dataType: 'JSON',
        success: function(res) {
            console.log(res);
            var datas = "";
            $.each(res, function(index) {
                datas += " <div class='container'>";
                datas += " <div class='row mt-3 wow fadeIn'>";
                datas += "<div class='col-lg-5 col-xl-4 mb-4'>";
                datas += "  <div class='view overlay rounded z-depth-1'>";
                datas += "<img src='http://localhost:5000/" + res[index].image + "' class='img-fluid'>";
                datas += "<a href='https://mdbootstrap.com/education/tech-marketing/automated-app-introduction/' target='_blank'>";
                datas += "<div class='mask rgba-white-slight'></div>";
                datas += "</a>";
                datas += "</div>";
                datas += "</div>";
                datas += "<div class='col-lg-7 col-xl-7 ml-xl-4 mb-4'>";
                datas += "<h3 class='mb-3 font-weight-bold dark-grey-text'>";
                datas += "<strong>" + res[index].title + "</strong>";
                datas += "</h3>";
                datas += "<p class='grey-text'>" + res[index].description + "</p>";
                datas += "<a href='postcomment.html?id=" + res[index]._id + " 'class='btn btn-primary btn-md'>View More";
                datas += "<i class='fas fa-play ml-2'></i>";
                datas += "</a>";
                datas += " </div>";
                datas += "</div>";
                datas += "<hr class='mb-5'>";
                datas += " </div>";


            })
            $("#userpost").append(datas);

        }
    })

})