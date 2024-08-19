import { useEffect } from "react";
import mainStore from "../store/mainStore";
import SinglePostComponent from "../components/SinglePostComponent";
import MyFunctions from "../plugins/functions";

function AllPostsPage() {
  const { allPosts, setAllPosts, user } = mainStore();
  const { fetchPosts } = MyFunctions();

  useEffect(() => {
    fetchPosts();
  }, [setAllPosts]);

  return (
    <div className="all-posts">
      {Array.isArray(allPosts) && allPosts.length > 0 ? (
        allPosts.map((post) => (
          <SinglePostComponent key={post._id} data={post} />
        ))
      ) : (
        <h1>No posts yet</h1>
      )}
    </div>
  );
}

export default AllPostsPage;
