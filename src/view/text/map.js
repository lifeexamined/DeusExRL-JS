//Convert ASCII board to text
function asciiBoardToText(asciiBoard) {
  var text = "";

  for (var y = 0; y < asciiBoard.length; y++) {
    var row = asciiBoard[y];
    for (var x = 0; x < row.length; x++) {
      var cell = row[x];
      if (cell.type === "free") {
        text += ".";
      } else if (cell.type === "player") {
        text += "@";
      } else if (cell.type === "enemy") {
        text += "e";
      } else if (cell.type === "block") {
        text += "#";
      }
    }
    text += "\n";
  }
  return text;
}

function mapStateToAsciiBoard(state) {
  const asciiBoard = createAsciiBoard(state);
  return asciiBoardToText(asciiBoard);
}
