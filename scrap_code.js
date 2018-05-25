/// ////////////////from the HTML
`<label class="pages__direct">Go to Page
<input type="text" class="pages__direct-input" name="page_input">
<a href="#" class="goto"></a>
</label>`

/// /////////////////// from the css sheet
/*

// .nav {
//   position: fixed;
//   top: 1rem;
//   left: -.3rem;
//   flex-direction: column;
//   align-content: center;
//   z-index: 100;
//   width: 100%;
//   &__bar {
//     height: 64px;
//     width: 50%;
//     justify-content: center;
//     align-content: center;
//     margin: auto 0;
//     text-align: center;

//   }
//   &__icon {
//     height: 64px;
//     width: 64px;
//     background-color: $dark;
//     z-index: 1000;
//     // box-sizing: content-box;
//   }
//   &__music {
//     display: flex;
//     height: 100%;
//     background-color: $dark;
//     width: 90%;
//     padding: 1rem;
//   }
//   &__search {
//     height:100%;
//     background-color: $dark;
//     justify-content: center;
//     width: 90%;
//     padding: 1rem 2rem 0 2rem;
//     *{
//       height: 60%;
//     }
//   }
//   &__button {
//     padding: 0 1rem;
//   }
//   &__drop {
//     margin-right: 1rem;
//   }
// }


/*
.grid {
  flex-wrap: wrap;
.sample{
  padding: 1rem;
  display:flex;
    flex-direction: column;
    width: 25%;
    align-content: flex-start;
    text-align: center;
    // justify-content: center;
    // *{
    //   // display: flex;
    //   flex-direction: column;
    //   justify-content: center;
    // }
    div{
      display: block;
      position: relative;
      z-index: 2;
      top: -4rem;
      background-color: $trans-back;
      color: white;
    }
    img {
      // height: auto;
      width: 100%
    }
  }
  // height: 40rem;
  //TEMP
}*/

*/
// function generalSearch (query) {
//   request.get(URL + query + `&media=music`)
//     .then(function (response) {
//       const responseObject = JSON.parse(response.text)
//       const page = new Page(responseObject.results)
//       window.pageArray = page.buildPaginator()
//       // entireDivArray
//       const numberOfPages = window.pageArray.length
//       pageDiv(numberOfPages)
//       $('.grid').html(window.pageArray[0])
//       activateNav()
//     })
// }


// this can go in Page.js
// function pageDiv (n) {
//   console.log('availiable here?', window.pageArray)
//   const pagelinks = []
//   for (let i = 1; i <= n; i++) {
//     pagelinks.push(`<li><a href="" id=${i}>${i}</a></li>`)
//   }
//   $('#pages-top').html(pagelinks.join(''))
//   $('#pages-bottom').html(pagelinks.join(''))
//   return pagelinks
// }

/*
  $('.nav__music').hover(function () {
    console.log(this)
    $(this).children('.nav__bar').removeClass('none')
    // $(this).nextAll().removeClass('none')
    console.log($(this).nextAll())
    // })
  })
  */

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
      if (artistArray[2]) {
        const thirdResult = new Page(artistArray[2])
        artistIds.push(thirdResult.array.artistId)
      }
      console.log(artistIds)
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


      // if (albumArray[0]) {
      //   const firstResult = new Page(albumArray[0])
      //   albumIds.push(firstResult.array.collectionId)
      // }
      // if (albumArray[1]) {
      //   const secondResult = new Page(albumArray[1])
      //   albumIds.push(secondResult.array.collectionId)
      // }
      // if (albumArray[2]) {
      //   const thirdResult = new Page(albumArray[2])
      //   albumIds.push(thirdResult.array.collectionId)
      // }
      // if (albumArray[3]) {
      //   const fourthResult = new Page(albumArray[2])
      //   albumIds.push(fourthResult.array.collectionId)
      // }

      replaced  by 
      function pushIdifExists (givenarray, number, arrayIDs, key) {
        for (var i = 0; i < number; i++) {
          if (givenarray[i]) {
            const iResult = new Page(givenarray[i])
            arrayIDs.push(iResult.array[key])
          }
        }
        console.log('push if if exists array', arrayIDs)
      }
      //pre recursive function//
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

///album section before recursive fxn
setTimeout(function () {
  let whole = catArray(IDARRAY)
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