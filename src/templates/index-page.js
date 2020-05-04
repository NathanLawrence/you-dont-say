import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import {Billboard} from "../components/billboard";
import {css, jsx} from "@emotion/core";
import {TopLevelDisplayBlock} from "../components/TopLevelDisplayBlock";
import {PeopleGrid} from "../components/PeopleGrid";

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
  title, dek, people
}) => (
    <>
      <Billboard dek={dek} title={title} />
      <Billboard dek={`There are ${people.totalCount} people`} title={"ok"} />

      <TopLevelDisplayBlock>
          <p>Testing</p>
          <PeopleGrid people={people} />
      </TopLevelDisplayBlock>

      <p
        css={css`
        color: black;`}>Friday, April 10, 2020</p>

    </>
)


const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
    const people = data.people.edges.map(
        obj => (
            {
                ...obj.node.frontmatter,
                ...obj.node.fields
            }
        )
    );

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        dek={frontmatter.dek}
        people={people}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
      people: allMarkdownRemark(
          limit: 1000
          sort: { fields: [frontmatter___name], order: DESC }
          filter: { frontmatter: { templateKey: { eq: "person" } } }
        ) {
          totalCount
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                name
                photo {
                    childImageSharp {
                        fluid(maxWidth: 400, quality: 95) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
              }
            }
          }
        }
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        dek
      }
    }
  }
`
