import { first, isArray } from 'lodash'
export default {
  firstOrOnly(data) {
    if (isArray(data)) {
      return first(data)
    } else {
      return data
    }
  }
}
