import PlayerProfile from './Profile.jsx'

import { useLogin } from '../../context/LoginContext.jsx'

export default function UserProfile() {

    const { userData, isUserLoading } = useLogin()

    if (isUserLoading)
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '1.5rem'
        }}>
            Loading...
        </div>;
    if (!userData) return <div>No user data</div>

    return (
        <PlayerProfile UserData={userData} />
    )
}