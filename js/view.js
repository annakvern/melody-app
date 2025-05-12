export const PlaylistView = (() => {
  const playlistsContainer = document.getElementById("playlists-container");
  const playlistSelect = document.getElementById("playlist-select");

  function updatePlaylistSelect(playlists) {
    playlistSelect.innerHTML = `<option value="">Select Playlist</option>`;
    playlists.forEach((p) => {
      const option = document.createElement("option");
      option.value = p.name;
      option.textContent = p.name;
      playlistSelect.appendChild(option);
    });
  }

  function render(playlists) {
    playlistsContainer.innerHTML = "";

    playlists.forEach((playlist) => {
      const playlistDiv = document.createElement("div");
      playlistDiv.className = "playlist";
      playlistDiv.innerHTML = `<h3>${playlist.name}</h3>`;

      if (playlist.songs.length === 0) {
        playlistDiv.innerHTML += "<p>No songs yet.</p>";
      } else {
        const genreGroups = {};

        playlist.songs.forEach((song) => {
          const { genre, artist, song: title } = song;
          if (!genreGroups[genre]) genreGroups[genre] = {};
          if (!genreGroups[genre][artist]) genreGroups[genre][artist] = [];
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

  return {
    render,
    updatePlaylistSelect,
  };
})();
