import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import ShelterInfoCard from '../../components/ShelterInfoCard';
import { ShelterType } from '../../util/database';

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

const ShelterCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  margin: 32px 0 0 0;
`;

interface SheltersProps {
  shelters: ShelterType[];
}

function Shelters({ shelters }: SheltersProps) {
  return (
    <Layout>
      <Head>
        <title>Our shelters</title>
        <meta name="description" content="Austrian shelters" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <PageContainer>
        <PageTitle>Our partnering shelters</PageTitle>
      </PageContainer>
      <ShelterCardsContainer>
        {shelters.map((shelter: ShelterType) => {
          return <ShelterInfoCard shelter={shelter} key={shelter.shelterId} />;
        })}
      </ShelterCardsContainer>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // get data from API
  const baseUrl = process.env.BASE_URL;
  const sheltersResponse = await fetch(`${baseUrl}/api/shelters/`);
  const shelters = await sheltersResponse.json();

  return {
    props: {
      shelters,
    },
  };
};

export default Shelters;
