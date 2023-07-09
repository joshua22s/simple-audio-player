import { PlaylistItem } from "./playlistItem";
import { Song } from "./song";

export class Playlist {
    id: string;
    name: string;
    items: PlaylistItem[];
    lastPlayed: PlaylistItem;
    lastItemPlayedId: string;
    lastItemGroupPlayedId: string;
    lastItemPlayedPositionInSong: number;
    created: number;
    songsFolder: string;
    songCount: number;
}