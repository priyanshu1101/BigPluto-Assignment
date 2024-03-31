const UpdatePost=`
mutation updatePost($updatedPostData: PostInput!, $updatePostPostId: String!){
    updatePost(updatedPostData: $updatedPostData, postId: $updatePostPostId) {
      id
      title
      message
      tags
    }
  }`;
export default UpdatePost;