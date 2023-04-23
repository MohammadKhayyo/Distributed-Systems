let last_NUMBER = 1;
function Convert_Date(Date) {
  let array_Date = Date.split("-");
  return array_Date[2] + "-" + array_Date[1] + "-" + array_Date[0];
}
$(document).ready(function () {
  $(".Series_info").css("display", "none");

  $("form[name='movie_form']").validate({
    // Specify validation rules
    rules: {
      name: {
        required: true,
      },
      id: {
        required: true,
      },
      picture: {
        url: true,
        required: true,
      },
      rating: {
        digits: true,
        min: 1,
        max: 5,
        required: true,
      },
      director: {
        required: true,
      },
      date: {
        date: true,
        required: true,
      },
    },
    // Specify validation error messages
    messages: {
      id: {
        required: "Please enter id",
      },
      name: "You must enter name",
      rating: {
        digits: "Please enter only digits",
        min: "rating must between 1 to 5",
        max: "rating must between 1 to 5",
        required: "You must enter a number between 1 to 5",
      },
      director: "You must provide director name",
      picture: "You must provide picture URL",
      date: {
        required: "You must enter a date",
        date: "Must enter a valid date",
      },
    },
  });

  $("#isSeries").change(function () {
    $(".Series_info").toggle();
    if (this.checked) {
      $("#season").change(function () {
        let Number = parseInt($(this).val());
        if (Number < last_NUMBER) {
          for (let i = 0; i < last_NUMBER - Number; i++) {
            $(".Episode-group").children().last().remove();
          }
        } else {
          $(".Episode-group").append(Create_HTML(Number - last_NUMBER));
        }
        last_NUMBER = Number;
      });
    }
  });
  /**
   * submits movie details
   */
  $("#movie_form").submit(function (event) {
    if (!$("#movie_form").valid()) return;
    if ($("#isSeries").is(":checked")) {
      let to_NUM = parseInt($("#season").val());
      let array = [];
      for (let i = 0; i < to_NUM; i++) {
        array.push(parseInt($(`#episode_${i}`).val()));
      }
      $.ajax({
        type: "POST", // define the type of HTTP verb we want to use (POST for our form)
        url: "http://localhost:3001/movies", // the url where we want to POST
        contentType: "application/json",
        data: JSON.stringify({
          id: $("#id").val(),
          name: $("#name").val(),
          picture: $("#picture").val(),
          director: $("#director").val(),
          date: Convert_Date($("#date").val()),
          rating: parseInt($("#rating").val()),
          isSeries: true,
          series_details: array,
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
          swal(`The movie has been successfully modified!`, {
            icon: "success",
          }).then(() => (location.href = "http://localhost:3001/list"));
        },
        error: function (jqXhr, textStatus, errorThrown) {
          swal("Editing the movie failed", {
            icon: "error",
          });
          console.log(errorThrown);
        },
      });
    } else {
      $.ajax({
        type: "POST", // define the type of HTTP verb we want to use (POST for our form)
        url: "http://localhost:3001/movies", // the url where we want to POST
        contentType: "application/json",
        data: JSON.stringify({
          id: $("#id").val(),
          name: $("#name").val(),
          picture: $("#picture").val(),
          director: $("#director").val(),
          date: Convert_Date($("#date").val()),
          rating: parseInt($("#rating").val()),
          isSeries: false,
          series_details: [],
        }),
        success: function (data, textStatus, jQxhr) {
          swal(`The movie has been successfully modified!`, {
            icon: "success",
          }).then(() => (location.href = "http://localhost:3001/list"));
        },
        error: function (jqXhr, textStatus, errorThrown) {
          swal("Editing the movie failed", {
            icon: "error",
          });
          console.log(errorThrown);
        },
      });
    }
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });
});
/**
 * Creates episodes cards for the series
 */
function Create_HTML(NUMBER) {
  let HTML = "";
  let to_NUM = parseInt(NUMBER) + parseInt(last_NUMBER);
  for (let i = parseInt(last_NUMBER); i < to_NUM; i++) {
    HTML += ` <div id="episode-series-group" class="form-group">
        <label for="episode">Season ${i + 1}  episode num:</label>
        <input type="number" min='1' value = 1 class="form-control" name="episode_${i}" id="episode_${i}" placeholder="Type episode"
            required>
    </div>`;
  }
  return HTML;
}
