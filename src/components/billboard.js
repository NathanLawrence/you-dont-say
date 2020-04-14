import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

export const Billboard = ({title, dek}) => (
    <div className="billboard">
        <h1>{title}
            <p>{dek}</p></h1>
    </div>
)