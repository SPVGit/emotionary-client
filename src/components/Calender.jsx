import dayjs from "dayjs"
import { useState, useEffect } from "react"
import { ReactFullYearScheduler } from "react-full-year-scheduler"
import "react-full-year-scheduler/dist/style.css"
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { useNavigate } from "react-router-dom"

const API_URL = "http://localhost:5006"

function CalendarFunc() {
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  const [events, setEvents] = useState([])

  const [posts, setPosts] = useState(null)
  console.log("posts", posts)


  function colorOfEmotion (color){
    if(color === 'happy')return '#ffff54'
    else if (color === 'embarrassed')return '#ff8c8c'
    else if (color === 'in-love')return '#ff54ff'
    else if (color === 'excited')return '#ff7d00'
    else if (color === 'satisfied')return '#00b400'
    else if (color === 'calm')return '#0089e0'
    else if (color === 'sad')return '#717171'
    else if (color === 'anxious')return '#6851ff'
    else if (color === 'angry')return '#ff0000'
    else if (color === 'depressed')return '#000000'
  }

  const getAllPosts = () => {
    const storedToken = localStorage.getItem("authToken")
    axios
      .get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(async (response) => {

        console.log('dammit work', response.data)

        const postsArr = await response.data.filter((post) => post.user === user._id)

        setPosts(postsArr)

         let postsArray = await postsArr.map((post) => {
          return {
            eventName: `${post.emotion}`,
            startDate: dayjs(`${post.date}`),
            endDate: dayjs(`${post.date}`),
            eventBgColor: colorOfEmotion(`${post.emotion}`),
            eventTextColor: "white",
          }
        })
        setEvents(postsArray)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  return (
    <div>
      <ReactFullYearScheduler
        events={events}
        locale="en"
        dateTooltipTheme="material"
        weekSeparatorWidth={10}
        weekSeparatorColor="white"
        headerWeekDayBgColor="#b39cd0"
        headerWeekendBgColor="rgba(75, 68, 83, 0.69)"
        weekendCellBackgroundColor="rgba(190, 190, 190, 0.69)"
        weekendCellTextColor="white"
        weekDayCellBackgroundColor="rgba(75, 68, 83, 0.69)"
        weekDayCellTextColor="white"
       // selectionColor="black"
       // selectionTextColor="white"
       // maxRangeSelection={20}
       // minRangeSelection={10}
        firstDayOfWeek="Monday"
        maxYear={2031}
        minYear={2011}
        readonlyCalendar={false}
        showWeekSeparator={true}
        showTodayButton={true}
       // enableYearToYearSelection={false}
      //  enableWeekendSelection={true}
        minCellWidth={50}
        showSeparatorInHeader={false}
        enableEventOverwriting={true}

        onDatePick={(eventDate,  clearSelectedCell) => {
          let readonlyCalendar = false
          let myDate = eventDate.format("YYYY-MM-DD")

          for (let post of posts) {
            if (post.date === myDate) {
              navigate(`/posts/${post._id}`)
            }
          }
          setTimeout(() => {
            clearSelectedCell()
            }, 1);
         
        }}

        /*onEventSinglePickInterception={(date, eventName, clearSelectedCell) => {
          console.table([eventName, date.toDate()])
        }}*/
      /*  onRangePick={(eventStartDate, eventEndDate, clearSecondSelectedCell, clearSelection) => {
          setTimeout(() => {
            clearSelection()
          }, 3000)
        }}*/
     /* onEventRangePickInterception={(eventFirstDate, eventLastDate, eventsToBeDeleted, eventsToBeUpdated, clearSecondSelectedCell, clearSelection) => {
          setTimeout(() => {
            clearSelection()
          }, 3000)
        }}*/
        
      />
    </div>
  )
}

export default CalendarFunc
