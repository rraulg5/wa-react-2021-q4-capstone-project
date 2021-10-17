import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import featuredBannersMock from '../mocks/en-us/featured-banners.json';
import { Result } from '../interfaces/FeaturedBannersResponse';

export const Slider = () => {
  const banners: Result[] = featuredBannersMock.results;
  const totalBanners = featuredBannersMock.total_results_size - 1;
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction: string) => {
    direction === 'left'
      ? setSlideIndex(slideIndex > 0 ? slideIndex - 1 : totalBanners)
      : setSlideIndex(slideIndex < totalBanners ? slideIndex + 1 : 0);
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick('left')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {banners.map(({ id, data }) => (
          <Slide key={id}>
            <ImageContainer>
              <Image src={data.main_image.url} alt={data.main_image.alt} />
            </ImageContainer>
            <InfoContainer>
              <Title>{data.title}</Title>
              <Description>{data.description[0].text}y</Description>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick('right')}>
        <FontAwesomeIcon icon={faArrowRight} />
      </Arrow>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 80vh;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

interface ArrowProps {
  direction: string;
}

const Arrow = styled.div<ArrowProps>`
  align-items: center;
  display: flex;
  background-color: #eee;
  border-radius: 50%;
  bottom: 0;
  cursor: pointer;
  justify-content: center;
  left: ${(props) => props.direction === 'left' && '10px'};
  height: 50px;
  margin: auto;
  opacity: 0.5;
  position: absolute;
  right: ${(props) => props.direction === 'right' && '10px'};
  top: 0;
  width: 50px;
  z-index: 2;
`;

interface WrapperProps {
  slideIndex: number;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  height: 100%;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  transition: all 1.5s ease;
`;

const Slide = styled.div`
  align-items: center;
  display: flex;
  height: 80vh;
  position: relative;
  width: 100vw;
`;
const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
`;
const Image = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.55);
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 70px;
  text-align: center;
`;
const Description = styled.p`
  font-size: 20px;
  margin: 50px 0;
  padding: 0 120px;
  text-align: center;
`;
