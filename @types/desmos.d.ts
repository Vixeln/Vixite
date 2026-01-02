/**
 * https://www.desmos.com/api/v1.11/docs/3d.html#document-api-keys
 * 
 * https://www.desmos.com/api/v1.10/docs/index.html#document-layout
 */

export interface DesmosAPI extends object {
  FourFunctionCalculator: Constructor<FourFunctionCalculator>
  ScientificCalculator: Constructor<ScientificCalculator>
  Calculator: Constructor<GraphingCalculator>
  GraphingCalculator: Constructor<GraphingCalculator2D>
  Geometry: Constructor<GraphingCalculatorGeometry>
  Calculator3D: Constructor<GraphingCalculator3D>

}

interface BaseCalculator extends object {
  destroy(): void;
  clearHistory(): void
  getState(): CalculatorState | GraphingCalculatorState

  setState(state: CalculatorState, option?: setStateOptions): void
  setBlank(options?: setStateOptions): void
  setDefaultState(defaultState: CalculatorState): void

  setState(state: GraphingCalculatorState, option?: setStateOptions): void
  setBlank(options?: setStateOptions): void
  setDefaultState(defaultState: GraphingCalculatorState): void
}

type Constructor<T> = (element: HTMLElement, options?: Options) => T

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Calculator extends BaseCalculator {

}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GraphingCalculator extends BaseCalculator {

}


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GraphingCalculator2D extends GraphingCalculator { }
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GraphingCalculator3D extends GraphingCalculator { }
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GraphingCalculatorGeometry extends GraphingCalculator { }

interface setStateOptions {
  allowUndo?: boolean
  remapColors?: boolean
}

enum Colors {
  RED = "#c74440",
  BLUE = "#2d70b3",
  GREEN = "#388c46",
  PURPLE = "#6042a6",
  ORANGE = "#fa7e19",
  BLACK = "#000000",
}

interface Options {
  keypad?: boolean
  graphpaper?: boolean
  expressions?: boolean
  settingsMenu?: boolean
  zoomButtons?: boolean
  showResetButtonOnGraphpaper?: boolean
  expressionsTopbar?: boolean
  pointsOfInterest?: boolean
  trace?: boolean
  border?: boolean
  lockViewport?: boolean
  expressionsCollapsed?: boolean
  capExpressionSize?: boolean
  authorFeatures?: boolean
  images?: boolean
  imageUploadCallback?: Desmos.imageFileToDataURL
  folders?: boolean
  notes?: boolean
  sliders?: boolean
  actions?: 'auto' | boolean
  substitutions?: boolean
  links?: boolean
  qwertyKeyboard?: boolean
  distributions?: boolean
  restrictedFunctions?: boolean
  forceEnableGeometryFunctions?: boolean
  pasteGraphLink?: boolean
  pasteTableData?: boolean
  clearIntoDegreeMode?: boolean
  colors?: Colors
  autosize?: boolean
  plotInequalities?: boolean
  plotImplicits?: boolean
  plotSingleVariableImplicitEquations?: boolean
  projectorMode?: boolean
  decimalToFraction?: boolean
  fontSize?: number
  invertedColors?: boolean
  language?: Language
  brailleMode?: boolean
  sixKeyInput?: boolean
  brailleControls?: boolean
  audio?: boolean
  graphDescription?: string
  zoomFit?: boolean
  forceLogModeRegressions?: boolean
  defaultLogModeRegressions?: boolean
  customRegressions?: boolean
  logScales?: boolean
  tone?: boolean
  intervalComprehensions?: boolean
  muted?: boolean
  allowComple?: boolean
}

interface CalculatorState extends object {
  version: number;
  randomSeed: string;
  expressions: Expressions;
  includeFunctionParametersInRandomSeed: boolean;
  doNotMigrate3dLineWidthZero: boolean;
  doNotMigrateMovablePointStyle: boolean;
}

interface GraphingCalculatorState extends CalculatorState {
  graph: Graph;
}

interface Expressions {
  list: List[];
  ticker?: Ticker;
}

interface Ticker {
  handlerLatex: string;
  minStepLatex: string;
  playing: boolean;
  open: boolean;
}

interface List {
  type: string;
  id: string;
  color?: string;
  latex?: string;
  slider?: Slider;
  title?: string;
  collapsed?: boolean;
  folderId?: string;
  hidden?: boolean;
  colorLatex?: string;
}

interface Slider {
  hardMin: boolean;
  min: string;
  hardMax?: boolean;
  max?: string;
  step?: string;
}

interface Graph {
  viewport: Viewport;
  userLockedViewport: boolean;
  threeDMode: boolean;
  worldRotation3D: number[];
  axis3D: number[];
  showPlane3D: boolean;
  showAxis3D: boolean;
  product?: GraphProduct;
}

type GraphProduct = "geometry-calculator" | "graphing-3d"

interface Viewport {
  xmin: number;
  ymin: number;
  zmin: number;
  xmax: number;
  ymax: number;
  zmax: number;
}

// Show the onscreen keypad
// Show the graphpaper
// Show the expressions list
// Show the settings wrench, for changing graph display. See Accessibility Notes.
// Show onscreen zoom buttons
// If a default state is set, show an onscreen reset button
// Show the bar on top of the expressions list
// Show Points of Interest (POIs) as gray dots that can be clicked on
// Allow tracing curves to inspect coordinates, and showing point coordinates when clicked
// Add a subtle 1px gray border around the entire calculator
// Disable user panning and zooming graphpaper
// Collapse the expressions list
// Limit the size of an expression to 500 LaTeX tokens and a maximum nesting depth of 30
// Enable features intended for content authoring. See the section on Author Features.
// Allow adding images
// imageFileToDataURL	Specify custom processing for user-uploaded images. See Image Uploads for more details.
// Allow the creation of folders in the expressions list
// Allow the creation of text notes in the expressions list
// Allow the creation of sliders in the expressions list
// 	Allow the use of Actions. May be true, false, or 'auto'. When true or false, actions are completely enabled or disabled. When 'auto', actions are enabled, but some associated UI is only displayed after the user enters a valid action. In a future API version, 'auto' may become a synonym for true.
// Allow the use of "with" substitutions and list comprehensions
// Allow hyperlinks in notes/folders, and links to help documentation in the expressions list (e.g. regressions with negative R2 values or plots with unresolved detail)
// Display the keypad in QWERTY layout (false shows an alphabetical layout)
// Enable/disable functions related to univariate data visualizations, statistical distributions, and hypothesis testing
// Show a restricted menu of available functions
// Force distance and midpoint functions to be enabled, even if restrictedFunctions is set to true. In that case the geometry functions will also be added to the the "Misc" keypad
// Paste a valid desmos graph URL to import that graph
// Paste validly formatted table data to create a table up to 50 rows
// When true, clearing the graph through the UI or calling setBlank() will leave the calculator in degreeMode. Note that, if a default state is set, resetting the graph through the UI will result in the calculator's degreeMode matching the mode of that state, regardless of this option.
// The color palette that the calculator will cycle through. See the Colors section.
// Determine whether the calculator should automatically resize whenever there are changes to element's dimensions. If set to false you will need to explicitly call .resize() in certain situations. See .resize().
// Determine whether the calculator should plot inequalities
// Determine whether the calculator should plot implicit equations and inequalities
// Determine whether the calculator should plot single-variable implicit equations
// When true, fonts and line thicknesses are increased to aid legibility.
// When true, users are able to toggle between decimal and fraction output in evaluations if Desmos detects a good rational approximation.
// Base font size.
// Display the calculator with an inverted color scheme.
// 	Language. See the Languages section for more information.
// 	Set the input and output Braille code for persons using refreshable Braille displays. Valid options are 'nemeth', 'ueb', or 'none'.
// Allow users to write six-dot Braille characters using the Home Row keys (S, D, F, J, K, and L). Requires that brailleMode be 'nemeth' or 'ueb'.
// Show Braille controls in the settings menu and enable shortcut keys for switching between Braille modes. See Accessibility Notes.
// Permit the calculator to generate sound, including using the tone method and in Audio Trace. See Accessibility Notes.
// Manually set a description for the graph canvas (which replaces the automatically generated text we create). Set to an empty string to remove the description entirely, or undefined to restore the generated text. See Accessibility Notes.
// When true, tables and distributions will display an icon that allows the user to automatically snap the viewport to appropriate bounds for viewing that expression.
// When true, all linearizable regression models will have log mode enabled by default, and the checkbox used to toggle log mode will be hidden from the expression interface. See this support article for more information.
// When true, all linearizable regression models will have log mode enabled by default, but, unlike forceLogModeRegressions, the checkbox used to toggle log mode will be visible from the expression interface. See this support article for more information.
// When true, users can create arbitrary regression models using expression syntax. When false, users can only create regressions from a fixed menu of model options from the table column interface. See this article on regressions.
// When true, the option to use logarithmic axis scales is enabled.
// When true, the tone command is enabled.
// When true, the syntax for interval comprehensions is enabled.
// Globally mute or unmute sound generated by the calculator's built-in tone() function. See the section on tones below.
