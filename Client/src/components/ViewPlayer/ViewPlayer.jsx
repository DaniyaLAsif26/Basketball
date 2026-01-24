import { useEffect, useState } from "react"
import PlayerProfile from "../UserProfile/Profile"
import { useParams } from "react-router-dom"

const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function ViewPlayer() {
    const { id } = useParams()

    const [playerLoaded, setPlayerLoaded] = useState(false)
    const [player, setPlayer] = useState()

    const getPlayer = async () => {
        try {

            const res = await fetch(`${BackEndRoute}/api/user/${id}`)

            const dataRes = await res.json()

            if (dataRes.success === false) {
                alert('Player not found')
                setPlayer()
                return
            }
            
            setPlayer(dataRes.user)
            setPlayerLoaded(true)
            return
            
        }
        catch (err) {
            console.log(err)
            alert(err.message)
            setPlayer()
            setPlayerLoaded(true)
        }

    }

    useEffect(() => {
        getPlayer()
    }, [id])

    if (!playerLoaded) return <div>Loading...</div>;
    if (!player) return <div>No user data</div>

    return (
        <PlayerProfile UserData={player} />
    )
}