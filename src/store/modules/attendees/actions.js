const BASE_URL = 'http://localhost:3333/api/v1'
import axios from 'axios'

export default {
  fetchAttendees(context) {
    console.log('Attendees')
    axios
      .get(`${BASE_URL}/attendees`)
      .then((response) => {
        console.log('GET Attendees')
        console.log(response.data)
        context.commit('setAttendees', response.data.attendees)
        context.commit('auth/setMessages', response.data.msg)
      })
      .catch((error) => {
        if (error.response.data) {
          context.commit('auth/setErrorsForm', error.response.data)
        }
      })
  },
  createAttendee(context, attendees) {
    axios
      .post(`${BASE_URL}/attendees`, attendees)
      .then((response) => {
        context.commit('addNewAttendee', response.data.attendee)
        context.commit('auth/setMessages', response.data.msg)
      })
      .catch((error) => {
        if (error.response.data) {
          context.commit('auth/setErrorsForm', error.response.data)
        }
      })
  },
  updateAttendee(context, updatedAttendee) {
    console.log(updatedAttendee)
    const attendee = context.state.attendees.find(
      (attendee) => attendee._id === updatedAttendee._id
    )
    console.log(attendee)

    axios
      .patch(`${BASE_URL}/attendees/${updatedAttendee._id}`, updatedAttendee)
      .then((response) => {
        console.log('updated Attendee')
        console.log(response.data)
        context.commit('updatedAttendee', updatedAttendee)
        context.commit('auth/setMessages', response.data.msg)
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          context.commit('auth/setErrorsForm', error.response.data)
        }
      })
  },
  deleteAttendee(context, deleteAttendee) {
    console.log(deleteAttendee)
    axios
      .delete(`${BASE_URL}/attendees/${deleteAttendee._id}`, deleteAttendee)
      .then((response) => {
        console.log('delete Attendee')
        context.commit('deleteAttendee', deleteAttendee)
        context.commit('auth/setMessages', response.data.msg)
      })
      .catch((error) => {
        if (error.response.data) {
          context.commit('auth/setErrorsForm', error.response.data)
        }
      })
  }
}
