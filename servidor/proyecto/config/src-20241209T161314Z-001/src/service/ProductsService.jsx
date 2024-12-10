export function getProducts(setProducts, setLoading){
    setLoading(true);
    fetch('/data/products.json')
        .then(res => res.json())
        .then(data => {
            if(data.length==0) console.log("Unable to load any products");
            else setProducts(data);  
        }).catch(error => {
            console.error(error);
        }).finally(
            setLoading(false)
        )
}


export function getOffers(setProducts){
    return fetch('/data/products_offers.json')
        .then(res => res.json())
}

/* Si ho combinam amb el
useEffect(() => {
    getOffers(setProducts)
}, []); 

de HotOffersPage

export function getOffers(setProducts){
    fetch('/data/products_offers.json')
        .then(res => res.json())        
        .then(data => {
            if(data.length==0) console.log("Unable to load any products");
            else setProducts(data);  
        }).catch(error => {
            console.error(error);
        })
}
*/