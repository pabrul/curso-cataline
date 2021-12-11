import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import { column, beforeSave, BaseModel, hasMany, HasMany, hasOne, HasOne, manyToMany, ManyToMany } from "@ioc:Adonis/Lucid/Orm";
import { UserKey, File } from "App/Models";
import Post from "./Post";
import Comment from "./Comment";
import Reaction from "./Reaction";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public username: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @hasMany(() => UserKey)
  public keys: HasMany<typeof UserKey>;

  @hasOne(() => File, {
    foreignKey: "ownerId",
    onQuery: (query) => query.where({ fileCategory: "avatar" })
  })
  public avatar: HasOne<typeof File>;

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>;

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>;

  @hasMany(() => Reaction)
  public reactions: HasMany<typeof Reaction>;

  @manyToMany(() => User, {
    pivotTable: "follows",
    pivotForeignKey: "following_id",
    pivotRelatedForeignKey: "follower_id"
  })
  public followers: ManyToMany<typeof User>;

  @manyToMany(() => User, {
    pivotTable: "follows",
    pivotForeignKey: "follower_id",
    pivotRelatedForeignKey: "following_id"
  })
  public followings: ManyToMany<typeof User>;
}
