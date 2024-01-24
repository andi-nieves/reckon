import { useContext } from 'react';
import DataContext from '../context/DataContext';

export default function Summary() {
    const { summary }: { summary: [] } = useContext<any>(DataContext);
    return <div className='summary-wrapper flex-1'>
        <h1 className='header mb'>Summary</h1>
        <table className='table'>
            <thead>
                <tr>
                    <th>Stock</th>
                    <th>Starting</th>
                    <th>Lowest</th>
                    <th>Highest</th>
                    <th>Current</th>
                </tr>
            </thead>
            <tbody>
                {summary.map((sum: any) => <tr key={sum.code}>
                    <th>${sum.code}</th>
                    <td>${sum.starting}</td>
                    <td>${sum.lowest}</td>
                    <td>${sum.highest}</td>
                    <td>${sum.current}</td>
                </tr>)}
            </tbody>
        </table>
    </div>
}