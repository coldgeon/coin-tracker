import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistory } from '../api';

interface IChartProps {
  coinId: string;
}

//이미 Coin페이지에서 coinId를 가져오고있기에 props로 넘김 받는 거임! 그러고 Interface 만들어주는 거임!
function Chart({ coinId }: IChartProps) {
  const { isLoading, data } = useQuery(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );
  return <h1>Chart</h1>;
}

export default Chart;
