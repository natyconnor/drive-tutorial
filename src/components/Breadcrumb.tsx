import { ChevronRight, Home } from "lucide-react"

type Item = {
  id: string
  name: string
  type: "file" | "folder"
  parent: string | null
}

type BreadcrumbProps = {
  currentFolder: string | null
  mockData: Item[]
  onBreadcrumbClick: (folderId: string | null) => void
}

export default function Breadcrumb({ currentFolder, mockData, onBreadcrumbClick }: BreadcrumbProps) {
  const getBreadcrumbItems = () => {
    const items: Item[] = []
    let currentItem = mockData.find((item) => item.id === currentFolder)

    while (currentItem) {
      items.unshift(currentItem)
      currentItem = mockData.find((item) => item.id === currentItem?.parent)
    }

    return items
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href="#"
            className="inline-flex items-center text-sm font-medium text-gray-300 hover:text-white"
            onClick={() => onBreadcrumbClick(null)}
          >
            <Home className="mr-2" size={16} />
            Home
          </a>
        </li>
        {getBreadcrumbItems().map((item, index) => (
          <li key={item.id}>
            <div className="flex items-center">
              <ChevronRight className="text-gray-500" size={16} />
              <a
                href="#"
                className="ml-1 text-sm font-medium text-gray-300 hover:text-white md:ml-2"
                onClick={() => onBreadcrumbClick(item.id)}
              >
                {item.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

