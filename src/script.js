//document ready
$(document).ready(function () {
  //variable declaration
  var url = "https://en.wikipedia.org/?curid=";
  var title, id, jsonData, snippet;

  //function that resets input form
  function resetInput() {
    $(".search-txt").val("").blur();
    $(".search-result > div").remove();
  }

  //error message function
  function errMessage() {
    resetInput();
    $(".search-result").html(
      "<div class=\"err-message\" align='center'>OOps! an error occurred. Please try again or refresh<div>"
    );
  }

  //Get input when enter is pressed
  $(".search-txt").keyup(function (event) {
    if (event.keyCode == 13) {
      var getString = $(".search-txt").val();
      $(".container").css({
        marginTop: "0"
      });
      $(".search-result").html(
        '<div class="preloader" align="center"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i></div>'
      );

      //Ajax call
      $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        data: {
          action: "query",
          list: "search",
          srsearch: getString,
          format: "json",
          utf8: 1,
          srlimit: 10,
          srprop: "snippet|titlesnippet"
        },
        success: function (result) {
          resetInput();
          //if there are no result
          if (result.query.searchinfo.totalhits === 0) {
            $(".search-result").html(
              "<div class=\"err-message\" align='center'>Sorry, no result found for: <span class='get-string'>" +
                getString +
                "</span>. Please try again.<div>"
            );
          }
          //if there are results
          else {
            jsonData = result.query.search;
            for (var i in jsonData) {
              title = jsonData[i].title;
              snippet = jsonData[i].snippet;
              id = jsonData[i].pageid;
              $(".search-result").append(
                "<div class=\"result-txt\"><a target='_blank' href=" +
                  url +
                  id +
                  "><h3>" +
                  title +
                  "</h3><p>" +
                  snippet +
                  "</p></a></div>"
              );
            }
          }
          //if request fails
        },
        error: function () {
          errMessage();
        },
        dataType: "jsonp"
      }); //end of ajax call
    }
  }); //end of get input

  //get random article
  $(".rand-btn").click(function () {
    resetInput();
    $(".container").css({
      marginTop: "0"
    });
    $(".search-result").html(
      '<div class="preloader" align="center"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i></div>'
    );

    //Ajax call
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php",
      data: {
        action: "query",
        list: "random",
        rnnamespace: 0,
        rnlimit: 4,
        format: "json"
      },
      success: function (result) {
        resetInput();
        jsonData = result.query.random;
        for (var i in jsonData) {
          title = jsonData[i].title;
          id = jsonData[i].id;
          $(".search-result").append(
            "<div class=\"result-txt\"><a target='_blank' href=" +
              url +
              id +
              "><h3>" +
              title +
              "</h3></a></div>"
          );
        }
      },
      error: function () {
        errMessage();
      },
      dataType: "jsonp"
    }); //end of Ajax call
  });
}); //end of document ready
