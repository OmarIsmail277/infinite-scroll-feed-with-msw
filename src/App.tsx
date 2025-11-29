import { useEffect, useState } from "react";
import "./App.css";

function App() {
  type User = {
    id: number;
    name: string;
  };
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);
  return (
    <div className="d-flex items-center">
      {users.map((user) => (
        <div key={user.id} className="bg-amber-600">
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default App;
