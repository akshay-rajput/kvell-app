export const checkIfLiked = (arrayOfLikes, currentUserId) => {
    // returns true or false
    return !!arrayOfLikes.find((item) => item.likedByUser?._id === currentUserId);
};
