/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import transmit from '@adonisjs/transmit/services/main'

transmit.registerRoutes()

const StaticPagesController = () => import('#controllers/static_pages_controller')
const NavItemsController = () => import('#controllers/nav_items_controller')

router.on('/').redirect('/dashboard')
router.get('/404', [StaticPagesController, 'page404'])
router.get('/dashboard', [StaticPagesController, 'dashboard'])
router.get('/team', [StaticPagesController, 'team'])
router.get('/projects', [StaticPagesController, 'page404'])
router.get('/calendar', [StaticPagesController, 'page404'])
router.get('/documents', [StaticPagesController, 'page404'])
router.get('/reports', [StaticPagesController, 'page404'])

router
  .group(() => {
    router.resource('nav-items', NavItemsController).only(['index'])
  })
  .prefix('api')
