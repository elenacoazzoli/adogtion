import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { DogType, ShelterType, User } from '../../util/database';
import { Errors } from '../../util/helpers/errors';
import { UpdateShelterResponse } from '../api/shelters/about';
import { InsertDogResponse } from '../api/shelters/dogs/insert';

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 16px;
`;

const H1Styled = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #2f3b4d;
  font-weight: 900;
  font-size: 3rem;
  margin: 32px 0 4px 0;
  box-shadow: inset 0 -16px 0 #efd5d2;
`;

const H2Styled = styled.h2`
  font-family: 'Playfair Display', serif;
  color: #2f3b4d;
  font-weight: 900;
  font-size: 2rem;
  margin: 8px 0 0 0;
  border-bottom: 1px solid #2f3b4d;
`;

const SubTitleStyled = styled.span`
  font-family: 'Montserrat', sans-serif;
  color: #2f3b4d;
  font-weight: 500;
  font-size: 1rem;
  margin: 16px 0 0 0;
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
const AboutSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 16px 32px;
  margin: 16px 48px 16px 48px;
`;

const AboutFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const AboutForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 32px;
  margin: 16px;
  width: 100%;
  background-color: #dfe3e9;
  border-radius: 15px;
`;

const AddressAndRegionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

const LabelsAndInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
  margin-top: 12px;
`;
const LabelsAndInputsContainerHorizontal = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-top: 16px;
`;

const RadioButtonsContainerHorizontal = styled.div`
  margin-top: 1px;
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const LabelStyled = styled.label`
  margin: 4px 0 4px 0;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: #2f3b4d;
`;

const GenderLabelStyled = styled.span`
  margin: 4px 0 8px 8px;
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

const InputRadioStyled = styled.input`
  appearance: none;
  background-color: #fff;
  margin: 0 8px;
  font: inherit;
  color: #2f3b4d;
  width: 1.5em;
  height: 1.5em;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;

  &::before {
    content: '';
    width: 1em;
    height: 1em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em #2f3b4d;
  }

  &:checked::before {
    transform: scale(1);
  }
`;

const InputResetStyled = styled.input`
  background-color: #343f53;
  border: 2px solid transparent;
  text-align: center;
  font-size: 1rem;
  border-color: #343f53;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  margin: 16px 24px 0 0;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
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
  margin-top: 16px;
  padding: 12px 24px;
  border-radius: 12px;
  width: 24%;
  cursor: pointer;
  :hover {
    text-decoration: underline 2px solid #efd5d2;
  }
`;

const DogsSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 16px 32px;
  margin: 16px 48px 16px 48px;
`;

const DogCardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 32px;
  margin-top: 32px;
  flex-wrap: wrap;
  text-decoration: none;
`;
const DogCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #2f3b4d;
  border-radius: 12px;
  width: 30%;
  min-width: 300px;
`;

const DogImageandInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DogInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
`;

const DogImage = styled.div<{ srcPath: string }>`
  background: url(${(props) => props.srcPath});
  width: 100px;
  height: 100px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  background-position: center;
  margin: 16px;
`;

const MaleTextContainer = styled.div`
  background-color: #dfe3e9;
  border: 1px solid #dfe3e9;
  border-radius: 12px;
`;
const FemaleTextContainer = styled.div`
  background-color: #efd5d2;
  border: 1px solid #efd5d2;
  border-radius: 12px;
`;

const ParagraphStyled = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  margin: 8px;
`;

const DeleteButtonStyled = styled.button`
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

const AddDogSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 16px 32px;
  margin: 16px 48px 16px 48px;
`;

interface ShelterAdminProps {
  user: User;
  dogs: DogType[];
  info: ShelterType;
}

function ShelterAdmin({ user, dogs, info }: ShelterAdminProps) {
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  const deleteClickHandler = async (id: number) => {
    // do something with the values
    const dogDeleteResponse = await fetch('/api/shelters/dogs/remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      // this body will be the res.body of the API route
      body: JSON.stringify({
        dogId: id,
      }),
    });
    // casting of loginJson
    const deletedDogJson = await dogDeleteResponse.json();

    // if updateAboutJson contains errors, setErrors
    if ('errors' in deletedDogJson) {
      setErrors(deletedDogJson.errors);
      return;
    }
    router.reload();
  };

  return (
    <Layout>
      <Head>
        <title>Shelter admin</title>
        <meta name="description" content="Shelter admin" />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>
      <SmoothScrollContainer>
        <SectionIndexLink href="#about">ABOUT</SectionIndexLink>
        <SectionIndexLink href="#listedDogs">DOGS</SectionIndexLink>
        <SectionIndexLink href="#createDog">ADD A DOG</SectionIndexLink>
      </SmoothScrollContainer>
      <HeadingContainer>
        <H1Styled>{info.shelterName} shelter information</H1Styled>
        <SubTitleStyled>
          <b>Welcome {user.username}</b>, below you can find all the info
          about&nbsp;{info.shelterName} and its dogs available for adoption.
        </SubTitleStyled>
      </HeadingContainer>

      <AboutSectionStyled>
        <H2Styled id="about">About</H2Styled>
        <SubTitleStyled>
          This is some key information that Adogtion users will be able to see
          on your shelter profile page. Keep it up to date in order to get in
          contact with potential adopters.
        </SubTitleStyled>
        <AboutFormContainer>
          <AboutForm
            onSubmit={async (event) => {
              event.preventDefault();
              // do something with the values
              const updateAboutResponse = await fetch('/api/shelters/about', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                // this body will be the res.body of the API route
                body: JSON.stringify({
                  shelterId: info.shelterId,
                  shelterName: event.currentTarget.shelter.value,
                  description: event.currentTarget.description.value,
                  address: event.currentTarget.address.value,
                  region: event.currentTarget.region.value,
                  phone: event.currentTarget.phone.value,
                }),
              });
              // casting of loginJson
              const updateAboutJson =
                (await updateAboutResponse.json()) as UpdateShelterResponse;

              // if updateAboutJson contains errors, setErrors
              if ('errors' in updateAboutJson) {
                setErrors(updateAboutJson.errors);
                return;
              }
              router.reload();
            }}
          >
            <LabelsAndInputsContainer>
              <LabelStyled htmlFor="shelter">Shelter name</LabelStyled>
              <InputStyled
                id="shelter"
                name="shelter"
                defaultValue={info.shelterName}
                required
              />
            </LabelsAndInputsContainer>
            <LabelsAndInputsContainer>
              <LabelStyled htmlFor="description">
                Shelter description
              </LabelStyled>
              <TextAreaStyled
                id="description"
                name="description"
                defaultValue={info.shelterDescription}
                required
                max-length="500"
                rows={3}
              />
            </LabelsAndInputsContainer>
            <AddressAndRegionContainer>
              <LabelsAndInputsContainer>
                <LabelStyled htmlFor="address">Address</LabelStyled>
                <InputStyled
                  id="address"
                  name="address"
                  defaultValue={info.address}
                  required
                />
              </LabelsAndInputsContainer>
              <LabelsAndInputsContainer>
                <LabelStyled htmlFor="region">Region</LabelStyled>
                <InputStyled
                  id="region"
                  name="region"
                  defaultValue={info.region}
                  required
                />
              </LabelsAndInputsContainer>
              <LabelsAndInputsContainer>
                <LabelStyled htmlFor="phone">Phone number</LabelStyled>
                <InputStyled
                  id="phone"
                  name="phone"
                  defaultValue={info.phone}
                  required
                />
              </LabelsAndInputsContainer>
            </AddressAndRegionContainer>

            <ButtonStyled>Update information</ButtonStyled>
          </AboutForm>
        </AboutFormContainer>

        <div>
          {errors.map((error) => (
            <div key={`error-${error.message}`}>{error.message}</div>
          ))}
        </div>
      </AboutSectionStyled>

      <DogsSectionStyled>
        <H2Styled id="listedDogs">Dogs available for adoption</H2Styled>
        <SubTitleStyled>
          Please mark all dogs that have successfully completed the adogtion
          process as adopted. After that, they will not appear on any search on
          the Adogtion platform.
        </SubTitleStyled>
        <DogCardsContainer>
          {dogs.map((dog) => (
            <DogCardContainer key={dog.dogId}>
              <DogImageandInfoContainer>
                <DogImage
                  role="img"
                  aria-label={`picture of dog ${dog.dogName}`}
                  srcPath={dog.image}
                />
                <DogInfoContainer>
                  <ParagraphStyled>{dog.dogName}</ParagraphStyled>
                  {dog.gender === 'male' ? (
                    <MaleTextContainer>
                      <ParagraphStyled>{dog.gender}</ParagraphStyled>
                    </MaleTextContainer>
                  ) : (
                    <FemaleTextContainer>
                      <ParagraphStyled>{dog.gender}</ParagraphStyled>
                    </FemaleTextContainer>
                  )}
                  <ParagraphStyled>age: {dog.age}</ParagraphStyled>
                </DogInfoContainer>
              </DogImageandInfoContainer>
              <DeleteButtonStyled onClick={() => deleteClickHandler(dog.dogId)}>
                COMPLETE ADOPTION
              </DeleteButtonStyled>
            </DogCardContainer>
          ))}
        </DogCardsContainer>
      </DogsSectionStyled>

      <AddDogSectionStyled>
        <H2Styled id="createDog">Add a new dog</H2Styled>
        <SubTitleStyled>
          Fill in all relevant information about one dog and publish the open
          adoption.
        </SubTitleStyled>
        <AboutFormContainer>
          <AboutForm
            onSubmit={async (event) => {
              event.preventDefault();
              const dogInfoEvent = event.currentTarget;

              const formData = new FormData();
              formData.append('file', event.currentTarget.image.files[0]);
              formData.append('upload_preset', 'zg5yjk7d');
              // call Cloudinary API with image content
              await fetch(
                'https://api.cloudinary.com/v1_1/adogtion/image/upload',
                {
                  method: 'POST',

                  //   // this body will be the res.body of the API route
                  body: formData,
                },
              )
                .then((response) => response.json())
                .then(async (data) => {
                  const insertDogResponse = await fetch(
                    '/api/shelters/dogs/insert',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      // this body will be the res.body of the API route
                      body: JSON.stringify({
                        dogName: dogInfoEvent.dogName.value,
                        description: dogInfoEvent.dogDescription.value,
                        age: dogInfoEvent.age.value,
                        gender: dogInfoEvent.gender.value,
                        size: dogInfoEvent.size.value,
                        activityLevel: dogInfoEvent.activity.value,
                        kids: dogInfoEvent.kids.checked,
                        pets: dogInfoEvent.pets.checked,
                        shelter: info.shelterId,
                        service: dogInfoEvent.service.checked,
                        image: data.secure_url,
                      }),
                    },
                  );
                  const insertDogResponseJson =
                    (await insertDogResponse.json()) as InsertDogResponse;

                  if ('errors' in insertDogResponseJson) {
                    setErrors(insertDogResponseJson.errors);
                    return;
                  }
                  router.reload();
                });
            }}
          >
            <LabelsAndInputsContainer>
              <LabelStyled htmlFor="dogName">Dog name</LabelStyled>
              <InputStyled id="dogName" name="dogName" required />
            </LabelsAndInputsContainer>
            <LabelsAndInputsContainer>
              <LabelStyled htmlFor="dogDescription">
                Dog description
              </LabelStyled>
              <TextAreaStyled
                id="dogDescription"
                name="dogDescription"
                required
                max-length="500"
                rows={3}
              />
            </LabelsAndInputsContainer>
            <AddressAndRegionContainer>
              <LabelsAndInputsContainer>
                <LabelStyled htmlFor="age">Dog age</LabelStyled>
                <InputStyled
                  type="number"
                  id="age"
                  name="age"
                  defaultValue="1"
                  min="1"
                  max="20"
                  required
                />
              </LabelsAndInputsContainer>

              <LabelsAndInputsContainer>
                <LabelStyled htmlFor="size">Dog size in kgs</LabelStyled>
                <InputStyled
                  type="number"
                  id="size"
                  name="size"
                  defaultValue="1"
                  min="1"
                  max="100"
                  required
                />
              </LabelsAndInputsContainer>
              <LabelsAndInputsContainer>
                <LabelStyled htmlFor="activity">
                  Energy and activity level
                </LabelStyled>
                <SelectStyled id="activity" name="activity" required>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectStyled>
              </LabelsAndInputsContainer>

              <LabelsAndInputsContainer>
                <GenderLabelStyled id="genderTitle">Gender</GenderLabelStyled>
                <RadioButtonsContainerHorizontal>
                  <RadioButtonsContainerHorizontal>
                    <InputRadioStyled
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      required
                    />
                    <LabelStyled htmlFor="female">Female</LabelStyled>
                  </RadioButtonsContainerHorizontal>
                  <RadioButtonsContainerHorizontal>
                    <InputRadioStyled
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      required
                    />
                    <LabelStyled htmlFor="male">Male</LabelStyled>
                  </RadioButtonsContainerHorizontal>
                </RadioButtonsContainerHorizontal>
              </LabelsAndInputsContainer>
            </AddressAndRegionContainer>

            <LabelsAndInputsContainerHorizontal>
              <InputCheckStyled
                type="checkbox"
                id="kids"
                name="kids"
                value="yes"
              />
              <LabelStyled htmlFor="kids">Experience with kids</LabelStyled>
            </LabelsAndInputsContainerHorizontal>
            <LabelsAndInputsContainerHorizontal>
              <InputCheckStyled
                type="checkbox"
                id="pets"
                name="pets"
                value="yes"
              />
              <LabelStyled htmlFor="pets">Friendly with other pets</LabelStyled>
            </LabelsAndInputsContainerHorizontal>
            <LabelsAndInputsContainerHorizontal>
              <InputCheckStyled
                type="checkbox"
                id="service"
                name="service"
                value="yes"
              />
              <LabelStyled htmlFor="service">
                Qualified as service dog
              </LabelStyled>
            </LabelsAndInputsContainerHorizontal>

            <LabelsAndInputsContainer>
              <LabelStyled htmlFor="image">Upload a picture</LabelStyled>
              <InputStyled
                type="file"
                id="image"
                name="image"
                required
                multiple={false}
              />
            </LabelsAndInputsContainer>
            <LabelsAndInputsContainerHorizontal>
              <InputResetStyled type="reset" value="Reset" />
              <ButtonStyled>Publish new dog</ButtonStyled>
            </LabelsAndInputsContainerHorizontal>
          </AboutForm>
        </AboutFormContainer>
      </AddDogSectionStyled>
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

  if (allowedUser.roleId !== 2) {
    return {
      redirect: {
        destination: '/user/myprofile',
        permanent: false,
      },
    };
  }
  const baseUrl = process.env.BASE_URL;
  const dogsResponse = await fetch(
    `${baseUrl}/api/shelters/dogs/${allowedUser.shelterId}`,
  );

  const shelterDogs = await dogsResponse.json();

  const infoResponse = await fetch(
    `${baseUrl}/api/shelters/${allowedUser.shelterId}`,
  );

  const shelterInfo = await infoResponse.json();

  return {
    props: {
      user: allowedUser,
      dogs: shelterDogs,
      info: shelterInfo,
    },
  };
}

export default ShelterAdmin;
