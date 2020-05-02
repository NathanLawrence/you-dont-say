import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import {Billboard} from "../components/billboard";

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
  title, dek, people
}) => (
    <>
      <Billboard dek={dek} title={title} />
      <Billboard dek={`There are ${people.totalCount} people`} title={"ok"} />

      <p>Friday, April 10, 2020</p>

    </>
)


const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
    const people = data.people;

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
