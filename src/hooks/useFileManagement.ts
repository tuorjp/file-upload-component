import { useRef, useState } from "react"

export function useFileManagement() {
    const [files, setFiles] = useState<File[] | []>([])

    const inputRef = useRef<HTMLInputElement>(null)

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        const droppedFiles = e.dataTransfer?.files
        if (droppedFiles) {
            const droppedFilesArray = Array.from(droppedFiles)
            setFiles((prevFiles) => removeDuplicates([...prevFiles, ...droppedFilesArray]))
        }
        clearInput()
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
    }

    function removeFileFromArray(index: number) {
        setFiles((prevFiles) => prevFiles.filter((_file, i) => i != index))
    }

    // arquivos adicionados com um click ao invés de drag and drop
    function handleFileInsertionByClick(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            console.log(e.target.files)
            const selectedFiles = Array.from(e.target.files)
            setFiles((prevFiles) => removeDuplicates([...prevFiles, ...selectedFiles]))
            clearInput()
        }
    }

    function handleDivClick() {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    function isImage(file: File) {
        return file.type.startsWith('image/')
    }

    function clearInput() {
        if(inputRef.current) {
            inputRef.current.value = ''
        }
    }

    function removeDuplicates(files: File[]): File[] {
        const uniqueFiles = new Map<string, File>()
        
        files.forEach((file) => {
            const fileKey = `${file.name}-${file.size}`
            if (!uniqueFiles.has(fileKey)) {
                uniqueFiles.set(fileKey, file)
            }
        })
    
        return Array.from(uniqueFiles.values())
    }

    return {
        files,
        inputRef,
        handleDrop,
        handleDragOver,
        removeFileFromArray,
        handleFileInsertionByClick,
        handleDivClick,
        isImage
    }
}