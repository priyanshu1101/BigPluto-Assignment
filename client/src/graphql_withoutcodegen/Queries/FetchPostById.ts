const FetchPostById=`
query getPostById($fetchPostById: String!){
    FetchPostByID(postId: $fetchPostById) {
      title,
      message,
      tags
    }
  }`;
export default FetchPostById;