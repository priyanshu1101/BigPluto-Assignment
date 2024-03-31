const FetchPostForUsers=`
query fetchPostsForUser{
    fetchPostForUser {
      id
      title
      message
      tags
      createdAt
    }
  }`;
export default FetchPostForUsers;