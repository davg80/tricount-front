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
    },
    updatedAttendee(state, updatedAttendee) {
      const oldAttendees = state.attendees
      const indexAttendee = oldAttendees.findIndex((attendee) => attendee._id === updatedAttendee._id)
      state.attendees.splice(indexAttendee, 1, updatedAttendee)
    },
    deleteAttendee(state, deletedAttendee) {
      state.attendees.splice(state.attendees.indexOf(deletedAttendee), 1)
    }
  }