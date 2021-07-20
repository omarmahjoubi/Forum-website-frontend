import React from 'react';

const Post = (props) => {
    const { post } = props
    return (


        <div className="uk-grid uk-grid-match uk-grid-divider">
            <div className="uk-width-1-6">
                <div className="uk-card uk-card-default uk-card-body">
                    <h3 className="uk-card-title">{post.author.pseudo}</h3>
                </div>
            </div>
            <div className="uk-width-5-6">
                <div className="uk-card uk-card-default">
                    <div className="uk-card-body">
                        {post.text}
                    </div>

                </div>
            </div>
        </div>


    )
}

export default Post;