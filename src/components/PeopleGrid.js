import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import {css, jsx} from "@emotion/core";
import {TopLevelDisplayBlock} from "./TopLevelDisplayBlock";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import Img from "gatsby-image";
import {EnforcedSquare} from "./EnforcedSquare";

export const PeopleGrid = ({ people }) => (
    <div css={css`
        display: grid;
        grid-column-gap: 50px;
        grid-row-gap: 50px;
        grid-template-columns: repeat(5, 1fr);
    `}>
        {
            people.map((person, index) => (
                <Link to={person.slug} key={person.slug}>
                    <div>
                        <EnforcedSquare>
                            <Img
                                css={css`
                                border-radius: 50%;
                                margin: 10px;
                                object-fit: cover;
                            `}
                                fluid={person.photo.childImageSharp.fluid} />
                        </EnforcedSquare>
                        <div>{person.name} - {person.slug}</div>
                    </div>
                </Link>
            ))
        }
    </div>
)