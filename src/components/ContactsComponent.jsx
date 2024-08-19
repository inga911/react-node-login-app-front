import { useState } from "react";
import mainStore from "../store/mainStore";

function ContactsComponent({ contact, selectedContact, setSelectedContact }) {
  const { user } = mainStore();

  function handleContactSelection(contact) {
    setSelectedContact(contact);
  }
  return (
    <div className="contacts-comp">
      <div
        className={`each-contacts d-flex align-items-center gap-2 ${
          selectedContact === contact._id ? "selected-contact" : ""
        }`}
        onClick={() => handleContactSelection(contact)}
      >
        <img src={contact.image} alt={`${contact.username} profile image`} />
        <div>{contact.username}</div>
      </div>
    </div>
  );
}

export default ContactsComponent;
