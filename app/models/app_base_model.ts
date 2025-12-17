import { BaseModel, CamelCaseNamingStrategy } from '@adonisjs/lucid/orm'

export default class AppBaseModel extends BaseModel {
  static naminStrategy = new CamelCaseNamingStrategy()
}
