export const mockItems = [
  {
    id: 1,
    photo: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop',
    name: { zh: '小暖', en: 'A-Nuan' },
    story: {
      zh: '嗨！我叫小暖，是一盏暖黄色的台灯。主人陪我度过了考研的三百个夜晚，现在她要离开这座城市，我应该继续照亮某个人的书桌。',
      en: 'Hi! I\'m A-Nuan, a warm yellow desk lamp. I stayed with someone through 300 nights of exam prep. Now she\'s leaving this city, and I should keep illuminating someone\'s desk.'
    },
    ownerNote: {
      zh: '小暖陪我度过了考研的三百个夜晚，不是她不好，是我要离开这座城市了。',
      en: 'A-Nuan lit my desk through 300 nights of studying. It\'s not about her — I just have to leave this city.'
    },
    category: 'home',
    condition: 'likeNew',
    district: { zh: '朝阳区', en: 'Chaoyang' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 1200,
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 342
  },
  {
    id: 2,
    photo: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    name: { zh: '阿书', en: 'A-Shu' },
    story: {
      zh: '我是一整套加了书签的《百年孤独》。主人读完了所有7代人的故事，她说希望有人继续这些故事。',
      en: 'I\'m a complete set of "One Hundred Years of Solitude" with bookmarks still in place. My owner read all 7 generations — she hopes someone will continue the stories.'
    },
    ownerNote: {
      zh: '读完了，舍不得扔。给爱读书的人吧。',
      en: 'Finished reading them, but can\'t bear to throw them away. Let them go to someone who loves books.'
    },
    category: 'books',
    condition: 'gentleUse',
    district: { zh: '海淀区', en: 'Haidian' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 3500,
    timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
    status: 'found',
    views: 267
  },
  {
    id: 3,
    photo: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
    name: { zh: '铁铁', en: 'Tie-Tie' },
    story: {
      zh: '我叫铁铁，是一台1987年的胶片相机。虽然我偶尔会卡一下，但拍出来的照片有一种很温暖的色调。',
      en: 'I\'m Tie-Tie, a 1987 film camera. I jam sometimes, but the photos come out with a warm tone nothing digital can match.'
    },
    ownerNote: {
      zh: '铁铁是我的毕业礼物，现在我想把它传给另一个热爱摄影的人。',
      en: 'Tie-Tie was my graduation gift. Now I want to pass it to someone who loves photography.'
    },
    category: 'digital',
    condition: 'hasCharacter',
    district: { zh: '西城区', en: 'Xicheng' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 2100,
    timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 518
  },
  {
    id: 4,
    photo: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce8?w=400&h=400&fit=crop',
    name: { zh: '兜兜', en: 'Dou-Dou' },
    story: {
      zh: '我是个结实的帆布包，陪主人去过菜市场、去过图书馆。如果你也喜欢简单的生活，我们很合适。',
      en: 'I\'m a sturdy canvas tote. I\'ve been to markets and libraries with my owner. If you like a simple life, we\'d get along great.'
    },
    ownerNote: {
      zh: '陪我走过3年的兜兜，该去新的主人身边了。',
      en: 'Dou-Dou carried my stuff for 3 years. Time for a new companion.'
    },
    category: 'fashion',
    condition: 'gentleUse',
    district: { zh: '海淀区', en: 'Haidian' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 800,
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 195
  },
  {
    id: 5,
    photo: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop',
    name: { zh: '小绿', en: 'Little Green' },
    story: {
      zh: '我是一颗养了3年的多肉植物！因为主人经常出差，所以我需要一个不会忘记给我浇水的人。',
      en: 'I\'m a succulent that\'s been growing for 3 years! My owner travels a lot, so I need someone who won\'t forget to water me.'
    },
    ownerNote: {
      zh: '养了3年的多肉，出差实在顾不上，希望有心人继续照顾它。',
      en: '3 years of growth. My travel schedule makes it hard to care for it — hope someone will give it the love it deserves.'
    },
    category: 'home',
    condition: 'likeNew',
    district: { zh: '朝阳区', en: 'Chaoyang' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 4200,
    timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 156
  },
  {
    id: 6,
    photo: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    name: { zh: '小鼓', en: 'Little Drum' },
    story: {
      zh: '我是个小木吉他，陪主人写了十几首歌。现在她换电吉他了，但我觉得木吉他的声音还是最温暖的。',
      en: 'I\'m a small acoustic guitar. I helped someone write over a dozen songs. She upgraded to electric now, but I still think acoustic sounds the warmest.'
    },
    ownerNote: {
      zh: '陪我写了第一张专辑的小吉他，希望它能遇到下一个爱音乐的人。',
      en: 'The guitar that helped me write my first album. Hope it finds someone who loves music.'
    },
    category: 'toys',
    condition: 'gentleUse',
    district: { zh: '东城区', en: 'Dongcheng' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 6200,
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 293
  },
  {
    id: 7,
    photo: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop',
    name: { zh: '飞飞', en: 'Fei-Fei' },
    story: {
      zh: '我是一双白色运动鞋，只跑了两次马拉松。左边有块小擦痕，那是我第一次冲过终点线的纪念。',
      en: 'I\'m a pair of white running shoes. I only ran two marathons. There\'s a small scuff on the left — it\'s from crossing my first finish line.'
    },
    ownerNote: {
      zh: '飞飞陪我跑过两次全马，现在脚受伤了不能跑了，但鞋子还是好的。',
      en: 'Fei-Fei ran two full marathons with me. A foot injury stops me now, but the shoes are still in great shape.'
    },
    category: 'fashion',
    condition: 'gentleUse',
    district: { zh: '朝阳区', en: 'Chaoyang' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 1500,
    timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 178
  },
  {
    id: 8,
    photo: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=400&h=400&fit=crop',
    name: { zh: '小桌', en: 'Little Desk' },
    story: {
      zh: '我是一张实木书桌，陪主人读过100多本书。桌面有几道笔痕，每一道都是一次灵感的痕迹。',
      en: 'I\'m a solid wood desk. I\'ve supported someone through over 100 books. The pen marks on my surface? Each one is a spark of inspiration.'
    },
    ownerNote: {
      zh: '搬家实在带不走，但它陪我熬过了多少个夜晚，舍不得扔。',
      en: 'Can\'t take it when moving, but this desk saw me through countless late nights. Can\'t just throw it away.'
    },
    category: 'home',
    condition: 'hasCharacter',
    district: { zh: '海淀区', en: 'Haidian' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 5500,
    timestamp: Date.now() - 10 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 421
  },
  {
    id: 9,
    photo: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    name: { zh: '小墨', en: 'Little Ink' },
    story: {
      zh: '我是一副墨镜，跟着主人去过海边和雪山。镜片有一道小划痕，但看世界还是彩色的。',
      en: 'I\'m a pair of sunglasses. I\'ve been to beaches and snowy mountains with my owner. One small scratch on the lens, but the world still looks colorful.'
    },
    ownerNote: {
      zh: '买了一副新的，这副旧的就交给你啦。',
      en: 'Bought a new pair. This one\'s ready for its next adventure.'
    },
    category: 'fashion',
    condition: 'gentleUse',
    district: { zh: '朝阳区', en: 'Chaoyang' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 950,
    timestamp: Date.now() - 8 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 134
  },
  {
    id: 10,
    photo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    name: { zh: '小表', en: 'Little Watch' },
    story: {
      zh: '我是一块机械表，每天上发针才能走动。主人嫌麻烦换智能手表了，但我觉得每天上发针是一种仪式感。',
      en: 'I\'m a mechanical watch. You need to wind me daily to keep ticking. My owner switched to a smart watch, but I think winding me every day is a kind of ritual.'
    },
    ownerNote: {
      zh: '爷爷送的表，现在换成了smartwatch。希望有人珍惜它。',
      en: 'A watch from my grandfather. Switched to a smartwatch now. Hope someone cherishes it.'
    },
    category: 'fashion',
    condition: 'hasCharacter',
    district: { zh: '西城区', en: 'Xicheng' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 7800,
    timestamp: Date.now() - 15 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 256
  },
  {
    id: 11,
    photo: 'https://images.unsplash.com/photo-1583394838316-acd977736f90?w=400&h=400&fit=crop',
    name: { zh: '小音', en: 'Little Sound' },
    story: {
      zh: '我是一副无线耳机，音质很好，只是主人丢了左耳那只。右耳的我还在等一个完整的机会。',
      en: 'I\'m a wireless earphone. Great sound quality — but my owner lost the left one. The right one (that\'s me!) is still waiting for a chance to be complete again.'
    },
    ownerNote: {
      zh: '丢了左耳的耳机，右耳的还在。虽然不完整但音质真的很好。',
      en: 'Lost the left earbud. The right one remains — and honestly, the sound quality is still amazing.'
    },
    category: 'digital',
    condition: 'gentleUse',
    district: { zh: '海淀区', en: 'Haidian' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 2300,
    timestamp: Date.now() - 12 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 312
  },
  {
    id: 12,
    photo: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop',
    name: { zh: '小熊', en: 'Little Bear' },
    story: {
      zh: '我是一只毛绒小熊，陪一个小女孩度过了整个童年。现在我该去陪伴另一个需要温暖的人了。',
      en: 'I\'m a teddy bear who stayed with a little girl through her entire childhood. Now it\'s time to bring warmth to someone else.'
    },
    ownerNote: {
      zh: '女儿长大了不再抱小熊了，但它很干净很软，希望有新主人。',
      en: 'My daughter outgrew her teddy, but it\'s clean and soft. Hope it finds a new friend.'
    },
    category: 'toys',
    condition: 'likeNew',
    district: { zh: '朝阳区', en: 'Chaoyang' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 3100,
    timestamp: Date.now() - 9 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 445
  },
  {
    id: 13,
    photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',
    name: { zh: '小画', en: 'Little Paint' },
    story: {
      zh: '我是一套水彩颜料，主人只用了三分之一。色彩还很鲜艳，等待能画出美丽风景的人。',
      en: 'I\'m a watercolor set, only a third used. Colors are still vibrant, waiting for someone to paint beautiful landscapes.'
    },
    ownerNote: {
      zh: '买了但没时间画，颜料都是好的。',
      en: 'Bought it but never had time to paint. All the paints are still good.'
    },
    category: 'others',
    condition: 'likeNew',
    district: { zh: '海淀区', en: 'Haidian' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 4700,
    timestamp: Date.now() - 14 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 89
  },
  {
    id: 14,
    photo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    name: { zh: '小喇叭', en: 'Little Speaker' },
    story: {
      zh: '我是一个便携音箱，音质很好，低音特别棒。主人换了新的，但我觉得我还很能打。',
      en: 'I\'m a portable speaker with great sound, especially deep bass. My owner got an upgrade, but I still think I\'ve got plenty to offer.'
    },
    ownerNote: {
      zh: '音质很好的小音箱，换了新的所以这个闲置了。',
      en: 'Great sound quality speaker. Got a new one so this one\'s idle.'
    },
    category: 'digital',
    condition: 'gentleUse',
    district: { zh: '朝阳区', en: 'Chaoyang' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 1800,
    timestamp: Date.now() - 11 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 223
  },
  {
    id: 15,
    photo: 'https://images.unsplash.com/photo-1493655161918-4d8686ae91a0?w=400&h=400&fit=crop',
    name: { zh: '小壶', en: 'Little Pot' },
    story: {
      zh: '我是一个紫砂壶，泡过的茶越多颜色越好看。主人搬家带不走了，希望有人继续养我。',
      en: 'I\'m a purple clay teapot. The more tea I brew, the more beautiful I become. My owner can\'t take me when moving — hope someone keeps nurturing me.'
    },
    ownerNote: {
      zh: '养了2年的紫砂壶，搬家实在不方便，给它找个新家。',
      en: 'A purple clay teapot I cared for 2 years. Moving is hard — finding it a new home.'
    },
    category: 'home',
    condition: 'hasCharacter',
    district: { zh: '东城区', en: 'Dongcheng' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 6800,
    timestamp: Date.now() - 13 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 187
  },
  {
    id: 16,
    photo: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop',
    name: { zh: '小键盘', en: 'Little Keyboard' },
    story: {
      zh: '我是一个机械键盘，每个键都敲过上千次。青轴的声音像音乐，但主人嫌吵换静音的了。',
      en: 'I\'m a mechanical keyboard. Every key has been pressed thousands of times. My blue switches sound like music — but my owner switched to silent ones.'
    },
    ownerNote: {
      zh: '同事说太吵了换静音键盘了，这个还是好用的。',
      en: 'Coworkers said it was too loud so I got a silent one. This one works perfectly fine.'
    },
    category: 'digital',
    condition: 'hasCharacter',
    district: { zh: '海淀区', en: 'Haidian' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 3800,
    timestamp: Date.now() - 16 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 367
  },
  {
    id: 17,
    photo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop',
    name: { zh: '小伞', en: 'Little Umbrella' },
    story: {
      zh: '我是一把长柄雨伞，伞骨很结实。陪主人度过很多个雨天，但她说折叠伞更方便。',
      en: 'I\'m a long-handle umbrella with sturdy ribs. I stayed with my owner through many rainy days, but she says folding umbrellas are more convenient.'
    },
    ownerNote: {
      zh: '质量很好的雨伞，只是换了折叠的。',
      en: 'A really well-made umbrella, just switched to a folding one.'
    },
    category: 'others',
    condition: 'likeNew',
    district: { zh: '朝阳区', en: 'Chaoyang' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 500,
    timestamp: Date.now() - 17 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 156
  },
  {
    id: 18,
    photo: 'https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=400&h=400&fit=crop',
    name: { zh: '小盆栽', en: 'Little Bonsai' },
    story: {
      zh: '我是一颗小树盆栽，被修剪了3年，现在终于有点像一棵真正的盆景了。',
      en: 'I\'m a small tree bonsai, pruned for 3 years, and I\'m finally starting to look like a real miniature landscape.'
    },
    ownerNote: {
      zh: '修剪了3年的盆栽，出差没人照顾，需要有心人。',
      en: '3 years of pruning. Business trips leave it untended — needs someone attentive.'
    },
    category: 'home',
    condition: 'likeNew',
    district: { zh: '西城区', en: 'Xicheng' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 8900,
    timestamp: Date.now() - 20 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 234
  },
  {
    id: 19,
    photo: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
    name: { zh: '小芦荟', en: 'Little Aloe' },
    story: {
      zh: '我是一盆芦荟，很坚强，不怎么需要照顾。主人要出国了，希望有人不要把我忘了就好。',
      en: 'I\'m an aloe plant — very tough, don\'t need much care. My owner is going abroad, just hoping someone won\'t forget about me.'
    },
    ownerNote: {
      zh: '出国了带不走，芦荟很好养活，需要的联系我。',
      en: 'Going abroad, can\'t take it. Aloe is easy to care for — reach out.'
    },
    category: 'home',
    condition: 'likeNew',
    district: { zh: '朝阳区', en: 'Chaoyang' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 2800,
    timestamp: Date.now() - 22 * 24 * 60 * 60 * 1000,
    status: 'found',
    views: 189
  },
  {
    id: 20,
    photo: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=400&fit=crop',
    name: { zh: '小外套', en: 'Little Coat' },
    story: {
      zh: '我是一件牛仔外套，穿出去回头率100%。主人减肥成功了，尺码小了穿不上了。',
      en: 'I\'m a denim jacket. When you wear me, people look — 100%回头率. My owner lost weight and I\'m too small now.'
    },
    ownerNote: {
      zh: '很好看的外套，就是瘦了穿不上，希望找到合适的人。',
      en: 'Really nice jacket, just outgrew it after losing weight. Hope it finds the right fit.'
    },
    category: 'fashion',
    condition: 'likeNew',
    district: { zh: '海淀区', en: 'Haidian' },
    city: { zh: '北京', en: 'Beijing' },
    distance: 5200,
    timestamp: Date.now() - 25 * 24 * 60 * 60 * 1000,
    status: 'waiting',
    views: 378
  }
]

export function getTopItems(n = 5) {
  return [...mockItems].sort((a, b) => b.views - a.views).slice(0, n)
}

export function getItemById(id) {
  return mockItems.find(item => item.id === id)
}

export function formatDistance(meters, lang) {
  if (meters < 1000) {
    return lang === 'zh-CN' ? `约${meters}m` : `About ${meters}m`
  }
  const km = (meters / 1000).toFixed(1)
  return lang === 'zh-CN' ? `约${km}km` : `About ${km}km`
}

export function formatTimeAgo(timestamp, lang) {
  const diff = Date.now() - timestamp
  const days = Math.floor(diff / (24 * 60 * 60 * 1000))
  if (days === 0) return lang === 'zh-CN' ? '今天' : 'Today'
  if (days === 1) return lang === 'zh-CN' ? '1天前' : '1 day ago'
  return lang === 'zh-CN' ? `${days}天前` : `${days} days ago`
}
