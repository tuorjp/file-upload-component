import { DragAndDropFileComponent } from "./components/DragAndDropFileComponent"

function App() {

  return (
    <div className="flex-col justify-items-center content-center h-screen w-full bg-gradient-to-r from-indigo-800 to-purple-600">
      <DragAndDropFileComponent ComponentTitle="Fotos"/>
    </div>
  )
}

export default App