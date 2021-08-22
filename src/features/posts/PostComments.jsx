import React from "react";
import styled from 'styled-components';
import Avatar from '@/features/_shared_/UserAvatar';
import { Link } from "react-router-dom";

const CommentBox = styled.div`
    max-height: 11rem;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    background: var(--card-bg);
`;

const SingleComment = styled.div`
    // border-radius: var(--border-radius);
    // border-bottom: 1px solid var(--primary-light);
    // padding: 0.25rem;
    margin-bottom: 0.75rem;
    a{
        font-weight: 600;
        color: var(--dark);
        &:hover{
            text-decoration: none;
            color: var(--primary);
        }
    }

`;

export default function PostComments({allComments}){

    return(
        <CommentBox className="overflow-auto">
            <h3 className=" text-gray-400 pb-2">Comments <span className="text-sm">({allComments.length})</span></h3>
            {
                allComments.map(comment => {
                    return (
                        <SingleComment key={comment._id} className="text-xs flex gap-x-1">
                            <div className="flex-shrink-0">
                                <Avatar avatarSize={"small"} avatarUrl={comment.commentByUser.avatarUrl} />
                            </div>
                            <div className="">
                                <Link to={"/profile/"+comment.commentByUser._id}>{comment.commentByUser.name}</Link>
                                <div className="pt-1">
                                    {comment.commentText}
                                </div>
                            </div>
                        </SingleComment>
                    )
                })
            }
        </CommentBox>
    )
}
