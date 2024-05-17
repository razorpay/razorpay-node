"use strict";

/*
 * DOCS: https://razorpay.com/docs/subscriptions/api/
 */

const { normalizeDate } = require('../utils/razorpay-utils');

module.exports = function subscriptionsApi (api) {

  const BASE_URL = "/subscriptions",
        MISSING_ID_ERROR = "Subscription ID is mandatory";

  return {
  
    create (params={}, callback) {

      /*
       * Creates a Subscription
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let url = BASE_URL;

      return api.post({
        url,
        data: params       
      }, callback);
    },

    fetch (subscriptionId, callback) {
    
      /*
       * Fetch a Subscription given Subcription ID
       *
       * @param {String} subscriptionId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!subscriptionId) {
      
        return Promise.reject(MISSING_ID_ERROR);
      }

      let url = `${BASE_URL}/${subscriptionId}`;

      return api.get({url}, callback);
    },
    update (subscriptionId, params, callback) {
     
      /*
       * Update Subscription
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let url = `${BASE_URL}/${subscriptionId}`;
      
      if (!subscriptionId) {
      
        return Promise.reject(MISSING_ID_ERROR);
      }

      return api.patch({
        url : url,
        data : params       
      }, callback);
    },
    pendingUpdate (subscriptionId, callback) {
  

      /*
       * Update a Subscription
       *
       * @param {String} subscription
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = `${BASE_URL}/${subscriptionId}/retrieve_scheduled_changes`;

      if (!subscriptionId) {

        return Promise.reject(MISSING_ID_ERROR);
      }

      return api.get({url}, callback);
    },
    cancelScheduledChanges (subscriptionId, callback) {
      
      /*
       * Cancel Schedule  
       *
       * @param {String} subscription
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = `${BASE_URL}/${subscriptionId}/cancel_scheduled_changes`;

      if (!subscriptionId) {

        return Promise.reject("Subscription Id is mandatory");
      }
      
      return api.post({
        url: url
      }, callback);
    },
    pause (subscriptionId, params={}, callback) {

      /*
       * Pause a subscription 
       *
       * @param {String} subscription
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = `${BASE_URL}/${subscriptionId}/pause`;

      if (!subscriptionId) {

        return Promise.reject("Subscription Id is mandatory");
      }
      
      return api.post({
        url: url,
        data: params
      }, callback);
    },
    resume (subscriptionId, params={}, callback) {

      /*
       * resume a subscription 
       *
       * @param {String} subscription
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = `${BASE_URL}/${subscriptionId}/resume`;

      if (!subscriptionId) {

        return Promise.reject("Subscription Id is mandatory");
      }
      
      return api.post({
        url: url,
        data: params
      }, callback);
    },
    deleteOffer (subscriptionId, offerId, callback) {
      
      /*
      * Delete an Offer Linked to a Subscription
      *
      * @param {String} subscription
      * @param {String} offerId
      * @param {Function} callback
      *
      * @return {Promise}
      */

      var url = `${BASE_URL}/${subscriptionId}/${offerId}`;

      if (!subscriptionId) {

        return Promise.reject("Subscription Id is mandatory");
      }
      
      return api.delete({
        url
      }, callback);
    },
    all (params={}, callback) {
    
      /*
       * Get all Subscriptions
       *
       * @param {Object} params
       * @param {Funtion} callback
       *
       * @return {Promise}
       */

      let { from, to, count, skip } = params,
          url = BASE_URL;

      if (from) {
        from = normalizeDate(from)
      }

      if (to) {
        to = normalizeDate(to)
      }

      count = Number(count) || 10
      skip = Number(skip) || 0

      return api.get({
        url,
        data: {
          ...params,
          from,
          to,
          count,
          skip
        }
      }, callback);
    },

    cancel (subscriptionId, cancelAtCycleEnd=false, callback) {
    
      /*
       * Cancel a subscription given id and optional cancelAtCycleEnd
       *
       * @param {String} subscription
       * @param {Boolean} cancelAtCycleEnd
       * @param {Function} callback
       *
       * @return {Promise}
       */

      const url = `${BASE_URL}/${subscriptionId}/cancel`;

      if (!subscriptionId) {
      
        return Promise.reject(MISSING_ID_ERROR);
      }

      if (typeof cancelAtCycleEnd !== "boolean") {
      
        return Promise.reject("The second parameter, Cancel at the end of cycle" +
                              " should be a Boolean");
      }

      return api.post({
        url,
        ...(cancelAtCycleEnd && {data: {cancel_at_cycle_end: 1}})
      }, callback);
    },

    createAddon (subscriptionId, params, callback) {
    
      /*
       * Creates addOn for a given subscription
       *
       * @param {String} subscriptionId
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      const url = `${BASE_URL}/${subscriptionId}/addons`;

      if (!subscriptionId) {
      
        return Promise.reject(MISSING_ID_ERROR);
      }

      return api.post({
        url,
        data: {...params}
      }, callback);
    },
    createRegistrationLink : function createRegistrationLink(params = {}, callback) {
      /*
       * Creates a Registration Link
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */
      return api.post({
        url: '/subscription_registration/auth_links',
        data: params
      }, callback)
    }
  };
}
