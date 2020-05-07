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
import {css, jsx} from "@emotion/core";
import Styling from "../components/Styling";

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
        <TopLevelDisplayBlock>
          <ul css={css`
            list-style: none;
          `}>{person.fields.conversations.map(conversation => (
              <li key={conversation.fields.slug}>
                <h2 css={css`
                  font-size: 1.75rem;
                  font-weight: ${Styling.fonts.weightBold};
                  margin-bottom: 0.25rem;
                `}>
                  <Link to={conversation.fields.slug}
                    css={css`
                      text-decoration: none;
                      color: #eee;
                    `}>
                    {conversation.frontmatter.title}
                  </Link>
                </h2>
                <p
                  css={css`
                    font-weight: ${Styling.fonts.weightLight}
                    font-size: 1.2rem;
                    margin-top: 0;
                  `}
                >Conversation between {
                  conversation.fields.people.map(person => person.frontmatter.name)
                      .join(" and ")
                }.</p>
              </li>
          ))}</ul>
        </TopLevelDisplayBlock>

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
      fields {
        conversations {
          frontmatter {
            title
          }
          fields {
            slug
            people {
              frontmatter {
                name
              }
              }
          }
        }
      }
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
