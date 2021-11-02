import Link from 'next/link';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

const HeaderStyled = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: #faf7f6;
  z-index: 99;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoText = styled.span`
  font-family: 'Playfair Display', serif;
  color: #343f53;
  font-weight: 900;
  font-size: 3rem;
  padding: 0 0 6px 0;
  box-shadow: inset 0 -12px 0 #efd5d2;
`;

const Logo = styled.img`
  width: 96px;
  height: 96px;
`;
const NavigationBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 200px;
  padding: 0 32px;
  border-bottom: 1px solid #c5c5c5;
`;

const Pages = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 72px;
`;

const PageLink = styled.a`
  cursor: pointer;
  border-bottom: 2px solid transparent;
  text-decoration: none;
  transition: 0.5s;
  padding: 16px 0 2px 0;
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 500;
  font-size: 1rem;

  :hover {
    border-bottom: 2px solid #343f53;
  }
`;

const RegistrationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;
const FavouritesIcon = styled.img`
  padding: 16px 0 4px 0;
  width: 1.5rem;
`;
const Divider = styled.span`
  padding: 16px 0 4px 0;
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 300;
  font-size: 1rem;
`;

const Header: FunctionComponent = () => {
  return (
    <HeaderStyled>
      <NavigationBar>
        <LogoContainer>
          <Logo src="/icons/logo.svg" />
          <Link href="/" passHref>
            <LogoText>adogtion</LogoText>
          </Link>
        </LogoContainer>
        <Pages>
          <Link href="/dogs" passHref>
            <PageLink>Find a dog</PageLink>
          </Link>
          <Link href="/shelters" passHref>
            <PageLink>Our shelters</PageLink>
          </Link>
          <Link href="/blog" passHref>
            <PageLink>Blog</PageLink>
          </Link>
        </Pages>
        <RegistrationContainer>
          <Link href="/favourites" passHref>
            {/* should lead to user profile, if session doesn't exist, redirectTo login or register */}
            <FavouritesIcon src="/icons/heart.svg" alt="Favourites icon" />
          </Link>
          <Divider>|</Divider>
          {/* conditional rendering: if user is logged in, show username - otherwise display two links */}
          <Link href="/register" passHref>
            <PageLink>Sign up</PageLink>
          </Link>
          <Divider>|</Divider>
          <Link href="/login" passHref>
            <PageLink>Log in</PageLink>
          </Link>
        </RegistrationContainer>
      </NavigationBar>
    </HeaderStyled>
  );
};

export default Header;
