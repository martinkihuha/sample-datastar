import NavItem from '#models/nav_item'
import type { HttpContext } from '@adonisjs/core/http'
import { ServerSentEventGenerator } from '@starfederation/datastar-sdk/node'

export default class NavItemsController {
  async index({ request, response, view }: HttpContext) {
    const results = await NavItem.query()
      .whereNull('deletedAt')
      .preload('subNavItems', (sni) => sni.whereNull('deletedAt'))
      .orderBy('list_order')

    const reader = await ServerSentEventGenerator.readSignals(request.request)
    const currentUrl = reader.success ? reader.signals?.currentUrl || request.url() : request.url()

    // Render sidebar partial
    const html = await view.render('components/sidebar', {
      results,
      currentUrl,
    })

    // Use ServerSentEventGenerator.stream to handle SSE
    ServerSentEventGenerator.stream(request.request, response.response, (stream) => {
      // Patch the HTML elements into the #nav-item selector
      stream.patchElements(`<ul id="nav-item">${html}</ul>`)
    })
  }
}
