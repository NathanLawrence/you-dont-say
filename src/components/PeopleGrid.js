import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { jsx, Styled, Grid  } from 'theme-ui';
import {TopLevelDisplayBlock} from "./TopLevelDisplayBlock";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import Img from "gatsby-image";
import {EnforcedSquare} from "./EnforcedSquare";

export const PeopleGrid = ({ people }) => (
    <>
<Grid
    gap={12}
    columns={[
        1,
        2,
        4,
        5
    ]}>
    {
        people.map((person, index) => (
            <>
                <div>
                    <Link to={person.slug} key={person.slug}>
                        <EnforcedSquare>
                            <Img
                                css={{
                                    borderRadius: '50%',
                                    margin: '10px auto',
                                    objectFit: 'cover',
                                    width: '91%',
                                    height: '90%',
                                }}
                                fluid={person.photo.childImageSharp.fluid} />
                        </EnforcedSquare>
                    </Link>
                    <Styled.h4 css={{
                        textAlign: 'center',
                        marginBlockStart: '6px',
                        marginBlockEnd: '0px'
                    }}>
                        <Link to={person.slug} key={person.slug}
                              css={{
                                  textDecoration: 'none',
                                  color: '#ddd',
                              }}
                              sx={{
                                  color: 'primary'
                              }}
                        >
                            {person.name}
                        </Link>
                    </Styled.h4>
                </div>
            </>
        ))
    }
</Grid>
</>
)