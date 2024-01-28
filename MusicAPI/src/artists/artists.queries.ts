export const artistQueries = {
    readArtists: `
        SELECT 
            DISTINCT artist
        FROM music.albums
    `
}