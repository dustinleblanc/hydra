/**
 * @file
 * Provide some helpers for interacting with the Poets API
 */

import media from './lib/media'

export default ({ app }, inject) => {
  /**
   *  @param {Object} topLevelResponse
   *    This is the full json api response from drupal.
   *
   *  @param {Object} entity
   *    This is usually a node, but the main thing is it has to have
   *    an img relationship.
   *
   *  @param {String} relationship
   *    This is the name of the image field you are trying to access.
   *
   *  @param {String} imageStyle
   *    The machine name of the image style on Drupal.
   *
   * @return {Object}
   *   The scr URL of the image style and alt text.
   */
  inject('buildImg', media.buildImg)
}
