const axios = require('axios');

/**
 * Function to retrieve a set of comedy anime
 * @returns An array of Anime objects, wrapped in a promise because it's an async function
 */
module.exports.getComedyAnime = async() => {
    const animeFound = [];

    // axios.get returns a promise, so do await
    const response = await axios.get('https://api.jikan.moe/v3/genre/anime/4/1');

    // limits front page to 5 anime for every genre
    for (let i = 0; i < 5; i++){
        animeFound.push({
            imageURL : response.data.anime[i].image_url
        });
    }

    return animeFound;
    
};