import { useId, useState } from "react";
import styles from "./Header.module.css";
import uploadimg from "../../public/Upload-pana.svg";
import axios from "axios";

export default function Header() {
  const id = useId();
  const [progress, setProgress] = useState(0);

  const toggleModel = () => {
    document.getElementById(id + "upload")?.classList.toggle("hideme");
    document.getElementById(id+'progessbar')?.classList.toggle("hideme");
    document.getElementById(id+'label')?.classList.toggle("hideme");

  };

  const uploadhandle = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    const formdata = new FormData();
    formdata.append("file", file);

    // document.getElementById(id+'progessbar')?.classList.remove('hideme');
    // document.getElementById(id+'label')?.classList.add('hideme');

    if (file) {
      axios
        .post("http://192.168.1.8:3050/api/file/upload", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            let p = progress;
            p = (progressEvent.loaded / Number(progressEvent?.total)) * 100;
            
            setProgress(p);
          },
        })
        .then((response) => {
          console.log(response);
          setProgress(100);
          
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <header className={styles.header}>
        <nav>
          <div className={styles.logo}>
            <span>File Hub</span>
          </div>

          <div className={styles.middle}>
            <form className={styles.search_form}>
              <input type="text" placeholder="Search file" />
            </form>
          </div>

          <div className={styles.profile}>
            <button onClick={toggleModel} className={styles.uploadbtn}>
              <span className="material-symbols-outlined">add</span>
              <span>Upload</span>
            </button>
            <span className="material-symbols-outlined">account_circle</span>
          </div>
        </nav>
      </header>

      <div id={id + "upload"} className={styles.uploadmodel}>
        <form onSubmit={uploadhandle}>
          <img width="300px" src={uploadimg} alt="" />

          <input id="uploadin" type="file" onChange={uploadhandle} />
          <div id={id+"progessbar"} className={styles.progressbar}>
            <div  className={styles.progress} style={{width: progress+'%'}}></div>
          </div>
         
          <label id={id+"label"} className={styles.uploadlabel} htmlFor="uploadin">upload</label>

          
        </form>
      </div>
    </>
  );
}
