import PlayerProfile from './Profile.jsx'

import { useLogin } from '../../context/LoginContext.jsx'

export default function UserProfile() {

    const { userData, isUserLoading } = useLogin()

    if (isUserLoading) return <div>Loading...</div>;
    if (!userData) return <div>No user data</div>

    return (
        <PlayerProfile UserData={userData} />
    )
}