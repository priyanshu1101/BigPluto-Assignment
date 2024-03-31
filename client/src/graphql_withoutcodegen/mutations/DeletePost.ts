const DeletePost=`
mutation deletePost($postId: String!){
    deletePost(postId: $postId)
  }`;
export default DeletePost;