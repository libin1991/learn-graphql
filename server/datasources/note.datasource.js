const { RESTDataSource } = require('apollo-datasource-rest')
const config = require('../config')

class NoteAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `http://127.0.0.1:${config.URL.port}/note/`
  }

  async getNotes (params) {
    let { data, msg, code } = await this.get('notes', params)
    data = Array.isArray(data) ? data.map(user => this.noteReducer(user)) : []
    return {
      data,
      code,
      msg
    }
  }

  async getNoteById (params) {
    let { data, msg, code } = await this.get('/', params)
    data = this.noteReducer(data)
    return {
      data,
      code,
      msg
    }
  }

  async getCurrentUserNote () {
    let { data, msg, code } = await this.get('/current')
    data = this.noteReducer(data)
    return {
      data,
      code,
      msg
    }
  }

  async addNote (params) {
    let { code, msg } = await this.post('/', { ...params })
    return {
      code,
      msg
    }
  }

  async updateNote (params) {
    let { code, msg } = await this.put('/', { ...params })
    return {
      code,
      msg
    }
  }

  async deleteNote (params) {
    let { code, msg } = await this.delete('/', { ...params })
    return {
      code,
      msg
    }
  }

  async noteReducer (note) {
    const { id, title, detail, createDate, uId } = note
    return {
      id,
      title,
      detail,
      createDate,
      uId
    }
  }
}

module.exports = NoteAPI
