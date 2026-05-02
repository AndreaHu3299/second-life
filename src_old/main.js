import { i18n } from './i18n.js'
import { mockItems, getTopItems, getItemById, formatDistance, formatTimeAgo } from './mock-data.js'
import { createApp, ref, computed, reactive, onMounted, nextTick } from 'vue'

const app = createApp({
  setup() {
    const currentTab = ref('home')
    const selectedItem = ref(null)
    const showLogin = ref(false)
    const pendingAction = ref(null)
    const loginMode = ref('login')
    const isLoggedIn = ref(!!localStorage.getItem('app-session'))
    const user = reactive(JSON.parse(localStorage.getItem('app-session') || '{}'))
    const wishlist = reactive(JSON.parse(localStorage.getItem('app-wishlist') || '[]'))
    const selectedCategory = ref(null)
    const items = ref(mockItems)

    const lang = computed(() => i18n.lang)

    function navigateTo(tab) {
      if (['share', 'messages'].includes(tab) && !isLoggedIn.value) {
        pendingAction.value = tab
        showLogin.value = true
        return
      }
      currentTab.value = tab
      selectedItem.value = null
    }

    function viewItem(item) {
      selectedItem.value = item
      const original = items.value.find(i => i.id === item.id)
      if (original) original.views++
    }

    function wantAdopt(item) {
      if (!isLoggedIn.value) {
        pendingAction.value = { type: 'adopt', item }
        showLogin.value = true
        return
      }
      alert(lang.value === 'zh-CN' ? '领养请求已发送！主人会很快回复你的 💚' : 'Adoption request sent! The owner will reply soon 💚')
    }

    function toggleSave(item) {
      const idx = wishlist.findIndex(i => i.id === item.id)
      if (idx === -1) {
        wishlist.push({ id: item.id, name: item.name, photo: item.photo })
      } else {
        wishlist.splice(idx, 1)
      }
      localStorage.setItem('app-wishlist', JSON.stringify([...wishlist]))
    }

    function isSaved(item) {
      return wishlist.some(i => i.id === item.id)
    }

    function handleLogin(credentials) {
      const session = {
        isLoggedIn: true,
        nickname: credentials.nickname || credentials.email?.split('@')[0] || '邻居',
        email: credentials.email,
        phone: credentials.phone,
        city: credentials.city || '北京',
        district: credentials.district || '朝阳区',
        bio: credentials.bio || '',
        joinedAt: Date.now()
      }
      Object.assign(user, session)
      localStorage.setItem('app-session', JSON.stringify(session))
      isLoggedIn.value = true
      showLogin.value = false
      if (pendingAction.value) {
        const action = pendingAction.value
        pendingAction.value = null
        if (action.type === 'adopt' && action.item) {
          viewItem(action.item)
        } else {
          currentTab.value = action
        }
      }
    }

    function handleRegister(details) {
      handleLogin(details)
    }

    function handleLogout() {
      isLoggedIn.value = false
      Object.keys(user).forEach(k => delete user[k])
      localStorage.removeItem('app-session')
      currentTab.value = 'home'
      selectedItem.value = null
    }

    function selectCategory(cat) {
      selectedCategory.value = cat
      currentTab.value = 'adopt'
    }

    function openLogin(mode) {
      loginMode.value = mode || 'login'
      showLogin.value = true
    }

    const filteredItems = computed(() => {
      if (!selectedCategory.value) return items.value.filter(i => i.status !== 'found')
      return items.value.filter(i => i.category === selectedCategory.value && i.status !== 'found')
    })

    return {
      currentTab, selectedItem, showLogin, loginMode,
      isLoggedIn, user, lang, wishlist,
      items, selectedCategory, filteredItems,
      i18n, navigateTo, viewItem, wantAdopt,
      toggleSave, isSaved, handleLogin, handleRegister,
      handleLogout, selectCategory, openLogin, formatDistance, formatTimeAgo
    }
  },
  template: `
    <div class="app">
      <header class="header">
        <div class="header-left" @click="navigateTo('home')">
          <span class="logo-sprout">🌱</span>
          <span class="app-name">{{ i18n.t('appName') }}</span>
        </div>
        <button class="lang-toggle" @click="i18n.toggle()">
          {{ lang === 'zh-CN' ? 'EN' : '中文' }}
        </button>
      </header>

      <main class="content">
        <home-page
          v-if="currentTab === 'home' && !selectedItem"
          @view-item="viewItem"
          @select-category="selectCategory"
        />

        <adopt-page
          v-else-if="(currentTab === 'adopt' || currentTab === 'home') && !selectedItem"
          :items="filteredItems"
          :lang="lang"
          :selected-category="selectedCategory"
          @view-item="viewItem"
          @save="toggleSave"
        />

        <share-page
          v-else-if="currentTab === 'share'"
          :lang="lang"
          :is-logged-in="isLoggedIn"
        />

        <messages-page
          v-else-if="currentTab === 'messages'"
          :lang="lang"
          :is-logged-in="isLoggedIn"
        />

        <my-space
          v-else-if="currentTab === 'mySpace'"
          :lang="lang"
          :user="user"
          :wishlist="wishlist"
          :is-logged-in="isLoggedIn"
          @logout="handleLogout"
          @open-login="openLogin"
        />

        <item-detail
          v-if="selectedItem"
          :item="selectedItem"
          :lang="lang"
          :is-saved="isSaved"
          @back="selectedItem = null"
          @save="toggleSave"
          @want-adopt="wantAdopt"
        />
      </main>

      <nav class="bottom-nav" v-if="!selectedItem">
        <button class="nav-item" :class="{ active: currentTab === 'home' }" @click="navigateTo('home')">
          <span class="nav-icon">🏡</span>
          <span class="nav-label">{{ i18n.t('navHome') }}</span>
        </button>
        <button class="nav-item" :class="{ active: currentTab === 'adopt' }" @click="navigateTo('adopt')">
          <span class="nav-icon">🫶</span>
          <span class="nav-label">{{ i18n.t('navAdopt') }}</span>
        </button>
        <button class="nav-item" :class="{ active: currentTab === 'share' }" @click="navigateTo('share')">
          <span class="nav-icon">✨</span>
          <span class="nav-label">{{ i18n.t('navShare') }}</span>
        </button>
        <button class="nav-item" :class="{ active: currentTab === 'messages' }" @click="navigateTo('messages')">
          <span class="nav-icon">💬</span>
          <span class="nav-label">{{ i18n.t('navMessages') }}</span>
        </button>
        <button class="nav-item" :class="{ active: currentTab === 'mySpace' }" @click="navigateTo('mySpace')">
          <span class="nav-icon">👤</span>
          <span class="nav-label">{{ i18n.t('navMySpace') }}</span>
        </button>
      </nav>

      <login-modal
        v-if="showLogin"
        :lang="lang"
        :mode="loginMode"
        @login="handleLogin"
        @register="handleRegister"
        @close="showLogin = false; pendingAction = null"
        @toggle-mode="loginMode = $event"
      />
    </div>
  `
})

app.config.globalProperties.i18n = i18n
app.config.globalProperties.formatDistance = formatDistance
app.config.globalProperties.formatTimeAgo = formatTimeAgo

app.component('home-page', {
  emits: ['view-item', 'select-category'],
  setup(_, { emit }) {
    const lang = computed(() => i18n.lang)
    const topItems = ref(getTopItems(5))
    const counterDisplay = ref(0)

    onMounted(() => {
      const today = new Date().toDateString()
      const stored = localStorage.getItem('counter')
      let target = 47
      if (stored) {
        const data = JSON.parse(stored)
        if (data.date === today) {
          target = data.value
        } else {
          target = Math.floor(Math.random() * 51) + 30
          localStorage.setItem('counter', JSON.stringify({ date: today, value: target }))
        }
      } else {
        target = Math.floor(Math.random() * 51) + 30
        localStorage.setItem('counter', JSON.stringify({ date: today, value: target }))
      }
      let current = 0
      const step = Math.ceil(target / 60)
      const timer = setInterval(() => {
        current += step
        if (current >= target) {
          counterDisplay.value = target
          clearInterval(timer)
        } else {
          counterDisplay.value = current
        }
      }, 30)
    })

    const categories = [
      { key: 'digital', icon: '💻' },
      { key: 'home', icon: '🏠' },
      { key: 'books', icon: '📚' },
      { key: 'fashion', icon: '👕' },
      { key: 'toys', icon: '🧸' },
      { key: 'others', icon: '✨' }
    ]

    return { lang, counterDisplay, categories, topItems, emit }
  },
  template: `
    <div class="home">
      <section class="hero">
        <div class="hero-sprout">🌱</div>
        <h1 class="hero-tagline">{{ i18n.t('tagline') }}</h1>
        <p class="hero-desc">{{ i18n.t('description') }}</p>
        <button class="cta-adopt" @click="emit('select-category', null)">
          {{ i18n.t('ctaAdopt') }} →
        </button>
      </section>

      <section class="impact-counter">
        <div class="counter-number">{{ counterDisplay }}</div>
        <div class="counter-label">
          {{ i18n.t('counterLabel') }} <span class="count-highlight">{{ counterDisplay }}</span> {{ i18n.t('counterSuffix') }}
        </div>
      </section>

      <section class="carousel-section">
        <h2 class="section-title">{{ lang === 'zh-CN' ? '🔥 大家都在看' : '🔥 Most Viewed' }}</h2>
        <div class="carousel">
          <div class="carousel-card" v-for="item in topItems" :key="item.id" @click="emit('view-item', item)">
            <div class="card-image" :style="{ backgroundImage: 'url(' + item.photo + ')' }">
              <span class="status-badge" :class="'status-' + item.status">
                {{ i18n.t('status.' + item.status) }}
              </span>
            </div>
            <div class="card-info">
              <div class="card-name">{{ item.name[lang === 'zh-CN' ? 'zh' : 'en'] }}</div>
              <div class="card-distance">{{ formatDistance(item.distance, lang) }}</div>
              <p class="card-story">{{ item.story[lang === 'zh-CN' ? 'zh' : 'en'].substring(0, 55) }}...</p>
            </div>
          </div>
        </div>
      </section>

      <section class="categories-section">
        <h2 class="section-title">{{ lang === 'zh-CN' ? '🏷️ 选个类别' : '🏷️ Pick a Category' }}</h2>
        <div class="category-pills">
          <button class="pill" v-for="cat in categories" :key="cat.key" @click="emit('select-category', cat.key)">
            <span class="pill-icon">{{ cat.icon }}</span>
            {{ i18n.t('categories.' + cat.key) }}
          </button>
        </div>
      </section>
    </div>
  `
})

app.component('adopt-page', {
  props: ['items', 'lang', 'selectedCategory'],
  emits: ['view-item', 'save'],
  setup(props, { emit }) {
    const search = ref('')
    const localItems = computed(() => props.items || [])

    const filtered = computed(() => {
      if (!search.value) return localItems.value
      const q = search.value.toLowerCase()
      return localItems.value.filter(item => {
        const name = (item.name.zh + item.name.en).toLowerCase()
        const story = (item.story.zh + item.story.en).toLowerCase()
        return name.includes(q) || story.includes(q)
      })
    })

    return { search, filtered, emit }
  },
  template: `
    <div class="adopt">
      <div class="filter-bar">
        <input class="search-input" v-model="search" :placeholder="i18n.t('searchPlaceholder')">
      </div>
      <div class="adopt-grid" v-if="filtered.length">
        <div class="adopt-card" v-for="item in filtered" :key="item.id" @click="emit('view-item', item)">
          <div class="adopt-image" :style="{ backgroundImage: 'url(' + item.photo + ')' }">
            <span class="status-badge" :class="'status-' + item.status">
              {{ i18n.t('status.' + item.status) }}
            </span>
            <button class="save-btn" @click.stop="emit('save', item)">♥</button>
          </div>
          <div class="adopt-info">
            <div class="adopt-name">{{ item.name[lang === 'zh-CN' ? 'zh' : 'en'] }}</div>
            <div class="adopt-meta">
              <span>{{ formatDistance(item.distance, lang) }}</span>
              <span>·</span>
              <span>{{ formatTimeAgo(item.timestamp, lang) }}</span>
            </div>
            <p class="adopt-story">{{ item.story[lang === 'zh-CN' ? 'zh' : 'en'].substring(0, 48) }}...</p>
          </div>
        </div>
      </div>
      <div class="empty-state" v-else>
        <div class="empty-icon">🌱</div>
        <p>{{ lang === 'zh-CN' ? '还没有宝贝，去成为第一个发布的邻居吧' : 'No treasures yet — be the first to share' }}</p>
      </div>
    </div>
  `
})

app.component('share-page', {
  props: ['lang', 'isLoggedin'],
  template: `
    <div class="empty-state">
      <div class="empty-icon">📝</div>
      <p>{{ lang === 'zh-CN' ? '发布功能开发中，敬请期待！' : 'Share feature coming soon!' }}</p>
    </div>
  `
})

app.component('messages-page', {
  props: ['lang', 'isLoggedin'],
  template: `
    <div class="messages-empty">
      <div class="empty-icon">💬</div>
      <p>{{ lang === 'zh-CN' ? '还没有消息，去领养一个宝贝吧' : 'No messages yet, go adopt a treasure' }}</p>
    </div>
  `
})

app.component('my-space', {
  props: ['lang', 'user', 'wishlist', 'isLoggedin'],
  emits: ['logout', 'open-login'],
  template: `
    <div class="my-space" v-if="isLoggedin">
      <div class="profile-header">
        <div class="avatar">{{ user.nickname?.charAt(0) || '邻' }}</div>
        <div class="profile-info">
          <div class="nickname">{{ user.nickname }}</div>
          <div class="bio">{{ user.bio || (lang === 'zh-CN' ? '爱宝贝的邻居' : 'A treasure-loving neighbor') }}</div>
        </div>
      </div>
      <div class="stats">
        <div class="stat"><div class="stat-num">0</div><div class="stat-label">{{ i18n.t('myStats.posted') }}</div></div>
        <div class="stat"><div class="stat-num">0</div><div class="stat-label">{{ i18n.t('myStats.adoptedOut') }}</div></div>
        <div class="stat"><div class="stat-num">0</div><div class="stat-label">{{ i18n.t('myStats.adoptedIn') }}</div></div>
      </div>
      <div class="menu-list">
        <div class="menu-item">{{ i18n.t('myWishlist') }} <span class="badge">{{ wishlist.length }}</span></div>
        <div class="menu-item">{{ i18n.t('meetupRequests') }}</div>
        <div class="menu-item">{{ i18n.t('editProfile') }}</div>
        <div class="menu-item">{{ i18n.t('language') }}</div>
        <div class="menu-item logout-item" @click="$emit('logout')">{{ i18n.t('logout') }}</div>
      </div>
    </div>
    <div class="empty-state" v-else>
      <div class="empty-icon">👋</div>
      <p>{{ i18n.t('guestPrompt') }}</p>
      <div class="guest-buttons">
        <button class="btn-login" @click="$emit('open-login', 'login')">{{ i18n.t('guestLogin') }}</button>
        <button class="btn-register" @click="$emit('open-login', 'register')">{{ i18n.t('guestRegister') }}</button>
      </div>
    </div>
  `
})

app.component('item-detail', {
  props: ['item', 'lang', 'isSaved'],
  emits: ['back', 'save', 'want-adopt'],
  template: `
    <div class="item-detail" v-if="item">
      <button class="back-btn" @click="$emit('back')">←</button>
      <div class="detail-header" :style="{ backgroundImage: 'url(' + item.photo + ')' }">
        <span class="status-badge-large" :class="'status-' + item.status">
          {{ i18n.t('status.' + item.status) }}
        </span>
      </div>
      <div class="detail-content">
        <h1 class="detail-name">{{ item.name[lang === 'zh-CN' ? 'zh' : 'en'] }}</h1>
        <div class="detail-meta">
          <span>{{ formatDistance(item.distance, lang) }}</span>
          <span>·</span>
          <span>{{ item.district[lang === 'zh-CN' ? 'zh' : 'en'] }}</span>
          <span>·</span>
          <span>{{ formatTimeAgo(item.timestamp, lang) }}</span>
          <span>·</span>
          <span>{{ item.views }} {{ i18n.t('views') }}</span>
        </div>
        <div class="detail-story">
          <p>{{ item.story[lang === 'zh-CN' ? 'zh' : 'en'] }}</p>
        </div>
        <div class="owner-quote">
          <div class="quote-label">{{ i18n.t('ownerNote') }}</div>
          <p>「{{ item.ownerNote[lang === 'zh-CN' ? 'zh' : 'en'] }}」</p>
        </div>
        <div class="condition-badge">{{ i18n.t('condition.' + item.condition) }}</div>
        <p class="privacy-note">🔒 {{ i18n.t('privacyNote') }}</p>
        <p class="safety-tip">💡 {{ i18n.t('safetyTip') }}</p>
        <div class="detail-actions">
          <button class="btn-want-adopt" @click="$emit('want-adopt', item)">
            {{ i18n.t('wantAdopt') }}
          </button>
          <button class="btn-save-detail" :class="{ saved: isSaved(item) }" @click="$emit('save', item)">
            ♥ {{ i18n.t('save') }}
          </button>
        </div>
      </div>
    </div>
  `
})

app.component('login-modal', {
  props: ['lang', 'mode'],
  emits: ['login', 'register', 'close', 'toggle-mode'],
  setup() {
    const form = reactive({
      phone: '', code: '', email: '', password: '',
      nickname: '', city: '', district: '', bio: ''
    })
    const loginType = ref('phone')
    return { form, loginType }
  },
  template: `
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal">
        <button class="modal-close" @click="$emit('close')">✕</button>
        <h2>{{ mode === 'login' ? i18n.t('loginTitle') : i18n.t('registerTitle') }}</h2>

        <div v-if="mode === 'login'">
          <div class="login-tabs">
            <button :class="{ active: loginType === 'phone' }" @click="loginType = 'phone'">
              {{ i18n.t('loginPhone') }}
            </button>
            <button :class="{ active: loginType === 'email' }" @click="loginType = 'email'">
              {{ i18n.t('loginEmail') }}
            </button>
          </div>
          <div class="form-group">
            <template v-if="loginType === 'phone'">
              <input v-model="form.phone" :placeholder="lang === 'zh-CN' ? '手机号' : 'Phone number'">
              <input v-model="form.code" :placeholder="lang === 'zh-CN' ? '验证码' : 'Verification code'">
            </template>
            <template v-else>
              <input v-model="form.email" type="email" :placeholder="lang === 'zh-CN' ? '邮箱' : 'Email'">
              <input v-model="form.password" type="password" :placeholder="lang === 'zh-CN' ? '密码' : 'Password'">
            </template>
          </div>
          <div class="forgot-link">{{ i18n.t('forgotPassword') }}</div>
          <button class="btn-primary" @click="$emit('login', { nickname: form.nickname || form.email?.split('@')[0] || (form.phone ? form.phone.slice(-4) : '邻居'), email: form.email, phone: form.phone, city: form.city, district: form.district })">
            {{ i18n.t('loginBtn') }}
          </button>
          <p class="toggle-link" @click="$emit('toggle-mode', 'register')">
            {{ lang === 'zh-CN' ? '没有账号？去注册' : 'No account? Register' }}
          </p>
        </div>

        <div v-else class="register-form">
          <div class="form-group">
            <input v-model="form.nickname" :placeholder="i18n.t('registerNickname')">
            <input v-model="form.email" type="email" :placeholder="lang === 'zh-CN' ? '邮箱' : 'Email'">
            <input v-model="form.password" type="password" :placeholder="lang === 'zh-CN' ? '密码' : 'Password'">
            <input v-model="form.city" :placeholder="lang === 'zh-CN' ? '城市（选填）' : 'City (optional)'">
            <input v-model="form.district" :placeholder="lang === 'zh-CN' ? '地区（选填）' : 'District (optional)'">
            <textarea v-model="form.bio" :placeholder="lang === 'zh-CN' ? '关于我（选填）' : 'About me (optional)'"></textarea>
          </div>
          <button class="btn-primary" @click="$emit('register', { nickname: form.nickname, email: form.email, password: form.password, phone: form.phone, city: form.city, district: form.district, bio: form.bio })">
            {{ i18n.t('registerBtn') }}
          </button>
          <p class="toggle-link" @click="$emit('toggle-mode', 'login')">
            {{ lang === 'zh-CN' ? '已有账号？去登录' : 'Already have an account? Log in' }}
          </p>
        </div>

        <div class="social-logins">
          <button class="btn-social"><span class="social-icon">💚</span> WeChat</button>
          <button class="btn-social"><span class="social-icon">🔵</span> Google</button>
        </div>
      </div>
    </div>
  `
})

app.mount('#app')
