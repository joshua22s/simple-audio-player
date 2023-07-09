import { PlaylistItem } from "./playlistItem";
import { PlaylistItemGroup } from "./playlistItemGroup";
import { Song } from "./song";

export class Playlist {
    id: string;
    name: string;
    items: PlaylistItem[];
    lastPlayed: PlaylistItem;
    lastItemPlayedId: string;
    created: number;
    songsFolder: string;
    songCount: number;

    groups: PlaylistItemGroup[];
}