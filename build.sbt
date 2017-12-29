import scala.sys.process.Process
import play.sbt.PlayImport.PlayKeys.playRunHooks

name := "play-silhouette-rest-slick-reactjs-typescript"
 
version := "1.0" 

lazy val `play-silhouette-rest-slick-reactjs-typescript` = (project in file(".")).enablePlugins(PlayScala)
scalacOptions ++= Seq("-deprecation", "-language:_")

scalaVersion := "2.12.3"
val silhouetteVersion = "5.0.2"
val playMailerVersion = "6.0.1"
val playJsonVersion = "2.6.8"
val swaggerUIVersion = "3.6.1"
val slickVersion = "3.0.1"
val h2Version = "1.4.196"

libraryDependencies ++= Seq(
  "com.typesafe.play" %% "play-slick" % slickVersion,
  "com.typesafe.play" %% "play-slick-evolutions" % slickVersion,
  "com.h2database" % "h2" % h2Version,
  "com.mohiva" %% "play-silhouette" % silhouetteVersion,
  "com.mohiva" %% "play-silhouette-persistence" % silhouetteVersion,
  "com.mohiva" %% "play-silhouette-password-bcrypt" % silhouetteVersion,
  "com.mohiva" %% "play-silhouette-crypto-jca" % silhouetteVersion,
  "com.mohiva" %% "play-silhouette-testkit" % silhouetteVersion % "test",
  "com.iheart" %% "ficus" % "1.4.3",
  "com.typesafe.play" %% "play-mailer" % playMailerVersion,
  "com.typesafe.play" %% "play-mailer-guice" % playMailerVersion,
  "net.codingwell" %% "scala-guice" % "4.1.1",
  "com.adrianhurt" %% "play-bootstrap" % "1.2-P26-B3",
  "com.typesafe.play" %% "play-json" % playJsonVersion,
  "com.typesafe.play" %% "play-json-joda" % playJsonVersion,
  "io.swagger" %% "swagger-play2" % "1.6.1-SNAPSHOT",
  "org.webjars" % "swagger-ui" % swaggerUIVersion,
  specs2 % Test,
  ehcache,
  guice
)

unmanagedResourceDirectories in Test += (baseDirectory.value / "target/web/public/test")

resolvers += Resolver.jcenterRepo
resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
resolvers += "Sonatype OSS Snapshots" at "https://oss.sonatype.org/content/repositories/snapshots/"
resolvers += "iheartradio-maven" at "https://dl.bintray.com/iheartradio/maven"
resolvers += "atlassian-maven" at "https://maven.atlassian.com/content/repositories/atlassian-public"

// Starts: Webpack build task
lazy val isWin = System.getProperty("os.name").toUpperCase().contains("WIN")
val appPath = if (isWin) "app\\frontend" else "./app/frontend"
val webpackBuild = taskKey[Unit]("Webpack build task.")

webpackBuild := {
  if (isWin) Process("cmd /c npm start", file(appPath)).run
  else Process("npm start", file(appPath)).run
}

(packageBin in Universal) := ((packageBin in Universal) dependsOn webpackBuild).value
// Ends.

// Starts: Webpack server process when running locally and build actions for production bundle
lazy val frontendDirectory = baseDirectory {_ / appPath}
playRunHooks += frontendDirectory.map(WebpackServer(_)).value
// Ends.
