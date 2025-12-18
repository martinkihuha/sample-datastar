import type { HttpContext } from '@adonisjs/core/http'

export default class StaticPagesController {
  async dashboard({ view }: HttpContext) {
    const data = { title: 'Dashboard', metaDescription: 'Welcome to your dashboard' }
    view.share({ pageTitle: data.title })

    return view.render('pages/dashboard/index', data)
  }

  async team({ view }: HttpContext) {
    const data = { title: 'Team', metaDescription: 'Meet our leadership team' }
    view.share({ pageTitle: data.title })

    return view.render('pages/team/index', data)
  }

  async page404({ view }: HttpContext) {
    const data = {
      title: 'Page Not Found',
      metaDescription: 'The page you are looking for does not exist',
    }
    view.share({ pageTitle: data.title })

    return view.render('pages/errors/not_found', data)
  }
}
