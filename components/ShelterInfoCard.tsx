import Link from 'next/link';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ShelterType } from '../util/database';

const ShelterCardPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  text-decoration: none;
`;

const ShelterCardLink = styled.a`
  display: flex;
  flex-direction: column;
  margin: 0 24px 0 24px;
  text-decoration: none;
`;

const ShelterCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px 16px 16px;
  text-decoration: none;
  background-color: #dfe3e9;
  border-radius: 15px;
`;

const ShelterInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #343f53;
  width: 320px;
`;
const ShelterName = styled.span`
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

interface ShelterInfoCardProps {
  shelter: ShelterType;
}

const ShelterInfoCard: FunctionComponent<ShelterInfoCardProps> = ({
  shelter,
}) => {
  return (
    <ShelterCardPlaceholder>
      <Link href={`/shelters/${shelter.shelterId}`} passHref>
        <ShelterCardLink aria-label={`Go to shelter ${shelter.shelterId} page`}>
          <ShelterCardContainer>
            <ShelterInfoContainer>
              <ShelterName>{shelter.shelterName}</ShelterName>
              <ShelterLocation>
                {shelter.region}, {shelter.address}
              </ShelterLocation>
            </ShelterInfoContainer>
          </ShelterCardContainer>
        </ShelterCardLink>
      </Link>
    </ShelterCardPlaceholder>
  );
};

export default ShelterInfoCard;
