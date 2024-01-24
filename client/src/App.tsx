import React, { useEffect, useState } from 'react';
import useRequest from './hooks/useRequest';
import DataContext from './context/DataContext';
import Logs from './components/Logs';
import Summary from './components/Summary';

import './App.css';

function App() {
  const [list, setList] = useState<any>([]);
  const [summary, setSummary] = useState<[]>([]);
  const [pause, setPause] = useState<boolean>(false);
  const data: any = useRequest(pause, data => {
    if (summary.length === 0) {
      setSummary(data.data.map(({ code, price }: { code: string, price: number }) => {
        return {
          timestamp: data.timestamp,
          code,
          starting: price,
          lowest: price,
          highest: price,
          current: price
        };
      }));
      return
    }
    const result = data.data.map(({ code, price }: { code: string, price: number }) => {
      let target: any = summary.find((item: any) => item.code === code) || {}
      if (target.lowest > price) {
        target.lowest = price;
      }
      if (target.highest < price) {
        target.highest = price;
      }
      return { code, ...target, current: price };
    })
    setSummary(result);
  });

  useEffect(() => {
    if (data) {
      setList([data, ...list])
    }
  }, [data]);

  return (
    <DataContext.Provider value={{ list, data, summary, setSummary, pause, setPause }}>
      <div className="App" >
        <Logs />
        <Summary />
      </div>
    </DataContext.Provider>
  );
}

export default App;
