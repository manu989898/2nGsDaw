import { useState } from 'react';
import Header from '../components/Header';
import { nanoid } from "nanoid"

export default function AddPage({products, setProducts}){
    const [newProduct, setNewProduct] = useState({
        id:nanoid(),
        name:"",
        description:"",
        price:"",
        stars:"",
        percentDiscount:0,
        image:"",
        discountCode:""
    })

    function handleChange(e){
        const {name, value} = e.target;
        let parsedValue;
        console.log("hola");
        switch(name){
            case "price":
                parsedValue = parseFloat(value);
                break;
            case "stars":
                parsedValue = parseInt(value);
                break;
            case "percentDiscount":
                parsedValue = parseInt(value);
                break;
            default:
                parsedValue = value;
        }

        setNewProduct({
            ...newProduct,
            [name]: parsedValue
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        setProducts([...products, newProduct]);
        setNewProduct({
            id:nanoid(),
            name:"",
            description:"",
            price:"",
            stars:"",
            percentDiscount:0,
            image:"",
            discountCode:""
        });
    }

    return(
        <>
            <Header search="" setSearch="" page="add"/>
            <main>  
                <h1>Add a new product</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter product name"
                            value={newProduct.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Description: </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Enter product description"
                            value={newProduct.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Image: </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            placeholder="Enter product image"
                            value={newProduct.image}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Price: </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Enter product price"
                            value={newProduct.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Discount Percentage: </label>
                        <input
                            type="number"
                            id="percentDiscount"
                            name="percentDiscount"
                            placeholder="Enter product discount"
                            value={newProduct.percentDiscount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Stars: </label>
                        <input
                            type="number"
                            id="stars"
                            name="stars"
                            placeholder="Enter product rating"
                            min="1"
                            max="5"
                            step="1"
                            value={newProduct.stars}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Discount Code: </label>
                        <input
                            type="text"
                            id="discountCode"
                            name="discountCode"
                            placeholder="Enter product discount code"
                            value={newProduct.discountCode}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>

                <h2>Product List</h2>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            {product.name} - {product.description} - {product.image} - {product.stars} - {product.price} € - {product.percentDiscount} - {product.discountCode?product.discountCode:"none"}
                        </li>
                    ))}
                </ul>

            </main>
        </>
    )
}