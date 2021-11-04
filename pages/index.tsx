import bcrypt from 'bcrypt';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import DogInfoCard from '../components/DogInfoCard';
import Layout from '../components/Layout';
import { DogAndShelterType } from '../util/database';

const BlobBackgroundImageLeft = styled.img`
  position: absolute;
  top: 0px;
  left: -120px;
  z-index: -1;
  width: 840px;
`;

const BlobBackgroundImageRight = styled.img`
  position: absolute;
  top: 1300px;
  right: -240px;
  z-index: -1;
  width: 840px;
`;

const FirstSectionStyled = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const DogHugImage = styled.img`
  margin: 0 32px 0 128px;
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 32px 0 -180px;
  background-color: #faf7f6;
  padding: 48px 72px 48px 48px;
`;
const H1Styled = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #2f3b4d;
  font-weight: 900;
  font-size: 3rem;
  margin: 0 0 0 0;
`;

const SubTitleStyled = styled.span`
  font-family: 'Montserrat', sans-serif;
  color: #2f3b4d;
  font-weight: 500;
  font-size: 1.5rem;
  margin: 8px 0 0 0;
  box-shadow: inset 0 -12px 0 #efd5d2;
`;
const LinkStyled = styled.a`
  background-color: #343f53;
  border: 2px solid transparent;
  text-decoration: underline 2px solid transparent;
  transition: 0.5s;
  text-align: center;
  border-color: #343f53;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  margin-top: 16px;
  padding: 12px 36px;
  border-radius: 12px;
  cursor: pointer;
  :hover {
    text-decoration: underline 2px solid #efd5d2;
  }
`;

const SecondSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 64px 32px;
  margin-top: 48px;
  background-color: #f4e3e3;
`;
const H2Styled = styled.h2`
  font-family: 'Playfair Display', serif;
  color: #2f3b4d;
  font-weight: 900;
  font-size: 2.5rem;
  margin: 32px 0 0 0;
`;

const ParagraphStyled = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 300;
  font-size: 1rem;
  text-align: center;
  margin: 8px 0 0 0;
`;

const ThirdSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 64px;
  margin-top: 32px;
`;

const FourthSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 64px;
  margin-top: 32px;
`;

const InfoCardsContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin: 32px 0 0 0;
`;

const InfoCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 300px;
  margin: 0 64px 0 32px;
  padding: 32px 16px 32px 16px;
  background-color: #dfe3e9;
`;

const H3Styled = styled.h3`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 900;
  text-align: center;

  font-size: 1.5rem;
  margin: 8px 0 0 0;
`;

interface HomeProps {
  dogs: DogAndShelterType[];
}

function Home({ dogs }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>Adogtion</title>
        <meta
          name="description"
          content="The platform to adopt your next dog"
        />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>
      <BlobBackgroundImageLeft src="/shapes/shape3.svg" />
      <BlobBackgroundImageRight src="/shapes/shape1.svg" />
      <FirstSectionStyled>
        <DogHugImage
          src="/siteimages/doghug.jpg"
          width="600px"
          height="500px"
        />

        <HeadingContainer>
          <H1Styled>Adopt a friend</H1Styled>
          <SubTitleStyled>Let your love make a PAWsitive impact</SubTitleStyled>
          <Link href="/dogs" passHref>
            <LinkStyled>ADOPT A DOG</LinkStyled>
          </Link>
        </HeadingContainer>
      </FirstSectionStyled>
      <SecondSectionStyled>
        <H2Styled>Get personalised dog matches</H2Styled>
        <ParagraphStyled>
          Answer a few quick questions to see your perfect matches on Adogtion.
        </ParagraphStyled>
        <Link href="/login" passHref>
          {/* should lead to user profile, if session doesn't exist, redirectTo login or register */}
          <LinkStyled>GET STARTED</LinkStyled>
        </Link>
      </SecondSectionStyled>
      <ThirdSectionStyled>
        <H2Styled>Dogs available for adoption</H2Styled>
        <InfoCardsContainer>
          {dogs.map((dog: DogAndShelterType) => {
            return <DogInfoCard dog={dog} key={dog.dogId} />;
          })}
        </InfoCardsContainer>
        <Link href="/dogs" passHref>
          <LinkStyled>MEET THEM ALL</LinkStyled>
        </Link>
      </ThirdSectionStyled>
      <FourthSectionStyled>
        <H2Styled>Planning to adopt a pet?</H2Styled>
        <InfoCardsContainer>
          <InfoCardStyled>
            <H3Styled>Checklist for new adopters</H3Styled>
            <ParagraphStyled>
              Help make the transition as smooth as possible for your new pet.
              We’ve compiled a checklist to help you on your new rewarding
              relationship.
            </ParagraphStyled>
            <Link href="/blog" passHref>
              <LinkStyled>LEARN MORE</LinkStyled>
            </Link>
          </InfoCardStyled>
          <InfoCardStyled>
            <H3Styled>Become a dog ambassador</H3Styled>
            <ParagraphStyled>
              Can't adopt yet? Help provide a dog with the necessary care.
              Donations help with their food, veterinary care and trainings.
            </ParagraphStyled>
            <Link href="/blog" passHref>
              <LinkStyled>LEARN MORE</LinkStyled>
            </Link>
          </InfoCardStyled>
          <InfoCardStyled>
            <H3Styled>Guides and adopters stories</H3Styled>
            <ParagraphStyled>
              Helpful insights on what to expect from adoption. Discover the
              stories of other pet lovers.
            </ParagraphStyled>
            <Link href="/blog" passHref>
              <LinkStyled>READ MORE</LinkStyled>
            </Link>
          </InfoCardStyled>
        </InfoCardsContainer>
      </FourthSectionStyled>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // get data from API
  const baseUrl = process.env.BASE_URL;
  const dogsResponse = await fetch(`${baseUrl}/api/dogs/filtered`);
  const dogs = await dogsResponse.json();
  // const trialPass = await bcrypt.hash('admin', 10);
  // const trialUserPass = await bcrypt.hash('user', 10);
  // console.log(trialPass);
  // console.log(trialUserPass);

  return {
    props: {
      dogs,
    },
  };
};

export default Home;
