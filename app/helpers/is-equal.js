import { helper } from '@ember/component/helper'

export default helper(function isEqual(args) {
    let [date1, date2] = args

    if (date1 === date2) {
        return true
    } else {
        return false
    }
})
