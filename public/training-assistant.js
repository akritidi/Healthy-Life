

const video_container = document.getElementById('video_container');

function init() {

    gapi.load('client', initClient);

  }
 
function initClient() {

    gapi.client.setApiKey("AIzaSyA99xc6HbGsDQLrpClBSrxLQrHqHTacbI8");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function() { console.log("GAPI client loaded for API"); }, function(err) { console.error("Error loading GAPI client for API", err); });

}
 
function execute(searchString) {
 
    let arr_search = {
        "part": 'snippet',
        "type": 'video',
        "order": 'viewCount',
        "maxResults": '8',
        "relevanceLanguage": 'en',
        "q": searchString
    };
 
    return gapi.client.youtube.search.list(arr_search)
    .then(function(response) {

        const listItems = response.result.items;
        if (listItems) {

            let output = '';
 
            listItems.forEach(item => {

                const videoId = item.id.videoId;
                output += `<iframe class="mr-1" width="auto" height="auto" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

            });
 
            video_container.innerHTML = output;
        }

    },

    function(err) { console.error("Execute error", err); });

}