import { PlaylistItem } from "./playlistItem";

export class PlaylistItemGroup {
    id: string;
    name: string;
    orderIndex: number;
    items: PlaylistItem[];
}