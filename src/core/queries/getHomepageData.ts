import db from "db"

const TAKE_AMOUNT = 10

const getHomepageData = async () => {
  const users = db.user.findMany({
    take: TAKE_AMOUNT * 2,
  })

  const results = await users

  return {
    users: results,
  }
}

export default getHomepageData
