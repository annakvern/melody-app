export const PlaylistModel = (() => {
  const STORAGE_KEY = "myPlaylists";
  let playlists = load();

  function load() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  }

  function getAll() {
    return playlists;
  }

  function addPlaylist(name) {
    if (!playlists.find((p) => p.name === name)) {
      playlists.push({ name, songs: [] });
      save();
    }
  }

  function addSongToPlaylist(playlistName, song) {
    const playlist = playlists.find((p) => p.name === playlistName);
    if (playlist) {
      playlist.songs.push(song);
      save();
    }
  }

  return {
    getAll,
    addPlaylist,
    addSongToPlaylist,
  };
})();
