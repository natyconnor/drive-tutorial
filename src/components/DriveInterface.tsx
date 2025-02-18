"use client"

import { useState } from "react"
import { File, Folder, Upload } from "lucide-react"
import Breadcrumb from "./Breadcrumb"

type Item = {
  id: string
  name: string
  type: "file" | "folder"
  parent: string | null
}

const mockData: Item[] = [
  { id: "1", name: "Documents", type: "folder", parent: null },
  { id: "2", name: "Images", type: "folder", parent: null },
  { id: "3", name: "Work", type: "folder", parent: "1" },
  { id: "4", name: "Personal", type: "folder", parent: "1" },
  { id: "5", name: "report.docx", type: "file", parent: "3" },
  { id: "6", name: "budget.xlsx", type: "file", parent: "3" },
  { id: "7", name: "vacation.jpg", type: "file", parent: "2" },
  { id: "8", name: "resume.pdf", type: "file", parent: "4" },
]

export default function DriveInterface() {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)

  const getCurrentItems = () => {
    return mockData.filter((item) => item.parent === currentFolder)
  }

  const handleItemClick = (item: Item) => {
    if (item.type === "folder") {
      setCurrentFolder(item.id)
    }
  }

  const handleBreadcrumbClick = (folderId: string | null) => {
    setCurrentFolder(folderId)
  }

  const handleUpload = () => {
    alert("File upload functionality would be implemented here")
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb currentFolder={currentFolder} mockData={mockData} onBreadcrumbClick={handleBreadcrumbClick} />
        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <Upload className="mr-2" size={16} />
          Upload File
        </button>
      </div>
      <div className="bg-gray-700 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-600 text-left">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Type</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentItems().map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-600 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <td className="py-2 px-4 flex items-center">
                  {item.type === "folder" ? (
                    <Folder className="mr-2 text-yellow-400" size={20} />
                  ) : (
                    <File className="mr-2 text-blue-400" size={20} />
                  )}
                  {item.name}
                </td>
                <td className="py-2 px-4">{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

