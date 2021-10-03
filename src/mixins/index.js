import { SnackbarProgrammatic as Snackbar, ToastProgrammatic as Toast } from 'buefy'

export const defaultMixin = {
  created() {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
  },
  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    showNotification(text, isError) {
      Toast.open({
        message: text,
        queue: false,
        type: isError ? 'is-danger' : 'is-info',
        position: 'is-bottom'
      })
    },
    showDeleteConfirmation(message, position, callback) {
      Snackbar.open({
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

export const tutorialMixin = {
  created() {
    if (localStorage.getItem('tutorial')) {
      this.tutorial = true
    } else {
      this.tutorial = false
    }
  },
  data() {
    return {
      tutorial: true,
      file: ''
    }
  },
  computed: {
    tooltipMenu() {
      return { content: 'Agrega un nuevo sitio', visible: (this.tutorial && this.file === 'menu'), class: 'is-hidden-touch menu' }
    },
    tooltipTitleFile() {
      return { content: 'Agrega el nombre del sitio', visible: (this.tutorial && this.file === 'title'), class: 'is-hidden-touch info' }
    },
    tooltipUrlFile() {
      return { content: 'Agrega una url para el sitio, Ej: https://tasche.pages.dev', visible: (this.tutorial && this.file === 'url'), class: 'is-hidden-touch info' }
    },
    tooltipDescFile() {
      return { content: 'Agrega una descripcion sitio', visible: (this.tutorial && this.file === 'desc'), class: 'is-hidden-touch info' }
    },
    tooltipFolderFile() {
      return { content: 'Crea una carpeta', visible: (this.tutorial && this.file === 'folder'), class: 'is-hidden-touch info' }
    }
  }
}
