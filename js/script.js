class Game extends React.Component {
  constructor(props) {
    super(props);
    this.size = 4900;
    let initialSquares = Array(this.size).fill("O");
    let seed = [75, 145, 215, 410, 479, 480, 481, 775, 776, 777, 845, 916,
               1920, 1921, 1922, 1852, 1781, 1204, 1205, 1206, 1275];
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
      600
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
    //a large array representing the grid
    let s = this.state.squares;
    let neighborCount = 0;
    let n = Math.sqrt(this.size);
    let births = [];
    let deaths = [];
    //finds the eight neighboring squares 
    
    s.forEach(function(item, i){
      const adjacents = [i-1, i+1, i-n-1, i-n, i-n+1, i+n-1, i+n, i+n+1];
      for (let j=0; j<adjacents.length; j++) {
        if (s[adjacents[j]] == "X") {
          neighborCount++;
        }
      }
    //determines if the central square will be born or die
      if (s[i] == "O" && neighborCount == 3) {
        births.push(i);
      }
      else if ((s[i] == "X" && neighborCount < 2)
      || (s[i] == "X" && neighborCount > 3))
      {
        deaths.push(i);
      } 
      neighborCount = 0;
    });
    //the array updates after all births and deaths for the round have been computer
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
           <div className={square + "color"}  id={"square" + index} key={index}></div>)}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('app')
);
