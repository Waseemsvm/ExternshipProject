# ExternshipProject




## Module 2
### PHOTO UPLOAD SERVICE

#### FUNCTION
    - update profile image
    - upload the posts

### FRIENDS SERVICE

#### FUNCTIONS
    - send requests
        We can send the request to the required user by passing the userid with the rouite
    - accept requests
        Similar to the send request accept request is also accomplished.
    - reject friend requests
        we can reject the friend request by passing the email id of the user and id of the user whose request is to be rejected.
    - block users
        We can block the user by passing the user id in the post body with the route
    - unblock users
        We can unblock the user by passing the user id in the post body with the route
    - remove friend
        remove friend by passing the email id of the user who wants to remove and the user id of the user who is going to be removed.
    - get all friends
        just query by root to get all the users.

## Module 3

### Post Schema
    -user who posted
    -data stored in post
    -comments related to that post
    -likes # of the post
    -dislikes # of the post
    -users with whom the post is shared
    -date on which the post was created
    -date on which the post was edited

### Post Text
    ---------------------------------------------------------------------
    - POST  /post/postText

    pass into the body of request
    {
        "email": "example@gmail.com",
        "postBody": "This is a sample post text"

    }

    pass in the auth-token into the request header for successful verification of the user before posting

    ---------------------------------------------------------------------


    - POST /post/likePost

    The id of the user who likes the post is stored into the likes array
    the count of the elements in the likes array is the no. of likes

    if the user has already likes the post then no need to like again
    if the user has disliked then the id needs to be transferred to likes array from dislikes array

    body of request
    {
        "email": "example@gmail.com",
        "postId": "id of the post"
    }

    ---------------------------------------------------------------------


    - POST /post/unlike

    The id of the user who dislikes the post is stored into the likes array
    the count of the elements in the dislikes array is the no. of likes

    if the user has already dislikes the post then no need to dislike again
    if the user has liked then the id needs to be transferred to likes array from likes array

    body of request
    {
        "email": "example@gmail.com",
        "postId": "id of the post"
    }

    ---------------------------------------------------------------------


    - POST /post/removePost

    Only the user who created the post can remove

    if the post is not present or the wrong user tries to remove the post which is not possible an error is thrown

    {
        "email": "example@gmail.com",
        "postId": "id of the post to be removed"
    }


    