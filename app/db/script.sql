CREATE TABLE IF NOT EXISTS playlist (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    created INTEGER,
    lastItemPlayedId TEXT,
    songs_folder TEXT
);

CREATE TABLE IF NOT EXISTS playlist_item (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    songId TEXT NOT NULL,
    playlistItemGroupId TEXT NOT NULL,
    playlistId TEXT NOT NULL,
    CONSTRAINT FK_song_playlist FOREIGN KEY (playlistId) REFERENCES playlist(id)
);
CREATE TABLE IF NOT EXISTS playlist_item_group (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    orderIndex INTEGER
);

CREATE TABLE IF NOT EXISTS song (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    path TEXT NOT NULL,
    duration INTEGER,
    orderIndex INTEGER
);

CREATE TABLE IF NOT EXISTS app_config (
    lastPlaylistId TEXT
);

INSERT INTO app_config(lastPlaylistId) VALUES('-1');