import { PlaylistItemGroup } from "./playlistItemGroup";
import { Song } from "./song";

export class PlaylistItem {
    id: string;
    name: string;
    songId: string;
    song: Song;
    playlistId: string;
    orderIndex: number;
    playlistItemGroupId: string;
    playlistItemGroup: PlaylistItemGroup;
}