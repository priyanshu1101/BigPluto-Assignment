const CreatePost=`
mutation createPost($postData: PostInput!){
    createPost(postData: $postData) {
      title
      message
      createdAt
      createdBy
      tags
    }
  }`;
export default CreatePost;