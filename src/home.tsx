import styled from 'styled-components';

const HomeImg = styled.img`
  height: 30;
  width: 30;
`;

function Home() {
  const imageUrl =
    'https://e7.pngegg.com/pngimages/370/221/png-clipart-black-house-art-one-line-home-icon-icons-logos-emojis-home-icons-thumbnail.png';
  return <HomeImg src={imageUrl}></HomeImg>;
}

export default Home;
