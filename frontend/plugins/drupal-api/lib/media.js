import { find, get } from 'lodash'
export default {
  /*
   * @param {Object} topLevelResponse
   *   The top level json api reponse from Drupal with Entity and included key
   *   that contains related entities.
   * @param {Object|null} entity
   *   This can be a one of the related entities that has the image field to
   *   pull, i.e. the image you want is not on the topLevelResponse, but one
   *   of the included entities.
   * @param {String} relationship
   *   The field name of the image field default "field_image"
   * @param {String} imageStyle
   *   The image style that you want from drupal, i.e. non exhaustive: portrait,
   *   thumbnail, etc.
   * @param {Object} fallback
   *   If we can not get the image we can pass a default image at call time.
   */
  buildImg(
    topLevelResponse = {},
    entity = null,
    relationship = 'field_image',
    imageStyle = 'thumbnail',
    fallback = {}
  ) {
    const media = find(
      get(topLevelResponse, 'included'),
      (include) =>
        get(include, 'id') ===
        get(entity, `relationships.${relationship}.data.id`)
    )
    const file = find(
      get(topLevelResponse, 'included'),
      (include) =>
        get(include, 'id') === get(media, `relationships.imageFile.data.id`)
    )
    return {
      src: get(file, `links.${imageStyle}.href`),
      // @todo: Replace this with real alt meta if available.
      alt: get(file, 'attributes.filename')
    }
  }
}
