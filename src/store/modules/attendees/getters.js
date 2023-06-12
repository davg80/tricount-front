export default {
    getAttendees: (state) => state.attendees,
    getCount: (state) => state.count,
    getAttendeesActifs: (state) => state.attendeesActifs,
    getCountAttendees: (state) => state.attendeesActifs.filter((attendees) => attendees.user === localStorage.getItem('userId'))
}