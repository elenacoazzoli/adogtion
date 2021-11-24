import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { DogAndShelterType } from '../../util/database';
import { Errors } from '../../util/helpers/errors';

const H1Styled = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #2f3b4d;
  font-weight: 900;
  font-size: 2.5rem;
  margin: 32px;
`;

const FavouriteDogContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin: 8px 124px;
  text-decoration: none;
  border-bottom: 1px solid #2f3b4d;
  min-width: 300px;
`;

const ImageAndDogInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
`;

const DogInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const ParagraphStyled = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  margin: 8px 0;
`;

const DogName = styled.a`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  margin: 8px 0;
  :hover {
    text-decoration: underline 2px solid #343f53;
  }
`;

const DogImage = styled.div<{ srcPath: string }>`
  background: url(${(props) => props.srcPath});
  width: 100px;
  height: 100px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  background-position: center;
  margin: 16px 48px;
`;

const MaleTextContainer = styled.div`
  background-color: #dfe3e9;
  border: 1px solid #dfe3e9;
  border-radius: 12px;
  padding: 2px 8px;
`;
const FemaleTextContainer = styled.div`
  background-color: #efd5d2;
  border: 1px solid #efd5d2;
  border-radius: 12px;
  padding: 2px 8px;
`;

const RemoveButton = styled.button`
  background-color: tomato;
  border: 2px solid transparent;
  text-decoration: underline 2px solid transparent;
  transition: 0.5s;
  text-align: center;
  font-size: 1rem;
  border-color: tomato;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  padding: 12px 12px;
  margin: 0 64px;
  border-radius: 12px;
  cursor: pointer;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  margin-top: 16px;
`;
const ContinueLink = styled.a`
  border: 2px solid;
  text-align: center;
  text-decoration: underline 2px solid transparent;
  transition: 0.5s;
  border-color: #343f53;
  color: #343f53;
  font-family: 'Montserrat', sans-serif;
  width: 240px;
  margin: 8px 124px;
  padding: 8px 12px 6px;
  cursor: pointer;
  :hover {
    text-decoration: underline 2px solid #2f3b4d;
  }
`;

interface FavouritesProps {
  favouriteDogs: DogAndShelterType[];
  userId: number;
}
function Favourites({ favouriteDogs, userId }: FavouritesProps) {
  const [isFavouritesListEmpty, setIsFavouritesListEmpty] = useState(
    favouriteDogs.length === 0,
  );
  const [updatedFavouritesList, setUpdatedFavouritesList] =
    useState(favouriteDogs);
  const [errors, setErrors] = useState<Errors>([]);

  const removeFavouriteClickHandler = async (id: number) => {
    // store deleted Item
    const deletedDog = updatedFavouritesList.find((dog) => dog.dogId === id);

    if (deletedDog) {
      // update the favourites array
      const filteredFavouritesList = updatedFavouritesList.filter(
        (dog) => dog.dogId !== id,
      );

      // update database
      const unfavouriteResponse = await fetch(
        `/api/user/${userId}/favourites/${deletedDog.dogId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const unfavouriteJson = await unfavouriteResponse.json();

      // if contains errors, setErrors
      if ('errors' in unfavouriteJson) {
        setErrors(unfavouriteJson.errors);
        return;
      }
      setUpdatedFavouritesList(filteredFavouritesList);
      setIsFavouritesListEmpty(filteredFavouritesList.length === 0);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Favorites</title>
        <meta name="description" content="Your favourite dogs" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <H1Styled>Your favourite dogs</H1Styled>
      {isFavouritesListEmpty ? (
        <ParagraphStyled>You currently have no favourites</ParagraphStyled>
      ) : (
        updatedFavouritesList.map((dog) => (
          <FavouriteDogContainer key={dog.dogId}>
            <ImageAndDogInfoContainer>
              <DogImage
                role="img"
                aria-label={`picture of dog ${dog.dogName}`}
                srcPath={dog.image}
              />
              <DogInfoContainer>
                <Link href={`/dogs/${dog.dogId}`} passHref>
                  <DogName>{dog.dogName}</DogName>
                </Link>
                {dog.gender === 'male' ? (
                  <MaleTextContainer>
                    <ParagraphStyled>{dog.gender}</ParagraphStyled>
                  </MaleTextContainer>
                ) : (
                  <FemaleTextContainer>
                    <ParagraphStyled>{dog.gender}</ParagraphStyled>
                  </FemaleTextContainer>
                )}
                <ParagraphStyled>
                  {dog.shelterName}, {dog.region}
                </ParagraphStyled>
              </DogInfoContainer>
            </ImageAndDogInfoContainer>

            <RemoveButton
              onClick={() => removeFavouriteClickHandler(dog.dogId)}
            >
              Remove
            </RemoveButton>
          </FavouriteDogContainer>
        ))
      )}
      <ActionsContainer>
        <Link href="/dogs" passHref>
          <ContinueLink>Discover more dogs</ContinueLink>
        </Link>
      </ActionsContainer>
      <div>
        {errors.map((error) => (
          <div key={`error-${error.message}`}>{error.message}</div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getValidSessionByToken } = await import('../../util/database');
  const baseUrl = process.env.BASE_URL;

  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);

  if (!session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: '/login?returnTo=/user/myfavourites',
        permanent: false,
      },
    };
  }
  // put here gSSP code for getting favourite dogs and return props
  const favouritesResponse = await fetch(
    `${baseUrl}/api/user/${session.userId}/favourites`,
  );
  const favouriteDogs = await favouritesResponse.json();

  return {
    props: {
      favouriteDogs: favouriteDogs.favouriteDogs
        ? favouriteDogs.favouriteDogs
        : [],
      userId: session.userId,
    },
  };
}

export default Favourites;
