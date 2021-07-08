import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function ComicList() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    fetch("/comics")
      .then((r) => r.json())
      .then(setComics);
  }, []);

  return (
    <Wrapper>
      {comics.length > 0 ? (
        comics.map((comic) => (
          <Comic key={comic.id}>
            <Box>
              <h2>{comic.title}</h2>
              <p>
                <em>Created by: {comic.creators}</em>
                &nbsp;·&nbsp;
                <cite>Published by: {comic.publisher}</cite>
                <p>${comic.price}</p>
              </p>
              <ReactMarkdown>{comic.description}</ReactMarkdown>
            </Box>
          </Comic>
        ))
      ) : (
        <>
          <h2>No Comics Found</h2>
          <Button as={Link} to="/new">
            Add a New Comic
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Comic = styled.article`
  margin-bottom: 24px;
`;

export default ComicList;
