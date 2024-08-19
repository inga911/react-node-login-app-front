import { useEffect } from "react";
import mainStore from "../store/mainStore";
import http from "../plugins/http";
import { useParams } from "react-router-dom";
import SinglePostComponent from "../components/SinglePostComponent";

function GetUserPostsPage() {
  const { userPosts, setUserPosts } = mainStore();
  const { username } = useParams();

  useEffect(() => {
    async function fetchPosts() {
      const res = await http.get(`/getUserPosts/${username}`);
      if (!res.error) {
        setUserPosts(res.data);
      } else {
        console.error(res.message);
      }
    }

    fetchPosts();
  }, [username, setUserPosts]);
  return (
    <div className="all-posts">
      {Array.isArray(userPosts) &&
        userPosts.map(
          (post) =>
            userPosts && <SinglePostComponent key={post.id} data={post} />
        )}
    </div>
  );
}

export default GetUserPostsPage;
