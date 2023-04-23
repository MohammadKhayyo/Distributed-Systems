let data = [];
let dateACS = false,
  nameACS = true,
  RatingASC = true;
let nameArrow = "",
  dateArrow = "",
  RatingArrow = "";
let temp_season_num = 1;
/**
 * goes over JSON and turns it into an array
 */
function Convert_JSON_to_array(result) {
  for (let key in result) {
    data.push(result[key]);
  }
  console.log(data);
  sortdate();
}
/**
 * sort array by date
 */
function sortdate() {
  if (dateACS) {
    dateArrow = "🔽";
    RatingArrow = "";
    nameArrow = "";
    data = data.sort(function (a, b) {
      return date_compare(a, b);
    });
    dateACS = false;
  } else {
    dateArrow = "🔼";
    RatingArrow = "";
    nameArrow = "";
    data = data.sort(function (a, b) {
      return date_compare(b, a);
    });
    dateACS = true;
  }
  displayData(data);
}
/**
 * sort array by name
 */
function sortName() {
  if (nameACS) {
    nameArrow = "🔽";
    dateArrow = "";
    RatingArrow = "";
    data = data.sort(function (A, B) {
      return A.name.localeCompare(B.name);
    });
    nameACS = false;
  } else {
    nameArrow = "🔼";
    dateArrow = "";
    RatingArrow = "";
    data = data.sort(function (A, B) {
      return B.name.localeCompare(A.name);
    });
    nameACS = true;
  }

  displayData(data);
}
/**
 * sort array by rating
 */
function sortRating() {
  if (RatingASC) {
    RatingArrow = "🔽";
    nameArrow = "";
    dateArrow = "";
    data = data.sort(function (a, b) {
      return a.rating - b.rating;
    });
    RatingASC = false;
  } else {
    RatingArrow = "🔼";
    nameArrow = "";
    dateArrow = "";
    data = data.sort(function (a, b) {
      return b.rating - a.rating;
    });
    RatingASC = true;
  }
  displayData();
}
/**
 * compares between two dates
 */
function date_compare(A, B) {
  let A_Convert = Convert_Date(A.date);
  let B_Convert = Convert_Date(B.date);

  let A_Date = new Date(A_Convert);
  let B_Date = new Date(B_Convert);

  return A_Date - B_Date;
}
/**
 * Displays movies table
 */
function displayData() {
  var txt =
    '<table><tr><th id="Movie_ID">Movie ID ' +
    '</th><th id="Picture"> Picture' +
    '</th><th id="Name">Name ' +
    nameArrow +
    '</th><th id="Date" >Date ' +
    dateArrow +
    '</th><th id="Rating" >Rating ' +
    RatingArrow +
    '</th><th id="Action" >Action ' +
    "</th><tr>";
  for (let i = 0; i < data.length; i++) {
    txt +=
      "<tr><td>" +
      data[i].id +
      "</td><td>" +
      `<img src="${data[i].picture}" alt="${data[i].name}" width="128" height="128">` +
      "</td><td>" +
      data[i].name +
      "</td><td>" +
      data[i].date +
      "</td><td>" +
      data[i].rating +
      "</td><td>" +
      `
      <div class="Buttons_flex">
      <input class="Buttons_style Other_button Edit_button" type="button" id="Edit^${i}" value="Edit">
      <input class="Buttons_style Other_button Add_Actor_button" type="button" id="Add^${i}" value="Add Actor">
      <input class="Buttons_style Other_button Actors_List_button" type="button" id="List^${i}" value="Actors List">
      <input class="Buttons_style Delete_button" type="button" id="Delete^${i}" value="Delete">
      </div>
      `;
    ("</td></tr>");
  }
  txt += "</table>";
  $("#demo").html(txt);
}
/**
 * AJAX query to delete a movie from list
 */
function DeleteMove(number) {
  let Success = 1;
  $.ajax({
    url: `/movies/${data[number].id}`,
    type: "DELETE",
    error: function (err) {
      console.log("err", err);
      Success = -1;
    },
  });
  return Success;
}
/**
 * Adds new episodes to series
 */
function Add_New_episodes(temp_season_num, Number) {
  let episodesCardsHTML = "";
  for (let i = temp_season_num; i < Number + temp_season_num; i++) {
    episodesCardsHTML += ` <div id="episode-series-group" class="form-group">
        <label for="episode" id="episode_input_for" >Season ${
          i + 1
        }  episode num:</label>
        <input type="number" min='1' value = "1" class="form-control" name="episode_${i}" id="episode_${i}" placeholder="Type episode"
            required>
    </div>`;
  }
  return episodesCardsHTML;
}
/**
 * displays old episodes count
 */
function Add_Old_episodes(array) {
  let episodesCardsHTML = "";
  for (let i = 0; i < array.length; i++) {
    episodesCardsHTML += `<div id="episode-series-group" class="form-group">
        <label for="episode" id="episode_input_for" >Season ${
          i + 1
        }  episode num:</label>
        <input type="number" min='1' value = "${
          array[i]
        }" class="form-control" name="episode_${i}" id="episode_${i}" placeholder="Type episode"
            required>
    </div>`;
  }
  return episodesCardsHTML;
}
/**
 * converts date fromat from YYYY/MM/DD to  DD/MM/YYYY
 */
function Convert_Date(Date) {
  let array_Date = Date.split("-");
  return array_Date[2] + "-" + array_Date[1] + "-" + array_Date[0];
}
/**
 * Writes HTML div for a new actor
 */
function Create_html_actor(actors, id_Movie, number) {
  let actorHtml = "";
  for (let actor in actors) {
    console.log(actor);
    console.log(actors[actor]);
    let value = actors[actor];
    actorHtml += `
      <div class="Actor_flex" id="Actor_${value.name}" >
    <div class="Image_flex">
      <img class="Actor_image" src="${value.picture}" width="128" height="128"/>
    </div>
    <div class="Actor_info_flex">
      <span class="Actor_name"> ${value.name} </span>
      <a class="Actor_other_info" target="_blank" href="${value.site}">Fans Website</a>
    </div>
    <div class="Buttons_flex">
      <input class="Buttons_style Delete_actor_button" type="button" id="Delete^${value.name}^${id_Movie}^${number}" value="Delete">
    </div>
  </div>`;
  }
  return actorHtml;
}
/**
 * validates if URL is valid
 */
function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
$(document).ready(function () {
  $(".Series_info").css("display", "none");
  $(".Actor-group").css("display", "none");
  /**
   * Fetches all movies
   */
  $.ajax({
    url: "/movies",
    type: "GET",
    success: function (result) {
      Convert_JSON_to_array(result);
    },
    error: function (err) {
      console.log("err", err);
    },
  });
  $("body").on("click", "#Name", function () {
    sortName();
  });
  $("body").on("click", "#Date", function () {
    sortdate();
  });
  $("body").on("click", "#Rating", function () {
    sortRating();
  });
  // Deletes movie on button click
  $("body").on("click", ".Delete_button", function (button) {
    let number = parseInt(button.target.id.split("^")[1]);
    let id = data[number].id;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Movie!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete && DeleteMove(number) === 1) {
        swal(`Poof! The Movie whit id: ${id} has been deleted!`, {
          icon: "success",
        }).then(() => location.reload());
      } else {
        swal("The Movie is safe!");
      }
    });
  });
  /**
   * Adds new actor to movie on button click
   */
  $("body").on("click", ".Add_Actor_button", function (button) {
    let number = parseInt(button.target.id.split("^")[1]);
    let id = data[number].id;
    $.ajax({
      url: "/actors",
      type: "GET",
      success: function (result) {
        let names_actors = {};
        for (actor in result) {
          names_actors[`${actor}`] = actor;
        }
        swal({
          title: "Do you want to autofill?",
          text: "If you press ok, a list of actors will be displayed and you can choose from them, else You enter manually",
          buttons: true,
          dangerMode: true,
        }).then((willAdded) => {
          if (willAdded) {
            console.log(willAdded);
            (async () => {
              const { value: actor } = await Swal.fire({
                title: "Select Actor",
                input: "select",
                inputOptions: names_actors,
                showCancelButton: true,
              });
              if (actor) {
                $.ajax({
                  url: `/movies/${id}/actor/${actor}`,
                  type: "PUT",
                  contentType: "application/json",
                  data: JSON.stringify({
                    name: result[actor].name,
                    picture: result[actor].picture,
                    site: result[actor].site,
                  }),
                  success: function () {
                    swal(`The actor has been added to the movie!`, {
                      icon: "success",
                    }).then(() => location.reload());
                  },
                  error: function (err) {
                    swal("The actor has not been added to the movie", {
                      icon: "error",
                    });
                    console.log("err", err);
                  },
                });
              }
            })();
          } else {
            console.log(willAdded);
            (async () => {
              const { value: formValues } = await Swal.fire({
                title: `Add Actor to movie with id: ${id}`,
                html:
                  '<input id="swal-input1" class="swal2-input" placeholder="Write Name here">' +
                  '<input id="swal-input2" class="swal2-input" placeholder="Write URL Picture here">' +
                  '<input id="swal-input3" class="swal2-input" placeholder="Write URL site fan here">',
                focusConfirm: false,
                preConfirm: () => {
                  return [
                    $("#swal-input1").val(),
                    $("#swal-input2").val(),
                    $("#swal-input3").val(),
                  ];
                },
              });

              if (formValues) {
                if (
                  formValues[0] === "" ||
                  formValues[1] === "" ||
                  formValues[2] === ""
                ) {
                  swal({
                    title: "The name and picture and fan site are required",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  });
                  return;
                }
                if (
                  !isValidHttpUrl(formValues[1]) ||
                  !isValidHttpUrl(formValues[2])
                ) {
                  swal({
                    title: "The picture and the fan site must be url",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  });
                  return;
                }
                swal({
                  title: "Are you sure to add this actor to move?",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    $.ajax({
                      url: `/movies/${id}/actor/${formValues[0]}`,
                      type: "PUT",
                      contentType: "application/json",
                      data: JSON.stringify({
                        name: formValues[0],
                        picture: formValues[1],
                        site: formValues[2],
                      }),
                      success: function () {
                        swal(`The actor has been added to the movie!`, {
                          icon: "success",
                        }).then(() => location.reload());
                      },
                      error: function (err) {
                        swal("The actor has not been added to the movie", {
                          icon: "error",
                        });
                        console.log("err", err);
                      },
                    });
                  } else {
                    swal("The actor has not been added to the movie", {
                      icon: "error",
                    });
                  }
                });
              }
            })();
          }
        });
      },
      error: function (err) {
        console.log("err", err);
      },
    });
  });
  /**
   * Disaplays movie details. Can edit them on clicking button
   */
  $("body").on("click", ".Edit_button", function (button) {
    let number = parseInt(button.target.id.split("^")[1]);
    $("#name").val(`${data[number].name}`);
    $("#picture").val(`${data[number].picture}`);
    $("#director").val(`${data[number].director}`);
    $("#date").val(`${Convert_Date(data[number].date)}`);
    $("#rating").val(`${data[number].rating}`);
    if (data[number].isSeries) {
      $("#isSeries").prop("checked", true);
      $(".Episode-group").html(Add_Old_episodes(data[number].series_details));
      $("#season").val(`${data[number].series_details.length}`);
      $(".Alert_full_cover").css("display", "block");
      $(".Series_info").css("display", "block");
    } else {
      $("#isSeries").prop("checked", false);
      $(".Alert_full_cover").css("display", "block");
      $(".Series_info").css("display", "none");
    }
    temp_season_num = parseInt($("#season").val());
    $(".Alert_message_no").click(function () {
      $(".Alert_full_cover").css("display", "none");
    });
    $(".Alert_message_yes").click(function () {
      $("form[name='Fild_to_New']").validate({
        rules: {
          name: {
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
      if (!$("#Fild_to_New").valid()) return;
      if ($("#isSeries").is(":checked")) {
        let size = parseInt($("#season").val());
        let array = [];
        for (let i = 0; i < size; i++) {
          array.push(parseInt($(`#episode_${i}`).val()));
        }
        $.ajax({
          type: "PUT", // define the type of HTTP verb we want to use (POST for our form)
          url: `/movies/${data[number].id}`, // the url where we want to POST
          contentType: "application/json",
          data: JSON.stringify({
            id: data[number].id,
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
            }).then(() => location.reload());
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
          type: "PUT", // define the type of HTTP verb we want to use (POST for our form)
          url: `/movies/${data[number].id}`, // the url where we want to POST
          contentType: "application/json",
          data: JSON.stringify({
            id: data[number].id,
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
            }).then(() => location.reload());
          },
          error: function (jqXhr, textStatus, errorThrown) {
            swal("Editing the movie failed", {
              icon: "error",
            });
            console.log(errorThrown);
          },
        });
      }
      $(".Alert_full_cover").css("display", "none");
    });
  });
  /**
   * on/off checkbox of series
   */
  $("#isSeries").change(function () {
    if ($("#isSeries").is(":checked")) {
      $(".Series_info").css("display", "block");
    } else {
      $(".Series_info").css("display", "none");
    }
  });
  /**
   * Adds and deletes fields for new season on click
   */
  $("#season").change(function () {
    let season_num = parseInt($(this).val());
    if (season_num < temp_season_num) {
      for (let i = 0; i < temp_season_num - season_num; i++) {
        $(".Episode-group").children().last().remove();
      }
    } else {
      $(".Episode-group").append(
        Add_New_episodes(temp_season_num, season_num - temp_season_num)
      );
    }
    temp_season_num = season_num;
  });
  /**
   * displays all actors on button click
   */
  $("body").on("click", ".Actors_List_button", function (button) {
    let number = parseInt(button.target.id.split("^")[1]);
    let id = data[number].id;
    let html_actor = Create_html_actor(data[number].actors, id, number);
    $(".Actor-group").html(html_actor);
    $(".Alert_full_cover_2").css("display", "block");
    $(".Actor-group").css("display", "block");
    $("body").on("click", ".Delete_actor_button", function (button) {
      let actor = button.target.id.split("^")[1];
      let id_Movie = button.target.id.split("^")[2];
      let number = parseInt(button.target.id.split("^")[3]);
      $.ajax({
        url: `/movies/${id_Movie}/actor/${actor}`,
        type: "DELETE",
        success: function () {
          swal(`The actor : ${actor} has been removed!`, {
            icon: "success",
          })
            .then(() => $(`#Actor_${actor}`).remove())
            .then(() => {
              delete data[number].actors[actor];
            });
        },
        error: function (err) {
          swal(`Deleting actor: ${actor} is failed`, {
            icon: "error",
          });
          console.log("err", err);
        },
      });
    });
    $("body").on("click", ".Alert_message_Close", function (button) {
      $(".Alert_full_cover_2").css("display", "none");
      $(".Actor-group").css("display", "none");
    });
  });
  $("body").on("click", ".Add_button", function (button) {
    location.href = "/add_new_Movie";
  });
  $("body").on("click", ".Add_Actor_button_withoutMovie", function () {
    (async () => {
      const { value: formValues } = await Swal.fire({
        title: `Add Actor to Collection`,
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Write Name here">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Write URL Picture here">' +
          '<input id="swal-input3" class="swal2-input" placeholder="Write URL site fan here">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            $("#swal-input1").val(),
            $("#swal-input2").val(),
            $("#swal-input3").val(),
          ];
        },
      });

      if (formValues) {
        if (
          formValues[0] === "" ||
          formValues[1] === "" ||
          formValues[2] === ""
        ) {
          swal({
            title: "The name and picture and fan site are required",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          });
          return;
        }
        if (!isValidHttpUrl(formValues[1]) || !isValidHttpUrl(formValues[2])) {
          swal({
            title: "The picture and the fan site must be url",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          });
          return;
        }
        swal({
          title: "Are you sure to add this actor to move?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willAdded) => {
          if (willAdded) {
            $.ajax({
              url: `/actor/${formValues[0]}`,
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                name: formValues[0],
                picture: formValues[1],
                site: formValues[2],
              }),
              success: function () {
                swal(`The actor has been added to db!`, {
                  icon: "success",
                }).then(() => location.reload());
              },
              error: function (err) {
                swal("The actor has not been added db", {
                  icon: "error",
                });
                console.log("err", err);
              },
            });
          } else {
            swal("The actor has not been added to db", {
              icon: "error",
            });
          }
        });
      }
    })();
  });
});
