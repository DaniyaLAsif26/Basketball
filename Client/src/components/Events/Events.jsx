import './events.css';
import { MdOutlineSort } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import { IoMdMale } from "react-icons/io";
import { PiStepsFill } from "react-icons/pi";
import { FaBasketball } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

import EveInput from './Eve-input.jsx';
import EveDrop from './Eve-drop.jsx';
import EveSearch from './Eve-search.jsx';
import EveResults from './Eve-results.jsx';

import { useEffect, useState } from 'react';

export default function Events() {

    const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const allEvents = async () => {
            if (loading) return;
            try {
                setLoading(true)
                const res = await fetch(`${BackEndRoute}/api/event/all-events`, {
                    method: "GET"
                })

                const data = await res.json()

                if (data.success === true) {
                    setEvents(data.data)
                }
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }
        allEvents()
    }, [])

    useEffect(() => {
        console.log("Updated events:", events)
    }, [events])


    // Type
    const [search, setSearch] = useState(() => {
        return sessionStorage.getItem('eventSearch') || '';
    })

    useEffect(() => {
        sessionStorage.setItem('eventSearch', search)
    }, [search])

    // Type
    const [type, setType] = useState(() => {
        return sessionStorage.getItem('type') || 'All';
    })

    useEffect(() => {
        sessionStorage.setItem('type', type)
    }, [type])

    // Age
    const [age, setAge] = useState(() => {
        return sessionStorage.getItem('age') || 'All';
    })

    useEffect(() => {
        sessionStorage.setItem('age', age)
    }, [age])

    // Category
    const [category, setCategory] = useState(() => {
        return sessionStorage.getItem('category') || 'All';
    })

    useEffect(() => {
        sessionStorage.setItem('category', category)
    }, [category])

    // Level
    const [level, setLevel] = useState(() => {
        return sessionStorage.getItem('level') || 'All';
    })

    useEffect(() => {
        sessionStorage.setItem('level', level)
    }, [level])

    // Format
    const [format, setFormat] = useState(() => {
        return sessionStorage.getItem('format') || 'All';
    })

    useEffect(() => {
        sessionStorage.setItem('format', format)
    }, [format])

    // District
    const [district, setDistrict] = useState(() => {
        return sessionStorage.getItem('district') || 'All';
    })

    useEffect(() => {
        sessionStorage.setItem('district', district)
    }, [district])

    const drop = [
        { head: 'Type', selected: type, setSelected: setType, icon: <MdOutlineSort style={{ fontSize: '1.15rem' }} />, dropIcon: <TiArrowSortedDown style={{ fontSize: '1.15rem' }} />, class: 'type', list: ['All', 'Official', 'Un-Official'] },

        { head: 'Age group', selected: age, setSelected: setAge, icon: <IoPerson style={{ fontSize: '1.15rem' }} />, dropIcon: <TiArrowSortedDown style={{ fontSize: '1.15rem' }} />, class: 'age', list: ['All', 'Open', 'U-23', 'U-21', 'U-19', 'U-18', 'U-17', 'U-16', 'U-15', 'U-14', 'U-13', 'U-12', 'U-11', 'U-10'] },

        { head: 'Category', selected: category, setSelected: setCategory, icon: <IoMdMale style={{ fontSize: '1.15rem' }} />, dropIcon: <TiArrowSortedDown style={{ fontSize: '1.15rem' }} />, class: 'category', list: ['All', 'Male', 'Female'] },

        {
            head: 'Level', selected: level, setSelected: setLevel, icon: <PiStepsFill style={{ fontSize: '1.15rem' }} />,
            dropIcon: <TiArrowSortedDown style={{ fontSize: '1.15rem' }} />, class: 'level', list: ['All', 'Open', 'College', 'School', 'University']
        },

        { head: 'Format', selected: format, setSelected: setFormat, icon: <FaBasketball style={{ fontSize: '1.15rem' }} />, dropIcon: <TiArrowSortedDown style={{ fontSize: '1.15rem' }} />, class: 'format', list: ['All', '5X5', '3X3'] },

        {
            head: 'District', selected: district, setSelected: setDistrict, icon: <FaMapMarkerAlt style={{ fontSize: '1.15rem' }} />, dropIcon: <TiArrowSortedDown style={{ fontSize: '1.15rem' }} />, class: 'select-district', list: [
                'All',
                "Hyderabad",
                "Ranga Reddy",
                "Medchal–Malkajgiri",
                "Adilabad",
                "Bhadradri Kothagudem",
                "Hanumakonda",
                "Jagtial",
                "Jangaon",
                "Jayashankar Bhupalpally",
                "Jogulamba Gadwal",
                "Kamareddy",
                "Karimnagar",
                "Khammam",
                "Kumuram Bheem Asifabad",
                "Mahabubabad",
                "Mahabubnagar",
                "Mancherial",
                "Medak",
                "Mulugu",
                "Nagarkurnool",
                "Nalgonda",
                "Narayanpet",
                "Nirmal",
                "Nizamabad",
                "Peddapalli",
                "Rajanna Sircilla",
                "Sangareddy",
                "Siddipet",
                "Suryapet",
                "Vikarabad",
                "Wanaparthy",
                "Warangal",
                "Yadadri Bhuvanagiri"
            ]
        },
    ]

    const submitSearch = async () => {
        console.log(search, type, age, category, level, format, category)
    }

    return (
        <div className="events">

            <div className="events-search">
                <form action="" className='events-search-form'>
                    <EveInput search={search} setSearch={setSearch} />
                    <EveDrop drop={drop} />
                    <EveSearch search={submitSearch} />

                </form>
            </div>
            <EveResults searchResults={events} loading={loading} />
        </div>
    )
}