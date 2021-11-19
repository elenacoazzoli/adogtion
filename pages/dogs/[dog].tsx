import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import DogDescriptionInfo from '../../components/DogDescriptionInfo';
import Layout from '../../components/Layout';
import { DogAndShelterType, User } from '../../util/database';
import { Errors } from '../../util/helpers/errors';
import { InsertFavouriteDogResponse } from '../api/favourites/add';

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 16px;
`;
const PageTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 900;
  font-size: 3rem;
  text-align: center;
  margin: 8px 0 0 0;
`;
const GenderAndAgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 36px;
  margin-top: 12px;
`;
const Divider = styled.span`
  margin: 4px;
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 500;
  font-size: 1rem;
`;

const ParagraphStyled = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 500;
  font-size: 1.1rem;
  text-align: center;
  margin: 4px 0 0 0;
`;

interface DogsProps {
  individualDog: DogAndShelterType;
  allowedUser: User | null;
  isFavourite: boolean;
}

function Dog({ individualDog, allowedUser, isFavourite }: DogsProps) {
  const [favouriteToggle, setFavouriteToggle] = useState(isFavourite);
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>([]);

  async function favouriteClickHandler() {
    // check if user is logged in? and then return to dog
    if (allowedUser === null) {
      const destination =
        typeof router.query.returnTo === 'string' && router.query.returnTo
          ? router.query.returnTo
          : `/login?returnTo=/dogs/${individualDog.dogId}`;
      router.push(destination);
      // call API with delete or post to add or remove favourite passing the user id and dog id
      // set FavouriteToogle to
    } else {
      if (favouriteToggle) {
        const unfavouriteResponse = await fetch('/api/favourites/remove', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          // this body will be the res.body of the API route
          body: JSON.stringify({
            dogId: individualDog.dogId,
            userId: allowedUser.id,
          }),
        });

        const unfavouriteJson = await unfavouriteResponse.json();

        // if contains errors, setErrors
        if ('errors' in unfavouriteJson) {
          setErrors(unfavouriteJson.errors);
          return;
        }
        setFavouriteToggle(false);
      } else {
        const favouriteResponse = await fetch('/api/favourites/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // this body will be the res.body of the API route
          body: JSON.stringify({
            dogId: individualDog.dogId,
            userId: allowedUser.id,
          }),
        });
        const favouriteJson =
          (await favouriteResponse.json()) as InsertFavouriteDogResponse;
        // if contains errors, setErrors
        if ('errors' in favouriteJson) {
          setErrors(favouriteJson.errors);
          return;
        }
        setFavouriteToggle(true);
      }
    }
  }

  return (
    <Layout>
      <Head>
        <title>{individualDog.dogName}</title>
        <meta name="description" content="Dog available for adoption" />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>
      <HeadingContainer>
        <PageTitle>Hi, I am {individualDog.dogName}</PageTitle>
        <GenderAndAgeContainer>
          <ParagraphStyled>{individualDog.gender}</ParagraphStyled>
          <Divider>|</Divider>

          <ParagraphStyled>{individualDog.age} years old</ParagraphStyled>
        </GenderAndAgeContainer>
      </HeadingContainer>

      <DogDescriptionInfo
        dog={individualDog}
        favouriteClickHandler={favouriteClickHandler}
        favouriteToggle={favouriteToggle}
      />
      <section>
        <h2>Here are gifts you can buy to support {individualDog.dogName}</h2>
        <div>
          <div>
            <img alt="bowl of dog food" src="/icons/bowl.png" />
            <span>Buy food and health supplies</span>
            <button>Buy food</button>
          </div>
          <div>
            <img alt="dog toys" src="/icons/toy.png" />
            <span>Get toys and bedding</span>
            <button>Buy toys</button>
          </div>
          <div>
            <img alt="bowl of dog food" src="/icons/vet.png" />
            <span>Support necessary vet visits and health checks</span>
            <button>Buy a vet visit</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get data from API
  const idFromUrl = Number(context.query.dog);
  const baseUrl = process.env.BASE_URL;
  const dogResponse = await fetch(`${baseUrl}/api/dogs/${idFromUrl}`);
  const individualDog = await dogResponse.json();

  const { getUserBySessionToken } = await import('../../util/database');

  // get user information if a session exists
  const allowedUser = await getUserBySessionToken(
    context.req.cookies.sessionToken,
  );

  let isFavourite = false;
  // if the user has a started session, get the information about dog favourites
  if (allowedUser) {
    const isFavouriteResponse = await fetch(`${baseUrl}/api/favourites/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // this body will be the res.body of the API route
      body: JSON.stringify({
        dogId: individualDog.dogId,
        userId: allowedUser.id,
      }),
    });
    const favouriteDog = await isFavouriteResponse.json();

    if (favouriteDog.favouriteDog) {
      isFavourite = true;
    }
  }

  return {
    props: {
      individualDog,
      allowedUser: allowedUser ? allowedUser : null,
      isFavourite,
    },
  };
};

export default Dog;
