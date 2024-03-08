//api를 가져오는 거라서 함수 자체를 promise로 만들어줘야한다. 2가지 방법이 있다

// //1. async await로 promise 함수로 만들기
// export async function fetchCoins() {
//     const response = await fetch('https://api.coinpaprika.com/v1/coins');
//     const json = await response.json();
//     return json;

// }

const BASE_USL = 'https://api.coinpaprika.com/v1';

//2. promise, then을 이용하기 (구식 방법)
export function fetchCoins() {
  return fetch(`${BASE_USL}/coins`).then((response) => response.json());
}

//coin페이지의 api들

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_USL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinThicker(coinId: string) {
  return fetch(`${BASE_USL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000); // 여기 api에서 require로 받는 prop이 시간인데 mile sec 단위로 주는 거임!(이게 편해서)
  const startDate = endDate - 59 * 60 * 24; //24시간이 free라서 그렇게만 함ㅎ
  return fetch(
    `${BASE_USL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
