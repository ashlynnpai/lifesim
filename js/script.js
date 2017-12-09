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
    this.dostuff()
  }
  
  dostuff() {
    let adjacents = [];
    let s = this.state.squares;
    let neighborCount = 0;
    let n = Math.sqrt(this.size);
    for (var i=0; i<s.length; i++) {
      adjacents.push(i-1, i+1, i-n-1, i-n, i-n+1, i+n-1, i+n, i+n+1);
      for (var j=0; j<adjacents.length; j++) {
        if (s[adjacents[j]] == "X") {
          neighborCount++;
        }
      }
       if (neighborCount > 1) {  
      console.log("index " + i + " neighbors " + neighborCount);
      }
      if (s[i] == null && neighborCount == 3) {
        s[i] = "X";
        document.getElementById("square" + i).style.background = "#E55EA2";
      }
      else if ((s[i] == "X" && neighborCount < 2)
      || (s[i] == "X" && neighborCount > 3))
      {
        s[i] = null;
        document.getElementById("square" + i).style.background = "#4b535c";
      } 
      //change this to update all changes at once?
      neighborCount = 0;
      adjacents = [];
    }
    this.setState({
      squares: s
      } 
    )
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <div id="board" className="flex-container">
          {this.state.squares.map((square,index) => 
           <div id={"square" + index} key={index}></div>)}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('app')
);
