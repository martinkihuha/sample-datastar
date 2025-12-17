import type { HttpContext } from '@adonisjs/core/http'

export default class StaticPagesController {
  async dashboard({ request, view }: HttpContext) {
    // Check if this is an HTMX request
    const isHtmxRequest = request.header('hx-request') === 'true'

    return view.render(`pages/${isHtmxRequest ? '_content' : 'home'}`, { title: 'Dashboard' })
  }

  async team({ view }: HttpContext) {
    return view.render('pages/team/index', { title: 'Team' })
  }
}
