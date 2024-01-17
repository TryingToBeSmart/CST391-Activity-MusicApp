import { execute } from "../services/mysql.connector";
import { Track } from "./tracks.model";
import { trackQueries } from './tracks.queries';

export const readTracks =async (albumID:number) => {
    return execute<Track[]>(trackQueries.readTracks, [albumID]);
};

export const createTrack = async (track:Track, index: number, albumID: number) => {
    return execute<Track[]>(trackQueries.createTrack,
        [albumID, track.title, track.number, track.video, track.lyrics]);
};

export const updateTrack =async (track:Track) => {
    return execute<Track[]>(trackQueries.updateTrack,
        [track.title, track.number, track.video, track.lyrics, track.trackID]);
};