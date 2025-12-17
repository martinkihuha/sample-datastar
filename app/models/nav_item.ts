import { DateTime } from 'luxon'
import { beforeFetch, column, hasMany } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import SubNavItem from './sub_nav_item.js'

export default class NavItem extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare url: string

  @column()
  declare icon: string

  @column()
  declare iconSolid: string

  @column({ serializeAs: null })
  declare listOrder: number

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof NavItem>) {
    query.whereNull('deletedAt')
  }

  @hasMany(() => SubNavItem)
  declare subNavItems: HasMany<typeof SubNavItem>
}
