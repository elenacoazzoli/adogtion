import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';

const BlobBackgroundImage = styled.img`
  position: absolute;
  top: 0px;
  left: -240px;
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
  margin: 0 32px 0 32px;
`;
const H1Styled = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #2f3b4d;
  font-weight: 900;
  font-size: 3rem;
  margin: 16px 0 0 0;
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
  background-color: #2f3b4d;
  border: 2px solid transparent;
  text-decoration: underline 2px solid transparent;
  transition: 0.5s;
  text-align: center;
  border-color: #2f3b4d;
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
  padding: 32px 64px;
  margin-top: 32px;

  background-color: #f4e3e3;
`;
const H2Styled = styled.h2`
  font-family: 'Playfair Display', serif;
  color: #2f3b4d;
  font-weight: 900;
  font-size: 2.5rem;
  margin: 16px 0 0 0;
`;

const ParagraphStyled = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #2f3b4d;
  font-weight: 300;
  font-size: 1rem;
  margin: 8px 0 0 0;
`;

function Home() {
  return (
    <Layout>
      <Head>
        <title>Adogtion</title>
        <meta
          name="description"
          content="The platform to adopt your next dog"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BlobBackgroundImage src="/shapes/shape3.svg" />
      <FirstSectionStyled>
        <DogHugImage src="/doghug.jpg" width="320px" height="480px" />

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
          <LinkStyled>GET STARTED</LinkStyled>
        </Link>
      </SecondSectionStyled>
    </Layout>
  );
}

export default Home;
