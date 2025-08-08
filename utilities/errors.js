export class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = ''
  }
}

export class DBConnectionError extends Error {
  constructor (message) {
    super(message)
    this.name = ''
  }
}

export class NotFoundError extends Error {
  constructor (message) {
    super(message)
    this.name = ''
  }
}
