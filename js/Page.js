import Preview from './Preview'
import $ from 'jquery'

class Page {
  constructor (array) {
    this.array = array
    this.pageNum = 0
  }
  createPreviews () {
    // console.log('stepthro')
    const fullhtmlArray = []
    const originalArray = this.array
    for (var i = 0; i < originalArray.length; i++) {
      let eachObject = originalArray[i]
      let eachPreview = new Preview(eachObject)
      fullhtmlArray.push(eachPreview.createDivBlock())
    }
    return fullhtmlArray
  }

  arraySlicer (n, array) {
    var i = 0
    const pageArrays = []
    while (i < (array.length)) {
      var partialArray = array.slice(i, i + n)
      pageArrays.push(partialArray)
      i = i + n
    }
    return pageArrays
  }

  mediaQuerySlicing (htmlArray) {
    if (window.matchMedia('(min-width: 700px)').matches) {
      /* the viewport is at least 700 pixels wide */
      return this.arraySlicer(20, htmlArray)
    } else {
      /* the viewport is less than 700 pixels wide */
      return this.arraySlicer(9, htmlArray)
    }
  }

  buildPaginator () {
    const arrayforHTML = this.createPreviews()
    const pageArrays = this.mediaQuerySlicing(arrayforHTML)
    this.pageNum = pageArrays.length
    return pageArrays
  }

  makePageArray () {
    console.log('DID PAGE ARRAYS LENGTH UPDATE?', this.pageNum)
    const pagelinks = []
    for (let i = 1; i <= this.pageNum; i++) {
      pagelinks.push(`<li><a href="" id=${i}>${i}</a></li>`)
    }
    $('#pages-top').html(pagelinks.join(''))
    $('#pages-bottom').html(pagelinks.join(''))
    return pagelinks
  }
}

// this can go in Page.js
/*
function
*/
export default Page

13.22
