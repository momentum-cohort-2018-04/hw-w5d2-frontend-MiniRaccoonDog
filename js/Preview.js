const LENGTH = 20

class Preview {
  constructor (arrayEntry) {
    this.entry = arrayEntry
    this.artist = this.entry.artistName
    this.artistID = this.entry.artistId
    this.album = this.entry.collectionName
    this.albumID = this.entry.collectionId
    this.song = this.entry.trackName
    this.artURL = this.entry.artworkUrl100
    this.genre = this.entry.primaryGenreName
    this.preview = this.entry.previewUrl
  }

  createDivBlock () {
    return `<container class='sample' id='${this.preview}'><div class='sample__thumb'><image src='${this.artURL}'></div><div class='sample__info'>` + this.identifyLongNames('info-song', this.song, this.genre) + this.identifyLongNames('info-artist', this.artist, this.artistID) + this.identifyLongNames('info-album', this.album, this.albumID) + `</div></container>`
  }

  textShortEnough (value) {
    const trimLength = (value.match(/[\w\s]/g).join('')).length
    if (trimLength <= LENGTH) {
      return true
    } else { return false }
  }

  identifyLongNames (className, key, quality) {
    if (this.textShortEnough(key)) {
      if (className === 'info-song') {
        return `<div class='${className}' data_genre='${quality}'>${key}</div>`
      } else { return `<div class='${className}' data_id=${quality}>${key}</div>` }
    } else {
      if (className === 'info-song') {
        return `<div class='arrow ${className}' data_genre='${quality}'>${key}</div>`
      } else { return `<div class='arrow ${className}' data_id=${quality}>${key}</div>` }
    }
  }
}

export default Preview
