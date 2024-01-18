"use strict";

export default function (api) {
  const BASE_URL = "/iins";

  return {
    fetch(tokenIin, callback) {
      return api.get(
        {
          url: `${BASE_URL}/${tokenIin}`,
        },
        callback
      );
    },
  };
}
