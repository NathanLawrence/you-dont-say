import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import {css, jsx} from "@emotion/core";
import {TopLevelDisplayBlock} from "./TopLevelDisplayBlock";

export const PeopleGrid = ({ people }) => (
    <div css={css`
        display: grid;
        grid-column-gap: 50px;
        grid-row-gap: 50px;
        grid-template-columns: repeat(5, 1fr);
    `}>
        {
            people.map((person, index) => (
                <div>{person.name} - {person.slug}</div>
            ))
        }
    </div>
)