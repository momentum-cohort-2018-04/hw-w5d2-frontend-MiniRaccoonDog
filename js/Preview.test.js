/* globals test, expect */
import Preview from './Preview'

const arrayEntry = {'wrapperType': 'track',
  'kind': 'song',
  'artistId': 140777342,
  'collectionId': 1350021308,
  'trackId': 1350021467,
  'artistName': 'Janelle Monáe',
  'collectionName': 'Dirty Computer 10 1 1101.1.121',
  'trackName': 'Make Me Feel',
  'collectionCensoredName': 'Dirty Computer',
  'trackCensoredName': 'Make Me Feel',
  'artistViewUrl': 'https://itunes.apple.com/us/artist/janelle-mon%C3%A1e/140777342?uo=4',
  'collectionViewUrl': 'https://itunes.apple.com/us/album/make-me-feel/1350021308?i=1350021467&uo=4',
  'trackViewUrl': 'https://itunes.apple.com/us/album/make-me-feel/1350021308?i=1350021467&uo=4',
  'previewUrl': 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/b0/38/22/b03822b6-f59d-7541-24ec-876de0254b43/mzaf_6739111258026699895.plus.aac.p.m4a',
  'artworkUrl30': 'https://is2-ssl.mzstatic.com/image/thumb/Music118/v4/f4/58/47/f4584702-bd77-52c3-f7e0-fa05f4e80397/source/30x30bb.jpg',
  'artworkUrl60': 'https://is2-ssl.mzstatic.com/image/thumb/Music118/v4/f4/58/47/f4584702-bd77-52c3-f7e0-fa05f4e80397/source/60x60bb.jpg',
  'artworkUrl100': 'https://is2-ssl.mzstatic.com/image/thumb/Music118/v4/f4/58/47/f4584702-bd77-52c3-f7e0-fa05f4e80397/source/100x100bb.jpg',
  'collectionPrice': 9.99,
  'trackPrice': 1.29,
  'releaseDate': '2018-04-27T07:00:00Z',
  'collectionExplicitness': 'explicit',
  'trackExplicitness': 'explicit',
  'discCount': 1,
  'discNumber': 1,
  'trackCount': 14,
  'trackNumber': 8,
  'trackTimeMillis': 194230,
  'country': 'USA',
  'currency': 'USD',
  'primaryGenreName': 'R&B/Soul',
  'contentAdvisoryRating': 'Explicit',
  'isStreamable': true}

test('test Preview constructor works, returns "Make Me Feel" and "Janelle Monae" ', () => {
  const firstentry = new Preview(arrayEntry)
  const test = firstentry.entry
  // console.log(test)
  expect(test).toBe(arrayEntry)
  // console.log(firstentry)
  expect(test.trackName).toBe('Make Me Feel')
  expect(test.artistName).toBe('Janelle Monáe')
})

test('checks character count  and fails on 22', () => {
  const firstentry = new Preview(arrayEntry)
  const test = firstentry.textShortEnough('R&B/Souls,e.rrrt.ww..weaer.dwr')
  expect(test).toBe(false)
})

test('checks character count and passes on 20', () => {
  const firstentry = new Preview(arrayEntry)
  const test = firstentry.textShortEnough('R&B/Souls,e.rrrt.ww..wea.dwr')
  expect(test).toBe(true)
})

const properDiv = `<container class='sample' id='https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/b0/38/22/b03822b6-f59d-7541-24ec-876de0254b43/mzaf_6739111258026699895.plus.aac.p.m4a'><div class='sample__thumb'><image src='https://is2-ssl.mzstatic.com/image/thumb/Music118/v4/f4/58/47/f4584702-bd77-52c3-f7e0-fa05f4e80397/source/100x100bb.jpg'></div><div class='sample__info'><div class='info-song' data_genre='R&B/Soul'>Make Me Feel</div><div class='info-artist' data_id=140777342>Janelle Monáe</div><div class='arrow info-album' data_id=1350021308>Dirty Computer 10 1 1101.1.121</div></div></container>`

test('hell lets check this whole div, and verify ID-Long names is working', () => {
  const firstentry = new Preview(arrayEntry)
  const thediv = firstentry.createDivBlock()
  expect(thediv).toBe(properDiv)
})
