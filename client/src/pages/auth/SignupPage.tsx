import SignupForm from '../../components/auth/SignUpForm'
import type { IRoles } from '../../types/auth.types'

function SignupPage( { role }: { role: IRoles }) {
  return (
    <div>
      <SignupForm role={role} />
    </div>
  )
}

export default SignupPage