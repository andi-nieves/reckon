import { useEffect, useState } from 'react';
import axios from "axios";
import getDateNow from '../utils/date';

const url = 'https://join.reckon.com/stock-pricing';

const INTERVAL_CONFIG = 2 * 1000;

export default function useRequest(pause: boolean, onSuccess: (data: any) => void) {
    const [tick, setTick] = useState<number>(0);
    const [data, setData] = useState<object | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isPause, setIsPause] = useState<boolean>(false);

    useEffect(() => {
        setIsPause(pause);
        setLoading(false)
    }, [pause]);

    useEffect(() => {
        if (!isPause) {
            let interval = setInterval(() => {
                if (!loading) setTick(tick + 1)
            }
                , INTERVAL_CONFIG);
            return () => clearInterval(interval);
        }
    }, [tick, isPause, loading])

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(url)
                const timestamp = getDateNow();
                setData({ timestamp, data })
                onSuccess({ timestamp, data })
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
        )()
    }, [tick])

    return data
}

