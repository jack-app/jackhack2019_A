  $(document).ready(function() {
    $("#open").on("click", function() {
      $("div.modal").addClass("is-active");
    })

    $("#close, div.modal-background").on("click", function() {
      $("div.modal").removeClass("is-active");
    })
  });
