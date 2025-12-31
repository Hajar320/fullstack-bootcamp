import React from "react";

interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  name = "Anonymous",
  age = 0,
  role = "User",
}) => {
  return (
    <div
      style={{
        alignContent: "center",
        textAlign: "center",
        border: "2px solid #ccc",
        width: "200px",
        height: "150px",
        padding: "10px",
        margin: "5px",
      }}
    >
      <h3>Name: {name}</h3>
      <p>Age: {age}</p>
      <p>Role: {role}</p>
    </div>
  );
};

export default UserCard;
