import ContactsComponent from "../components/ContactsComponent";
import { useEffect, useState } from "react";
import http from "../plugins/http";
import mainStore from "../store/mainStore";
import ChatComponent from "../components/ChatComponent";
import WelcomeComponent from "../components/WelcomeComponent";
import { useParams } from "react-router-dom";

function ChatPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const { user } = mainStore();
  const { username } = useParams();

  useEffect(() => {
    http.get("/users").then((res) => {
      setContacts(res.data);
    });
  }, []);

  useEffect(() => {
    if (username && contacts.length > 0) {
      const contact = contacts.find((c) => c.username === username);
      setSelectedContact(contact);
    }
  }, [username, contacts]);

  return (
    <div className="chat-page d-flex">
      <div className="contacts-box">
        <div className="contacts-comp">
          {contacts.length > 0
            ? contacts.map(
                (c) =>
                  (!user || user.username !== c.username) && (
                    <ContactsComponent
                      key={c._id}
                      contact={c}
                      selectedContact={selectedContact}
                      setSelectedContact={setSelectedContact}
                    />
                  )
              )
            : "No Contacts yet"}
        </div>
        {user && (
          <div className="logged-user-chat d-flex align-items-center gap-2">
            <img
              src={user.image}
              alt={`${user.username} profile image`}
              className="object-fit-cover"
            />
            <div>{user.username}</div>
          </div>
        )}
      </div>
      <div className="chat-box">
        {selectedContact && user ? (
          <>
            <ChatComponent selectedContact={selectedContact} />
          </>
        ) : (
          <>
            <WelcomeComponent />
          </>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
