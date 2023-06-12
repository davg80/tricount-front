export default {
    setAttendees(state, attendees) {
      console.log(attendees)
      state.attendees = attendees
    },
    setCount(state, count) {
      state.count = count
    },
    setAttendeesActifs(state, attendeesActifs) {
      state.attendeesActifs = attendeesActifs
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