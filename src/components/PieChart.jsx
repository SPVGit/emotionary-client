import { Pie } from "react-chartjs-2"
import Container from "react-bootstrap/Container"

function PieChart({ chartData }) {
  return (
    <Container className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
          },
        }}
      />
    </Container>
  )
}

export default PieChart
