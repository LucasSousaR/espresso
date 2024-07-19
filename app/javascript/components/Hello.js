import React from "react"
import PropTypes from "prop-types"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

const Hello = (props) => {
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" align="center">
          Olá, {props.candidate}!
        </Typography>

        <Typography variant="subtitle1" component="p" align="center">
          Seu teste técnico começa aqui.
        </Typography>
      </Container>
    </React.Fragment>
  )
}

Hello.propTypes = {
  candidate: PropTypes.string
};

export default Hello
