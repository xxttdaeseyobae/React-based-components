$(document).ready(function() {

    $("#login").submit(function(event) {
        event.preventDefault();
        var data = $('#login').serialize();
        // data += '&username=blah&id=blah1';
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/api/users/login',
            data: data,
            dataType: "json",
            beforeSend: function() {
                $(".lbl_status").hide();
            },
            success: function(response) {
                console.log(response);
                $('#login')[0].reset();
                setTimeout(function() {
                    if (response.Success == "Success!") {
                        console.log(response.admin)

                        if (typeof(Storage) !== "undefined") {
                            localStorage.setItem("token", response.token);
                            localStorage.setItem("admin", response.admin);
                            localStorage.setItem("username", response.username);
                            localStorage.setItem("_id", response._id);
                        } else {}
                        if (response.admin == true) {
                            $('<a href="admin/dashboard.html" id="aa"></a>').appendTo("body");
                        } else {
                            $('<a href="user/userdashboard.html" id="aa"></a>').appendTo("body");
                        }

                        document.getElementById("aa").click();
                    } else {
                        alert("Email or Password doesn't match")
                    }
                });
                setTimeout(function() {
                    $(".lbl_status").show();
                });


            },
            error: function() {}
        })
    });

    $("#signup").submit(function(event) {
        event.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/api/users/registration',
            data: $('#signup').serialize(),
            dataType: "json",
            beforeSend: function() {
                $(".lbl_status").hide();
            },
            success: function(response) {
                alert("You are registered now");
                $('#signup')[0].reset();
                setTimeout(function(err, response) {
                    if (response.Success == "You are regestered,You can login now.") {
                        $('<a href="index.html" id="aa"></a>').appendTo("body");
                        document.getElementById("aa").click();
                    } else {
                        console.log(err);
                    }
                });
                setTimeout(function() {
                    $(".lbl_status").show();
                });

            },
            error: function() {}
        })
    });

});