/*STEP 1-- Get input from user*/
$(".js-search-form").submit(function (event) {
    //force JS to handle form submissions
    event.preventDefault();
    //use the input from the search form
    var userInput = $(".search-bar").val();
    getResults(userInput);
});

/*STEP 2-- Use input from user, call through API to get JSON info*/
function getResults(userSearchTerm) {
    $.getJSON("https://www.googleapis.com/youtube/v3/search", {
            part: "snippet",
            maxResults: 9,
            key: "AIzaSyBkUQ0jzlCrX1abh4zChxFSPT3_mna-1T4",
            q: userSearchTerm,
            type: "video"
        },
        function (receivedApiData) {
            console.log(receivedApiData);
            if (receivedApiData.pageInfo.totalResults == 0) {
                alert("No videos found.");
            } else {
                displaySearchResults(receivedApiData.items);
            }
        });
}

/*STEP 3-- Return info from the JSON in appropriate containers*/
function displaySearchResults(videosArray) {
    var buildTheHtmlOutput = "";

    $.each(videosArray, function (videosArrayKey, videosArrayValue) {
        buildTheHtmlOutput += "<li>";
        buildTheHtmlOutput += "<p>" + videosArrayValue.snippet.title + "</p>";
        buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>";
        buildTheHtmlOutput += "<img class='vid-pics' src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>";
        buildTheHtmlOutput += "</a>";
        buildTheHtmlOutput += "</li>";
    });

    $(".search-results ul").html(buildTheHtmlOutput);
}
