import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NotificationCard from '../features/notifications/NotificationCard';
import {updateAllNotifications} from '@/features/notifications/notificationSlice';
import {ImSpinner8} from 'react-icons/im';
export default function Notifications() {
    const authState = useSelector(state => state.authentication);
    const {userNotifications, unreadNotifications, status, statusOfNotificationUpdate} = useSelector(state => state.notifications);    
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log('unread: ', unreadNotifications );
        if(unreadNotifications > 0){
            setTimeout(async () => {
                await dispatch(updateAllNotifications(authState.userId));
            }, 4000);
        }

    }, []);

    return (
        <div className="flex flex-grow flex-col">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg text-gray-500 font-semibold">
                    Notifications
                </h3>
                <small className="text-gray-500">
                    {
                        statusOfNotificationUpdate == "Loading"
                        ?
                        <ImSpinner8 className="loading-icon" />
                        :
                        null                        
                    }
                </small>
            </div>
            
            {
                status === "Loading" ?
                <div className="flex flex-col justify-center items-center h-24">
                    <ImSpinner8 className="loading-icon text-xl text-purple-600" />
                </div>
                :
                <div className="flex flex-col flex-grow mb-4">
                    {
                        userNotifications.length > 0 ?
                        userNotifications.map(notification => {
                            return (
                                <NotificationCard key={notification._id} notification={notification} />
                            )
                        })
                        :
                        <p className="w-full mt-auto mb-auto py-4 rounded-lg text-center text-gray-400">There are no notifications for you.</p>
                    }
                </div>
            }
        </div>
    )
}
