class Game extends React.Component {
  constructor(props) {
    super(props);
    this.size = 4900;
    let initialSquares = Array(this.size).fill(null);
    //set initial seed
    let seed = [730, 800, 870];
    for (let i=0; i<seed.length; i++) {
      initialSquares[seed[i]]="X";
    }
    this.state = {
                  count: 0, 
                  squares: initialSquares
                 };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000000
      //change to 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      count: this.state.count + 1
    });
    this.cycle()
  }
  
  cycle() {
    let adjacents = [];
    let s = this.state.squares;
    let neighborCount = 0;
    let n = Math.sqrt(this.size);
    let births = [];
    let deaths = [];
    for (var i=0; i<s.length; i++) {
      adjacents.push(i-1, i+1, i-n-1, i-n, i-n+1, i+n-1, i+n, i+n+1);
      for (var j=0; j<adjacents.length; j++) {
        if (s[adjacents[j]] == "X") {
          neighborCount++;
        }
      }

      if (s[i] == "O" && neighborCount == 3) {
        births.push(i);
      }
      else if ((s[i] == "X" && neighborCount < 2)
      || (s[i] == "X" && neighborCount > 3))
      {
        deaths.push(i);
      } 
      neighborCount = 0;
      adjacents = [];  
    }
    
    for (let k=0; k<births.length; k++) {
      s[births[k]] = "X";
    }
      
    for (let k=0; k<deaths.length; k++) {
      s[deaths[k]] = "O";
    }
    births = [];
    deaths = [];
   this.setState({
    squares: s
   })
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <div id="board" className="flex-container">
          {this.state.squares.map((square,index) => 
           <div className={square + "color"} id={"square" + index} key={index}></div>)}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('app')
);
