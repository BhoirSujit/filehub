import { useEffect, useState } from "react";
import FilePlaceHolder from "../component/FilePlaceHolder";
import Layout from "../component/Layout";
import styles from "./Home.module.css";
import axios from "axios";

// interface dataShema {
//     name : string,
//     size: string,
//     thumbnail?: string
// }

const url: string = "http://192.168.1.8:3050/api/file";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((e) => console.log("error while fetch : ", e));
    };
    fetchData();
  }, []);

  return (
    <>
      <Layout>
        <div className={styles.topbar}>
          <div>
            <span>File</span>
          </div>
          <div>option</div>
        </div>

        <div className={styles.files}>
          {data.map((d, i) => (
            <FilePlaceHolder key={i} file={d} />
          ))}
        </div>
      </Layout>
    </>
  );
}
