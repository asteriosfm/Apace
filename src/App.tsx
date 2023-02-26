import { useState } from 'react';
import { View, Text } from 'react-native';
import styled, { css } from 'styled-components/native';
import SiteElement from './components/SiteElement';

import SiteList from './components/SiteList';
import { Site, SelectedSite } from './interfaces/Site';


interface Props {
    sites?: Site[],
    loading?: boolean,
}

function App({ sites, loading }: Props) {

    const [selectedSite, setSelectedSite] = useState<SelectedSite>(null);
    const [scaning, setScaning] = useState(false);

    return <Container>
        <Header>
            Apace Refunds
        </Header>
        <Body>
            {loading ?
                <Text>
                    loading...
                </Text>
                :
                <SiteList
                    sites={sites}
                    setSelectedSite={(site: Site) => {
                        setSelectedSite(site)
                    }}
                    setScaning={setScaning}
                    scaning={scaning}
                />
            }
            {!!selectedSite ?
                <>
                    <SelectedTitle>SELECTED SITE:</SelectedTitle>
                    <SiteElement
                        site={selectedSite}
                    />
                </>
                :
                null
            }
            {scaning ?
                <Text>loading...</Text>
                :
                !!selectedSite ?
                    <>
                        <Copyright>COPYRIGHT</Copyright>
                        <Text>
                            {selectedSite.copyright}
                        </Text>
                    </>
                    :
                    null
            }
        </Body>
        <Footer>
            <FooterText>
                Copyright © Maksym Horpynchenko ;)
            </FooterText>
        </Footer>
    </Container>
}

export default App;

const Container = styled.View`
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
`;

const Header = styled.Text`
    padding: 24px;
    background: #3A1078;
    width: 100%;
    color: #fff;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
`;

const Body = styled.View`
    padding: 24px;
    display: flex;
    flex: 1;
`;

const Footer = styled.View`
    padding: 24px;
    width: 100%;
    min-width: 100%;
    borderTopWidth: 1px;
    borderTopColor: #DDDDDD;
`;

const FooterText = styled.Text`
    text-align: center;
    color: #000;
    opacity: .6;
`;

const SelectedTitle = styled.Text`
    margin: 0 auto;
    font-size: 18px;
    color: #2F58CD;
    font-weight: 600;
`;
const Copyright = styled.Text`
    margin: 0 auto 12px auto;
    font-size: 18px;
    color: #2F58CD;
    font-weight: 600;
`;
