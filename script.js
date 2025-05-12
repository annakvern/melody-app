window.addEventListener("DOMContentLoaded", main);

const playlistsContainer = document.getElementById("playlists-container");
const playlistCreateForm = document.getElementById("playlist-create-form");
const songForm = document.getElementById("song-form");
const playlistSelect = document.getElementById("playlist-select");

const STORAGE_KEY = "myPlaylists";
let playlists = loadPlaylists();

function main() {
  setupEventlisteners();
  updatePlaylistSelect();
  renderPlaylists();
}

function setupEventlisteners() {
  playlistCreateForm.addEventListener("submit", handleSubmitPlaylist);
  songForm?.addEventListener("submit", handleSongSubmit);
}

function loadPlaylists() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function savePlaylists() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
}

function handleSubmitPlaylist(e) {
  e.preventDefault();
  const name = document.getElementById("playlist-name").value.trim();
  if (name && !playlists.find((p) => p.name === name)) {
    playlists.push({ name, songs: [] });
    updatePlaylistSelect();
    renderPlaylists();
    savePlaylists();
  }
  playlistCreateForm.reset();
}

function handleSongSubmit(e) {
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
}

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
  playlistsContainer.innerHTML = "";

  playlists.forEach((playlist) => {
    const playlistDiv = document.createElement("div");
    playlistDiv.className = "playlist";
    playlistDiv.innerHTML = `<h3>${playlist.name}</h3>`;

    let songs = [...playlist.songs];

    if (songs.length === 0) {
      playlistDiv.innerHTML += "<p>No songs yet.</p>";
    } else {
      const genreGroups = {};

      playlist.songs.forEach((song) => {
        const { genre, artist, song: title } = song;

        if (!genreGroups[genre]) {
          genreGroups[genre] = {};
        }

        if (!genreGroups[genre][artist]) {
          genreGroups[genre][artist] = [];
        }

        genreGroups[genre][artist].push(title);
      });

      Object.entries(genreGroups).forEach(([genre, artists]) => {
        const genreHeading = document.createElement("h4");
        genreHeading.textContent = genre;
        playlistDiv.appendChild(genreHeading);

        Object.entries(artists).forEach(([artist, songs]) => {
          const artistHeading = document.createElement("p");
          artistHeading.innerHTML = `<strong>${artist}</strong>`;
          playlistDiv.appendChild(artistHeading);

          const songList = document.createElement("ul");
          songs.forEach((title) => {
            const li = document.createElement("li");
            li.textContent = title;
            songList.appendChild(li);
          });

          playlistDiv.appendChild(songList);
        });
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
