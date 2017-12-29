package dao

import javax.inject.Inject

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.util.PasswordInfo
import com.mohiva.play.silhouette.persistence.daos.DelegableAuthInfoDAO
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json.Json

import scala.concurrent.{ExecutionContext, Future}

/**
  * An implementation of the auth info DAO which stores the data in database.
  */
class PasswordInfoDAOImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit ex: ExecutionContext) extends DelegableAuthInfoDAO[PasswordInfo] with DAOSlick {

  import profile.api._

  implicit lazy val format = Json.format[PasswordInfo]

  protected def passwordInfoQuery(loginInfo: LoginInfo) = for {
    dbLoginInfo <- loginInfoQuery(loginInfo)
    dbPasswordInfo <- passwordInfos if dbPasswordInfo.loginInfoId === dbLoginInfo.id
  } yield dbPasswordInfo

  protected def passwordInfoSubQuery(loginInfo: LoginInfo) =
    passwordInfos.filter(_.loginInfoId in loginInfoQuery(loginInfo).map(_.id))

  protected def addAction(loginInfo: LoginInfo, authInfo: PasswordInfo) =
    loginInfoQuery(loginInfo).result.head.flatMap { dbLoginInfo =>
      passwordInfos +=
        DBPasswordInfo(authInfo.hasher, authInfo.password, authInfo.salt, dbLoginInfo.id.get)
    }.transactionally

  protected def updateAction(loginInfo: LoginInfo, authInfo: PasswordInfo) =
    passwordInfoSubQuery(loginInfo).
      map(dbPasswordInfo => (dbPasswordInfo.hasher, dbPasswordInfo.password, dbPasswordInfo.salt)).
      update((authInfo.hasher, authInfo.password, authInfo.salt))

  /**
    * Finds the auth info which is linked with the specified login info.
    *
    * @param loginInfo The linked login info.
    * @return The retrieved auth info or None if no auth info could be retrieved for the given login info.
    */
  override def find(loginInfo: LoginInfo): Future[Option[PasswordInfo]] = {
    db.run(passwordInfoQuery(loginInfo).result.headOption).map { dbPasswordInfoOption =>
      dbPasswordInfoOption.map(dbPasswordInfo =>
        PasswordInfo(dbPasswordInfo.hasher, dbPasswordInfo.password, dbPasswordInfo.salt))
    }
  }

  /**
    * Adds new auth info for the given login info.
    *
    * @param loginInfo The login info for which the auth info should be added.
    * @param authInfo  The auth info to add.
    * @return The added auth info.
    */
  override def add(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] = {
    db.run(addAction(loginInfo, authInfo)).map(_ => authInfo)
  }

  /**
    * Updates the auth info for the given login info.
    *
    * @param loginInfo The login info for which the auth info should be updated.
    * @param authInfo  The auth info to update.
    * @return The updated auth info.
    */
  override def update(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] = {
    db.run(updateAction(loginInfo, authInfo)).map(_ => authInfo)
  }

  /**
    * Saves the auth info for the given login info.
    *
    * This method either adds the auth info if it doesn't exists or it updates the auth info
    * if it already exists.
    *
    * @param loginInfo The login info for which the auth info should be saved.
    * @param authInfo  The auth info to save.
    * @return The saved auth info.
    */
  override def save(loginInfo: LoginInfo, authInfo: PasswordInfo): Future[PasswordInfo] = {
    val query = loginInfoQuery(loginInfo).joinLeft(passwordInfos).on(_.id === _.loginInfoId)
    val action = query.result.head.flatMap {
      case (dbLoginInfo, Some(dbPasswordInfo)) => updateAction(loginInfo, authInfo)
      case (dbLoginInfo, None) => addAction(loginInfo, authInfo)
    }
    db.run(action).map(_ => authInfo)
  }

  /**
    * Removes the auth info for the given login info.
    *
    * @param loginInfo The login info for which the auth info should be removed.
    * @return A future to wait for the process to be completed.
    */
  override def remove(loginInfo: LoginInfo): Future[Unit] = {
    db.run(passwordInfoSubQuery(loginInfo).delete).map(_ => ())
  }
}
