import dayjs from "dayjs"
import { useState, useEffect, useContext } from "react"
import { ReactFullYearScheduler } from "react-full-year-scheduler"
import "react-full-year-scheduler/dist/style.css"
import axios from "axios"
import { AuthContext } from "../context/auth.context"
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/esm/Container"


const API_URL = process.env.REACT_APP_API_URL


function CalendarFunc() {
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  const [events, setEvents] = useState([])

  const [posts, setPosts] = useState(null)
  console.log("posts", posts)

  function colorOfEmotion(emotion) {
    if (emotion === "happy") return "#ffff54"
    else if (emotion === "embarrassed") return "#ff8c8c"
    else if (emotion === "in-love") return "#ff54ff"
    else if (emotion === "excited") return "#ff7d00"
    else if (emotion === "satisfied") return "#00b400"
    else if (emotion === "calm") return "#0089e0"
    else if (emotion === "sad") return "#717171"
    else if (emotion === "anxious") return "#6851ff"
    else if (emotion === "angry") return "#ff0000"
    else if (emotion === "depressed") return "#000000"
  }

  const getAllPosts = () => {
    const storedToken = localStorage.getItem("authToken")
    axios
      .get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(async (response) => {
        console.log("dammit work", response.data)

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
    <Container
      className="mt-3 rounded 
    ">
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
        maxYear={2032}
        minYear={2022}
        readonlyCalendar={false}
        showWeekSeparator={true}
        showTodayButton={true}
        // enableYearToYearSelection={false}
        //  enableWeekendSelection={true}
        minCellWidth={50}
        showSeparatorInHeader={false}
        enableEventOverwriting={true}
        onDatePick={(eventDate, clearSelectedCell) => {
          let myDate = eventDate.format("YYYY-MM-DD")

          for (let post of posts) {
            if (post.date === myDate) {
              navigate(`/postsbydate/${post._id}`)
            }
          }
          setTimeout(() => {
            clearSelectedCell()
          }, 1)
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
    </Container>
  )
}

export default CalendarFunc
