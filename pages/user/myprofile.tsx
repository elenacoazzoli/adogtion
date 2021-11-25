import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { DogAndShelterType, User } from '../../util/database';
import { Errors } from '../../util/helpers/errors';
import { AdopterResponse } from '../api/user/[userId]';

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 80px;
`;

const H1Styled = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 900;
  font-size: 3rem;
  margin: 16px 0 4px 0;
  box-shadow: inset 0 -16px 0 #efd5d2;
`;

const SubTitleStyled = styled.span`
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 500;
  font-size: 1rem;
  margin: 12px 0 0 0;
  text-align: left;
`;

const SmoothScrollContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 32px 80px 12px;
  border-bottom: 1px solid #343f53;
`;

const SectionIndexLink = styled.a`
  cursor: pointer;
  border-bottom: 4px solid transparent;
  text-decoration: none;
  transition: 0.5s;
  padding: 16px 16px 6px 16px;
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 600;
  font-size: 1rem;

  :hover {
    border-bottom: 4px solid #343f53;
  }
`;
const H2Styled = styled.h2`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 900;
  font-size: 2rem;
  margin: 24px 48px 0 72px;
  border-bottom: 1px solid #343f53;
`;
const H3Styled = styled.h3`
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 500;
  font-size: 1.2rem;
  margin: 16px 0 0 0;
`;

const AboutMeSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 16px 32px;
  margin: 0 48px 0 72px;
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
  color: #343f53;
`;

const IdealDogSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 8px 32px;
  margin: 0 48px 16px 72px;
`;

const IdealDogInfoFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 8px;
`;
const IdealDogInfoForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px 32px 16px 32px;
  margin: 8px 48px;
  width: 100%;
  background-color: #dfe3e9;
  border-radius: 15px;
`;

const LabelsAndInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
  margin-top: 12px;
`;

const InputsContainerHorizontal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;
const LabelStyled = styled.label`
  margin: 4px 0 4px 0;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: #343f53;
`;

const SelectStyled = styled.select`
  width: 100%;
  min-height: 36px;
  padding: 4px 8px;
  border: 2px solid #dfe3e9;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 300;
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
`;

const LabelsAndInputsContainerHorizontal = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-top: 16px;
`;

const InputCheckStyled = styled.input`
  appearance: none;
  background-color: #fff;
  margin: 4px 12px 4px 4px;
  font: inherit;
  color: #2f3b4d;
  width: 1.3em;
  height: 1.3em;
  border: 0.15em solid #2f3b4d;
  transform: translateY(-0.075em);
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 300;
  display: grid;
  place-content: center;

  &::before {
    content: '';
    width: 0.7em;
    height: 0.7em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em #2f3b4d;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  &:checked::before {
    transform: scale(1);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 82px;
`;

const InputResetStyled = styled.input`
  background-color: #343f53;
  border: 2px solid transparent;
  text-align: center;
  font-size: 1rem;
  border-color: #343f53;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  margin: 8px 24px 0 0;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
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
  margin-top: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  width: 24%;
  cursor: pointer;
  :hover {
    text-decoration: underline 2px solid #efd5d2;
  }
`;

const DonationsSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 16px 32px;
  margin: 16px 48px 16px 48px;
`;

interface UserProfileProps {
  user: User;
  profile: User;
  donations: DogAndShelterType[];
}

function UserProfile({ user, profile, donations }: UserProfileProps) {
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>{user.username} profile</title>
        <meta name="description" content="Your profile" />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>
      <SmoothScrollContainer>
        <SectionIndexLink href="#aboutMe">ABOUT ME</SectionIndexLink>
        <SectionIndexLink href="#idealDog">MY IDEAL DOG</SectionIndexLink>
        <SectionIndexLink href="#donations">MY DONATIONS</SectionIndexLink>
      </SmoothScrollContainer>
      <HeadingContainer>
        <H1Styled>Welcome, {user.username}!</H1Styled>
        <SubTitleStyled>
          Below you can find all your profile information and your previous
          donations.
        </SubTitleStyled>
      </HeadingContainer>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          // do something with the values
          await fetch(`/api/user/${user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            // this body will be the res.body of the API route
            body: JSON.stringify({
              name: event.currentTarget.firstname.value,
              surname: event.currentTarget.surname.value,
              email: event.currentTarget.email.value,
              age:
                event.currentTarget.age.value === 'NULL'
                  ? null
                  : event.currentTarget.age.value,
              gender:
                event.currentTarget.gender.value === 'NULL'
                  ? null
                  : event.currentTarget.gender.value,
              size:
                event.currentTarget.size.value === 'NULL'
                  ? null
                  : event.currentTarget.size.value,
              activityLevel:
                event.currentTarget.activity.value === 'NULL'
                  ? null
                  : event.currentTarget.activity.value,
              kids: event.currentTarget.kids.checked,
              pets: event.currentTarget.pets.checked,
              service: event.currentTarget.service.checked,
            }),
          }).then(async (response) => {
            // casting of loginJson
            const updateAboutJson = (await response.json()) as AdopterResponse;

            // if updateAboutJson contains errors, setErrors
            if ('errors' in updateAboutJson) {
              setErrors(updateAboutJson.errors);
              return;
            }
            router.reload();
          });
        }}
      >
        <H2Styled>My profile</H2Styled>
        <AboutMeSectionStyled>
          <H3Styled id="aboutMe">ABOUT ME</H3Styled>
          <SubTitleStyled>
            Your profile information and email settings.
          </SubTitleStyled>
          <div>
            <LabelsAndInputsContainer>
              <LabelStyled htmlFor="firstname">Name</LabelStyled>
              <InputStyled
                id="firstname"
                name="firstname"
                defaultValue={profile.name}
                required
              />
            </LabelsAndInputsContainer>
            <LabelsAndInputsContainer>
              <LabelStyled htmlFor="surname">Last name</LabelStyled>
              <InputStyled
                id="surname"
                name="surname"
                defaultValue={profile.surname}
                required
              />
            </LabelsAndInputsContainer>
            <LabelsAndInputsContainer>
              <LabelStyled htmlFor="email">Email address</LabelStyled>
              <InputStyled
                type="email"
                id="email"
                name="email"
                defaultValue={profile.email}
                required
              />
            </LabelsAndInputsContainer>
          </div>

          <div>
            {errors.map((error) => (
              <div key={`error-${error.message}`}>{error.message}</div>
            ))}
          </div>
        </AboutMeSectionStyled>

        <IdealDogSectionStyled>
          <H3Styled id="idealDog">MY IDEAL DOG</H3Styled>
          <SubTitleStyled>
            Shelters may use this information to suggest more possible matches.
          </SubTitleStyled>
          <IdealDogInfoFormContainer>
            <IdealDogInfoForm>
              <LabelsAndInputsContainer>
                <LabelStyled htmlFor="age">Age preference</LabelStyled>
                <SelectStyled
                  id="age"
                  name="age"
                  required
                  defaultValue={profile.age}
                >
                  <option value="NULL">(no age preference)</option>
                  <option value="puppy">Puppy</option>
                  <option value="young">Young dog</option>
                  <option value="adult">Adult dog</option>
                  <option value="senior">Senior dog</option>
                </SelectStyled>
              </LabelsAndInputsContainer>

              <LabelsAndInputsContainer>
                <LabelStyled htmlFor="gender">Gender preference</LabelStyled>
                <SelectStyled
                  id="gender"
                  name="gender"
                  required
                  defaultValue={profile.gender}
                >
                  <option value="NULL">(no gender preference)</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </SelectStyled>
              </LabelsAndInputsContainer>

              <LabelsAndInputsContainer>
                <LabelStyled htmlFor="size">Size preference</LabelStyled>
                <SelectStyled
                  id="size"
                  name="size"
                  required
                  defaultValue={profile.size}
                >
                  <option value="NULL">(no size preference)</option>
                  <option value="small">Small (0 - 10 kgs)</option>
                  <option value="medium">Medium (11 - 30 kgs)</option>
                  <option value="large">Large (more than 30 kgs)</option>
                </SelectStyled>
              </LabelsAndInputsContainer>

              <LabelsAndInputsContainer>
                <LabelStyled htmlFor="activity">
                  Activity level preference
                </LabelStyled>
                <SelectStyled
                  id="activity"
                  name="activity"
                  required
                  defaultValue={profile.activityLevel}
                >
                  <option value="NULL">(no activity level preference)</option>
                  <option value="low">Laid back</option>
                  <option value="medium">Active</option>
                  <option value="high">Very active</option>
                </SelectStyled>
              </LabelsAndInputsContainer>

              <InputsContainerHorizontal>
                <LabelsAndInputsContainerHorizontal>
                  <InputCheckStyled
                    type="checkbox"
                    id="kids"
                    name="kids"
                    value="yes"
                    defaultChecked={profile.kids}
                  />
                  <LabelStyled htmlFor="kids">Friendly with kids</LabelStyled>
                </LabelsAndInputsContainerHorizontal>
                <LabelsAndInputsContainerHorizontal>
                  <InputCheckStyled
                    type="checkbox"
                    id="pets"
                    name="pets"
                    value="yes"
                    defaultChecked={profile.pets}
                  />
                  <LabelStyled htmlFor="pets">
                    Friendly with other pets
                  </LabelStyled>
                </LabelsAndInputsContainerHorizontal>
                <LabelsAndInputsContainerHorizontal>
                  <InputCheckStyled
                    type="checkbox"
                    id="service"
                    name="service"
                    value="yes"
                    defaultChecked={profile.service}
                  />
                  <LabelStyled htmlFor="service">
                    Is trained as service dog
                  </LabelStyled>
                </LabelsAndInputsContainerHorizontal>
              </InputsContainerHorizontal>
            </IdealDogInfoForm>
          </IdealDogInfoFormContainer>
        </IdealDogSectionStyled>
        <ButtonsContainer>
          <InputResetStyled type="reset" value="Reset" />
          <ButtonStyled>Save changes</ButtonStyled>
        </ButtonsContainer>
      </form>

      <H2Styled id="donations">My donations</H2Styled>
      <DonationsSectionStyled>
        <SubTitleStyled>
          Your donations to support our dogs till they find a forever home.
        </SubTitleStyled>
        <div>
          {donations.map((donation) => {
            return (
              <div key={donation.dogId}>
                <p>{donation.dogName}</p>
                <p>{donation.amount}</p>
              </div>
            );
          })}
        </div>
      </DonationsSectionStyled>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUserBySessionToken } = await import('../../util/database');

  const allowedUser = await getUserBySessionToken(
    context.req.cookies.sessionToken,
  );

  if (!allowedUser) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: '/login?returnTo=/user/myprofile',
        permanent: false,
      },
    };
  }
  const sessionToken = context.req.cookies.sessionToken;
  const baseUrl = process.env.BASE_URL;
  const profileResponse = await fetch(`${baseUrl}/api/user/${allowedUser.id}`, {
    method: 'GET',
    headers: {
      cookie: `sessionToken=${sessionToken}`,
    },
  });
  const profileInfo = await profileResponse.json();

  const donationsResponse = await fetch(
    `${baseUrl}/api/user/${allowedUser.id}/donations`,
    {
      method: 'GET',
      headers: {
        cookie: `sessionToken=${sessionToken}`,
      },
    },
  );
  const donations = await donationsResponse.json();

  // TODO: put here gSSP code for getting profile data and return props
  return {
    props: {
      user: allowedUser,
      profile: profileInfo.profile,
      donations,
    },
  };
}

export default UserProfile;
