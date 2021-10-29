import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledMain = styled.footer`
  margin-top: 64px;
  width: 100%;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 32px 200px;
  padding: 32px 132px;
  border-top: 1px solid #c5c5c5;
`;

const ColumnTitle = styled.span`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-size: 1.2rem;
  font-weight: 800;
  box-shadow: inset 0 -4px 0 #efd5d2;
`;

const ListStyled = styled.ul`
  padding: 0px;
  list-style-type: none;
`;

const ListItemStyled = styled.li`
  margin: 4px 0 0 0;
  padding: 0px;
  list-style-type: none;
  font-family: 'Montserrat', sans-serif;
  color: #5c5c5c;
  font-weight: 300;
  font-size: 1rem;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  gap: 16px;
`;

const Footer: FunctionComponent = () => (
  <StyledMain>
    <div>
      <StyledNav>
        <div>
          <Link href="/" passHref>
            <a>
              <Image src="/logo.svg" width="96px" height="96px" />
            </a>
          </Link>
        </div>
        <div>
          <ColumnTitle>Our dogs</ColumnTitle>
          <ListStyled>
            <ListItemStyled>All dogs</ListItemStyled>
            <ListItemStyled>Adoption checklist</ListItemStyled>
            <ListItemStyled>Adoption stories</ListItemStyled>
          </ListStyled>
        </div>
        <div>
          <ColumnTitle>Resources</ColumnTitle>
          <ListStyled>
            <ListItemStyled>Blog</ListItemStyled>
            <ListItemStyled>Guides & tutorials</ListItemStyled>
            <ListItemStyled>Help center</ListItemStyled>
            <ListItemStyled>Community</ListItemStyled>
          </ListStyled>
        </div>
        <div>
          <ColumnTitle>Company</ColumnTitle>
          <ListStyled>
            <ListItemStyled>About us</ListItemStyled>
            <ListItemStyled>Careers</ListItemStyled>
            <ListItemStyled>Shelters</ListItemStyled>
            <ListItemStyled>Email us</ListItemStyled>
          </ListStyled>
        </div>
        <div>
          <ColumnTitle>Contact us</ColumnTitle>
          <IconsContainer>
            <Link href="https://mail.google.com" passHref>
              <a>
                <Image src="/icons/email.svg" width="24px" height="24px" />
              </a>
            </Link>
            <Link href="https://www.twitter.com" passHref>
              <a>
                <Image src="/icons/twitter.svg" width="24px" height="24px" />
              </a>
            </Link>
            <Link href="https://www.instagram.com" passHref>
              <a>
                <Image src="/icons/instagram.svg" width="24px" height="24px" />
              </a>
            </Link>
          </IconsContainer>
        </div>
      </StyledNav>
    </div>
  </StyledMain>
);

export default Footer;
