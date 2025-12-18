import NavItem from '#models/nav_item'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { ServerSentEventGenerator } from '@starfederation/datastar-sdk'

export default class DatastarMiddleware {
  async handle({ request, response, view }: HttpContext, next: NextFn) {
    const isDatastarRequest = !!request.header('datastar-request')
    // console.log('🔍 Datastar Middleware:', {
    //   url: request.url(),
    //   isDatastarRequest,
    //   headers: request.header('datastar-request'),
    // })

    // 1. If it's not a Datastar request, proceed normally
    if (!isDatastarRequest) {
      return next()
    }

    console.log('✅ Processing as Datastar request')

    // 2. For Datastar requests, we need to render the page content and wrap it in SSE
    // Get the route to determine which page to render
    const url = request.url()

    let contentHtml = ''
    let title = ''

    // Render the appropriate page content
    if (url.includes('/dashboard')) {
      contentHtml = await view.render('pages/dashboard/_content', {
        title: 'Dashboard',
      })
      title = 'Dashboard'
    } else if (url.includes('/team')) {
      contentHtml = await view.render('pages/team/_content', {
        title: 'Team',
      })
      title = 'Team'
    } else {
      contentHtml = await view.render('pages/errors/_404', {
        title: 'Not Found',
      })
      title = 'Not Found'
    }

    // console.log('📦 Rendered content length:', contentHtml.length)
    // console.log('🎯 Streaming SSE response')

    // Fetch fresh navigation for the active state
    const results = await NavItem.query()
      .whereNull('deletedAt')
      .preload('subNavItems', (sni) => sni.whereNull('deletedAt'))
      .orderBy('list_order')

    return ServerSentEventGenerator.stream(request.request, response.response, async (stream) => {
      // console.log('📤 Sending patches')

      // Patch Page Title
      stream.patchElements(`<h1 id="page-title">${title}</h1>`)

      // Patch Main Content
      stream.patchElements(
        `<div id="content" class="flex-1 overflow-auto bg-muted">${contentHtml}</div>`
      )

      // Patch Sidebar (to update active classes)
      const sidebarHtml = await view.render('components/sidebar', {
        results,
        currentUrl: request.url(),
      })
      stream.patchElements(`<ul id="nav-item">${sidebarHtml}</ul>`)
    })
  }
}
