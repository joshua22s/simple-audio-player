import { Song } from "./song";

export class Playlist {
    id: string;
    name: string;
    songs: Song[];
    lastPlayed: Song;
    lastSongPlayedId: string;
    created: number;
}