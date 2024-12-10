import Banner from './Banner'
import Card from './Card'
import './main.css'

export default function Main({filteredProducts}){
    return(
        <main>
            <Banner/>    
            <h2>New Products</h2>
            <section class="product-grid">
                {filteredProducts().map(product =>
                     <Card key={product.id} {...product}/>
                )}
            </section>
        </main>
    )
}