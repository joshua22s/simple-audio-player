import { Song } from "./song";

export class Playlist {
    id: number;
    name: string;
    songs: Song[];
    lastPlayed: number;
}