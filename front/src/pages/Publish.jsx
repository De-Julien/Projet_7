// importations des modules
import { useState, useEffect } from "react"


const dataList = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/api/publish`)
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
    })
}


export default function Publish() {
    return (
        <header>
            <Nav />
            <Header />
        </header>
    );
};