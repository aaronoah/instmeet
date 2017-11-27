export const events = {
  array: [
    {
      id: 1,  //primary key
      title: "Professional swimmer hangout",
      time: {
        start: "15:30",
        end: "18:30"
      },
      location: "University Recreation and Wellness Center",
      description: "Group swimming and auatic exercise programme \
for college students: Freestyle, front/back craw,\
breast stroke, butterfly… ",
      groupSize: 10,
      initiator: "test",
      participants: [
        'test2',
        'test3'
      ],
      color: '#5BC0EB',
      thumbnail: 'swim',
      tags: ["swimming"]
    },
    {
      id: 2,
      title: "Share your favorite recipe",
      time: {
        start: "11:30",
        end: "14:30"
      },
      location: "Wahu Studen Apartment",
      description: "Group swimming and auatic exercise programme \
for college students: Freestyle, front/back craw,\
breast stroke, butterfly… ",
      groupSize: 6,
      initiator: "test2",   //initiators might not attend the event, since they can be just organizers
      participants: [
        'test2'
      ],
      color: '#fbad3d',
      thumbnail: 'cook',
      tags: ["cooking"]
    },
    {
      id: 3,
      title: "Club Night",
      time: {
        start: "22:00",
        end: "1:30"
      },
      location: "Sally's Saloon",
      description: "Group swimming and auatic exercise programme \
for college students: Freestyle, front/back craw,\
breast stroke, butterfly… ",
      groupSize: 20,
      initiator: "test3",
      participants: [
        'test',
        'test3'
      ],
      color: '#ed5053',
      thumbnail: 'club',
      tags: ["club"]
    },
    {
      id: 4,
      title: "Xbox Games",
      time: {
        start: "22:00",
        end: "12:30"
      },
      location: "University Village",
      description: "Xbox game meeting, can be \
either online or offine",
      groupSize: 4,
      initiator: "test4",
      participants: [
        'test4'
      ],
      color: '#84dcc6',
      thumbnail: 'games',
      tags: ["games"]
    }
  ]
};