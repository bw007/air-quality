export const menu = [
  {
    path: '',
    name: 'home',
    title: 'Bosh sahifa',
    icon: 'pie-chart',
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: 'place',
    name: 'place',
    title: 'Shaharlar',
    icon: 'place',
    component: () => import("@/views/PlaceView.vue")

  },
  {
    path: 'weather',
    name: 'weather',
    title: 'Ob-Havo',
    icon: 'PartlyCloudy',
    component: () => import("@/views/HomeView.vue")

  }
]