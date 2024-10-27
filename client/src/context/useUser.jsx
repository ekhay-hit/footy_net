// this file is use to seperate concern and make the code cleaner; the propose if I want to access use that logs in  Instead of calling useContext(UserContext) directly in every component, I can just call useUser(). This makes your code cleaner and easier to read.

import { useContext } from "react";
import { UserContext } from "../components/UserContext"; // Adjust path as necessary

export const useUser = () => useContext(UserContext);
