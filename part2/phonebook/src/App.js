import { useEffect, useState } from "react";
import Filter from "./Filter";
import PhoneBookForm from "./PhoneBookForm";
import PhoneBookEntries from "./PhoneBookEntries";
import phonebookService from "./services/phonebook";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsToShow, setPersonsToShow] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    getAllPersons();
  }, []);

  const handleShowNotification = (name, type) => {
    const notificationText = {
      create: `${name} succesfully added`,
      update: `${name} sucessfully updated`,
      delete: `${name} succesfully deleted`,
      error: `Information for ${name} was already deleted from the server`,
    };

    setNotificationType(type);
    setNotificationMessage(notificationText[type]);

    setTimeout(() => {
      setNotificationType(null);
    }, 5000);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPersonsToShow(
      !filter.length
        ? persons
        : persons.filter(({ name }) => name.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name}`))
      phonebookService.remove(id).then(() => {
        handleShowNotification(name, "delete");
      });
    getAllPersons();
  };

  const getAllPersons = () => {
    phonebookService.getAll().then((persons) => {
      setPersons([...persons]);
      setPersonsToShow([...persons]);
    });
  };

  const handleUpdate = (newPerson) => {
    const idToUpdate = persons.find(({ name }) => name === newName).id;

    phonebookService
      .update(idToUpdate, newPerson)
      .then((updatedPerson) => {
        handleShowNotification(updatedPerson.name, "update");
      })
      .catch((err) => {
        handleShowNotification(newPerson.name, "error");
      });
    getAllPersons();
  };

  const handleCreatePerson = (newPerson) => {
    phonebookService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setPersonsToShow(persons.concat(returnedPerson));
      handleShowNotification(newPerson.name, "create");
    });
    getAllPersons();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    if (
      persons.some(({ name }) => name === newName) &&
      window.confirm(
        `${newName} is already added to the phonebook, replace the old number with the new one?`
      )
    ) {
      handleUpdate(newPersonObject);
      resetFieldsAndNotificationState();
      return;
    }

    handleCreatePerson(newPersonObject);
    resetFieldsAndNotificationState();
  };

  const resetFieldsAndNotificationState = () => {
    setNewName("");
    setNewNumber("");
    setNotificationMessage("");
    setNotificationType("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PhoneBookForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <PhoneBookEntries handleDelete={handleDelete} personsToShow={personsToShow} />
    </div>
  );
};

export default App;
