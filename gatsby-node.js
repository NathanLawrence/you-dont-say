const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const unified = require('unified')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const html = require('rehype-stringify')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.sourceNodes = ({ boundActionCreators: { createNodeField }, getNodes, getNode }) => {
  // Attach conversations to people
  const people = getNodes()
      .filter(node => node.internal.type === `MarkdownRemark`)
      .filter(node => node.frontmatter.templateKey && node.frontmatter.templateKey.includes('person'))

  people.map(personNode => {
    const conversations = getNodes()
        .filter(node => node.internal.type === `MarkdownRemark`)
        .filter(node=> node.frontmatter.templateKey && node.frontmatter.templateKey.includes('conversation'))
        .filter(node => node.frontmatter.participants && node.frontmatter.participants.includes(personNode.frontmatter.name))

    createNodeField({
      node: personNode,
      name: 'conversations',
      value: conversations.map(conversationNode => conversationNode)
    })
  })

  const convos = getNodes()
      .filter(node => node.internal.type === `MarkdownRemark`)
      .filter(node => node.frontmatter.templateKey && node.frontmatter.templateKey.includes('conversation'))

  convos.map(conversationNode => {

    if (conversationNode.frontmatter.transcription) {
        const processor = unified()
            .use(markdown, {commonmark: true})
            .use(remark2rehype)
            .use(html)

      let text = processor.processSync(conversationNode.frontmatter.transcription).toString()

      createNodeField({
        node: conversationNode,
        name: "transcriptionHTML",
        value: text
      })
    }

    const participants = getNodes()
        .filter(node => node.internal.type === `MarkdownRemark`)
        .filter(node => node.frontmatter.templateKey && node.frontmatter.templateKey.includes('person'))
        .filter(node => node.frontmatter.name && conversationNode.frontmatter.participants.includes(node.frontmatter.name))

    createNodeField({
      node: conversationNode,
      name: 'people',
      value: participants.map(personNode => personNode)
    })
  })
}
