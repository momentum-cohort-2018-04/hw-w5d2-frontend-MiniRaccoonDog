
/* globals test, expect */
import Page from './Page'
const array = [{'wrapperType': 'track',
  'kind': 'song',
  'artistId': 140777342,
  'collectionId': 1350021308,
  'trackId': 1350021467,
  'artistName': 'Janelle Monáe',
  'collectionName': 'Dirty Computer 10 1 1101.1.121',
  'trackName': 'Make Me Feel',
  'artistViewUrl': 'https://itunes.apple.com/us/artist/janelle-mon%C3%A1e/140777342?uo=4',
  'collectionViewUrl': 'https://itunes.apple.com/us/album/make-me-feel/1350021308?i=1350021467&uo=4',
  'previewUrl': 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/b0/38/22/b03822b6-f59d-7541-24ec-876de0254b43/mzaf_6739111258026699895.plus.aac.p.m4a',
  'artworkUrl100': 'https://is2-ssl.mzstatic.com/image/thumb/Music118/v4/f4/58/47/f4584702-bd77-52c3-f7e0-fa05f4e80397/source/100x100bb.jpg',
  'primaryGenreName': 'R&B/Soul',
  'contentAdvisoryRating': 'Explicit'},
{'wrapperType': 'track',
  'kind': 'song',
  'artistId': 140777342,
  'collectionId': 1350021308,
  'trackId': 1350021467,
  'artistName': 'Janelle Monáe',
  'collectionName': 'Dirty Computer 10 1 1101.1.121',
  'trackName': 'Make Me Feel',
  'artistViewUrl': 'https://itunes.apple.com/us/artist/janelle-mon%C3%A1e/140777342?uo=4',
  'collectionViewUrl': 'https://itunes.apple.com/us/album/make-me-feel/1350021308?i=1350021467&uo=4',
  'previewUrl': 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/b0/38/22/b03822b6-f59d-7541-24ec-876de0254b43/mzaf_6739111258026699895.plus.aac.p.m4a',
  'artworkUrl100': 'https://is2-ssl.mzstatic.com/image/thumb/Music118/v4/f4/58/47/f4584702-bd77-52c3-f7e0-fa05f4e80397/source/100x100bb.jpg',
  'primaryGenreName': 'R&B/Soul',
  'contentAdvisoryRating': 'Explicit'}]

const a = [{'wrapperType': 'track',
  'kind': 'song',
  'artistId': '1-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '2-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '3-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '4-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '5-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '6-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '7-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '8-140777342'}]

const aNine = [{'wrapperType': 'track',
  'kind': 'song',
  'artistId': '1-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '2-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '3-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '4-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '5-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '6-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '7-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '8-140777342'}, {'wrapperType': 'track',
  'kind': 'song',
  'artistId': '9-140777342'}]

test('so Jest shuts up', () => {
  expect(3).toBe(3)
})

test('check it iterates through an Array', () => {
  // console.log('IS ARRAY', Array.isArray(array))
  const pageTest = new Page(array)
  // console.log('new page', pageTest)
  // const testArray = pageTest.array
  // console.log('testarray', testArray)
  const step = pageTest.createPreviews()
  // console.log('step', step)
  expect(step.length).toBe(2)
})

test('check array slicer is working, should return array length 4', () => {
  // length of "a" array is 8
  console.log(a.length)
  const dummyarray = [2, 3, 5, 6]
  const pageTest = new Page(array)
  const slicedArray = pageTest.arraySlicer(2, a)
  console.log(slicedArray)
  expect(slicedArray.length).toBe(dummyarray.length)
})

test('check array slicer is working, should return array length 5', () => {
  // length of "aNine" array is 9
  // console.log(a.length)
  const dummyarray = [2, 3, 5, 6, 4]
  const pageTest = new Page(array)
  const slicedArray = pageTest.arraySlicer(2, aNine)
  console.log(slicedArray)
  expect(slicedArray.length).toBe(dummyarray.length)
})
