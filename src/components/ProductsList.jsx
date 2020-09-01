import React from 'react'
import { useEffect, useState } from 'react'

export default function ProductsList() {
    const [data, setData] = useState({})
    function fetchData() {
        fetch('https://mock-data-api.firebaseio.com/e-commerce/products.json')
            .then((res) => res.json())
            .then((items) => { setData(items)})


    }
    useEffect(() => {
        fetchData()
    }, [])
    return (

        <div>
            {data && Object.entries(data).map((item)=>{
                const key = item[0]
                const payload = item[1]
                return(
                    <div key={key}>
                        {payload.name}</div>

                )
            })}
        </div>
    )
}
