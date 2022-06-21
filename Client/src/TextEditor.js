import { useCallback } from 'react'
import "quill/react/quill.snow.css"
import Quill from 'quill'

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]
export default function TextEditor() {
  const { id: documentId } = useParams()
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()

  useEffect(() => {
    const s = io("http://localhost:3001")
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  const WrapperRef = useCallback(wrapper => {

   if(wrapper==null) return 

   wrapper.innerHTML=""
   const editor = document.createElement('div')
   wrapper.append(editor)
    new Quill(editor ,{theme:'snow',modules:{toolbar:TOOLBAR_OPTIONS}})
  },[])


  return <div className="container" ref={WrappeRef}></div>
}

