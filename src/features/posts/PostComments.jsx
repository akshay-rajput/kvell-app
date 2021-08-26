import React,{useEffect} from "react";
import styled from 'styled-components';
import Avatar from '@/features/_shared_/UserAvatar';
import { Link } from "react-router-dom";
import {FaRegTrashAlt} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import { updatePost, updatePostInSlice } from '@/features/posts/postSlice';
import { updatePostInFeed } from '@/features/feed/feedSlice';
import { updatePostInProfile } from '@/features/profile/profileSlice';

const CommentBox = styled.div`
    max-height: 11rem;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    background: var(--card-bg);
`;

const SingleComment = styled.div`
    border-bottom: 1px solid var(--primary-light);
    padding: 0.5rem 0;
    margin-bottom: 0.5rem;

    a{
        font-weight: 600;
        color: var(--dark);
        &:hover{
            text-decoration: none;
            color: var(--primary);
        }
    }
    &:last-child{
        border:none;
    }
    .delete-button-wrapper button{
        font-size: 0.65rem;
    }

`;

export default function PostComments({allComments}){
    const authState = useSelector(state => state.authentication);
    let {post} = useSelector(state => state.post);
    const dispatch = useDispatch();
    
    async function deleteComment(commentId){
        let updatedPost = {...post}
        updatedPost.comments = post.comments.filter(comment => comment._id !== commentId);
        // console.log({updatedPost});
        try{
            // update post in local state
            dispatch(updatePostInSlice(updatedPost));
            
            await dispatch(updatePostInFeed(updatedPost));

            // update in db
            await dispatch(updatePost({
                updatedPost: updatedPost,
                postId: updatedPost._id
            }));
            
            await dispatch(updatePostInProfile(updatedPost));
        }
        catch(error){
            console.log("couldn't delete comment: ", error.message);
        }
    }

    return(
        <CommentBox className="overflow-auto">
            <h3 className=" text-gray-400 pb-2">Comments <span className="text-sm">({allComments.length})</span></h3>
            {
                allComments.map(comment => {
                    return (
                        <SingleComment key={comment._id} className="text-xs flex gap-x-1 rounded">
                            <div className="flex-shrink-0">
                                <Avatar avatarSize={"small"} avatarUrl={comment.commentByUser.avatarUrl} />
                            </div>
                            <div className="flex-grow">
                                <Link to={"/profile/"+comment.commentByUser._id}>{comment.commentByUser.name}</Link>
                                <div className="pt-1">
                                    {comment.commentText}
                                </div>
                            </div>
                            {
                                authState.userId === comment.commentByUser._id
                                ?
                                <div className="delete-button-wrapper">
                                    <button onClick={() => deleteComment(comment._id)} className="mt-1 mr-1" aria-label="delete comment" title="delete comment">
                                        <FaRegTrashAlt className="text-red-500"  />
                                    </button>
                                </div>
                                : null
                            }
                            
                        </SingleComment>
                    )
                })
            }
        </CommentBox>
    )
}
