import { useState } from 'react';
import { useQuery } from 'react-query';

//Styles
import { Wrapper } from './styles/App.styles' 

type CoinData = {
  '15m': number;
  buy: number;
  last:number;
  sell: number;
  symbol: string;
}

type Currencies = {
  [key: string]: CoinData;
}

const getCoinData = async (): Promise<Currencies> =>
  await(await fetch('https://blockchain.info/ticker')).json();

  const INTERVAL_TIME = 30000 //time = 30seconds

function App() {
  const [ currency, setCurrency ] = useState('USD');

  const { data, isLoading, error } = useQuery<Currencies>('bc-data', getCoinData,{refetchInterval:INTERVAL_TIME});

  const handleCurrencySelection = (e: any) =>{
    setCurrency(e.currentTarget.value)
  }

  if(isLoading) return <div>The File is loading...</div>
  if(error) return <div>Something went terribly wrong...sorry</div>

  return (
    <Wrapper>
      <>
        <h2>MyTypeCoin Bitcoin Price</h2>
        <select value={currency} onChange={handleCurrencySelection}>
          {data && Object.keys(data).map(currency => (
            <option key={currency} value={currency}> 
                {currency}
            </option>
            ))}
        </select>
        <div>
          <h2>
            {data && data[currency].symbol}
            {data && data[currency].last}
          </h2>
        </div>
      </>
    </Wrapper>
  );
}

export default App;
