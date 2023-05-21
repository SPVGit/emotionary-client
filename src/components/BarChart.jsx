import { Bar } from "react-chartjs-2"
import Container from "react-bootstrap/Container"

export const BarChart = ({ chartData }) => {
  return (
    <Container className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </Container>
  )
}
