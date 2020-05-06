import React from 'react'
import { Link } from 'gatsby'
import {css, jsx} from "@emotion/core";
import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'
import {TopLevelDisplayBlock} from "./TopLevelDisplayBlock";

const Footer = class extends React.Component {
  render() {
    return (
  <footer>
    <TopLevelDisplayBlock>
      <p css={
        css`
        margin: 0;
        color: rgba(240, 240, 240, 0.8);
        text-align: center;
        font-size: 0.9rem;
        `
      }>Copyright 2020 KBIA and the Curators of the University of Missouri</p>
    </TopLevelDisplayBlock>
  </footer>
    )
  }
}

export default Footer
