import './App.css'

function App() {
  return (
    <>
      <div style={{ height: "100vh", position: "relative", zIndex:-1 }}>
        <div style={{ backgroundColor: "cyan", height: "100%" }}>
          water
        </div>

        <div className='button' style={{ position: "absolute",right:"50%", margin:"5px", bottom:20 , zIndex: 10, width:"20%", height:"6%" , display:"flex", flexDirection:"row"}}>
          <div style={{width:"30%", height:"80%",margin:"2px",padding:"5px", backgroundColor:"orange"}}>bottle of water</div>
          <div style={{width:"30%", height:"80%",margin:"2px",padding:"5px", backgroundColor:"orange"}}>poison</div>
          <div style={{width:"30%", height:"80%",margin:"2px",padding:"5px", backgroundColor:"orange"}}>shit </div>
        </div>

        <div
          className='sideCamera'
          style={{
            position: "absolute",
            top: 2,
            right: 0,
            height: "100%",
            width: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            zIndex: 1
          }}
        >
          <div style={{ width: "100%", height:"250px", backgroundColor: "magenta" }}>nigga</div>
          <div style={{ width: "100%", height:"250px", backgroundColor: "magenta" }}>nigga</div>
          <div style={{ width: "100%", height:"250px", backgroundColor: "magenta" }}>nigga</div>
          <div style={{ width: "100%", height:"250px", backgroundColor: "magenta" }}>nigga</div>
        </div>
      </div>
    </>
  )
}

export default App;