import Page from './Page'
import Preview from './Preview'
import $ from 'jquery'
import request from 'superagent'

const URL = `https://itunes.apple.com/search?term=`
var IDARRAY = []

$(document).ready(function () {
  $('#music-search').submit(function (event) {
    event.preventDefault()
    let inputs = $(this).serializeArray()
    this.reset()
    const querytype = inputs[0].value
    const queryvalue = inputs[1].value
    const searchterm = queryvalue.toLowerCase().replace(/\s+/g, '+')
    switch (querytype) {
      case 'search':
        console.log('general search')
        generalSearch(searchterm)
        break
      case 'artist':
        console.log('artist called')
        artistSearch(searchterm)
        break
      case 'album':
        console.log('album called')
        albumSearch(searchterm)
        break
      case 'song':
        console.log('song called')
        songSearch(searchterm)
        break
    }
  })

  $('.nav__icon').hover(function () {
    $(this).nextAll().addClass('show')
  })
  $('.nav__search').mouseleave(function () {
    $(this).removeClass('show')
  })
  $('.nav__music').mouseleave(function () {
    $(this).removeClass('show')
  })
  $('.goto').click(function () {
    console.log(this)
  })
})

function generalSearch (query) {
  request.get(URL + query + `&media=music`)
    .then(function (response) {
      const responseObject = JSON.parse(response.text)
      const page = new Page(responseObject.results)
      window.pageArray = page.buildPaginator()
      page.makePageArray()
      $('.grid').html(window.pageArray[0])
      activateNav()
    })
}

function activateNav () {
  $('#pages-top a').click(function (event) {
    event.preventDefault()
    console.log(this)
    let newpage = $(this).html()
    $('.grid').html(window.pageArray[(newpage - 1)])
  })
  $('#pages-bottom a').click(function (event) {
    event.preventDefault()
    console.log(this)
    let newpage = $(this).html()
    $('.grid').html(window.pageArray[(newpage - 1)])
  })
}

function songSearch (query) {
  request.get(URL + query + `&attribute=songTerm`)
    .then(function (response) {
      const responseObject = JSON.parse(response.text)
      const page = new Page(responseObject.results)
      window.pageArray = page.buildPaginator()
      page.makePageArray()
      $('.grid').html(window.pageArray[0])
      activateNav()
    })
}

function artistSearch (query) {
  request.get(URL + query + `&entity=musicArtist`)
    .then(function (response) {
      const responseObject = JSON.parse(response.text)
      const artistArray = responseObject.results
      const artistIds = []
      if (artistArray[0]) {
        const firstResult = new Page(artistArray[0])
        artistIds.push(firstResult.array.artistId)
      }
      if (artistArray[1]) {
        const secondResult = new Page(artistArray[1])
        artistIds.push(secondResult.array.artistId)
      }
      // if (artistArray[2]) {
      //   const thirdResult = new Page(artistArray[2])
      //   artistIds.push(thirdResult.array.artistId)
      // }
      // console.log(artistIds)
      // const masterArtistId = []
      for (var i = 0; i <= 1; i++) {
        let id = artistIds[i]
        idLookup(id)
      }
      setTimeout(function () {
        let whole
        console.log('windowID', IDARRAY)
        if (IDARRAY.length === 2) {
          whole = IDARRAY[0].concat(IDARRAY[1])
        } else { whole = IDARRAY[0] }
        let idPage = new Page(whole)
        window.pageArray = idPage.buildPaginator()
        idPage.makePageArray()
        $('.grid').html(window.pageArray[0])
        activateNav()
        // console.log('WHOLE', whole)
      }, 75)
      IDARRAY = []
    })
}

function albumSearch (query) {
  // request.get(URL + query + `&attribute=albumTerm`)
  request.get(URL + query + `&entity=album`)
    .then(function (response) {
      const responseObject = JSON.parse(response.text)
      const albumArray = responseObject.results
      console.log(albumArray)
      const albumIds = []
      if (albumArray[0]) {
        const firstResult = new Page(albumArray[0])
        albumIds.push(firstResult.array.collectionId)
      }
      if (albumArray[1]) {
        const secondResult = new Page(albumArray[1])
        albumIds.push(secondResult.array.collectionId)
      }
      if (albumArray[2]) {
        const thirdResult = new Page(albumArray[2])
        albumIds.push(thirdResult.array.collectionId)
      }
      if (albumArray[3]) {
        const fourthResult = new Page(albumArray[2])
        albumIds.push(fourthResult.array.collectionId)
      }
      console.log(albumIds)
      for (var i = 0; i <= 3; i++) {
        let id = albumIds[i]
        idLookup(id)
      }
      setTimeout(function () {
        let whole
        console.log('windowID', IDARRAY)
        if (IDARRAY.length > 1) {
          whole = IDARRAY[0].concat(IDARRAY[1]).concat(IDARRAY[2]).concat(IDARRAY[3])
          // for (var i = 0; i < (IDARRAY.length - 1); i++){
          //   whole = IDARRAY[0].concat(IDARRAY[1]).concat(IDARRAY[2]).concat(IDARRAY[3]])
          // }
        } else { whole = IDARRAY[0] }
        let idPage = new Page(whole)
        window.pageArray = idPage.buildPaginator()
        idPage.makePageArray()
        $('.grid').html(window.pageArray[0])
        activateNav()
        // console.log('WHOLE', whole)
      }, 150)
      IDARRAY = []
    })
}

function idLookup (id) {
  console.log(id)
  request.get(`https://itunes.apple.com/lookup?id=${id}&entity=song`)
    .then(function (response) {
      let responseObject = JSON.parse(response.text)
      let idrawResponse = responseObject.results
      console.log(idrawResponse)
      let idResponse = idrawResponse.slice(1)
      console.log(idResponse)
      IDARRAY.push(idResponse)
    })
}
// const URL = `https://itunes.apple.com/search?term=`
