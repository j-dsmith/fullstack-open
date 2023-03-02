const PhoneBookEntries = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      {personsToShow.map(({ name, number, id }) => (
        <p key={id}>
          {name} {number}
          <button onClick={() => handleDelete(id, name)}>delete</button>
        </p>
      ))}
    </div>
  );
};
export default PhoneBookEntries;
