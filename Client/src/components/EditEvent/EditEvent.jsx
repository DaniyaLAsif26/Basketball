import { useParams } from 'react-router-dom'
import AddEventForm from '../AddEvent/AddEventForm.jsx'

import { useState, useEffect } from 'react'

export default function EditEvent() {

    const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    const { id } = useParams()
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`${BackEndRoute}/api/event/${id}`)

                const data = await res.json()

                if (data.success === true) {
                    setEvent(data.data)
                    console.log(data.data)
                }
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }

        fetchEvent()
    }, [id])

    if (loading) return;

    return (
        <div className="edit-event-cont">
            <AddEventForm eventData={event} isEditMode={true} />
        </div>
    )
}