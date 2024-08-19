import { useEffect, useState } from "react";
import http from "../plugins/http";
import SingleUserComponent from "../components/SingleUserComponent";
import mainStore from "../store/mainStore";

function IndexPage() {
  const [users, setUsers] = useState([]);
  const { user } = mainStore();

  useEffect(() => {
    http.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center gap-3 p-4">
      {users.length > 0 ? (
        users.map((x, i) => <SingleUserComponent key={i} singleUser={x} />)
      ) : (
        <h1>No users yet</h1>
      )}
    </div>
  );
}

export default IndexPage;
