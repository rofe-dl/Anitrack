const express = require('express');
const route = express.Router();

const { registerFormValidations } = require('../utils/validator');
const {controller, user_controller, api_controller} = require('../controller');
const { ensureAuthenticated } = require('../utils/authenticated');

/**
 * Root URL.
 */
route.get('/', controller.homeRoute);

/**
 * URL sequence matters, so edit with care.
 * For example, if viewAnimeInfo put before searchAnime, it'll treat
 * /anime/search as a viewAnimeInfo URL, with search as the animeID, and won't
 * return anything.
 */
route.get('/anime/search', api_controller.searchAnime);
route.get('/anime/season-search', api_controller.searchAnimeBySeason);
route.get('/anime/:animeID', api_controller.viewAnimeInfo);

route.get('/watchlist', ensureAuthenticated, user_controller.getWatchlist);
route.get('/add-anime/:anime_id', ensureAuthenticated, user_controller.addAnime);
route.get('/remove-anime/:anime_id', ensureAuthenticated, user_controller.removeAnime);

route.get('/register', user_controller.getRegister);
route.get('/login(/:email)?', user_controller.login);
route.get('/logout', user_controller.logout);

route.post('/register', registerFormValidations , user_controller.postRegister);
route.post('/login', user_controller.postLogin);

// line used to define what gets returned when require() is called on this file
module.exports = route;