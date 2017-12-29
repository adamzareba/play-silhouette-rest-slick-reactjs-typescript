package service

import javax.inject.Inject

import com.mohiva.play.silhouette.api.LoginInfo
import dao.DAOSlick
import models.security.User
import play.api.db.slick.DatabaseConfigProvider

import scala.concurrent.{ExecutionContext, Future}

class UserServiceImpl @Inject()(
    protected val dbConfigProvider: DatabaseConfigProvider)(
    implicit ex: ExecutionContext)
    extends UserService
    with DAOSlick {

  import profile.api._

  override def retrieve(loginInfo: LoginInfo): Future[Option[User]] = {
    val userQuery = for {
      dbLoginInfo <- loginInfoQuery(loginInfo)
      dbUserLoginInfo <- userLoginInfos.filter(_.loginInfoId === dbLoginInfo.id)
      dbUser <- users.filter(_.id === dbUserLoginInfo.userId)
    } yield dbUser
    db.run(userQuery.result.headOption).map { dbUserOption =>
      dbUserOption.map { user =>
        User(None,
             loginInfo,
             user.firstName,
             user.email,
             user.firstName,
             user.lastName,
             user.avatarURL,
             true)
      }
    }
  }

  override def save(user: User): Future[User] = {
    val dbUser = DBUser(None,
                        user.firstName,
                        user.lastName,
                        user.email,
                        user.avatarURL,
                        Option(user.activated))
    val dbLoginInfo =
      DBLoginInfo(None, user.loginInfo.providerID, user.loginInfo.providerKey)
    // We don't have the LoginInfo id so we try to get it first.
    // If there is no LoginInfo yet for this user we retrieve the id on insertion.
    val loginInfoAction = {
      val retrieveLoginInfo = loginInfos
        .filter(
          info =>
            info.providerId === user.loginInfo.providerID &&
              info.providerKey === user.loginInfo.providerKey
        )
        .result
        .headOption
      val insertLoginInfo = loginInfos
        .returning(loginInfos.map(_.id))
        .into((info, id) => info.copy(id = Some(id))) += dbLoginInfo
      for {
        loginInfoOption <- retrieveLoginInfo
        loginInfo <- loginInfoOption
          .map(DBIO.successful(_))
          .getOrElse(insertLoginInfo)
      } yield loginInfo
    }
    // combine database actions to be run sequentially
    val actions = (for {
      idValue <- (users returning users.map(_.id)).insertOrUpdate(dbUser)
      loginInfo <- loginInfoAction
      _ <- userLoginInfos += DBUserLoginInfo(idValue.get, loginInfo.id.get)
    } yield ()).transactionally
    // run actions and return user afterwards
    db.run(actions).map(_ => user)
  }
}
