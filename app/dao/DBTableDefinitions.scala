package dao

import com.mohiva.play.silhouette.api.LoginInfo
import play.api.db.slick.HasDatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.lifted.ProvenShape.proveShapeOf

trait DBTableDefinitions {
  self: HasDatabaseConfigProvider[JdbcProfile] =>

  import profile.api._

  case class DBUser(id: Option[Long], firstName: String, lastName: String, email: String, avatarURL: Option[String], activated: Option[Boolean])

  class Users(tag: Tag) extends Table[DBUser](tag, "USER") {
    def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
    def firstName = column[String]("FIRST_NAME")
    def lastName = column[String]("LAST_NAME")
    def email = column[String]("EMAIL")
    def avatarURL = column[Option[String]]("AVATAR_URL")
    def activated = column[Option[Boolean]]("ACTIVATED")

    def * = (id.?, firstName, lastName, email, avatarURL, activated) <> (DBUser.tupled, DBUser.unapply)
  }

  case class DBLoginInfo(id: Option[Long], providerID: String, providerKey: String)

  class LoginInfos(tag: Tag) extends Table[DBLoginInfo](tag, "LOGIN_INFO") {
    def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
    def providerId = column[String]("PROVIDER_ID")
    def providerKey = column[String]("PROVIDER_KEY")

    def * = (id.?, providerId, providerKey) <> (DBLoginInfo.tupled, DBLoginInfo.unapply)
  }

  case class DBUserLoginInfo(userID: Long, loginInfoId: Long)

  class UserLoginInfos(tag: Tag) extends Table[DBUserLoginInfo](tag, "USER_LOGIN_INFO") {
    def userId = column[Long]("USER_ID")
    def loginInfoId = column[Long]("LOGIN_INFO_ID")

    def * = (userId, loginInfoId) <> (DBUserLoginInfo.tupled, DBUserLoginInfo.unapply)
  }

  case class DBPasswordInfo(hasher: String, password: String, salt: Option[String], loginInfoId: Long)

  class PasswordInfos(tag: Tag) extends Table[DBPasswordInfo](tag, "PASSWORD_INFO") {
    def hasher = column[String]("HASHER")
    def password = column[String]("PASSWORD")
    def salt = column[Option[String]]("SALT")
    def loginInfoId = column[Long]("LOGIN_INFO_ID")

    def * = (hasher, password, salt, loginInfoId) <> (DBPasswordInfo.tupled, DBPasswordInfo.unapply)
  }

  val users = TableQuery[Users]
  val loginInfos = TableQuery[LoginInfos]
  val userLoginInfos = TableQuery[UserLoginInfos]
  val passwordInfos = TableQuery[PasswordInfos]

  def loginInfoQuery(loginInfo: LoginInfo) =
    loginInfos.filter(dbLoginInfo => dbLoginInfo.providerId === loginInfo.providerID && dbLoginInfo.providerKey === loginInfo.providerKey)
}