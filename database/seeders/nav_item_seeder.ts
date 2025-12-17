import NavItem from '#models/nav_item'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'title'

    await NavItem.updateOrCreateMany(uniqueKey, [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: 'heroicons:home',
        iconSolid: 'heroicons:home-solid',
        listOrder: 1,
      },
      {
        title: 'Team',
        url: '/team',
        icon: 'heroicons:users',
        iconSolid: 'heroicons:users-solid',
        listOrder: 2,
      },
      {
        title: 'Projects',
        url: '/projects',
        icon: 'heroicons:folder',
        iconSolid: 'heroicons:folder-solid',
        listOrder: 3,
      },
      {
        title: 'Calendar',
        url: '/calendar',
        icon: 'heroicons:calendar',
        iconSolid: 'heroicons:calendar-solid',
        listOrder: 4,
      },
      {
        title: 'Documents',
        url: '/documents',
        icon: 'heroicons:document-duplicate',
        iconSolid: 'heroicons:document-duplicate-solid',
        listOrder: 5,
      },
      {
        title: 'Reports',
        url: '/reports',
        icon: 'heroicons:chart-bar',
        iconSolid: 'heroicons:chart-bar-solid',
        listOrder: 6,
      },
    ])
  }
}
