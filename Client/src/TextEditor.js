import { useCallback } from 'react'
import "quill/react/quill.snow.css"
import Quill from 'quill'

export default function TextEditor() { 
  const WrapperRef = useCallback(wrapper => {

   if(wrapper==null) return 
   
   wrapper.innerHTML=""
   const editor = document.createElement('div')
   wrapper.append(editor)
    new Quill(editor ,{theme:'snow'})
  },[])

  return <div id="container" ref={WrappeRef}></div>
}
