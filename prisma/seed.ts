import { prisma } from '../lib/db';

const ITEMS = [
  {
    nameZh: '小暖',
    nameEn: 'A-Nuan',
    photoUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop',
    category: 'home',
    condition: 'likeNew',
    districtZh: '朝阳区',
    districtEn: 'Chaoyang',
    cityZh: '北京',
    cityEn: 'Beijing',
    distance: 1200,
    status: 'waiting',
    views: 342,
  },
  {
    nameZh: '阿书',
    nameEn: 'A-Shu',
    photoUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    category: 'books',
    condition: 'gentleUse',
    districtZh: '海淀区',
    districtEn: 'Haidian',
    cityZh: '北京',
    cityEn: 'Beijing',
    distance: 3500,
    status: 'found',
    views: 267,
  },
  {
    nameZh: '铁铁',
    nameEn: 'Tie-Tie',
    photoUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
    category: 'digital',
    condition: 'hasCharacter',
    districtZh: '西城区',
    districtEn: 'Xicheng',
    cityZh: '北京',
    cityEn: 'Beijing',
    distance: 2100,
    status: 'waiting',
    views: 518,
  },
  {
    nameZh: '兜兜',
    nameEn: 'Dou-Dou',
    photoUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce8?w=400&h=400&fit=crop',
    category: 'fashion',
    condition: 'gentleUse',
    districtZh: '海淀区',
    districtEn: 'Haidian',
    cityZh: '北京',
    cityEn: 'Beijing',
    distance: 800,
    status: 'waiting',
    views: 195,
  },
  {
    nameZh: '小绿',
    nameEn: 'Little Green',
    photoUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop',
    category: 'home',
    condition: 'likeNew',
    districtZh: '朝阳区',
    districtEn: 'Chaoyang',
    cityZh: '北京',
    cityEn: 'Beijing',
    distance: 4200,
    status: 'waiting',
    views: 156,
  },
  {
    nameZh: '小鼓',
    nameEn: 'Little Drum',
    photoUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    category: 'toys',
    condition: 'gentleUse',
    districtZh: '东城区',
    districtEn: 'Dongcheng',
    cityZh: '北京',
    cityEn: 'Beijing',
    distance: 6200,
    status: 'waiting',
    views: 293,
  },
  {
    nameZh: '飞飞',
    nameEn: 'Fei-Fei',
    photoUrl: 'https://images.unsplash.com/photo-1491553895911-0055eca6402a?w=400&h=400&fit=crop',
    category: 'fashion',
    condition: 'gentleUse',
    districtZh: '朝阳区',
    districtEn: 'Chaoyang',
    cityZh: '北京',
    cityEn: 'Beijing',
    distance: 1500,
    status: 'waiting',
    views: 178,
  },
  {
    nameZh: '小桌',
    nameEn: 'Little Desk',
    photoUrl: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=400&h=400&fit=crop',
    category: 'home',
    condition: 'hasCharacter',
    districtZh: '海淀区',
    districtEn: 'Haidian',
    cityZh: '北京',
    cityEn: 'Beijing',
    distance: 5500,
    status: 'waiting',
    views: 421,
  },
  {
    nameZh: '小墨',
    nameEn: 'Little Ink',
    photoUrl: 'https://images.unsplash.com/photo-1491553895911-0055eca6402a?w=400&h=400&fit=crop',
    category: 'fashion',
    condition: 'gentleUse',
    districtZh: '朝阳区',
    districtEn: 'Chaoyang',
    cityZh: '北京',
    cityEn: 'Beijing',
    distance: 950,
    status: 'waiting',
    views: 134,
  },
  {
    nameZh: '小表',
    nameEn: 'Little Watch',
    photoUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'fashion',
    condition: 'hasCharacter',
    districtZh: '西城区',
    districtEn: 'Xicheng',
    cityZh: '北京',
    cityEn: 'Beijing',
    distance: 7800,
    status: 'waiting',
    views: 256,
  },
];

const STORIES = [
  {
    storyZh: '嗨！我叫小暖，是一盏暖黄色的台灯。主人陪我度过了考研的三百个夜晚，现在她要离开这座城市，我应该继续照亮某个人的书桌。',
    storyEn: "Hi! I'm A-Nuan, a warm yellow desk lamp. I stayed with someone through 300 nights of exam prep. Now she's leaving this city, and I should keep illuminating someone's desk.",
    ownerNoteZh: '小暖陪我度过了考研的三百个夜晚，不是她不好，是我要离开这座城市了。',
    ownerNoteEn: "A-Nuan lit my desk through 300 nights of studying. It's not about her — I just have to leave this city.",
  },
  {
    storyZh: '我是一整套加了书签的《百年孤独》。主人读完了所有7代人的故事，她说希望有人继续这些故事。',
    storyEn: 'I\'m a complete set of "One Hundred Years of Solitude" with bookmarks still in place. My owner read all 7 generations — she hopes someone will continue the stories.',
    ownerNoteZh: '读完了，舍不得扔。给爱读书的人吧。',
    ownerNoteEn: "Finished reading them, but can't bear to throw them away. Let them go to someone who loves books.",
  },
  {
    storyZh: '我叫铁铁，是一台1987年的胶片相机。虽然我偶尔会卡一下，但拍出来的照片有一种很温暖的色调。',
    storyEn: "I'm Tie-Tie, a 1987 film camera. I jam sometimes, but the photos come out with a warm tone nothing digital can match.",
    ownerNoteZh: '铁铁是我的毕业礼物，现在我想把它传给另一个热爱摄影的人。',
    ownerNoteEn: "Tie-Tie was my graduation gift. Now I want to pass it to someone who loves photography.",
  },
  {
    storyZh: '我是个结实的帆布包，陪主人去过菜市场、去过图书馆。如果你也喜欢简单的生活，我们很合适。',
    storyEn: "I'm a sturdy canvas tote. I've been to markets and libraries with my owner. If you like a simple life, we'd get along great.",
    ownerNoteZh: '陪我走过3年的兜兜，该去新的主人身边了。',
    ownerNoteEn: 'Dou-Dou carried my stuff for 3 years. Time for a new companion.',
  },
  {
    storyZh: '我是一颗养了3年的多肉植物！因为主人经常出差，所以我需要一个不会忘记给我浇水的人。',
    storyEn: "I'm a succulent that's been growing for 3 years! My owner travels a lot, so I need someone who won't forget to water me.",
    ownerNoteZh: '养了3年的多肉，出差实在顾不上，希望有心人继续照顾它。',
    ownerNoteEn: '3 years of growth. My travel schedule makes it hard to care for it — hope someone will give it the love it deserves.',
  },
  {
    storyZh: '我是个小木吉他，陪主人写了十几首歌。现在她换电吉他了，但我觉得木吉他的声音还是最温暖的。',
    storyEn: "I'm a small acoustic guitar. I helped someone write over a dozen songs. She upgraded to electric now, but I still think acoustic sounds the warmest.",
    ownerNoteZh: '陪我写了第一张专辑的小吉他，希望它能遇到下一个爱音乐的人。',
    ownerNoteEn: "The guitar that helped me write my first album. Hope it finds someone who loves music.",
  },
  {
    storyZh: '我是一双白色运动鞋，只跑了两次马拉松。左边有块小擦痕，那是我第一次冲过终点线的纪念。',
    storyEn: "I'm a pair of white running shoes. I only ran two marathons. There's a small scuff on the left — it's from crossing my first finish line.",
    ownerNoteZh: '飞飞陪我跑过两次全马，现在脚受伤了不能跑了，但鞋子还是好的。',
    ownerNoteEn: "Fei-Fei ran two full marathons with me. A foot injury stops me now, but the shoes are still in great shape.",
  },
  {
    storyZh: '我是一张实木书桌，陪主人读过100多本书。桌面有几道笔痕，每一道都是一次灵感的痕迹。',
    storyEn: "I'm a solid wood desk. I've supported someone through over 100 books. The pen marks on my surface? Each one is a spark of inspiration.",
    ownerNoteZh: '搬家实在带不走，但它陪我熬过了多少个夜晚，舍不得扔。',
    ownerNoteEn: "Can't take it when moving, but this desk saw me through countless late nights. Can't just throw it away.",
  },
  {
    storyZh: '我是一副墨镜，跟着主人去过海边和雪山。镜片有一道小划痕，但看世界还是彩色的。',
    storyEn: "I'm a pair of sunglasses. I've been to beaches and snowy mountains with my owner. One small scratch on the lens, but the world still looks colorful.",
    ownerNoteZh: '买了一副新的，这副旧的就交给你啦。',
    ownerNoteEn: "Bought a new pair. This one's ready for its next adventure.",
  },
  {
    storyZh: '我是一块机械表，每天上发针才能走动。主人嫌麻烦换智能手表了，但我觉得每天上发针是一种仪式感。',
    storyEn: "I'm a mechanical watch. You need to wind me daily to keep ticking. My owner switched to a smart watch, but I think winding me every day is a kind of ritual.",
    ownerNoteZh: '爷爷送的表，现在换成了smartwatch。希望有人珍惜它。',
    ownerNoteEn: 'A watch from my grandfather. Switched to a smartwatch now. Hope someone cherishes it.',
  },
];

const BADGES = [
  { nameZh: '爱心邻居', nameEn: 'Caring Neighbor', descriptionZh: '成功领养了第一个宝贝', descriptionEn: 'Adopted your first treasure', icon: '💚' },
  { nameZh: '分享达人', nameEn: 'Generous Sharer', descriptionZh: '发布了5个宝贝', descriptionEn: 'Shared 5 items', icon: '✨' },
  { nameZh: '超级主人', nameEn: 'Super Owner', descriptionZh: '成功送出了10个宝贝', descriptionEn: 'Gave away 10 items', icon: '🌟' },
];

export async function seedDatabase() {
  console.log('🌱 Seeding database...');

  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      nickname: 'Demo Neighbor',
      bio: 'A treasure-loving demo user',
    },
  });

  console.log('✓ Created demo user');

  for (let i = 0; i < ITEMS.length; i++) {
    await prisma.item.create({
      data: {
        ownerId: user.id,
        nameZh: ITEMS[i].nameZh,
        nameEn: ITEMS[i].nameEn,
        photoUrl: ITEMS[i].photoUrl,
        category: ITEMS[i].category,
        condition: ITEMS[i].condition,
        districtZh: ITEMS[i].districtZh,
        districtEn: ITEMS[i].districtEn,
        cityZh: ITEMS[i].cityZh,
        cityEn: ITEMS[i].cityEn,
        distance: ITEMS[i].distance,
        status: ITEMS[i].status,
        views: ITEMS[i].views,
        story: {
          create: {
            storyZh: STORIES[i].storyZh,
            storyEn: STORIES[i].storyEn,
            ownerNoteZh: STORIES[i].ownerNoteZh,
            ownerNoteEn: STORIES[i].ownerNoteEn,
          },
        },
      },
    });
  }

  console.log(`✓ Created ${ITEMS.length} items`);

  for (const badge of BADGES) {
    await prisma.badge.create({ data: badge });
  }

  console.log(`✓ Created ${BADGES.length} badges`);
  console.log('🎉 Seeding complete!');
}

seedDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
