import React, { useContext } from 'react';
import DataContext from '../context/DataContext';
import mock from './mock.json';

export default function Logs() {
    const { list, pause, setPause } = useContext<any>(DataContext);

    return <div className='logs-wrapper flex-1'>
        <div className='logs-header-wrapper'>
            <h1 className='header'>Log</h1>
            <button onClick={() => setPause(!pause)}>{`${!pause ? 'Pause' : 'Resume'} Log`}</button>
        </div>
        <div className='logs-items-wrapper'>
            {list.map((item: any) => <div className='logs-item' key={item.timestamp}>
                <p className='m-0 bold text-small'>Updates for {item.timestamp}</p>
                <ul>
                    {item.data.map((i: any) => <li key={`${item.timestamp}${i.code}`} className='text-small'>{i.code}: ${i.price}</li>)}
                    <li></li>
                </ul>
            </div>)}
        </div>
    </div>
}