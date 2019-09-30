class Board {
  constructor(grid, players) {
    this.grid = grid;
    this.players = players;
    this.selectedX = 1;
    this.selectedY = 0;
  }

  getGrid() {
    return this.grid;
  }

  draw() {
    //Clear the board
    this.clearBoard();

    //Display the grid
    this.grid.draw();

    //Display the ocean
    this.displayOcean();

    //Display the boats
    players.forEach(function(player) {
      if (player.getCurrent() && displayOwnView) {
        player.drawShips(true);
      } else if (!player.getCurrent() && !displayOwnView) {
        player.drawShips(false);
      }
    });

    //Display the grid over de boats
    for (var i = 1; i < gameLineNumber + 1; i++) {
      for (var j = 1; j < gameColNumber + 1; j++) {
        advCtx.setParams(i * gridCaseLength + 1, j * gridCaseLength + 1, 1, 0);
        this.drawBoardGrid();
      }
    }

    //Display the switch button
    this.drawSwitchButton();

    //Display the selected case
    this.drawCase();
  }

  clearBoard() {
    advCtx.setParams(0, 0, 1, 0);

    advCtx.begin(1, '#ffffff', '#ffffff');
    advCtx.fillRect(0, 0, windowsLength, windowsHeight);
    advCtx.stroke();
  }

  displayOcean() {
    advCtx.setParams(gridCaseLength, gridCaseHeight, 1, 0);

    advCtx.grdOcean = advCtx.ctx.createLinearGradient(
      0,
      gameBoardHeight / 2 + Math.cos(t / 10) * (gameBoardHeight / 2),
      gameBoardLength,
      gameBoardHeight / 2 - Math.cos(t / 10) * (gameBoardHeight / 2),
    );
    advCtx.grdOcean.addColorStop(0, oceanColor);
    advCtx.grdOcean.addColorStop(1, oceanColor2);

    advCtx.begin(1, advCtx.grdOcean, advCtx.grdOcean);
    advCtx.fillRect(0, 0, gameBoardLength, gameBoardHeight);
    advCtx.stroke();
  }

  drawBoardGrid() {
    var len = gridCaseLength / 10;
    var hei = gridCaseHeight / 10;

    advCtx.begin(2, boardColor, boardColor);

    advCtx.moveTo(0, 0);
    advCtx.lineTo(0, hei);
    advCtx.moveTo(0, 0);
    advCtx.lineTo(len, 0);

    advCtx.moveTo(gridCaseLength, 0);
    advCtx.lineTo(gridCaseLength, hei);
    advCtx.moveTo(gridCaseLength, 0);
    advCtx.lineTo(gridCaseLength - len, 0);

    advCtx.moveTo(0, gridCaseHeight);
    advCtx.lineTo(0, gridCaseHeight - hei);
    advCtx.moveTo(0, gridCaseHeight);
    advCtx.lineTo(len, gridCaseHeight);

    advCtx.moveTo(gridCaseLength, gridCaseHeight);
    advCtx.lineTo(gridCaseLength, gridCaseHeight - hei);
    advCtx.moveTo(gridCaseLength, gridCaseHeight);
    advCtx.lineTo(gridCaseLength - len, gridCaseHeight);

    advCtx.stroke();

    advCtx.begin(0.5, boardColor, boardColor);
    advCtx.rect(0, 0, gridCaseLength, gridCaseHeight);
    advCtx.stroke();
  }

  setSelectedCoord(selectedX, selectedY) {
    this.selectedX = selectedX;
    this.selectedY = selectedY;
  }

  drawCase() {
    if (
      (!this.selectedX && !this.selectedY) ||
      (this.selectedX && this.selectedX < 11 && this.selectedY && this.selectedY < 11)
    ) {
      advCtx.setParams(this.selectedX * gridCaseLength, this.selectedY * gridCaseLength, 1, 0);

      var cStrokeColor;
      var cFillColor;

      if (!this.selectedX && !this.selectedY) {
        cStrokeColor = 'rgba(68, 186, 46, 0.74)';
        cFillColor = 'rgba(64, 204, 58, 0.49)';
      } else {
        cStrokeColor = 'rgba(186, 176, 46, 0.74)';
        cFillColor = 'rgba(204, 193, 58, 0.49)';
      }

      advCtx.begin(3, cStrokeColor, cFillColor);

      advCtx.fillRect(0, 0, gridCaseLength, gridCaseLength);
      advCtx.rect(0, 0, gridCaseLength, gridCaseLength);

      advCtx.stroke();
    }
  }

  drawSwitchButton() {
    advCtx.setParams(gridCaseLength / 2, gridCaseHeight / 2, gridCaseLength / 15, 0);

    advCtx.begin(1, '#000000', '#6c6969');

    advCtx.moveTo(2.5, -3.5);
    advCtx.lineTo(2.5, -0.5);
    advCtx.lineTo(-3.5, -0.5);
    advCtx.lineTo(-3.5, 1.5);
    advCtx.lineTo(-6.5, -2);
    advCtx.lineTo(-3.5, -5.5);
    advCtx.lineTo(-3.5, -3.5);
    advCtx.lineTo(2.5, -3.5);

    advCtx.fill();
    advCtx.stroke();

    advCtx.begin(1, '#000000', '#6c6969');

    advCtx.moveTo(-2.5, 3.5);
    advCtx.lineTo(-2.5, 0.5);
    advCtx.lineTo(3.5, 0.5);
    advCtx.lineTo(3.5, -1.5);
    advCtx.lineTo(6.5, 2);
    advCtx.lineTo(3.5, 5.5);
    advCtx.lineTo(3.5, 3.5);
    advCtx.lineTo(-2.5, 3.5);

    advCtx.fill();
    advCtx.stroke();
  }
}