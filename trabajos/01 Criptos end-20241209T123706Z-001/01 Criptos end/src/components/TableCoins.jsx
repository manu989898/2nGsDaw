import CoinRow from "./CoinRow.jsx"

export default function TableCoins({coins, search}){
  const titles = ["#","Coin","Price","Price Change","24h Volume"];

  if(!coins) return <div>No coins to show</div>

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return(
    <table className="table table-dark mt-4 table-hover">
      <thead>
        <tr>{titles.map((title, index) => <td key={index}>{title}</td> )}
        </tr>
      </thead>
      <tbody>
        {filteredCoins.map((coin, index) =>
          <CoinRow key={coin.id} coin={coin} index={index+1}/>
        )}      	
      </tbody>
    </table>
  )
}


