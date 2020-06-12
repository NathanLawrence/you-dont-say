import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import {Billboard} from "../components/billboard";
import {css, jsx} from "@emotion/core";
import {TopLevelDisplayBlock} from "../components/TopLevelDisplayBlock";
import {PeopleGrid} from "../components/PeopleGrid";
import {Styled} from "theme-ui";
import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import {Helmet} from "react-helmet/es/Helmet";

export const IndexPageTemplate = ({
  title, dek, people
}) => (
    <>
        <Helmet>
            <title>{title} - KBIA</title>
            <meta name="description" content={dek} />
        </Helmet>

      <Billboard dek={dek} title={title} />

      <TopLevelDisplayBlock>
          <Styled.h2>Who Are Sharing Their Stories?</Styled.h2>
          <PeopleGrid people={people} />
      </TopLevelDisplayBlock>

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
