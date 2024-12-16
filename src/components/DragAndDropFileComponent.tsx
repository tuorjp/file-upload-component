import { FileText, XCircle } from "phosphor-react"
import { useFileManagement } from "../hooks/useFileManagement"

type DragAndDropFileComponentType = {
    ComponentTitle?: string
}

export function DragAndDropFileComponent({ComponentTitle = 'Arquivos'} : DragAndDropFileComponentType) {
    const {
        files,
        inputRef,
        handleDragOver,
        handleDrop,
        removeFileFromArray,
        handleDivClick,
        isImage,
        handleFileInsertionByClick,
    } = useFileManagement()

    return (
        <div>
            <div
                className="text-white flex-col border rounded-lg px-4 pb-6"
                onDrag={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="my-4 w-full text-center">{ComponentTitle}</div>
                <div
                    className="border border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer"
                    onClick={handleDivClick}
                >
                    Clique aqui ou arraste os arquivos para adicionar
                </div>
                <input type="file" multiple hidden ref={inputRef} onChange={handleFileInsertionByClick}/>
            </div>
            <div className="text-white mt-4 grid grid-cols-2 gap-4 border border-white p-6 rounded-lg">
                {files && files.map((file, index) => (
                    <div key={index} className="border border-gray-400 p-2 rounded-lg">
                        {isImage(file) ? (
                            <div className="flex flex-col">
                                <div className="flex justify-end cursor-pointer" onClick={() => removeFileFromArray(index)}>
                                    <XCircle color="#fff" size={32} />
                                </div>
                                <img 
                                    src={URL.createObjectURL(file)} 
                                    alt={file.name ? file.name : ''}
                                    className="w-40 h-40 object-contain rounded-md" 
                                />
                            </div>
                        ) : (
                            <div>
                                <FileText color="#fff" size={32} />
                                <span className="ml-2"></span>
                            </div>
                        )}
                    </div>
                ))}
                
                {files.length < 1 && (
                    <div className="text-sm text-center w-full text-gray-100">
                        <div>Nenhum arquivo adicionado...</div>
                    </div>
                )}
            </div>
        </div>
    )
}