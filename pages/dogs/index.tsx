import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import DogInfoCard from '../../components/DogInfoCard';
import Layout from '../../components/Layout';
import { DogAndShelterType, User } from '../../util/database';
import { getAgeRangeByYears } from '../../util/helpers/dog';

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
  profile: User | undefined;
}

function Dogs({ dogs, profile }: DogsProps) {
  function isAMatch(dog: DogAndShelterType) {
    let matchesCount = 0;
    if (profile) {
      matchesCount =
        profile.gender === dog.gender ? matchesCount + 1 : matchesCount;
      matchesCount =
        profile.kids === dog.kids ? matchesCount + 1 : matchesCount;
      matchesCount =
        profile.pets === dog.pets ? matchesCount + 1 : matchesCount;
      matchesCount =
        profile.activityLevel === dog.activityLevel
          ? matchesCount + 1
          : matchesCount;
      matchesCount =
        profile.age === getAgeRangeByYears(dog.age)
          ? matchesCount + 1
          : matchesCount;
    }
    return matchesCount > 3;
  }

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
            return (
              <DogInfoCard dog={dog} key={dog.dogId} isAMatch={isAMatch(dog)} />
            );
          })}
        </InfoCardsContainer>
      </PageContainer>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  // get data from API
  const baseUrl = process.env.BASE_URL;
  const dogsResponse = await fetch(`${baseUrl}/api/dogs/`);
  const dogs = await dogsResponse.json();

  const { getUserBySessionToken } = await import('../../util/database');

  const allowedUser = await getUserBySessionToken(
    context.req.cookies.sessionToken,
  );

  let profileInfo = null;

  if (allowedUser) {
    const sessionToken = context.req.cookies.sessionToken;
    const profileResponse = await fetch(
      `${baseUrl}/api/user/${allowedUser.id}`,
      {
        method: 'GET',
        headers: {
          cookie: `sessionToken=${sessionToken}`,
        },
      },
    );
    profileInfo = await profileResponse.json();
  }
  return {
    props: {
      dogs,
      profile: profileInfo && profileInfo.profile,
    },
  };
};

export default Dogs;
