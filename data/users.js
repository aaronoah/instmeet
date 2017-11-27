export const users = {
  array: [
    {  //root test user, do not delete
      id: 1,
      username: "test",  //primary key
      email: "test@umn.edu",
      password: "1234",
      avatar: "default",
      gender: "male",
      major: "Computer Science",
      phone: "(651)-123-4567",
      birthday: "1990-01-01",
      interests: [
        "coding"
      ],
      credit: 100,
      events: {
        past: [4],
        incoming: [1, 3]
      }
    }
  ]
};
