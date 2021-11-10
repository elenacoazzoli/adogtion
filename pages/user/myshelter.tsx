import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { DogType, ShelterType, User } from '../../util/database';
import { Errors } from '../../util/helpers/errors';
import { UpdateShelterResponse } from '../api/shelters/about';

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
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

const AboutSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 16px 16px;
  margin: 16px 0 16px 0;
  /* background-color: #f4e3e3; */
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
  margin-top: 24px;
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
  padding: 16px 16px;
  margin: 16px 0 16px 0;
  /* background-color: #f4e3e3; */
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

interface ShelterAdminProps {
  user: User;
  dogs: DogType[];
  info: ShelterType;
}

function ShelterAdmin({ user, dogs, info }: ShelterAdminProps) {
  const [dogName, setDogName] = useState('');
  const [dogDescription, setDogDescription] = useState('');
  const [dogAge, setDogAge] = useState();
  const [dogGender, setDogGender] = useState();
  const [dogWeight, setDogWeight] = useState();
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
    console.log(deletedDogJson);

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
        <title>Admin page</title>
        <meta name="description" content="Shelter admin" />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>
      <HeadingContainer>
        <H1Styled>{info.shelterName} shelter information</H1Styled>
        <SubTitleStyled>
          <b>Welcome {user.username}</b>, below you can find all the info about
          {info.shelterName} and its dogs available for adoption.
        </SubTitleStyled>
      </HeadingContainer>
      <AboutSectionStyled>
        <H2Styled>About</H2Styled>
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
        <H2Styled>Dogs available for adoption</H2Styled>
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
                  srcPath={`/dogsimages/${dog.image}`}
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
      <section>
        <H2Styled>Add a new dog</H2Styled>

        {/* <div>
          <form>
            <label htmlFor="dogname">Dog name</label>
            <input id="dogname" value={dogName} />
            <label htmlFor="dogdescription">Dog description</label>
            <input id="dogdescription" value={dogDescription} />
            <label htmlFor="age">Age</label>
            <input id="age" value={dogAge} />
            <label htmlFor="gender">Gender</label>
            <input id="gender" value={dogGender} />
            <label htmlFor="weight">Weight in kgs</label>
            <input id="weight" value={dogWeight} />
          </form>
        </div> */}
      </section>
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
