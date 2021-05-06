getSong();

setInterval(function() {
    getSong()
}, 2000);

function getSong() {
    jQuery.ajax({
        url: "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=[YOUR_LASTFM_USERNAME]&api_key=[YOUR_API_KEY]&format=json",
        type: "GET",
        dataType: "json",
        async: false,
        success: function(data) {
            showSpotifyWidget(data.recenttracks.track[0]);
        }
    });
}

function showSpotifyWidget(lastSong) {
    var lastSongName = lastSong.artist["#text"] + " | " + lastSong.name;
    var lastSongAlbum = "> " + lastSong.album["#text"];
    var lastSongUrl = lastSong.image[3]["#text"];

    if (lastSongName.length > 29) {
        lastSongName = lastSongName.substring(0, 29) + "...";
    }

    if (lastSongAlbum.length > 25) {
        lastSongAlbum = lastSongAlbum.substring(0, 19) + "...";
    }
    
    if (lastSongUrl == "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png") {
        lastSongUrl = "https://sc04.alicdn.com/kf/U866b4bda76d249f8920c19093500a98fb.jpg"
    }



    if (lastSong.hasOwnProperty('@attr')) {
        $("#nowLink").attr("href", lastSong.url);
        $("#nowWidgetIMG").attr("src", lastSongUrl);
        $('#nowSong').text(lastSongName);
        $('#nowAlbum').text(lastSongAlbum);
    } else {
        $("#nowLink").attr("href", lastSong.url);
        $("#nowWidgetIMG").attr("src", lastSongUrl);
        $('#nowSong').text(lastSongName)
        $('#nowAlbum').text(lastSongAlbum + "(Not listening now)");
    }
}
