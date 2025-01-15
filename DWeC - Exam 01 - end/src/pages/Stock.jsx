import {useState, useEffect} from "react";
import {useImmer} from "use-immer";

import ProductCard from "../components/ProductCard";

export default function Stock() {
    const [products, setProducts] = useImmer([]);
    const [form, setForm] = useState({id:"", new: "", refurbished: ""});

    useEffect(() => {
        const localStorageProducts = JSON.parse(localStorage.getItem("products"));
        if(localStorageProducts){            
            setProducts(localStorageProducts);
        }
        else{
            fetch("/data/star-wars-figures.json")
                .then(res => res.json())
                .then(data => {
                    setProducts(data);
                    localStorage.setItem("products",JSON.stringify(data));
                })
        }
    }, [setProducts]);

    function handleFormChange(e){
        const{name, value} = e.target;
        setForm({...form,[name]:value});
    }

    function handleFormSubmit(e){
        e.preventDefault();

        setProducts(draft => {
            const product = draft.find(p => p.id == form.id);

            if(product){
                if(form.new) product.stock.new = form.new;
                if(form.refurbished) product.stock.refurbished = form.refurbished;
            }

            localStorage.setItem("products",JSON.stringify(draft));
        });

        setForm({id:"", new: "", refurbished: ""});
    }

    return(
        <div className = "container">
            <h1>Manage Stock</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Product ID: </label>
                    <input
                        type="number"
                        name="id"
                        value={form.id}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div>
                    <label>New Stock: </label>
                    <input
                        type="number"
                        name="new"
                        value={form.new}
                        onChange={handleFormChange}
                        min="0"
                    />
                </div>
                <div> 
                    <label>Refurbished Stock: </label>
                    <input
                        type="number"
                        name="refurbished"
                        value={form.refurbished}
                        onChange={handleFormChange}
                        min="0"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Stock</button>
            </form>

            <section id="figures-list" className="container py-4"> 
                {products.map(product => (                    
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </section>
        </div>
    )
}