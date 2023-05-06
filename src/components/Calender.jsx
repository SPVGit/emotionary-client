import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { ReactFullYearScheduler } from "react-full-year-scheduler";
import "react-full-year-scheduler/dist/style.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";


const API_URL = "http://localhost:5006"

function CalendarFunc() {

	const navigate = useNavigate();

	const { user } = useContext(AuthContext);

	const [events, setEvents] = useState([])

	const [posts, setPosts] = useState(null);

	const getAllPosts = () => {
		const storedToken = localStorage.getItem("authToken")
		axios
			.get(`${API_URL}/posts`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				const postsArr = response.data.filter((post) => post.user===user._id)
				setPosts(postsArr)

				let postsArray = postsArr.map((post) => {
					return (
						{
							eventName: `${post.emotion}`,
							startDate: dayjs(`${post.createdAt.substring(0,10)}`),
							endDate: dayjs(`${post.createdAt.substring(0,10)}`),
							eventBgColor: "blue",
							eventTextColor: "white",
						}
					)
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
				weekendCellBackgroundColor="rgba(75, 68, 83, 0.69)"
				weekendCellTextColor="white"
				weekDayCellBackgroundColor="rgba(75, 68, 83, 0.69)"
				weekDayCellTextColor="white"
				selectionColor="black"
				selectionTextColor="white"
				//maxRangeSelection={20}
				//minRangeSelection={10}
				firstDayOfWeek="Monday"
				maxYear={2050}
				minYear={2000}
				readonlyCalendar={false}
				showWeekSeparator={true}
				showTodayButton={true}
				enableYearToYearSelection={false}
				enableWeekendSelection={true}
				minCellWidth={50}
				showSeparatorInHeader={false}
				enableEventOverwriting={true}

				onDatePick={(eventDate, clearSelectedCell) => {
					let myDate = eventDate.toDate()
				
				for (let post of posts){
					
					if (post.createdAt.substring(0,10) === (JSON.stringify(myDate)).substring(1,11)){
						navigate(`/posts/${post._id}`)
					}

				}
					
					
				//	console.log(`${eventDate.$y}-${eventDate.$M}-${eventDate.$D}`)
					//navigate(`/`)
				}}

				/*onEventSinglePickInterception={(date, eventName, clearSelectedCell) => {
					console.table([eventName, date.toDate()]);

					
				}}*/
			/*	onRangePick={(
					eventStartDate,
					eventEndDate,
					clearSecondSelectedCell,
					clearSelection
				) => {
					setTimeout(() => {
						clearSelection();
					}, 3000);
				}}*/

				/*onEventRangePickInterception={(
					eventFirstDate,
					eventLastDate,
					eventsToBeDeleted,
					eventsToBeUpdated,
					clearSecondSelectedCell,
					clearSelection
				) => {
					setTimeout(() => {
						clearSelection();
					}, 3000);
				}}*/
			/>
		</div>
	);
}

export default CalendarFunc