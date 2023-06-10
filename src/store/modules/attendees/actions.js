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
        context.commit('setMessages', response.data.msg)
      })
      .catch((error) => {
        if (error.response.data) {
          context.commit('setErrorsForm', error.response.data)
        }
      })
  },
  createAttendee(context, attendees) {
    axios
      .post(`${BASE_URL}/attendees`, attendees)
      .then((response) => {
        context.commit('addNewAttendee', response.data.attendee)
        context.commit('setMessages', response.data.msg)
      })
      .catch((error) => {
        if (error.response.data) {
          context.commit('setErrorsForm', error.response.data)
        }
      })
  }
}
