import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import Home from '../home';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 40px;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 15px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인s</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading ...</Loader>
      ) : (
        <CoinList>
          {/* 여기서 data = undefined라고 뜨면 그냥 물음표 넣어버려!(무조건인지 조건인지만 확인하고 싶어서 투덜대는 거임) */}
          {data?.slice(0, 10).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
