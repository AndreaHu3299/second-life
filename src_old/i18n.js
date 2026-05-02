import { reactive } from 'vue'

const translations = reactive({
  'zh-CN': {
    appName: '宝贝回新家',
    tagline: '每个宝贝，都值得第二次生命',
    description: '这里的每一件物品，都曾被人珍爱。现在它们带着故事，等待新的家。不是丢弃，是延续。',
    ctaAdopt: '去领养',
    counterLabel: '今天已有',
    counterSuffix: '个宝贝找到新家',
    monthCounter: '本月共帮助',
    monthCounterSuffix: '个宝贝回新家',
    navHome: '首页',
    navAdopt: '领养',
    navShare: '发布',
    navMessages: '消息',
    navMySpace: '我的',
    searchPlaceholder: '搜索宝贝的故事...',
    loginRequired: '领养宝贝需要先登录哦',
    categories: {
      digital: '数码',
      home: '家居',
      books: '书籍',
      fashion: '服饰',
      toys: '玩具',
      others: '其他'
    },
    status: {
      waiting: '等待领养',
      inProgress: '领养确认中',
      found: '已找到新家',
      withdrawn: '被主人撤回',
      draft: '宝贝档案编辑中'
    },
    condition: {
      likeNew: '如新',
      gentleUse: '轻微使用痕迹',
      hasCharacter: '岁月痕迹'
    },
    wantAdopt: '我想领养',
    save: '收藏',
    share: '分享宝贝',
    privacyNote: '具体地址将在双方确认后通过聊天分享',
    safetyTip: '建议在人多的公共场所见面',
    ownerNote: '前主人的话',
    distance: '距你',
    ago: '前',
    views: '次查看',
    loginTitle: '欢迎回来',
    loginPhone: '手机号登录',
    loginEmail: '邮箱登录',
    registerTitle: '找到你的邻居身份',
    registerNickname: '起个昵称',
    forgotPassword: '忘记密码？',
    loginBtn: '登录',
    registerBtn: '注册',
    guestPrompt: '登录后可发布宝贝、领养心仪好物、与主人聊天',
    guestLogin: '去登录',
    guestRegister: '注册新账号',
    myStats: {
      posted: '发布的宝贝',
      adoptedOut: '成功送出的宝贝',
      adoptedIn: '领养的宝贝'
    },
    settings: '设置',
    logout: '退出登录',
    language: '语言',
    myWishlist: '我的收藏',
    meetupRequests: '我的见面请求',
    editProfile: '编辑资料'
  },
  en: {
    appName: 'Second-Life Treasures',
    tagline: 'Every treasure deserves a second life',
    description: 'Every item here was once loved. Now they carry their stories, waiting for a new home. Not discarded — continued.',
    ctaAdopt: 'Adopt',
    counterLabel: 'Today,',
    counterSuffix: 'treasures found homes',
    monthCounter: 'This month,',
    monthCounterSuffix: 'treasures found homes',
    navHome: 'Home',
    navAdopt: 'Adopt',
    navShare: 'Share',
    navMessages: 'Messages',
    navMySpace: 'My Space',
    searchPlaceholder: 'Search by story or name...',
    loginRequired: 'Please log in to adopt a treasure',
    categories: {
      digital: 'Digital',
      home: 'Home',
      books: 'Books',
      fashion: 'Fashion',
      toys: 'Toys',
      others: 'Others'
    },
    status: {
      waiting: 'Awaiting Adoption',
      inProgress: 'Finding the Right Home',
      found: 'Found a New Home',
      withdrawn: 'Called Back',
      draft: 'Profile Draft'
    },
    condition: {
      likeNew: 'Like New',
      gentleUse: 'Gentle Signs of Use',
      hasCharacter: 'Has Character'
    },
    wantAdopt: 'I Want to Adopt',
    save: 'Save',
    share: 'Share This Baby',
    privacyNote: 'Exact address will be shared via chat after both parties confirm',
    safetyTip: 'We recommend meeting in public places',
    ownerNote: 'From previous owner',
    distance: 'About',
    ago: 'ago',
    views: 'views',
    loginTitle: 'Welcome back',
    loginPhone: 'Login with phone',
    loginEmail: 'Login with email',
    registerTitle: 'Find your neighbor identity',
    registerNickname: 'Pick a nickname',
    forgotPassword: 'Forgot password?',
    loginBtn: 'Log in',
    registerBtn: 'Register',
    guestPrompt: 'Log in to share treasures, adopt items, and chat with owners',
    guestLogin: 'Log in',
    guestRegister: 'Create account',
    myStats: {
      posted: 'Posted',
      adoptedOut: 'Adopted Out',
      adoptedIn: 'Adopted'
    },
    settings: 'Settings',
    logout: 'Log out',
    language: 'Language',
    myWishlist: 'Wishlist',
    meetupRequests: 'Meetup Requests',
    editProfile: 'Edit profile'
  }
})

function t(key, lang) {
  const keys = key.split('.')
  let result = translations[lang]
  for (const k of keys) {
    if (result && result[k] !== undefined) {
      result = result[k]
    } else {
      return key
    }
  }
  return result
}

export const i18n = reactive({
  lang: localStorage.getItem('app-lang') || 'zh-CN',
  t(key) {
    return t(key, this.lang)
  },
  toggle() {
    const current = this.lang
    const next = current === 'zh-CN' ? 'en' : 'zh-CN'
    this.lang = next
    localStorage.setItem('app-lang', next)
    document.documentElement.lang = next === 'zh-CN' ? 'zh-CN' : 'en'
  }
})
