const form = document.getElementById("playlist-form");
const playlistsContainer = document.getElementById("playlists-container");

let playlists = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const genre = document.getElementById("genre").value.trim();
  const artist = document.getElementById("artist").value.trim();
  const album = document.getElementById("album").value.trim();
  const song = document.getElementById("song").value.trim();

  const playlist = { genre, artist, album, song };
  playlists.push(playlist);

  renderPlaylists();
  form.reset();
});

function renderPlaylists() {
  playlistsContainer.innerHTML = "";

  const grouped = groupByGenre(playlists);

  for (const genre in grouped) {
    const genreDiv = document.createElement("div");
    genreDiv.className = "playlist";
    genreDiv.innerHTML = `<h3>${genre}</h3>`;

    grouped[genre].forEach((item) => {
      const entry = document.createElement("p");
      entry.textContent = `${item.artist} - ${item.song} ${
        item.album ? `(${item.album})` : ""
      }`;
      genreDiv.appendChild(entry);
    });

    playlistsContainer.appendChild(genreDiv);
  }
}

function groupByGenre(playlists) {
  return playlists.reduce((acc, item) => {
    if (!acc[item.genre]) {
      acc[item.genre] = [];
    }
    acc[item.genre].push(item);
    return acc;
  }, {});
}
