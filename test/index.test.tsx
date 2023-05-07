/**
 * @vitest-environment jsdom
 */

import { expect, vi, test } from "vitest"
import { useSession } from "@blitzjs/auth"

import Home from "src/pages/index"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"

import { render } from "test/utils"

vi.mock("@blitzjs/auth")
vi.mock("src/users/hooks/useCurrentUser")

test("renders sign up button when not logged in", () => {
  vi.mocked(useSession).mockReturnValue({
    userId: null,
    isLoading: false,
  })
  vi.mocked(useCurrentUser).mockReturnValue(null)

  const view = render(<Home users={[]} />)

  expect(view.getByText(/sign up/i)).toBeInTheDocument()
})

test("renders logout button when logged in", () => {
  vi.mocked(useSession).mockReturnValue({
    userId: 1,
    isLoading: false,
  })
  vi.mocked(useCurrentUser).mockReturnValue({
    id: 1,
    name: "User",
    role: "USER",
    email: "user@email.com",
  })

  const view = render(<Home users={[]} />)

  expect(view.getByText(/logout/i)).toBeInTheDocument()
})
