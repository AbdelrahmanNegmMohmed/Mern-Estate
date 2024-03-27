import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../Redux/User/userslice.js";

export default function Profille() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setfile] = useState(undefined);
  const [fileperc, setfileperc] = useState(0);
  const [fieuploadeerror, setfieuploadeerror] = useState(false);
  const [formData, setformData] = useState({});
  const [updatesuccess, setupdatesuccess] = useState(false)
  const dispatch = useDispatch();

  // firebase storege
  //allow read;
  //allow write:if request.resource.size < 2 * 1024 * 1024 &&
  //request .resource.contentType.matches('image/.*')
  useEffect(() => {
    if (file) {
      handleFileuploade(file);
    }
  }, [file]);
  const handleFileuploade = (file) => {
    const storge = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storgeRef = ref(storge, fileName);
    const uploadeTask = uploadBytesResumable(storgeRef, file);
    uploadeTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfileperc(Math.round(progress));
      },
      (error) => {
        setfieuploadeerror(true);
      },
      () => {
        getDownloadURL(uploadeTask.snapshot.ref).then((downloadURL) => {
          setformData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const handelChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handelsubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setupdatesuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handelDeleteuser = async() =>{
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",
      });
      const data = await res.json();
      if(data.success===false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));

    }catch(error){
      dispatch(deleteUserFailure(error.message))
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handelsubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setfile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fieuploadeerror ? (
            <span className="text-red-700">
              Error Image Uploade(image must be less than 2 mb)
            </span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span className="text-slate-700">{`Uploading ${fileperc}%`}</span>
          ) : fileperc === 100 ? (
            <span className="text-green-700">Image Successfully uploade</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handelChange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handelChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handelChange}
        />
        <button className="bg-slate-700
        text-white rounded-lg p-3 uppercase 
        hover:opacity-95 disabled:opacity-80"   
        disabled={loading}   
        >
          {
            loading ? 'loading......' :'Update'
          }
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handelDeleteuser} className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
        <p className="text-red-700 mt-5">{error ? error : ''}</p>
        <p className="text-green-700 mt-5">{updatesuccess ? 'User is updated successfully! ' : ''}</p>
    </div>
  );
}
