'use strict';

module.exports = function (api) {

    const BASE_URL = "/iins";

    return {
        fetch(tokeIin, callback) {
            return api.get({
                url: `${BASE_URL}/${tokeIin}`,
            }, callback);
        },
    }
}