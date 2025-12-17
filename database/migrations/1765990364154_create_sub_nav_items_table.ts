import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sub_nav_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('nav_item_id').unsigned().references('nav_items.id').onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('url').notNullable()
      table.string('icon').nullable().defaultTo('')
      table.string('icon_solid').nullable().defaultTo('')
      table.integer('list_order', 3).defaultTo(0)

      table.timestamp('deleted_at').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
