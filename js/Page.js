import Preview from './Preview'

class Page {
  constructor (array) {
    this.array = array
  }
  stepThrough () {
    // console.log('stepthro')
    const htmlArray = []
    // console.log(this.array)
    const originalArray = this.array
    // console.log('original array?', originalArray)
    // console.log(typeof (originalArray))
    for (var i = 0; i < originalArray.length; i++) {
      // console.log(originalArray[i])
      let eachObject = originalArray[i]
      let eachPreview = new Preview(eachObject)
      htmlArray.push(eachPreview.createDivBlock())
    }
    return htmlArray
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

  scaleSlicing (htmlArray) {
    if (window.matchMedia('(min-width: 700px)').matches) {
      /* the viewport is at least 700 pixels wide */
      return this.arraySlicer(20, htmlArray)
    } else {
      /* the viewport is less than 700 pixels wide */
      return this.arraySlicer(9, htmlArray)
    }
  }
  // length of this for how many

  // paginator (n) {
  //   const arrayforHTML = this.stepThrough()
  //   const eachPage = this.scaleSlicing(arrayforHTML)
  //   return eachPage[n]
  // }

  paginator (n) {
    const arrayforHTML = this.stepThrough()
    const pageArrays = this.scaleSlicing(arrayforHTML)
    return pageArrays
  }
}

// this can go in Page.js
/*
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
*/
export default Page
