import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import ContactsEdit from "./components/ContactsEdit";
import LoadingSpinner from "./components/LoadingSpinner";
import "./styles/styles.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((contactData) => {
        setContacts(contactData);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <Link to="/">
            <li>Contacts List</li>
          </Link>
          <Link to="/contacts/add">
            <li>Add New Contact</li>
          </Link>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <LoadingSpinner />
              ) : (
                <ContactsList contacts={contacts} setContacts={setContacts} />
              )
            }
          />
          <Route
            path="/contacts/add"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/contacts/:id"
            element={<ContactsView contacts={contacts} />}
          />
          <Route
            path="contacts/:id/edit"
            element={
              <ContactsEdit contacts={contacts} setContacts={setContacts} />
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
