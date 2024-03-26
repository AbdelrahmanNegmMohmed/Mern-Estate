import { useSelector } from "react-redux";
import { useRef, useState,useEffect } from "react";
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../Firebase";
export default function Profille() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setfile] = useState(undefined);
  const [fileperc, setfileperc] = useState(0)
  const [fieuploadeerror,setfieuploadeerror]= useState(false);
  const [formData,setformData] = useState({});

  // firebase storege
  //allow read;
  //allow write:if request.resource.size < 2 * 1024 * 1024 &&
  //request .resource.contentType.matches('image/.*')
  useEffect(()=>{
    if(file){
      handleFileuploade(file);
    }
  },[file])
  const handleFileuploade = (file)=>{
    const storge = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storgeRef = ref(storge, fileName);
    const uploadeTask = uploadBytesResumable(storgeRef, file)
    uploadeTask.on('state_changed',
    (snapshot)=> {
      const progress = (snapshot.bytesTransferred/
      snapshot.totalBytes
      )* 100;
      setfileperc(Math.round(progress))
    },
    (error)=>{
      setfieuploadeerror(true)
    },
    ()=>{
      getDownloadURL(uploadeTask.snapshot.ref).then((downloadURL)=>{
        setformData({...formData, avatar:downloadURL})

      });
    }
    );
    


  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setfile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar ||currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          
            {fieuploadeerror ?( 
            (<span className="text-red-700">Error Image Uploade(image must be less than 2 mb)
            </span>)
            ): fileperc > 0 && fileperc< 100 ? (
              <span className="text-slate-700">{`Uploading ${fileperc}%`}</span>
            ):fileperc === 100 ? ( 
            <span className="text-green-700">Image Successfully uploade</span>
            
            ):(
            ""

          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
