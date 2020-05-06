import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import {TopLevelDisplayBlock} from "../components/TopLevelDisplayBlock";
import {Billboard} from "../components/billboard";
import {PersonHeadingBillboard} from "../components/PersonHeadingBillboard";

const PersonPage = ({ data }) => {
  const { markdownRemark: personRemark } = data
  const person = {
    ...personRemark.frontmatter,
    ...personRemark
  }
  return (
    <Layout>
      <Helmet>
        <title>{person.name} - You Don't Say - KBIA</title>
      </Helmet>
        <PersonHeadingBillboard person={person} />
    </Layout>
  )
}

PersonPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default PersonPage

export const pageQuery = graphql`
  query PersonByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
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
`
