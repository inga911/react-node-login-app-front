import mainStore from "../store/mainStore";
import http from "./http";

const MyFunctions = (initialData) => {
  const { setAllPosts, userPosts, setUserPosts } = mainStore();

  // DATE & TIME FORMAT
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

  // GET ALL POSTS
  const fetchPosts = async () => {
    try {
      const res = await http.get("/getAllPosts");
      if (!res.error) {
        setAllPosts(res.data);
      } else {
        console.error(res.message);
        setAllPosts(res.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setAllPosts([]);
    }
  };

  // LIKE POST
  const likePost = async (postId, username, token, callback) => {
    const postData = {
      postId,
      username,
    };

    try {
      const res = await http.postAuth("/likePost", postData, token);
      if (res.error) {
        console.error("Error liking post:", res.message);
        return;
      }

      const updatedPost = res.data;
      if (callback) {
        callback(updatedPost);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const getLikeInfoText = (likes, likedByUser) => {
    if (likedByUser) {
      if (likes > 1) {
        return `You and other ${likes - 1} ${
          likes - 1 === 1 ? "person" : "people"
        } like this post`;
      } else {
        return "You like this post";
      }
    } else {
      return `${likes} ${
        likes === 1 ? "person likes" : "people like"
      } this post`;
    }
  };

  return { formatTime, fetchPosts, likePost, getLikeInfoText };
};

export default MyFunctions;
