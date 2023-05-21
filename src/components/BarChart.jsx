import { Bar } from "react-chartjs-2"
import Container from "react-bootstrap/Container"

export const BarChart = ({ chartData }) => {
  return (
    <Container className="chart-container">
      <h3 style={{ textAlign: "center" }}>Bar Chart</h3>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Keep track of your emotions",
              color: "white",
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                color: "white",
              },
            },
            y: {
              ticks: {
                color: "white",
              },
            },
          },
        }}
      />
    </Container>
  )
}
