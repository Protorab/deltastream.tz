/** @format */

$(document).ready(function () {
  //E-mail Ajax Send
  $(".send__form").submit(function () {
    //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      // url: "../assets/mail.php",
      url: "//deltastream.tz/assets/mail.php",

      data: th.serialize(),
    }).done(function () {
      $("._def").hide();
      $("._thx").hide().css("display", "flex");
      setTimeout(function () {
        $("._def").hide().css("display", "flex");
        $("._thx").hide();
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });
  $("form").keydown(function (e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  });
});
