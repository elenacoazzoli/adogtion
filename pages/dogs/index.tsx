import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import DogInfoCard from '../../components/DogInfoCard';
import Layout from '../../components/Layout';
import { DogAndShelterType } from '../../util/database';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 900;
  font-size: 3rem;
  text-align: center;
  margin: 16px 0 0 0;
`;

const InfoCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  margin: 32px 0 0 0;
`;

interface DogsProps {
  dogs: DogAndShelterType[];
}

function Dogs({ dogs }: DogsProps) {
  return (
    <Layout>
      <Head>
        <title>Our dogs</title>
        <meta name="description" content="Dogs available for adoption" />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>
      <PageContainer>
        <PageTitle>Dogs available for adoption</PageTitle>
        <InfoCardsContainer>
          {dogs.map((dog: DogAndShelterType) => {
            return <DogInfoCard dog={dog} key={dog.dogId} />;
          })}
        </InfoCardsContainer>
      </PageContainer>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // get data from API
  const baseUrl = process.env.BASE_URL;
  const dogsResponse = await fetch(`${baseUrl}/api/dogs/`);
  const dogs = await dogsResponse.json();
  return {
    props: {
      dogs,
    },
  };
};

export default Dogs;
