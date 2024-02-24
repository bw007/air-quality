export const menu = [
  {
    path: '',
    name: 'home',
    title: 'Bosh sahifa',
    icon: 'pie-chart',
    meta: {
      text: "Prognozlar"
    },
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: 'place',
    name: 'place',
    title: 'Shaharlar',
    icon: 'place',
    meta: {
      text: "Shaharlardagi ko'rsatkichlar"
    },
    component: () => import("@/views/PlaceView.vue")
  },
  {
    path: 'weather',
    name: 'weather',
    title: 'Ob-Havo',
    icon: 'Lightning',
    meta: {
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
      text: "Sozlamalar"
    },
    component: () => import("@/views/SettingView.vue")
  }
]