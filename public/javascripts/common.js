$(document).ready(function () {
    $("#reserve").hide();
    $("#reserveComment").hide();

    $(".cancel").click(function (e) {
        e.preventDefault();

        if (window.confirm("Do you really want to cancel this reservation?")) {
            $(this).parent().submit();
        }
    })

    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    let dateString = tomorrow.toISOString().substr(0, 10);
    $("#date_from").attr("min", dateString);
    $("#date_to").attr("min", dateString);
    $("#date_from").change(function () {
        $("#date_to").attr("min", $(this).val());
    });

    $("#check").click(function () {
        $.ajax({
            url: window.location.href + '/check',
            data: {
                date_from: $("#date_from").val(),
                date_to: $("#date_to").val()
            },
            method: "POST",
            success: function (data) {
                $("#reserve").toggle(data);
                $("#reserveComment").toggle(!data);
                $("#check").toggle(!data);
            } 
        });
    }); 
});