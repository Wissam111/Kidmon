

const FakeMessageService = {
    sendMessage: (msg, contactData) => {
        console.log(msg, `to ${contactData}`)
    }
}


module.exports = FakeMessageService