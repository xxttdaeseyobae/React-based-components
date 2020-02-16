var tok;
$(document).ready(function() {
    var data = { //Fetch form data
        token: localStorage.getItem("token"),
        id: localStorage.getItem("_id"),
        tok: localStorage.getItem("token")

    };

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5000/api/admin/postlist/',
        data: data,
        success: function(res) {
            var datas = "";
            let count = res.length;
            $('#postcount').html(count);
            $.each(res, function(index) {
                datas += "<tr>";
                datas += "<td>" + res[index].title + "</td>";
                datas += "<td>" + res[index].location + "</td>";
                datas += "<td>" + res[index].description + "</td>";

                datas += "</tr>";
            });
            // datas += " </table>";
            $("#postlist").append(datas);
            console.log(res);
        },

        error: function() {
            document.getElementById("table_data").innerHTML = "No data Available";
        }
    });

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5000/api/admin/contactlist/',
        data: data,
        success: function(res) {
            var datas = "";
            let count = res.length;
            $('#feedbackcount').html(count);
            $.each(res, function(index) {
                datas += "<tr>";
                datas += "<td>" + res[index].fname + ' ' + res[index].lname + "</td>";
                datas += "<td>" + res[index].email + "</td>";
                datas += "<td>" + res[index].message + "</td>";

                datas += "</tr>";
            });
            $("#feedbacklist").append(datas);
        },

        error: function() {
            document.getElementById("table_data").innerHTML = "No data Available";
        }
    });


    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5000/api/admin/userlist/',
        data: data,
        success: function(res) {
            var datas = "";
            let count = res.length;
            $('#usercount').html(count);

            $.each(res, function(index) {
                datas += "    <tr>";
                datas += "     <td> " + res[index].name + "</td>";
                datas += "  <td>" + res[index].email + "</td>";
                datas += "      <td>" + res[index].username + "</td>";
                datas += "    <td>" + res[index].desc + "</td>";
                datas += "     </tr>"
            });
            datas += " </table>";
            $("#tabledata").append(datas);
            $("#tabledata").on('click', '#delete', function() {
                var data = {
                    _id: $(this).val(),
                    token: localStorage.getItem("token"),
                    id: localStorage.getItem("_id")
                };
                $.ajax({
                    type: "POST",
                    url: "http://127.0.0.1:5000/api/admin/userdelete/",
                    data: data,
                    success: function(responseData, textStatus, jqXHR) {
                        console.log(responseData);
                        alert(responseData.message);
                        console.log(data);
                        location.href = "user.html"

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


});