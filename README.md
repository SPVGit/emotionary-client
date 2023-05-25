#EMOTIONARY-CLIENT (MERN APPLICATION) by ALESSANDRO IADAROLA, SUBARNA PAUL VIGNARAJAH & VANYA MARKOVA

    GitHub Link to server - https://github.com/SPVGit/emotionary-server

##DESCRIPTION:

    Emotionary is an app that helps you track and understand your emotions, providing suggestions to improve your wellbeing. It allows you to record and analyze your emotions, offering personalized recommendations for managing them. The app also features a chat function to connect with your therapist for support. Emotionary's mission is to enhance self-awareness, address emotional challenges, and promote overall welfare.

##APP LINK:

    https://emotionary-client.netlify.app

##FOLDER STRUCTURE:

    emotionary-client
        |
        |---public---index.html
        |
        |
        |
        |---src---components---emotions---Angry.jsx, Anxious.jsx, Calm.jsx, Depressed.jsx, Embarassed.jsx, Excited.jsx, Happy.jsx, InLove.jsx, Sad.jsx, Satisfied.jsx
            |         |
            |         |---AddActivity.jsx, AddPost.jsx, BarChart.jsx, bottomNavbar.jsx, Calender.jsx, IsAnon.jsx, IsPrivate.jsx, IsTherapistPrivate.jsx, Navbar.jsx
            |         |---PieChart.jsx, PostsByDate.jsx
            |            
            |                 
            |---context---auth.context.js
            |
            |
            |---pages---ActivityFormPage.jsx, ActivityPage.jsx, ChatPage.jsx, EditActivityPage.jsx, EditPostPage.jsx, HomePage.jsx, LoginPage.jsx, PostFormPage.jsx
            |     |-----PostsPage.jsx, SignUpPage.jsx, SinglePostPage.jsx, StatsPage.jsx, TherapistLogin.jsx, TherChat.jsx, UserList.jsx
            |
            |
            |---App.js
            |
            |
            |---index.css
            |
            |
            |---index.js

##DEPENDENCIES

    To run the app: npm install 

    The following dependencies were used in the app:

        @testing-library/react 
        axios 
        bootstrap 
        chart.js
        dayjs
        react 
        react-bootstrap 
        react-chartjs-2 
        react-dom 
        react-full-year-scheduler 
        react-router-dom
        react-scripts
        socket.io-client


##REFERENCES- 

    The code for chat funcitonality was obtained and adapted from https://github.com/ManishPoduval/simple-chat-socketio