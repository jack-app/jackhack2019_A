  $(document).ready(function() {
    $("#create_open").on("click", function() {
      $("#create_room").addClass("is-active");
    })

    $("#close, div.modal-background").on("click", function() {
      $("div#create_room").removeClass("is-active");
    })
  });


  $(document).ready(function() {
    $("#enter_open").on("click", function() {
      $("#aikotoba").addClass("is-active");
    })

    $("#close, div.modal-background").on("click", function() {
      $("div#aikotoba").removeClass("is-active");
    })
  });
