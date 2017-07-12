window.onload = function () {
  document.getElementById("search").focus();
};

function search() {
  var searchInput = document.getElementById("search").value;
  document.getElementById('searchResults').innerHTML = '';

  fetch('https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&gsrsearch=' + searchInput + '&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&indexpageids=').then(function (response) {
    if (response.status !== 200) {
      console.log('There was a problemm with response. Status Code: ' + response.status);
      return;
    }
    response.json().then(function (data) {
      var response = data;
      var pageId = data.query.pageids;

      for (i = 0; i <= pageId.length - 1; i++) {
        var title = response.query.pages[pageId[i]].title;
        var wikiLink = '<a href="https://en.wikipedia.org/?curid=' + pageId[i] +
          '" target="_blank">' + title + '</a>';
        document.getElementById('searchResults').innerHTML += '<div class="results">' +
          wikiLink + ' - ' + response.query.pages[pageId[i]].extract + '<br>' + '</div>';
        searchInput = '';
      }
    clearFields();
    });
  }).catch(function (err) {
    console.log('We got an error! :(', err);
  });
}

document.getElementById("search")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      document.getElementById("btn-search").click();
    }
  });

function clearFields() {
  document.getElementById("search").value = "";
}
