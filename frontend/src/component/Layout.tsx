
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import styles from './Layout.module.css';

type Props = {
    children: string | JSX.Element | JSX.Element[] 
}

export default function Layout({children}: Props) {
    return (
        <>
            <div className={styles.container}>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
            </div>
         
        </>
    )
}