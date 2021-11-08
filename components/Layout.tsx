import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const LayoutContainer = styled.div`
  overflow: hidden;
  position: relative;
`;
const PageContainer = styled.main`
  margin: 140px 200px 0 200px;
  min-height: calc(100vh - 100px - 270px);
`;

const Layout: FunctionComponent = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <PageContainer>{children}</PageContainer>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
