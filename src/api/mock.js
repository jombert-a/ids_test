import { v4 as uuid } from "uuid";

let users = [
  {
    id: uuid().toString(),
    name: "robert",
    birthday: "2022-08-18",
    book: "Harry Potter",
    sex: "мужчина",
    skills: ["спать", "есть"],
  },
];

export function getList() {
  return users;
}

export function deleteUser(id) {
  users = users.filter((user) => user.id !== id);
  return users;
}

export function updateUser(user) {
  users = users.map((el) => {
    if (el.id === user.id) {
      return user;
    }
    return el;
  });

  return users;
}

export function createUser(user) {
  users = [...users, { ...user, id: uuid() }];

  return users;
}
