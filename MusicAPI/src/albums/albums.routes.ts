import { Router } from "express";
import * as AlbumsController from './albums.controller';
/*
The wild card import on line 2 allows us to give a class-like 
name to the methods exported by the controller. Notice the use 
on line 12, which shows the new naming convention and the use 
of AlbumsController defined on line 2.
*/
const router = Router();
router
    .route('/albums')
    .get(AlbumsController.readAlbums);

router
    .route('/albums/:artist')
    .get(AlbumsController.readAlbumsByArtist);

router
    .route('/albums/search/artist/:search')
    .get(AlbumsController.readAlbumsByArtistSearch);

router
    .route('/albums/search/description/:search')
    .get(AlbumsController.readAlbumsByDescriptionSearch);

router
    .route('/albums')
    .post(AlbumsController.createAlbum);

router
    .route('/albums')
    .put(AlbumsController.updateAlbum);

router
    .route('/albums/:albumId')
    .delete(AlbumsController.deleteAlbum);

export default router;
