import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import {Billboard} from "../components/billboard";

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
  title, dek,
}) => (
    <>
      <Billboard dek={dek} title={title} />
      <Billboard dek={"This is a test"} title={"ok"} />

      <p>Friday, April 10, 2020</p>

    </>
)


const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        dek={frontmatter.dek}
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
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        dek
      }
    }
  }
`
