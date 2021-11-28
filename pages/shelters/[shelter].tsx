import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import DogInfoCard from '../../components/DogInfoCard';
import Layout from '../../components/Layout';
import { DogAndShelterType, ShelterType } from '../../util/database';

const PageTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 900;
  font-size: 3rem;
  text-align: center;
  margin: 16px 0 0 0;
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 64px;
  width: 90%;
`;

const DoodleImage = styled.img`
  width: 350px;
  margin-left: 32px;
`;

const ParagraphStyled = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 500;
  font-size: 1.1rem;
  text-align: left;
  padding: 0 64px;
  margin: 4px 0 0 0;
`;

const H2Styled = styled.h2`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 900;
  font-size: 2.5rem;
  text-align: center;
  margin: 8px 0 0 0;
`;
const InfoCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  margin: 32px 0 0 0;
`;

const ShelterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #dfe3e9;
  padding: 8px 8px 8px 16px;
  margin: 0 124px 0 124px;
`;
const Text = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 300;
  font-size: 1rem;
  text-align: left;
  margin: 12px 0 0 0;
  padding-bottom: 2px;
`;

const ShelterTitle = styled.span`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 700;
  font-size: 1rem;
  margin: 4px 0;
`;

interface ShelterProps {
  shelterDogs: DogAndShelterType[];
  shelterInfo: ShelterType;
}

function Shelter({ shelterDogs, shelterInfo }: ShelterProps) {
  return (
    <Layout>
      <Head>
        <title>Our shelters</title>
        <meta name="description" content="Austrian shelters" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <PageTitle>Welcome to {shelterInfo.shelterName}</PageTitle>
      <DescriptionContainer>
        <DoodleImage
          alt="dog playing with owner"
          src="/shapes/PettingDoodle.svg"
        />

        <ParagraphStyled>{shelterInfo.shelterDescription}</ParagraphStyled>
      </DescriptionContainer>

      <H2Styled>Our dogs</H2Styled>
      <InfoCardsContainer>
        {shelterDogs.map((dog: DogAndShelterType) => {
          return <DogInfoCard dog={dog} key={dog.dogId} />;
        })}
      </InfoCardsContainer>

      <ShelterContainer>
        <ShelterTitle>Contact info</ShelterTitle>
        <Text>
          {shelterInfo.address} - {shelterInfo.region}
        </Text>
        <Text>{shelterInfo.phone}</Text>
      </ShelterContainer>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get data from API
  const baseUrl = process.env.BASE_URL;
  const idFromUrl = Number(context.query.shelter);
  const shelterDogsResponse = await fetch(
    `${baseUrl}/api/shelters/${idFromUrl}/dogs`,
  );

  const shelterInfoResponse = await fetch(
    `${baseUrl}/api/shelters/${idFromUrl}`,
  );

  const shelterDogs = await shelterDogsResponse.json();
  const shelterInfo = await shelterInfoResponse.json();

  return {
    props: {
      shelterDogs,
      shelterInfo: shelterInfo.shelter,
    },
  };
};

export default Shelter;
