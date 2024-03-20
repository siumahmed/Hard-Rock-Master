function searchSong() {
    const searchBar = document.getElementById("searchSong").value;
    const url = `https://api.lyrics.ovh/suggest/${searchBar}`;
 
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data))
        .catch(error => displayError(error));
}

function displaySongs(songs) {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.data.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
    });
}

function getLyric(artist, title) {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))
        .catch(error => displayError(error));
}

function displayLyrics(lyrics) {
    const songContainer = document.getElementById('song-container');
    const lyricsDiv = document.createElement('div');
    lyricsDiv.className = 'song-lyrics';
    lyricsDiv.innerText = lyrics;
    songContainer.appendChild(lyricsDiv);
}

function displayError(error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
}
