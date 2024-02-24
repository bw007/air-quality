export const menu = [
  {
    path: '',
    name: 'home',
    title: 'Bosh sahifa',
    icon: 'pie-chart',
    meta: {
      secure: false,
      text: "Havo sifati bashorati"
    },
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: 'place',
    name: 'place',
    title: 'Shaharlar',
    icon: 'place',
    meta: {
      secure: false,
      text: "Havo sifati ko'rsatkichlari"
    },
    component: () => import("@/views/PlaceView.vue")
  },
  {
    path: 'weather',
    name: 'weather',
    title: 'Ob-Havo',
    icon: 'Lightning',
    meta: {
      secure: false,
      text: "Ob-havo ma'lumotlari"
    },
    component: () => import("@/views/WeatherView.vue")
  },
  {
    path: 'setting',
    name: 'setting',
    title: 'Sozlamalar',
    icon: 'Setting',
    meta: {
      secure: false,
      text: "Sozlamalar"
    },
    component: () => import("@/views/SettingView.vue")
  }
]