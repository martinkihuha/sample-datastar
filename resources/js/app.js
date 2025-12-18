// @ts-expect-error (only required for TypeScript projects)
import 'https://cdn.jsdelivr.net/gh/starfederation/datastar@1.0.0-RC.7/bundles/datastar.js'
import 'basecoat-css/all'

// Intercept nav clicks and make them Datastar requests
document.addEventListener(
  'click',
  async (e) => {
    const link = e.target.closest('a[href]')
    if (!link) return

    const href = link.getAttribute('href')
    // Only intercept navigation links (not external, not anchor links)
    if (!href || href.startsWith('http') || href.startsWith('#')) return

    // Only intercept navigation-related links
    if (!link.closest('#nav-item') && !link.closest('a[href="/dashboard"]')) return

    // console.log('Intercepting navigation to:', href)
    e.preventDefault()

    // Make a Datastar GET request using manual SSE parsing
    try {
      const response = await fetch(href, {
        method: 'GET',
        headers: {
          'datastar-request': 'true',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let currentData = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          // Check for event type
          if (line.startsWith('event:')) {
            if (currentData) {
              processSSEData(currentData)
              currentData = ''
            }
          }
          // Accumulate data lines (they start with "data: ")
          else if (line.startsWith('data: elements ')) {
            currentData += line.substring(14) + '\n'
          } else if (line.startsWith('data: ')) {
            currentData += line.substring(6) + '\n'
          }
        }
      }

      // Process any remaining data
      if (currentData) {
        processSSEData(currentData)
      }

      // Update the browser's address bar
      window.history.pushState({ path: href }, '', href)
      // console.log('Navigation completed successfully')
    } catch (err) {
      console.error('Navigation error:', err)
    }
  },
  true
)

function processSSEData(html) {
  if (!html.trim()) return

  // console.log('Processing SSE patch:', html.substring(0, 60))

  try {
    // Parse the HTML
    const parser = new DOMParser()
    const doc = parser.parseFromString(html.trim(), 'text/html')
    const element = doc.body.firstElementChild

    if (!element) {
      console.warn('Could not parse element from SSE data')
      return
    }

    // Get the ID to find the target
    const id = element.id
    // console.log('Extracted ID:', id)

    if (id) {
      const target = document.getElementById(id)
      if (target) {
        // console.log('Replacing element with ID:', id)
        target.replaceWith(element)
      } else {
        console.warn('Target element not found:', id)
      }
    } else {
      console.warn('Element has no ID, cannot patch')
    }
  } catch (err) {
    console.error('Error processing SSE data:', err)
  }
}
