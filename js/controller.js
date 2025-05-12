import { PlaylistModel } from "./model.js";
import { PlaylistView } from "./view.js";

export const PlaylistController = (() => {
  const playlistCreateForm = document.getElementById("playlist-create-form");
  const songForm = document.getElementById("song-form");
  const playlistSelect = document.getElementById("playlist-select");

  function init() {
    playlistCreateForm.addEventListener("submit", handleCreatePlaylist);
    songForm?.addEventListener("submit", handleAddSong);
    render();
  }

  function handleCreatePlaylist(e) {
    e.preventDefault();
    const name = document.getElementById("playlist-name").value.trim();
    PlaylistModel.addPlaylist(name);
    render();
    playlistCreateForm.reset();
  }

  function handleAddSong(e) {
    e.preventDefault();
    const selected = playlistSelect.value;
    const genre = document.getElementById("genre").value.trim();
    const artist = document.getElementById("artist").value.trim();
    const title = document.getElementById("song").value.trim();

    if (selected && genre && artist && title) {
      PlaylistModel.addSongToPlaylist(selected, { genre, artist, song: title });
      render();
      songForm.reset();
    }
  }

  function render() {
    const allPlaylists = PlaylistModel.getAll();
    PlaylistView.updatePlaylistSelect(allPlaylists);
    PlaylistView.render(allPlaylists);
  }

  return { init };
})();
