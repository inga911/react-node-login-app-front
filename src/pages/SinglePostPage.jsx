import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../plugins/http";
import SinglePostComponent from "../components/SinglePostComponent";

function SinglePostPage() {
  const { username, id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    setData(null);
    http.get(`/getSinglePost/${username}/${id}`).then((res) => {
      if (res.data) {
        setData(res.data);
      } else {
        setData(null);
      }
    });
  }, [username, id, setData]);

  return (
    <div className="all-posts">
      {data ? (
        <SinglePostComponent post={data} setData={setData} />
      ) : (
        <h1>Not post yet</h1>
      )}
    </div>
  );
}

export default SinglePostPage;
