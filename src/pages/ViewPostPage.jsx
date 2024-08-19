import { useEffect, useState } from "react";
import ViewPostComponent from "../components/ViewPostComponent";
import http from "../plugins/http";
import { useParams } from "react-router-dom";

function ViewPostPage() {
  const { username, id } = useParams();
  const [data, setData] = useState("");

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
        <ViewPostComponent data={data} setData={setData} />
      ) : (
        <h1>Not post yet</h1>
      )}
    </div>
  );
}

export default ViewPostPage;
