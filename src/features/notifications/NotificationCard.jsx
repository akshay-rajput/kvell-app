import React from 'react';
import Avatar from "@/features/_shared_/UserAvatar";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const Notification = styled.div`
    border-radius: var(--border-radius);
    border: 1px solid var(--primary-light);
    background: var(--card-bg);
    padding: 0.5rem;
    transition: all ease 1s;
    
    &.unread{
        border-color:var(--primary);
        background: var(--primary-light);
    }
    a.notification-card{
        color: var(--dark);
        display:flex;
        align-items: center;

        .notification-avatar{
            width: 2.5rem;
        }
        .notification-text{
            width: calc(100% - 2.5rem);
        }
        &:hover{
            text-decoration: none;
            color: var(--primary);
        }
    }
`;

export default function NotificationCard({notification}) {

    return (
        <Notification className={ !notification.markedAsRead ? "unread" : null}>
            <Link to={"/posts/"+notification.postId} className={"notification-card text-sm"}>
                <span className="notification-avatar">
                    <Avatar avatarSize={"small"} avatarUrl={notification.notificationFrom.avatarUrl} /> 
                </span>

                <span className="notification-text flex justify-between items-center">
                    <span className="">
                        <strong>{notification.notificationFrom.name}</strong>
                        {
                            notification.otherCount > 0 ? ` and ${notification.otherCount} others `: ""
                        }
                        {
                            `${notification.notificationType == "Like" ? " liked": " commented on"} your post.`
                        }
                    </span> 
                    <span className="text-xs text-gray-400 pl-2">{formatDistanceToNow(new Date(notification.createdAt)) + " ago"}</span>
                </span>
                 
            </Link>
        </Notification>
    )
}
