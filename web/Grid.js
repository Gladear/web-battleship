class Grid {
  constructor(nbCol, nbLine, caseLength, caseHeight, gridTxtLength, gridColor) {
    this.nbCol = nbCol;
    this.nbLine = nbLine;
    this.caseLength = caseLength;
    this.caseHeight = caseHeight;
    this.gridTxtLength = gridTxtLength;
    this.gridColor = gridColor;
  }

  getNbCol() {
    return this.nbCol;
  }

  setNbCol(nbCol) {
    this.nbCol = nbCol;
  }

  getNbLine() {
    return this.nbLine;
  }

  setNbLine(nbLine) {
    this.nbLine = nbLine;
  }

  getCaseLength() {
    return this.caseLength;
  }

  setCaseLength(caseLength) {
    this.caseLength = caseLength;
  }

  getCaseHeight() {
    return this.caseHeight;
  }

  setCaseHeight(length) {
    this.caseHeight = caseHeight;
  }

  draw() {
    this.drawBoard();
    this.drawIndexes();
  }

  drawBoard() {}

  drawIndexes() {
    for (var i = 1; i < this.nbCol + 1; i++) {
      advCtx.setParams(i * this.caseLength + 1, 0, 1, 0);

      advCtx.begin(2, this.gridColor, this.gridColor);
      advCtx.rect(0, 0, this.caseLength, this.caseHeight);
      advCtx.stroke();

      var letter = String.fromCharCode('A'.charCodeAt(0) + i - 1);
      advCtx.write(
        letter,
        this.gridColor,
        this.gridTxtLength,
        this.caseLength / 2,
        (this.caseHeight + this.gridTxtLength) / 2,
      );
    }

    for (var j = 1; j < this.nbLine + 1; j++) {
      advCtx.setParams(0, j * this.caseHeight + 1, 1, 0);

      advCtx.begin(2, this.gridColor, this.gridColor);
      advCtx.rect(0, 0, this.caseLength, this.caseHeight);
      advCtx.stroke();

      advCtx.write(
        j,
        this.gridColor,
        this.gridTxtLength,
        this.caseLength / 2,
        (this.caseHeight + this.gridTxtLength) / 2,
      );
    }
  }
}
