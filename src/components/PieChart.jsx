import { Pie } from "react-chartjs-2"
import Container from "react-bootstrap/Container"

function PieChart({ chartData }) {
  
  return (
    <Container className=" chart-container">
      <h3 style={{ textAlign: "center" }}>Pie Chart</h3>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Keep track of your emotions",

              color: "white",
            },
            legend: {
              labels: {
                color: "white",
              },
            },
          },
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        }}
      />
    </Container>
  )
}

export default PieChart
