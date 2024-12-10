import { useState } from 'react'
import Header from '../components/Header'
import Main from '../components/Main'

export default function HomePage({products}){
    const [search, setSearch] = useState("");

    const filteredProducts = () => products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return(
        <>
            <Header search={search} setSearch={setSearch} page="home" />
            <Main filteredProducts={filteredProducts} />
        </>
    )
}