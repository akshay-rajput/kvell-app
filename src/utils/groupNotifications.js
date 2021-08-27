export const groupNotifications = (notifications, groupingKey) =>{
    if(notifications?.length > 0 && groupingKey){
        // group notifications by post id
        // each postId will have an array of notifications
        let groupedByKey = notifications.reduce((acc, currentNotification) => {
            // if postId key doesn't exist, create it and assign empty array as value
            if (!acc[currentNotification[groupingKey]]) {
                acc[currentNotification[groupingKey]] = [];
            }
            
            // implement grouping
            acc[currentNotification[groupingKey]].push(currentNotification);

            return acc;
        }, {});

        // console.log("grouping... ", groupedByKey);

        let allNotifications = [];

        for (const key in groupedByKey) {
            let likedNotificationGroup = {};
            let commentNotificationGroup = {};

            if (groupedByKey.hasOwnProperty(key)) {
                const postNotifications = groupedByKey[key];

                // if this post has notifications,
                if(postNotifications.length > 0){
                    // notification with type: like
                    let liked = postNotifications.filter(singleNotification => singleNotification.notificationType === "Like")
                    let commented = postNotifications.filter(singleNotification => singleNotification.notificationType === "Comment")
                    // console.log('liedk: ', liked);
                    if(liked.length > 0){
                        // console.log("liked 1: ", liked[0])
                        likedNotificationGroup = liked[0];
                        likedNotificationGroup.otherCount = liked.length - 1;
                    }

                    if(commented.length > 0){
                        // console.log("liked 1: ", liked[0])
                        commentNotificationGroup = commented[0];
                        commentNotificationGroup.otherCount = commented.length - 1;
                    }
                }
            }

            if(Object.keys(likedNotificationGroup).length > 0){
                allNotifications.push(likedNotificationGroup);
            }

            if(Object.keys(commentNotificationGroup).length > 0){
                allNotifications.push(commentNotificationGroup);
            }
        }
        console.log({allNotifications})
        return allNotifications;
    }
}