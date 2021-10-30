import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const PageContainer = styled.main`
  margin: 140px 200px 0 200px;
  min-height: calc(100vh - 100px - 275px);
`;

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <PageContainer>{children}</PageContainer>
      <Footer />
    </>
  );
};

export default Layout;
