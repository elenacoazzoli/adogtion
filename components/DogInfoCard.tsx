import Link from 'next/link';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { DogAndShelterType } from '../util/database';
import { getAgeRangeByYears } from '../util/helpers/dog';

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
  position: relative;
`;

const MatchContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  padding: 8px 24px;
  background-color: goldenrod;
  color: #343f53;
  border-radius: 0 12px 12px 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
`;

const DogInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #343f53;
  width: 240px;
`;

const DogImage = styled.img`
  width: 240px;
  border-radius: 15px;
`;

const DogAgeGender = styled.span`
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
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
  color: #343f53;

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
  isAMatch?: boolean;
}

const DogInfoCard: FunctionComponent<DogInfoCardProps> = ({
  dog,
  isAMatch,
}) => {
  return (
    <DogCardPlaceholder>
      <Link href={`/dogs/${dog.dogId}`} passHref>
        <DogCardLink aria-label={`Go to dog ${dog.dogName} page`}>
          <DogCardContainer>
            {isAMatch && <MatchContainer>IT'S A MATCH</MatchContainer>}
            <DogImage alt={`picture of ${dog.dogName}`} src={dog.image} />
            <DogInfoContainer>
              <DogName>{dog.dogName}</DogName>
              <DogAgeGender>
                {getAgeRangeByYears(dog.age)} - {dog.gender}
              </DogAgeGender>
              <ShelterLocation>
                {dog.region}, {dog.shelterName}
              </ShelterLocation>
            </DogInfoContainer>
          </DogCardContainer>
        </DogCardLink>
      </Link>
    </DogCardPlaceholder>
  );
};

export default DogInfoCard;
