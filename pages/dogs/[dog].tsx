import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import DogDescriptionInfo from '../../components/DogDescriptionInfo';
import Layout from '../../components/Layout';
import { DogAndShelterType, User } from '../../util/database';
import { Errors } from '../../util/helpers/errors';
import { FavouriteDogResponse } from '../api/user/[userId]/favourites/[dogId]';

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

const H2Styled = styled.h2`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 900;
  font-size: 2rem;
  text-align: center;
  margin: 8px 0 0 0;
`;

const SponsorSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 64px;
  margin-top: 64px;
`;

const SponsorGiftsContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin: 32px 0 0 0;
`;

const SponsorGiftStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 300px;
  margin: 0 48px 0 48px;
  padding: 32px 16px 32px 16px;
  border: 2px solid #dfe3e9;
  border-radius: 16px;
`;

const GiftIcon = styled.img`
  width: 120px;
`;

const PriceStyled = styled.span`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 800;
  font-size: 2rem;
  text-align: center;
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
  font-weight: 300;
  padding: 6px 24px;
  margin-top: 8px;
  border-radius: 12px;
  cursor: pointer;
  :hover {
    text-decoration: underline 2px solid #efd5d2;
  }
`;

const AdoptionSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 64px;
  margin-top: 64px;
`;

const AdoptionContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 32px 64px;
  width: 100%;
`;

const DoodleImage = styled.img`
  width: 350px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 32px;
  margin: 16px;
  width: 60%;
  background-color: #dfe3e9;
  border-radius: 15px;
`;

const LabelsAndInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
  margin-top: 8px;
`;

const LabelsAndInputsContainerHorizontal = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 16px;
  margin-top: 16px;
`;

const LabelStyled = styled.label`
  margin: 4px 0 4px 0;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: #2f3b4d;
`;

const InputStyled = styled.input`
  width: 100%;
  min-height: 36px;
  padding: 4px 8px;
  border: 2px solid #dfe3e9;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 300;
  font-family: 'Montserrat', sans-serif;
  color: #2f3b4d;
`;

const TextAreaStyled = styled.textarea`
  width: 100%;
  min-height: 32px;
  resize: none;
  padding: 4px 8px;
  border: 2px solid #dfe3e9;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 300;
  font-family: 'Montserrat', sans-serif;
  color: #2f3b4d;
`;

const AdoptButtonStyled = styled.button`
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
  margin-top: 24px;
  border-radius: 12px;
  width: 50%;
  cursor: pointer;
  :hover {
    text-decoration: underline 2px solid #efd5d2;
  }
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
  const [donationAmount, setDonationAmount] = useState(0);
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [sucessfulPurchase, setSuccessfulPurchase] = useState('');

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
        const unfavouriteResponse = await fetch(
          `/api/user/${allowedUser.id}/favourites/${individualDog.dogId}`,
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
        setFavouriteToggle(false);
      } else {
        const favouriteResponse = await fetch(
          `/api/user/${allowedUser.id}/favourites/${individualDog.dogId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const favouriteJson =
          (await favouriteResponse.json()) as FavouriteDogResponse;
        // if contains errors, setErrors
        if ('errors' in favouriteJson) {
          setErrors(favouriteJson.errors);
          return;
        }
        setFavouriteToggle(true);
      }
    }
  }

  function donationsClickHandler(amount: number) {
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
      setSuccessfulPurchase('');
      if (isDonationOpen) {
        if (amount !== donationAmount) {
          setDonationAmount(amount);
        } else {
          setIsDonationOpen(false);
          setDonationAmount(0);
        }
      } else {
        setIsDonationOpen(true);
        setDonationAmount(amount);
      }
    }
  }

  async function donate() {
    await fetch(`/api/user/${allowedUser?.id}/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dogId: individualDog.dogId,
        amount: donationAmount,
      }),
    }).then(() => {
      setSuccessfulPurchase(
        `Thank you for donating € ${donationAmount} to ${individualDog.dogName}`,
      );
    });
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
      <div>
        {errors.map((error) => (
          <div key={`error-${error.message}`}>{error.message}</div>
        ))}
      </div>
      <SponsorSectionStyled>
        <H2Styled id="sponsor">
          Here are gifts you can buy to support {individualDog.dogName}
        </H2Styled>
        <ParagraphStyled>
          Dogs from our shelters are well looked after, because we care for them
          like our own. You can choose to sponsor some of the dogs we care for.
          Help us cover the costs for food, cozy blankets for the cold winter or
          their regular vet checks.
        </ParagraphStyled>
        <SponsorGiftsContainer>
          <SponsorGiftStyled>
            <GiftIcon alt="bowl of dog food" src="/icons/bowl.png" />
            <PriceStyled>€ 10</PriceStyled>
            <ParagraphStyled>Buy food and health supplies</ParagraphStyled>
            <ButtonStyled
              onClick={() => {
                donationsClickHandler(10);
              }}
            >
              Buy food
            </ButtonStyled>
          </SponsorGiftStyled>
          <SponsorGiftStyled>
            <GiftIcon alt="dog toys" src="/icons/toy.png" />
            <PriceStyled>€ 25</PriceStyled>
            <ParagraphStyled>Get toys and bedding</ParagraphStyled>
            <ButtonStyled
              onClick={() => {
                donationsClickHandler(25);
              }}
            >
              Buy toys
            </ButtonStyled>
          </SponsorGiftStyled>
          <SponsorGiftStyled>
            <GiftIcon alt="bowl of dog food" src="/icons/vet.png" />
            <PriceStyled>€ 50</PriceStyled>
            <ParagraphStyled>Vet visits and health checks</ParagraphStyled>
            <ButtonStyled
              onClick={() => {
                donationsClickHandler(50);
              }}
            >
              Buy a vet visit
            </ButtonStyled>
          </SponsorGiftStyled>
        </SponsorGiftsContainer>
      </SponsorSectionStyled>
      {isDonationOpen && (
        <section>
          <div>
            {sucessfulPurchase.length > 0 ? (
              <p>{sucessfulPurchase}</p>
            ) : (
              <div>
                <p>Do a payment of {donationAmount}</p>
                <button onClick={donate}>Donate gift</button>
              </div>
            )}
          </div>
        </section>
      )}
      <AdoptionSectionStyled>
        <H2Styled id="adopt">
          Find out how you can adopt {individualDog.dogName}
        </H2Styled>
        <AdoptionContainer>
          <DoodleImage
            alt="dog playing with owner"
            src="/shapes/DoogieDoodle.svg"
          />
          <ContactForm
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <ParagraphStyled>
              Write a message to the shelter {individualDog.shelterName}
            </ParagraphStyled>
            <LabelsAndInputsContainerHorizontal>
              <LabelsAndInputsContainer>
                <LabelStyled htmlFor="name">Name</LabelStyled>
                <InputStyled id="name" name="name" required />
              </LabelsAndInputsContainer>
              <LabelsAndInputsContainer>
                <LabelStyled htmlFor="surname">Last name</LabelStyled>
                <InputStyled id="surname" name="surname" required />
              </LabelsAndInputsContainer>
            </LabelsAndInputsContainerHorizontal>
            <LabelsAndInputsContainer>
              <LabelStyled htmlFor="email">Email</LabelStyled>
              <InputStyled id="email" name="email" required />
            </LabelsAndInputsContainer>
            <LabelsAndInputsContainer>
              <LabelStyled htmlFor="message">
                Message for the shelter
              </LabelStyled>
              <TextAreaStyled
                id="message"
                name="message"
                required
                max-length="500"
                rows={3}
              />
            </LabelsAndInputsContainer>
            <AdoptButtonStyled>ADOPT ME</AdoptButtonStyled>
          </ContactForm>
        </AdoptionContainer>
      </AdoptionSectionStyled>
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
  const sessionToken = context.req.cookies.sessionToken;
  // if the user has a started session, get the information about dog favourites
  if (allowedUser) {
    const isFavouriteResponse = await fetch(
      `${baseUrl}/api/user/${allowedUser.id}/favourites/${individualDog.dogId}`,
      {
        method: 'GET',
        headers: {
          cookie: `sessionToken=${sessionToken}`,
        },
      },
    );
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
