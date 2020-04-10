import React from "react";
import {graphql} from "gatsby";
import PropTypes from 'prop-types';
import Layout from "../components/Layout";

const VideoPage = ({ data }) =>
{
    const { markdownRemark: post } = data
    return <Layout>
        {post.frontmatter.title}
    </Layout>
}

export default VideoPage

export const pageQuery = graphql`
query VideoByID($id: String) {
      markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
      title
      }
    }
}`