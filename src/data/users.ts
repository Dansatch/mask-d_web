import User from "../entities/User";

export default <User[]>[
  {
    _id: "admin",
    password: "Abc123..",
    username: "redadmin23",
    followers: [],
    following: [],
    timestamp: new Date(),
  },
  {
    _id: "user1",
    password: "Password123",
    username: "redDoe129",
    followers: [],
    following: ["redadmin23"],
    timestamp: new Date(),
  },
  {
    _id: "user2",
    password: "SecurePwd456",
    username: "tallHippo91",
    followers: ["redadmin23"],
    following: [],
    timestamp: new Date(),
  },
  {
    _id: "user3",
    password: "StrongPassword789",
    username: "rudeHorse7",
    followers: ["john_doe"],
    following: ["jane_doe"],
    timestamp: new Date(),
  },
  {
    _id: "user4",
    password: "Secret123",
    username: "realCow0",
    followers: ["john_doe", "jane_doe"],
    following: ["redadmin23", "bob_smith"],
    timestamp: new Date(),
  },
];
