import Page from './Page'
import Preview from './Preview'
import $ from 'jquery'
import request from 'superagent'

const URL = `https://itunes.apple.com/search?term=`
// const entireDivArray
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
        // artistSearch(searchterm)
        break
      case 'album':
        // albumSearch(searchterm)
        console.log('album called')
        break
      case 'song':
        // albumSearch(searchterm)
        console.log('song called')
        break
    }
  })
  /*
  $('.nav__music').hover(function () {
    console.log(this)
    $(this).children('.nav__bar').removeClass('none')
    // $(this).nextAll().removeClass('none')
    console.log($(this).nextAll())
    // })
  })
  */
  $('.goto').click(function () {
    console.log(this)
  })
})

function generalSearch (query) {
  request.get(URL + query + `&media=music`)
    .then(function (response) {
      const responseObject = JSON.parse(response.text)
      const page = new Page(responseObject.results)
      window.pageArray = page.paginator()
      // entireDivArray
      const numberOfPages = window.pageArray.length
      pageDiv(numberOfPages)
      $('.grid').html(window.pageArray[0])
      activateNav()
    })
}

// this can go in Page.js
function pageDiv (n) {
  console.log('availiable here?', window.pageArray)
  const pagelinks = []
  for (let i = 1; i <= n; i++) {
    pagelinks.push(`<li><a href="" id=${i}>${i}</a></li>`)
  }
  $('#pages-top').html(pagelinks.join(''))
  $('#pages-bottom').html(pagelinks.join(''))
  return pagelinks
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
