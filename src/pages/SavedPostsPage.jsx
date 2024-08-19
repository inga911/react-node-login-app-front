import { useEffect, useState } from "react";
import mainStore from "../store/mainStore";
import http from "../plugins/http";
import SinglePostComponent from "../components/SinglePostComponent";

function SavedPostsPage() {
  const [posts, setPosts] = useState([]);
  const { savedPosts, token } = mainStore();

  useEffect(() => {
    if (savedPosts.length > 0) {
      http
        .postAuth(`/getSavedPosts`, { user: { savedPosts } }, token)
        .then((res) => {
          setPosts(res.data);
        });
    } else {
      setPosts([]);
    }
  }, [savedPosts, token]);

  return (
    <div className="all-posts">
      {posts.length > 0 ? (
        posts.map((x) => <SinglePostComponent data={x} key={x._id} />)
      ) : (
        <p>No saved posts found.</p>
      )}
    </div>
  );
}

export default SavedPostsPage;
