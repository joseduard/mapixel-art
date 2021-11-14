

var app = {
    styles: [
      "plain",
      "empty",
      "light",
      "highlight",
      "higtligth2",
      "greenlight",
      "yellowligtht",
      "redlight",
      "brownlight"
    ],
    
    selectedStyle: "plain",
    
    init: function () {
      app.generateConfigForm();
      app.createGrid(8, 32);
      app.generatepalette();
    },
  
    generateConfigForm: function () {
      var formNode = document.querySelector(".configuration");
      var gridSizeInput = document.createElement("input");
      gridSizeInput.setAttribute("type", "number");
      gridSizeInput.setAttribute("name", "gridSize");
      gridSizeInput.required = true;
      gridSizeInput.setAttribute("placeholder", "Taille de la grille");
      gridSizeInput.id = "gridSize";
      formNode.appendChild(gridSizeInput);
  
      var cellSizeInput = document.createElement("input");
      cellSizeInput.setAttribute("type", "number");
      cellSizeInput.setAttribute("name", "gridSize");
      cellSizeInput.required = true;
      cellSizeInput.setAttribute("placeholder", "Taille d'une cellule");
      cellSizeInput.id = "cellSize";
      formNode.appendChild(cellSizeInput);
  
      var submitButton = document.createElement("button");
      submitButton.getAttribute("type", "submit");
      submitButton.classList.add("config-form-submit");
      submitButton.textContent = "Valider";
      formNode.appendChild(submitButton);
  
      formNode.addEventListener("submit", function (event) {
        event.preventDefault();
        var gridSizeInputNode = document.getElementById("gridSize");
        var cellSizeInputNode = document.getElementById("cellSize");
        console.log(gridSizeInputNode);
        app.createGrid(gridSizeInputNode.value, cellSizeInputNode.value);
      });
    },
  
    generatepalette: function () {
      var paletteNode = document.getElementById("palette");
  
      app.styles.forEach(function (style) {
        var styleNode = document.createElement("div");
        styleNode.classList.add("style-selector");
        styleNode.setAttribute("data-style-name", style);
        styleNode.addEventListener("click", app.selectStyle);
        paletteNode.appendChild(styleNode);
      });
    },
  
    selectStyle: function (event) {
      var itemSelectorNode = event.target;
      app.selectedStyle = itemSelectorNode.getAttribute("data-style-name");
    },
  
    changeCellColor: function (event) {
      var celNode = event.target;
      celNode.setAttribute("data-style-name", app.selectedStyle);
    },
  
    createGrid: function (gridSize, cellSize) {
      var gridNode = document.getElementById("invader");
      while (gridNode.firstChild) {
        gridNode.removeChild(gridNode.lastChild);
      }
  
      gridNode.style.width = gridSize * cellSize + "px";
  
      for (var cellIndex = 0; cellIndex < gridSize * gridSize; cellIndex++) {
        var cellNode = document.createElement("div");
        cellNode.classList.add("cell");
        cellNode.style.width = cellSize + "px";
        cellNode.style.height = cellSize + "px";
        var eventName = "click";
        cellNode.addEventListener(eventName, app.changeCellColor);
        gridNode.appendChild(cellNode);
      }
    },
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    app.init();
  });
  