import React from "react";
import styled, { css } from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Poster from "../components/Poster";

import {
  StyledTitle,
  StyledSubtitle,
  Styledp,
  Box,
  Empty,
  HR,
} from "../util/styledcomponents";

const StyledWrapper = styled.div`
  width: 100%;
  height: 42vh;

  position: fixed;
  z-index: -10;
  background: url(${(props) => props.url}) no-repeat top/cover;
`;
const StyledGlass = styled.div`
  width: 100%;
  height: 42vh;

  position: fixed;

  z-index: -5;
  background: linear-gradient(#0f0f0f 5%, transparent, #0f0f0f);
`;
const DetailWrapper = styled.div`
  width: 100%;
  height: 80vh;

  position: fixed;
  top: 13vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TextWrapper = styled(Box)`
  width: 60%;
  height: 55%;
  border: #ea5d35 1px solid;
  padding: 0 .7% 0 0;

  display: flex;
  flex-direction: row;
  align-items: center;

  ${props => props.suggestions && css`
    height: 30%;
    justify-content: space-evenly;
  `}
`;

const TextContainer = styled(Box)`
  background: #0f0f0f;
  width: 100%;
  height: 80%;
  padding: 3%;
`;
const ImgContainer = styled.div`
  width: 47%;
  height: 90%;

  position: relative;
  left: -10%;

  border-radius: 20px;
  background: url(${(props) => props.url}) no-repeat center/cover;
`;
const Summary = styled.div`
  width: 100%;
  height: 55%;
  overflow: hidden;
`
const MOVIE_DETAIL = gql`
  query movieDetail($id: Int!) {
    movie(id: $id) {
      id
      title
      rating
      language
      description_intro
      medium_cover_image
      background_image
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;
const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(MOVIE_DETAIL, {
    variables: { id: +id },
  });
  if (loading) {
    return "loading";
  }
  if (data && data.movie) {
    console.log('-----2 ' + JSON.stringify(data.suggestions))
    return (
      <StyledWrapper url={data.movie.background_image}>
        <StyledGlass />
        <DetailWrapper>
          <TextWrapper>
            <ImgContainer url={data.movie.medium_cover_image} />
            <TextContainer>
              <StyledTitle>{data.movie.title}</StyledTitle>
              <Empty />
              <StyledSubtitle size="1.2rem">
                rating : {data.movie.rating} / 10
              </StyledSubtitle>
              <StyledSubtitle size="1.2rem">
                language : {data.movie.language}
              </StyledSubtitle>
              <Empty />
              <StyledSubtitle>summary </StyledSubtitle>
              <Summary>
                <Styledp>{data.movie.description_intro}</Styledp>
              </Summary>
            </TextContainer>

          </TextWrapper>
          <HR width='63%'/>
          <TextWrapper suggestions>
            {data && data.suggestions && data.suggestions.map((movie) => (
              <Poster
                key={movie.id}
                id={movie.id}
                img={movie.medium_cover_image}
                width="80%"
                height="90%"
              />))}
          </TextWrapper>

        </DetailWrapper>
      </StyledWrapper>
    );
  }
};

export default Detail;
