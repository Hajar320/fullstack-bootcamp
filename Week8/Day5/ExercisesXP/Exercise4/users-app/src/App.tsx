import UserCard from "./UserCard";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      <UserCard name="Alice" age={25} role="Admin" />
      <UserCard name="Bob" />
      <UserCard />
    </div>
  );
}

export default App;
