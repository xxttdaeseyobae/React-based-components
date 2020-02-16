$(document).ready(function() {
    if (localStorage.getItem("token") == "undefined" || localStorage.getItem("token") == "") {
        $('<a href="../index.html" id="aa"></a>').appendTo("body");
        document.getElementById("aa").click();
    }
});