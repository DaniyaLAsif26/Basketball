import AddNewsForm from "./AddNewsForm.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function EditNewsForm() {

    const { id } = useParams();
    const [news, setNews] = useState(null);

    useEffect(() => {
        const getEditNewsData = async () => {
            try {
                const res = await fetch(`${BackEndRoute}/api/news/${id}`)

                const data = await res.json()

                if (data.success === false) {
                    alert(data.message)
                    Navigate()
                    return;
                }
                setNews(data.news);
            }
            catch (err) {
                console.log(err)
                alert("Error fetching news data")
            }
        }
        getEditNewsData()
    }, [id])
    
    return (
        <AddNewsForm isEditMode={true} newsData={news} />
    )
}