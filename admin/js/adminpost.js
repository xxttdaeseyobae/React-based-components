var tok;
$(document).ready(function() {
    var data = { //Fetch form data
        token: localStorage.getItem("token"),
        id: localStorage.getItem("_id"),

    };
    var x = 0;

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5000/api/admin/postlist/',
        data: data,
        success: function(res) {
            var datas = "";

            $.each(res, function(index) {

                datas += "<tr>";
                datas += "<td>" + res[index].title + "</td>";
                datas += "<td>" + res[index].location + "</td>";
                datas += "<td>" + res[index].user.username + "</td>";
                datas += "<td>" + res[index].description + "</td>";
                datas += "  <td class='img-td'><img src='http://localhost:5000/" + res[index].image + "'class='img-thumbnail'></td>";
                datas += "<td><button   type='button' class='btn btn-danger' id='delete' value=" + res[index]._id + "><i class='fa fa-trash fa-lg' aria-hidden='true'></i></button></td>";
                datas += "</tr>";
            });
            // datas += " </table>";
            $("#tabledata").append(datas);
            $("#tabledata").on('click', '#delete', function() {
                var data = {
                    _id: $(this).val(),
                    token: localStorage.getItem("token"),
                    id: localStorage.getItem("_id")
                };
                $.ajax({
                    type: "POST",
                    url: "http://127.0.0.1:5000/api/admin/postdelete/",
                    data: data,
                    success: function(responseData, textStatus, jqXHR) {
                        console.log(responseData);
                        alert(responseData.message);
                        console.log(data);
                        location.href = "post.html"

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