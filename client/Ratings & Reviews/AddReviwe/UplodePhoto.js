import React, {useState} from 'react';
import axios from 'axios';
import firebase from './FireBase.js'


  const UplodePhoto =(props) =>{

  const [imageInput, setImageInput] = useState([])
  const { setUrlInput,urlInput} = props
  if (imageInput.length >0) {console.log(imageInput[1]);}
  
  const fileUoloadHandler = () => {
    let bucketName = 'images'
    for ( var i =0; i<imageInput.length ; i++) {
    let file = imageInput[i][0]
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
    let uploadTask = storageRef.put(file)
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=> {
        let downLoadUrl = uploadTask
      })
    }
    
  }

  //// needs to be fixed
  const showImage  = () => {
    let storageRef = firebase.storage().ref()
    for (var i =0; i< imageInput.length; i++) {
      let spaceRef = storageRef.child('images/' + imageInput[i][0].name)
      storageRef.child('images/'+ imageInput[i][0].name).getDownloadURL().then((url) => {
        setUrlInput(urlInput.concat([url]))
      })
    }   
  }

    return (
        <div>
      <main className="container mx-auto max-w-screen-lg h-full">
        <article aria-label="File Upload Modal" className="relative h-full flex flex-col">
          <section className="h-full overflow-auto p-6 w-full flex flex-col">
            <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
              <input  type="file" multiple className="pt-2 px-3 appearance-none" onChange={(e)=>setImageInput(imageInput.concat([e.target.files]))} />
             { urlInput.length<5 ? <button  class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none" onClick={()=>{ if (urlInput.length<5){fileUoloadHandler(); showImage()} }}>
                Upload a file
              </button> : ''}
        
            </header>
            <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
              To Upload
            </h1>
          {/* {url? <img id="new-img" src={url}  />  : ''} */}
            <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
               {!urlInput.length ? <li  className="h-full w-full text-center flex flex-col justify-center items-center ">
                <img className="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                <span className="text-small text-gray-500">No files selected</span>
              </li> : 
              <div className = "grid  grid-cols-5  md:grid-flow-col ...">
              {urlInput.map((url, index) => {
                
               return ( <li key ={index}> <img src={url}  className="object-contain w-35"/></li>)
              })}</div>
              }
            </ul>
          </section>
        </article>
      </main>
    </div>
            
    )
}
export default  UplodePhoto;