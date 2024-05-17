'use client';

import { getAllMovies } from "@/controllers/movies/movies.controller";
import { User } from "@/types/types";
import { useEffect, useState } from "react";



export default function Home() {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const userData = await getAllMovies();
      console.log(userData)
      setUsers(userData);
    }
    fetchData();
    console.log(users)
  }, []);
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.title}</li>
        ))}
      </ul>
    </div>
  );
}
