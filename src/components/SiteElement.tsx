import React from "react";
import styled from 'styled-components/native';
import { Text } from 'react-native';

import { Site, SelectedSite } from "../interfaces/Site";


interface Props {
    site: Site | SelectedSite,
    onClick?: (site: Site) => void,
}

export default ({ site, onClick =()=>{} }: Props) => {
    return <Container
        onPress={onClick.bind(null, site)}
        key={site?.url + site?.name}
    >
        <Text>{site?.name}</Text>
        <Text>{site?.url}</Text>
    </Container>
}

const Container = styled.TouchableOpacity`
    padding: 12px 0;
    margin: 0 0 12px 0;
    borderBottomWidth: 1px;
    borderBottomColor: #DDDDDD;
    width: 100%;
    minWidth: 100%;
    display: flex;
    flex-direction: column;
`;
