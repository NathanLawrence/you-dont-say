import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import {TopLevelDisplayBlock} from "./TopLevelDisplayBlock";
import {css, jsx} from "@emotion/core";
import Styling from "./Styling";

export const Billboard = ({title, dek}) => (
    <TopLevelDisplayBlock>
        <h1 css={css`
            font-size: 3.3rem;
            font-weight: ${Styling.fonts.weightBold};
            padding: 1.5rem 2rem;
            text-align: right;
        `}>{title}
            <p css={css`
                font-weight: ${Styling.fonts.weightLight};
                font-size: 2rem;
                margin-top: 5em;
                margin-block-start: 0;
                margin-block-end: 0;
            `}>{dek}</p></h1>
    </TopLevelDisplayBlock>
)