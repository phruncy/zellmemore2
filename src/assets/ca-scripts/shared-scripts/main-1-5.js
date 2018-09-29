/*
  Neuerungen in 1.3:
  _Die Standardvisualisierung kann jetzt zugeschalten werden
  _Zellularraum kann ringförmig geschlossen werden 
  _die berechnung vieler Positionen rechtet sich nach der Größe der einzelnen Ansichten,
    nicht mehr nach der Größe der p5Canvas
  
  Neuerungen in 1.5:
  _Aufteilung des Skripts in mehrere Dokumente zur besseren Übersicht
  _bessere Kommentare

  Neuerungen 1.6:
  _Es wird nun eine zufällige Regel als Startregel festgelegt

  Neuerungen 1.7:
  _Sound eingebaut

*/
'use strict';
p5.disableFriendlyErrors = true;


var automaton;
var viewmodel;
var mainView;
var additionalView;
var viewHandler;
var gui;
var p5Canvas;
var defaultViewCanvas;
var outsideCanvasView;
var outsideCanvasViewModel;
var _frameRateMax;
var _initialCellNumber;
var _cellNumberMax
var _initSpeed;
var _cellNumberMin;
var soundViewModel;
var soundView;
var p5Canvas;
var p5CanvasElement;
var scalingY;
var scalingX;

function preload()
{
  _frameRateMax = configuration.frameRateMax;
  _initialCellNumber = configuration.cellNumber;
  _cellNumberMax = configuration.cellNumberMax;
  _initSpeed = configuration.initialFrameRate;
  _cellNumberMin = configuration.cellNumberMin;

}


function setup() 
{ 
    // p5Canvas-Element für die Darstellung der Hauptansicht
    // Breite abhängig von der Fenstergröße
    const initWidth = getCanvasWidth();
    const initHeight = initWidth* 0.75;
    p5Canvas = createCanvas(initWidth, initHeight/* configuration.defaultWidth,configuration.defaultHeight */);
    let p5CanvasDiv = document.getElementById("p5canvas");
    p5Canvas.parent(p5CanvasDiv);
    p5CanvasElement = p5Canvas.elt;
    
    // zusätzliches Canvas-Element für die Standardansicht
    defaultViewCanvas = document.getElementById("defaultview");
    defaultViewCanvas.width = width;
    defaultViewCanvas.height = height;

    frameRate(_initSpeed);
    clear();


    ///Object instanciation
    /// Die Klassen müssen von "unten" (Model) nach oben (Gui) instanziiert werden
    startRule = startRule();
    automaton = new Automaton();
    viewmodel = new ViewModel(automaton);
    outsideCanvasViewModel = new OutsideCanvasViewModel ();
    soundViewModel = new SoundViewModel(automaton);
    soundView = new StructureWidthSoundView(soundViewModel);
    mainView = new View(viewmodel);
    additionalView = new DefaultView(viewmodel, defaultViewCanvas);
    viewHandler = new ViewHandler(mainView, additionalView);
    gui = new Gui(viewmodel, viewHandler);
    outsideCanvasView = new OutsideCanvasView();

    //Object Initialsisierung
    automaton.initialise(viewmodel.convertDecimalRule(startRule), _initialCellNumber);
    viewmodel.initialise();
    additionalView.initialise();
    mainView.initialise();
    gui.initialise();
    outsideCanvasView.initialise();
    soundViewModel.initialise();
    soundView.initialise();

    //Observeranmeldung
    automaton.subscribe(viewmodel);
    automaton.subscribe(outsideCanvasViewModel);
    if (configuration.hasOwnProperty('hasSound'))
    {
      automaton.subscribe(soundViewModel);
    }
    viewmodel.subscribe(mainView);
    viewmodel.subscribe(additionalView);
    viewmodel.subscribe(gui);
    if (configuration.hasOwnProperty('hasSound'))
    {
      soundViewModel.subscribe(soundView);
    }
    outsideCanvasViewModel.subscribe(outsideCanvasView);

    noLoop(); //Draw soll erst durch Klicken auf den Run-Button ausgeführt werden
}
////////////////////////Setup Ende///////////////////////////////////////////////////////////////


function draw() 
{     
  automaton.generateGeneration();
}

function keyPressed()
{
  if (key == ' ')
  {
    gui.runPauseButtonAction();
  }
  if(key=='m')
  {
    saveCanvas('png');
  }
}

function keyReleased()
{
  if (key == 'm')
  {
    saveCanvas('png');
  }
}

/* function windowResized()
{
  const newWidth = getCanvasWidth();
  const newHeight = newWidth * 0.75;
  resizeCanvas(newWidth, newHeight);
  defaultViewCanvas.width = width;
  defaultViewCanvas.height = height;
  viewmodel.recalculateProperties();
  viewmodel.mediateIsRendered(false);
  redraw();
  //viewHandler.clearAllViews();
} */

/*
  Diese Klasse liefert beim Start des Programms die Regel, mit der der Automat initialisiert wird.
  Das Array startRuleArray enthält Regeln mit unterschiedlichem interessanten Verhalten, von denen eine
  zufällige zurückgegeben wird.
*/
function startRule()
{
  const startRuleArray = [110,30,45,90,150,250,129,105,99,182,225,147,131,18,118,13,73,137,124,193];
  const randomIndex = Math.floor(Math.random()*startRuleArray.length);
  const rule = startRuleArray[randomIndex];
  return rule;
}

// gibt die Breite der Canvas in Abhängigkeit von der Fenstergöße zurück
function getCanvasWidth()
{
    const w = (windowWidth - windowWidth*0.07) / 2;
    return w;
}


