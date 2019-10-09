const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: true,
    audio: [
      {
        name: "烟火里的尘埃",
        artist: '华晨宇',
        url: '/music/华晨宇 - 烟火里的尘埃.mp3',
        cover: '/images/yhldca.jpg',
      },
	   {
        name: '我管你',
        artist: '华晨宇',
        url: '/music/华晨宇 - 我管你.mp3',
        cover: '/images/wgn.jpg',
      },
      {
        name: '寻',
        artist: '华晨宇',
        url: '/music/华晨宇 - 寻.mp3',
        cover: '/images/x.jpg',
      }
    ]
});