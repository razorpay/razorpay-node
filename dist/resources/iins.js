'use strict';

module.exports = function (api) {

    var BASE_URL = "/iins";

    return {
        fetch: function fetch(tokenIin, callback) {
            return api.get({
                url: BASE_URL + "/" + tokenIin
            }, callback);
        }
    };
};