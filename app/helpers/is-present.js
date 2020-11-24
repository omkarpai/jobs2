import { helper } from '@ember/component/helper'

export default helper(function isPresent(args) {
    let [skippedArray, date] = args
    let dateIsPresent = false
    skippedArray.forEach((element) => {
        if (element.skippedDate === date) {
            dateIsPresent = true
        }
    })
    if (dateIsPresent) {
        return true
    } else {
        return false
    }
})
