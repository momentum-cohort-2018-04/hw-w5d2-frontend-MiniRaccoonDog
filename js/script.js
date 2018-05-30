import Page from './Page'
// import Preview from './Preview'
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
    let newpage = $(this).html()
    $('.grid').html(window.pageArray[(newpage - 1)])
  })
  $('#pages-bottom a').click(function (event) {
    event.preventDefault()
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
      pushIdifExists(artistArray, 2, artistIds, `artistId`)
      for (var i = 0; i <= 1; i++) {
        let id = artistIds[i]
        idLookup(id)
      }
      setTimeout(function () {
        let whole = catArray(IDARRAY)
        // console.log('whole', whole)
        let idPage = new Page(whole)
        window.pageArray = idPage.buildPaginator()
        idPage.makePageArray()
        $('.grid').html(window.pageArray[0])
        activateNav()
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
      pushIdifExists(albumArray, 4, albumIds, `collectionId`)

      console.log(albumIds)
      for (var i = 0; i <= 3; i++) {
        let id = albumIds[i]
        idLookup(id)
      }
      setTimeout(function () {
        let whole = catArray(IDARRAY)
        // console.log('whole', whole)
        let idPage = new Page(whole)
        console.log('idPage', idPage)
        window.pageArray = idPage.buildPaginator()
        idPage.makePageArray()
        $('.grid').html(window.pageArray[0])
        activateNav()
      }, 250)
      IDARRAY = []
    })
}

function pushIdifExists (givenarray, number, arrayIDs, key) {
  for (var i = 0; i < number; i++) {
    if (givenarray[i]) {
      const iResult = new Page(givenarray[i])
      arrayIDs.push(iResult.array[key])
    }
  }
  console.log('push if if exists array', arrayIDs)
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

function catArray (array) {
  if (array.length === 0) {
    return []
  }
  return array[0].concat(catArray(array.slice(1)))
}
