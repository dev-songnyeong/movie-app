import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import { Box } from '../util/styledcomponents'

const StyledMovie = styled.div`
    color: white;
    
`
const Poster = ({id, img, width, height}) => {
    return (
        <StyledMovie>
            <Link to={`/${id}`}>
                <Box img={`${img}`} width='150px' height='200px' ></Box>
                </Link>
        </StyledMovie>
    );
};

export default Poster;