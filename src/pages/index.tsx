import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"

import { gSSP } from "src/blitz-server"
import { GetServerSideProps } from "next"
import getHomepageData from "src/core/queries/getHomepageData"
import { PromiseReturnType } from "blitz"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className={styles.button}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  }

  return (
    <>
      <Link href={Routes.SignupPage()} className={styles.button}>
        <strong>Sign Up</strong>
      </Link>
      <Link href={Routes.LoginPage()} className={styles.loginButton}>
        <strong>Login</strong>
      </Link>
    </>
  )
}

const Home: BlitzPage<PageProps> = ({ users = [] }) => {
  return (
    <Layout title="Home">
      <div className={styles.globe} />

      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}

      <div className={styles.container}>
        <div className={styles.toastContainer}>
          <p>
            <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
          </p>
        </div>

        <main className={styles.main}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <h1>Your database & authentication is ready. Try it by signing up.</h1>

              {/* Auth */}
              <div className={styles.buttonContainer}>
                <Suspense fallback="Loading...">
                  <UserInfo />
                </Suspense>
              </div>
            </div>

            <div className={styles.body}>
              {/* Instructions */}
              <div className={styles.instructions}>
                <p>
                  <strong>Add a new model by running the following in your terminal:</strong>
                </p>

                <div>
                  <div className={styles.code}>
                    <span>1</span>
                    <pre>
                      <code>blitz generate all project</code>
                    </pre>
                  </div>

                  <div className={styles.code}>
                    <span>2</span>
                    <pre>
                      <code>Ctrl + c</code>
                    </pre>
                  </div>

                  <div className={styles.code}>
                    <span>3</span>
                    <pre>
                      <code>blitz dev</code>
                    </pre>
                  </div>

                  <div className={styles.code}>
                    <span>4</span>
                    <pre>
                      <code>
                        Go to{" "}
                        <Link href="/projects" className={styles.textLink}>
                          /projects
                        </Link>
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <span>Powered by</span>
          <a
            href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.textLink}
          >
            Blitz.js
          </a>
        </footer>
      </div>
    </Layout>
  )
}

export type PageProps = {
  users: PromiseReturnType<typeof getHomepageData>["users"]
}

export const getServerSideProps: GetServerSideProps<PageProps> = gSSP(async () => {
  const data = await getHomepageData()
  return {
    props: {
      users: data.users,
    },
  }
})

export default Home
