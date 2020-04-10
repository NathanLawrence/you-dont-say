import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

const ConversationPage = ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
      {post.frontmatter.title}
    </Layout>
  )
}

ConversationPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ConversationPage

export const pageQuery = graphql`
  query ConversationByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
      title
      }
    }
  }
`
