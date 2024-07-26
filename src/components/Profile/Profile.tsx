import {userSelector} from '../../features/auth'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {user} = useSelector(userSelector);

  return (
    <div>
      Profile Details <br/>
      Current Username is {user.username} <br/>
      Current User ID = {user.id}
    </div>
  )
}

export default Profile
