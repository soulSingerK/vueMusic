export class Song {
  constructor({
    id,
    mid,
    singer,
    name,
    album,
    duration,
    image,
    url
  }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong(songData) {
  return new Song({
    id: songData.songid,
    mid: songData.songmid,
    singer: filterSong(songData.singer),
    name: songData.songname,
    album: songData.albumname,
    duration: songData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${songData.songid}.m4a?fromtag=46`
  })
}

function filterSong(singer) {
  let ret = []
  if (singer.length === 0 || !singer) {
    return ''
  }

  singer.forEach((item) => {
    ret.push(item.name)
  })
  return ret.join('/')
}