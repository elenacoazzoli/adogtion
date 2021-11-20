import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { DogAndShelterType } from '../util/database';

const DogContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  margin-top: 32px;
  padding: 24px 64px;
`;

const DogImage = styled.img`
  width: 260px;
  margin: 0 124px;
`;

const DogInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 64px;
  width: 80%;
`;

const DescriptionRows = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 8px 0;
  padding: 4px 0;
  border-bottom: 1px solid #c5c5c5;
`;

const DescriptionCategories = styled.span`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 700;
  font-size: 1.1rem;
  margin-right: 8px;
`;

const ParagraphStyled = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 300;
  font-size: 1rem;
  text-align: left;
  margin: 0;
`;

const Text = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 300;
  font-size: 1rem;
  text-align: left;
  margin: 6px 0 0 0;
  padding-bottom: 2px;
`;

const StatsSection = styled.section`
  display: flex;
  justify-content: center;
`;

const StatsAndShelterContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 48px;
  margin-top: 32px;
  padding: 16px 16px 16px 32px;
  width: 90%;
  background-color: #f4e3e3;
  justify-self: center;
`;

const StatsandShelterTitles = styled.span`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 700;
  font-size: 1.2rem;
  margin: 8px 0;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  width: 100%;
`;

const TickIcon = styled.img`
  width: 16px;
  margin: 0 8px 0 0;
`;

const ShelterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  column-gap: 16px;
  margin-top: 16px;
`;

const ButtonStyled = styled.button`
  background-color: #343f53;
  border: 2px solid transparent;
  text-decoration: underline 2px solid transparent;
  transition: 0.5s;
  text-align: center;
  font-size: 1rem;
  border-color: #343f53;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
  :hover {
    text-decoration: underline 2px solid #efd5d2;
  }
`;

const LinkStyled = styled.a`
  background-color: #343f53;
  border: 2px solid transparent;
  text-decoration: underline 2px solid transparent;
  transition: 0.5s;
  text-align: center;
  font-size: 1rem;
  border-color: #343f53;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  padding: 12px 12px;
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
  :hover {
    text-decoration: underline 2px solid #efd5d2;
  }
`;

const FavouriteIcon = styled.img`
  width: 24px;
  padding-top: 4px;
`;

interface DogDescriptionInfoProps {
  dog: DogAndShelterType;
  favouriteClickHandler: () => Promise<void>;
  favouriteToggle: boolean;
}
const DogDescriptionInfo: FunctionComponent<DogDescriptionInfoProps> = ({
  dog,
  favouriteClickHandler,
  favouriteToggle,
}) => {
  return (
    <>
      <DogContainer>
        <DogImage alt={`picture of ${dog.dogName}`} src={dog.image} />
        <DogInfoContainer>
          <DescriptionCategories>Description:</DescriptionCategories>
          <Text>{dog.dogDescription}</Text>
          <DescriptionRows>
            <DescriptionCategories>Energy level:</DescriptionCategories>
            <ParagraphStyled>{dog.activityLevel}</ParagraphStyled>
          </DescriptionRows>
          <DescriptionRows>
            <DescriptionCategories>
              Has experience with kids:
            </DescriptionCategories>
            <ParagraphStyled>
              {dog.kids ? <span>yes</span> : <span>no</span>}
            </ParagraphStyled>
          </DescriptionRows>
          <DescriptionRows>
            <DescriptionCategories>
              Can live with other pets:
            </DescriptionCategories>
            <ParagraphStyled>
              {dog.pets ? <span>yes</span> : <span>no</span>}
            </ParagraphStyled>
          </DescriptionRows>
          <DescriptionRows>
            <DescriptionCategories>Weight:</DescriptionCategories>
            <ParagraphStyled>{dog.size} kgs</ParagraphStyled>
          </DescriptionRows>
          <ButtonsContainer>
            <ButtonStyled
              aria-label={
                favouriteToggle
                  ? 'remove dog from favourites'
                  : 'add dog to favourites'
              }
              onClick={() => {
                favouriteClickHandler();
              }}
            >
              {favouriteToggle ? (
                <FavouriteIcon
                  aria-hidden="true"
                  alt=""
                  src="/icons/favouriteFull.png"
                />
              ) : (
                <FavouriteIcon
                  aria-hidden="true"
                  alt=""
                  src="/icons/favouriteEmpty.png"
                />
              )}
            </ButtonStyled>
            <LinkStyled href="#sponsor">Sponsor me</LinkStyled>
            <LinkStyled href="#adopt">Adopt me</LinkStyled>
          </ButtonsContainer>
        </DogInfoContainer>
      </DogContainer>
      <StatsSection>
        <StatsAndShelterContainer>
          <StatsContainer>
            <StatsandShelterTitles>General stats</StatsandShelterTitles>
            <StatsRow>
              <Text>
                <TickIcon
                  src="/icons/checkbox.png"
                  alt="ticked icon meaning true"
                />
                My health has been checked
              </Text>
              <Text>
                <TickIcon
                  src="/icons/checkbox.png"
                  alt="ticked icon meaning true"
                />
                My worming is up-to-date
              </Text>
            </StatsRow>
            <StatsRow>
              <Text>
                <TickIcon
                  src="/icons/checkbox.png"
                  alt="ticked icon meaning true"
                />
                My vaccinations are up-to-date
              </Text>
              <Text>
                <TickIcon
                  src="/icons/checkbox.png"
                  alt="ticked icon meaning true"
                />
                I have been microchipped
              </Text>
            </StatsRow>
          </StatsContainer>
          <ShelterContainer>
            <StatsandShelterTitles>
              Shelter and Contact info
            </StatsandShelterTitles>
            <Text>{dog.shelterName}</Text>
            <Text>
              {dog.address} - {dog.region}
            </Text>
            <Text>{dog.phone}</Text>
          </ShelterContainer>
        </StatsAndShelterContainer>
      </StatsSection>
    </>
  );
};

export default DogDescriptionInfo;
