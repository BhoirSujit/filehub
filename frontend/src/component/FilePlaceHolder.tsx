import styles from "./FilePlaceHolder.module.css";
import placeholderimg from "../assets/placeholder.png";
import { useEffect, useId } from "react";
import FileSaver from "file-saver";

interface dataShema {
  name: string;
  size: number;
  thumbnail: string;
}

interface propsType {
  file: dataShema;
}

function bytesToMegaBytes(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(2);
}

export default function FilePlaceHolder(props: propsType) {

    const openmodelid = useId();

    useEffect(() => {
        document.addEventListener('click' , e =>{
            if (e.target?.id != openmodelid) {
                console.log('i am button  : ', e.target)
                document.getElementById(openmodelid)?.classList.remove('hideme');
            }
            console.log('i got click : ', e.target)
        }, true)


    }, [])

   
    const toggleModel = () => {
        document.getElementById(openmodelid)?.classList.toggle('hideme');
    }

    const closeModel = () => {
        document.getElementById(openmodelid)?.classList.remove('hideme');
    }

    const downloadfile = (file: string) => {
        FileSaver.saveAs('http://192.168.1.8:3050/files/'+file, file);

    }
  return (
    <>
      <div className={styles.box}>
        <div className={styles.img}>
          <img
            src={
              props.file.thumbnail != "none"
                ? "http://192.168.1.8:3050/files/thumb/" + props.file.thumbnail
                : placeholderimg
            }
            alt="abc"
          />
        </div>
        <div className={styles.details}>
          <div className={styles.filedetails}>
            <span className={styles.name}>{props.file.name.split("-")[1]}</span>
            <span className={styles.size}>
              {bytesToMegaBytes(props.file.size)} MB
            </span>
          </div>
          <div className={styles.fileoption} >
            <button className={styles.btnoptionmodel} onClick={toggleModel}  ><span   className="material-symbols-outlined">more_vert</span></button>
            
            <div id={openmodelid} onBlur={closeModel} className={styles.optionmodel}>
              
                <div className={styles.optionholder}>delete</div>
                <div className={styles.optionholder}><button onClick={ () => downloadfile(props.file.name)}>download</button></div>
            </div>
          
          </div>
        </div>
      </div>
    </>
  );
    }
