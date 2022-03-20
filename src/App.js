import './App.css';
import { useEffect, useState } from 'react';
import Axios from "axios"
import Coin from "./components/coin"

function App() {

const [coins, setCoins] = useState([])
const [searchWord, setSearchWord] = useState("")

const url = 'https://api.coinstats.app/public/v1/coins?skip=0&limit=100'

  useEffect(() => {
    Axios.get(url).then((response) => {
      setCoins(response.data.coins)
    }).catch((error) =>{
      console.log(error)
    })

  }, [])

  const filteredCoins = coins.filter((coin) =>{
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  })


  return (
    <div className='App'>
      <div className="cryptoHeader">
        <input type="text" placeholder='Search...' onChange={(event) => {setSearchWord(event.target.value)}}/>
      </div>
      <div className="cryptoDisplay">{filteredCoins.map((coin) => {
        return <Coin name={coin.name} icon={coin.icon} price={coin.price.toLocaleString()} symbol={coin.symbol} key={coin.id} />
      })}</div>
    </div>
  );
}

export default App;
