import edge from 'edge.js'
import env from '#start/env'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as heroIcons } from '@iconify-json/heroicons'
import { icons as mdiIcons } from '@iconify-json/mdi'
import { icons as svgSpinners } from '@iconify-json/svg-spinners'
import { icons as phIcons } from '@iconify-json/ph'
import { icons as emojiIcons } from '@iconify-json/emojione-monotone'
import { icons as fluentIcons } from '@iconify-json/fluent'
import { icons as radixIcons } from '@iconify-json/radix-icons'
import { icons as lucideIcons } from '@iconify-json/lucide'

edge.global('env', env)

/**
 * Add icons collection
 */
addCollection(heroIcons)
addCollection(mdiIcons)
addCollection(svgSpinners)
addCollection(phIcons)
addCollection(emojiIcons)
addCollection(fluentIcons)
addCollection(radixIcons)
addCollection(lucideIcons)

/**
 * Register the plugin
 */
edge.use(edgeIconify)
