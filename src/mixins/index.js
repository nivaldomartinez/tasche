export const defaultMixin = {
  data () {
    return {
      currentUser: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    showNotification (text, isError) {
      this.$toast.open({
        message: text,
        queue: false,
        type: isError ? 'is-danger' : 'is-info',
        position: 'is-bottom'
      })
    },
    showDeleteConfirmation (message, position, callback) {
      this.$snackbar.open({
        message: message,
        type: 'is-danger',
        position: position,
        actionText: 'Eliminar',
        queue: false,
        onAction: callback
      })
    }
  }
}
