import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import {TopLevelDisplayBlock} from "../components/TopLevelDisplayBlock";

const ConversationPage = ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
        <Helmet>
            <meta charset="utf-8" />
            <title>{post.frontmatter.title} - You Don't Say - KBIA</title>
        </Helmet>
      <TopLevelDisplayBlock>
        <h1>{post.frontmatter.title}</h1>
          <div>
              <audio controls src={post.frontmatter.audioURL}></audio>
          </div>
        <div dangerouslySetInnerHTML={{"__html": post.fields.transcriptionHTML}}></div>
      </TopLevelDisplayBlock>
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
      fields {
        transcriptionHTML
      }
      frontmatter {
      audioURL
      title
      transcription
      }
    }
  }
`
