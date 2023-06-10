export default {
    setAttendees(state, attendees) {
      console.log(attendees)
      state.attendees = attendees
    },
    setMessages(state, msg) {
      state.messages = msg
      setTimeout(() => {
        state.messages = ''
      }, 3000)
    },
    setCount(state, count) {
      state.count = count
    },
    setErrorsForm(state, error) {
      state.errorsForm = error
      state.errors = true
      setTimeout(() => {
        state.errorsForm = ''
      }, 3000)
    },
    addNewAttendee(state, newAttendee) {
      state.attendees.push(newAttendee)
    }
  }