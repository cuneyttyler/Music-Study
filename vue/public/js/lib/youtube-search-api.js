function searchYoutube(searchTerm,callback) {
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
        part: 'snippet',
        key: 'XXXXXX',
        q: searchTerm
    };

    $.getJSON(url, params, callback);
}

function showResults(results) {
    var html = "";
    var entries = results.items;

    $.each(entries, function (index, value) {
        var title = value.snippet.title;
        var thumbnail = value.snippet.thumbnails.default.url;
        html += '<p>' + title + '</p>';
        html += '<img src="' + thumbnail + '">';
    });

    $('#search-results').html(html);
}