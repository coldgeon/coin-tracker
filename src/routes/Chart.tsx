import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ReactApexChart from 'react-apexcharts';
import Price from './Price';

interface IChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

//이미 Coin페이지에서 coinId를 가져오고있기에 props로 넘김 받는 거임! 그러고 Interface 만들어주는 거임!
function Chart({ coinId }: IChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <ReactApexChart
          type="line"
          series={[
            {
              name: 'price',
              data: data?.map((price) => price.close) ?? [],
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: 'transparent',
            },
            theme: { mode: 'dark' },
            stroke: { curve: 'smooth', width: 2 },
            grid: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              categories: data?.map((price) =>
                new Date(price.time_close).toUTCString()
              ),
              type: 'datetime',
            },
            yaxis: { labels: { show: false } },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
            },
            colors: ['#4bcffa'],
            tooltip: { y: { formatter: (value) => `$ ${value.toFixed(3)}` } }, //(가격에 존나 많은 소수점숫자들 없애기 위한 작엄)toFixed => number의 소수점을 몇자리까지 표기할지 고쳐주는 내장함수!
          }}
        />
      )}
    </div>
  );
}

export default Chart;
