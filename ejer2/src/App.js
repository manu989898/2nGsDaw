import './App.css';
import {data} from './data/data.js';
import  Card  from './components/Card.jsx';
import Header from './components/Header'


function App() {

  const products = data.map(product=>
    <Card key={product.id} {...product}/>
  );


  return (
    <>
      <Header/>
      <main>
        {products}
      </main>
      
    </>
   
  );
}

export default App;
