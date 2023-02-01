CREATE TABLE IF NOT EXISTS playlist (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    created INTEGER
);
CREATE TABLE IF NOT EXISTS song (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    path TEXT NOT NULL,
    duration INTEGER,
    orderIndex INTEGER,
    playlistId TEXT NOT NULL,
    CONSTRAINT FK_song_playlist FOREIGN KEY (playlistId) REFERENCES playlist(id)
);