import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { DogAndShelterType, getOneDog } from '../../util/database';

const PageTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 900;
  font-size: 3rem;
  text-align: center;
  margin: 16px 0 0 0;
`;

interface DogsProps {
  individualDog: DogAndShelterType;
}

function Dog({ individualDog }: DogsProps) {
  return (
    <Layout>
      <Head>
        <title>{individualDog.dogName}</title>
        <meta name="description" content="Dogs available for adoption" />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>

      <PageTitle>Page of {individualDog.dogName}</PageTitle>
      <div>
        <p>{individualDog.gender}</p>
        <p>{individualDog.kids}</p>
        <p>{individualDog.shelterName}</p>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get data from db
  // later: get data from API
  const idFromUrl = Number(context.query.dog);
  const individualDog = await getOneDog(idFromUrl);

  return {
    props: {
      individualDog,
    },
  };
};

export default Dog;
