    import React from 'react';
    import Post from './Post';
    import { useQuery, gql } from '@apollo/client';
    import { useSelector } from 'react-redux';
    import Login from './Login';
   


    const POSTS_QUERY = gql`
        {
            topic (topicID : 1) {
                id
                title
                posts {
                    id
                    author {
                        id
                        firstName
                        lastName
                        pseudo
                    }
                    text
                }
            
            }   
        }
    `;



    console.log(POSTS_QUERY)

    const PostList = () => {

        const { loading, data } = useQuery(POSTS_QUERY);
        
        console.log(data)

        const userState = useSelector(state => state.session.userState)
    
        if (userState !== "Logged in") {
        return <Login />
        }


        
       
        if (loading) {
            return (
                <div>Loading ....</div>
            )
        }
        else {
            return (
                <div className='uk-section uk-section-muted uk-width-1-1 uk-background-muted uk-margin-meduim-top'>
                    <div className="uk-container uk-width-1-1">
                        <h1 className="uk-position-small  uk-text-muted uk-margin-large-bottom" > Topic : {data.topic.title}</h1>

                        <ul className="uk-comment-list uk-postion-center">
                            <li>
                                {data.topic.posts.map((post) => (
                                    <Post key={Post.id} post={post} />
                                ))}
                            </li>
                        </ul>

                    </div>
                </div>
            )

        }

    };

    export default PostList;