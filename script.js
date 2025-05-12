window.addEventListener("DOMContentLoaded", main);

const playlistsContainer = document.getElementById("playlists-container");
const playlistCreateForm = document.getElementById("playlist-create-form");
const songForm = document.getElementById("song-form");
const playlistSelect = document.getElementById("playlist-select");
const STORAGE_KEY = "myPlaylists";
let playlists = loadPlaylists();

function main() {
  console.log("Loaded playlists from localStorage:", playlists);

  updatePlaylistSelect();
  renderPlaylists();
}

function loadPlaylists() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function savePlaylists() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
}

playlistCreateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("playlist-name").value.trim();
  if (name && !playlists.find((p) => p.name === name)) {
    playlists.push({ name, songs: [] });
    updatePlaylistSelect();
    renderPlaylists();
    savePlaylists();
  }
  playlistCreateForm.reset();
});

songForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedPlaylist = playlistSelect.value;
  const genre = document.getElementById("genre").value.trim();
  const artist = document.getElementById("artist").value.trim();
  const song = document.getElementById("song").value.trim();
  console.log("Submit song form:");
  console.log("Playlist:", selectedPlaylist);
  console.log("Genre:", genre);
  console.log("Artist:", artist);
  console.log("Song:", song);

  if (selectedPlaylist && genre && artist && song) {
    const playlist = playlists.find((p) => p.name === selectedPlaylist);

    if (playlist) {
      playlist.songs.push({ genre, artist, song });
      renderPlaylists();
      savePlaylists();
      songForm.reset();
    } else {
      console.warn("Playlist not found for:", selectedPlaylist);
    }
  }
});

function updatePlaylistSelect() {
  playlistSelect.innerHTML = `<option value="">Select Playlist</option>`;
  playlists.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.name;
    option.textContent = p.name;
    playlistSelect.appendChild(option);
  });
}

function renderPlaylists() {
  console.log(playlists);

  playlistsContainer.innerHTML = "";

  playlists.forEach((p) => {
    const playlistDiv = document.createElement("div");
    playlistDiv.className = "playlist";
    playlistDiv.innerHTML = `<h3>${p.name}</h3>`;

    if (p.songs.length === 0) {
      playlistDiv.innerHTML += "<p>No songs yet.</p>";
    } else {
      p.songs.forEach((song) => {
        const songEl = document.createElement("p");
        songEl.textContent = `${song.genre} - ${song.artist} - ${song.song}`;
        playlistDiv.appendChild(songEl);
      });
    }

    playlistsContainer.appendChild(playlistDiv);
  });
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
