import Link from 'next/link';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

const DogCardPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
  text-decoration: none;
`;

const DogCardLink = styled.a`
  display: flex;
  flex-direction: column;
  margin: 0 24px 0 24px;
  text-decoration: none;
`;

const DogCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 16px 16px;
  text-decoration: none;
  background-color: #efd5d2;
  border-radius: 15px;
`;

const DogInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #2f3b4d;
  width: 240px;
`;

const PastaImage = styled.img`
  width: 240px;
  border-radius: 15px;
`;

const DogAgeGender = styled.span`
  font-family: 'Montserrat', sans-serif;
  color: #2f3b4d;
  font-weight: 300;
  font-size: 1rem;
  margin-top: 8px;
`;
const DogName = styled.span`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 2rem;
  text-decoration: underline 2px solid transparent;
  transition: 0.5s;
  margin-top: 4px;
  color: #2f3b4d;

  :hover {
    text-decoration: underline 2px solid #2f3b4d;
  }
`;
const ShelterLocation = styled.span`
  font-family: 'Montserrat', sans-serif;
  color: #2f3b4d;
  font-weight: 500;
  font-size: 1rem;
  margin-top: 8px;
`;

const DogInfoCard: FunctionComponent = () => (
  <DogCardPlaceholder>
    <Link href="/" passHref>
      <DogCardLink aria-label={`Go to dog page`}>
        <DogCardContainer>
          <PastaImage alt={`picture of`} src={`/dogs/gnocchi.jpg`} />
          <DogInfoContainer>
            <DogName>Gnocchi</DogName>
            <DogAgeGender>Young - Female</DogAgeGender>
            <ShelterLocation>Wien, Happy House </ShelterLocation>
          </DogInfoContainer>
        </DogCardContainer>
      </DogCardLink>
    </Link>
  </DogCardPlaceholder>
);

export default DogInfoCard;
