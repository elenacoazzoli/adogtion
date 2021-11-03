import Link from 'next/link';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { DogAndShelterType } from '../util/database';

const DogCardPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
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

const DogImage = styled.img`
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

interface DogInfoCardProps {
  dog: DogAndShelterType;
}

const DogInfoCard: FunctionComponent<DogInfoCardProps> = ({ dog }) => (
  <DogCardPlaceholder>
    <Link href={`/dogs/${dog.dogId}`} passHref>
      <DogCardLink aria-label={`Go to dog ${dog.dogName} page`}>
        <DogCardContainer>
          <DogImage
            alt={`picture of ${dog.dogName}`}
            src={`/dogsimages/${dog.image}`}
          />
          <DogInfoContainer>
            <DogName>{dog.dogName}</DogName>
            <DogAgeGender>Young - {dog.gender}</DogAgeGender>
            <ShelterLocation>
              {dog.region}, {dog.shelterName}
            </ShelterLocation>
          </DogInfoContainer>
        </DogCardContainer>
      </DogCardLink>
    </Link>
  </DogCardPlaceholder>
);

export default DogInfoCard;
