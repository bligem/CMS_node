db.createUser({
    user: process.env.DB_USERNAME || 'defaultusername',
    pwd: process.env.DB_PASSWORD || 'defaultpassword',
    roles: [
      {
        role: 'readWrite',
        db: process.env.DB_NAME
      }
    ]
  });
  
  db.Users.insertMany([
    { username: process.env.INIT_ADMIN_NAME, password: process.env.INIT_ADMIN_PASSWD, email: process.env.INIT_ADMIN_MAIL, roles:['Administrator', 'Protected'], isLocked: false },
    { username: 'user1', password: 'test1', email:'test@test.com', roles:['User'], isLocked: false }
  ]);

  db.Config.insertMany([
    {
      _id: "Global", 
      configType: "Global",
      menu:[
    {
      itemName: 'Home',
      visibility: 'visible'
    },
    {
      itemName: 'Wpisy',
      visibility: 'visible'
    },
    {
      itemName: 'Kontakt',
      visibility: 'visible'
    },
    {
      itemName: 'O mnie',
      visibility: 'visible'
    }],
    footerLeft: ['Copyright: 2024 CMS Blog', 'Sample text'],
    footerCenter: ['Sample text', 'Sample text2', 'Sample text3'],
    footerRight: ['Sample text'],
    allowLogin: false
  },
  {
    _id: 'Roles',
    configType: 'Roles',
    roles: [
      {
        name: 'User', description: 'Możliwość przeglądania bloga oraz dodawanie i usuwanie swoich komentarzy'
      },
      {
        name: 'Moderator', description: 'Możliwość przeglądania bloga oraz dodawanie i usuwanie swoich i cudzych komentarzy'
      },
      {
        name: 'Autor', description: 'Przeglądanie bloga, częściowy dostęp panelu administratorskiego, tworzenie, usuwanie, dodawanie swoich wpisów, dodawanie, usuwanie swoich i cudzych komentarzy'
      },
      {
        name: 'Administrator', description: 'Przeglądanie bloga oraz panelu administratorskiego, edycja bloga, tworzenie, usuwanie, dodawanie wpisów, dodawanie, usuwanie swoich i cudzych komentarzy'
      }
    ]
  }
  ])

  db.Articles.insertMany([
    {
      title: "Wpis1",
      author: process.env.INIT_ADMIN_NAME,
      date: new Date("2023-05-13T12:30:45Z"),
      header: "Pierwszy wpis",
      backgroundImage: "Base64",
      text: "test test test",
      isVisible: true,
      allowComments: false,
      commentsVisibility: true,
      comments: [
          {username: "user1", date: new Date("2023-05-15T12:30:45Z"), text: "Comment1"},
          {username: "user1", date: new Date("2023-05-16T13:30:45Z"), text: "Comment2"},
          {username: "user1", date: new Date("2023-05-17T14:30:45Z"), text: "Comment3"}
      ]
    },
    {
      title: "Wpis2",
      author: process.env.INIT_ADMIN_NAME,
      date: new Date("2023-05-14T12:30:45Z"),
      header: "Drugi wpis",
      backgroundImage: "Base64",
      text: "test test test",
      isVisible: true,
      allowComments: false,
      commentsVisibility: true,
      comments: [
          {username: "user1", date: new Date("2023-05-15T15:30:45Z"), text: "Comment1"},
          {username: "user1", date: new Date("2023-05-16T16:30:45Z"), text: "Comment2"},
          {username: "user1", date: new Date("2023-05-17T17:30:45Z"), text: "Comment3"}
      ]
    },
    {
      title: "Wpis3",
      author: process.env.INIT_ADMIN_NAME,
      date: new Date("2023-05-15T12:30:45Z"),
      header: "Trzeci wpis",
      backgroundImage: "Base64",
      text: "test test test",
      isVisible: true,
      allowComments: false,
      commentsVisibility: true,
      comments: [
          {username: "user1", date: new Date("2023-05-15T18:30:45Z"), text: "Comment1"},
          {username: "user1", date: new Date("2023-05-16T19:30:45Z"), text: "Comment2"},
          {username: "user1", date: new Date("2023-05-17T20:30:45Z"), text: "Comment3"}
      ]
    }
  ])

  db.Pages.insertMany([
    {
      _id: "Home",
      pageName: "Home",
      header: "Strona główna",
      description: "Witaj na mojej stronie",
      backgroundImage: "Base64",
      table1: {
        data:[
            {name: "First", description: "test"}, 
            {name: "Second", description: "test2"}, 
            {name: "Third", description: "test3"}
        ],
        visibility: "visible"
    },
      button_1: {name: "Kliknij mnie", link: "#", visibility: "visible"},
      table2: {
        data:[
            {name: "First1", description: "test"}, 
            {name: "Second2", description: "test22"}, 
            {name: "Third3", description: "test33"}
        ],
        visibility: "visible"
    },
      latest_posts: {visibility: "visible"},
      button_2: {name: "Kliknij mnie", link: "#", visibility: "visible"}
    },
    {
      _id: "Articles",
      pageName: "Wpisy",
      header: "Strona z wpisami",
      description: "Przeglądaj ostatnie wpisy",
      backgroundImage: "Base64"
    },
    {
      _id: "Contact",
      pageName: "Kontakt",
      header: "Skontaktuj się ze mną",
      description: "Dane kontaktowe",
      backgroundImage: "Base64",
      table1: {
          data:[
              {name: "First", description: "test"}, 
              {name: "Second", description: "test2"}, 
              {name: "Third", description: "test3"}
          ],
          visibility: "visible"
      }
    },
    {
      _id: "About",
      pageName: "O mnie",
      header: "Kilka słów o mnie",
      description: "Test test test",
      backgroundImage: "Base64",
      table1: {
        data:[
            {name: "First", description: "test"}, 
            {name: "Second", description: "test2"}, 
            {name: "Third", description: "test3"}
        ],
        visibility: "visible"
    }
    }
  ])