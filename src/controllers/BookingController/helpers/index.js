const helper = {

    isPeriodValid(checkin, checkout) {
        if (checkout <= checkin) {
            return false
        } else {
            return true
        }
    }

}

module.exports = helper