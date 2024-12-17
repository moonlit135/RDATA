// import React from 'react';
// import '../styles/a.css';

// const Home = () => {
//   const navigateTo = (page) => {
//     if (page === 'studentlogin') {
//       window.location.href = '/studentlogin';
//     } else if (page === 'Facultyadminlogin') {
//       window.location.href = '/Facultyadminlogin';
//     }
//   };

//   return (
//     <div>
//       <header>
//         <div className="logo">R.Data</div>
//         <nav>
//           <input type="text" placeholder="Search..." className="search-box" />
//           <button className="login-btn" onClick={() => navigateTo('studentlogin')}>Student Login</button>
//           <button className="login-btn" onClick={() => navigateTo('Facultyadminlogin')}>Faculty/Admin Login</button>
//         </nav>
//       </header>

//       <main>
//         <section className="hero">
//           <h1>Welcome to R.Data</h1>
//           <p>Your ultimate repository for knowledge and collaboration at Tezpur University.</p>
//         </section>
//       </main>

//       <footer>
//         <p>© 2024 R.Data. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
  const navigateTo = (page) => {
    if (page === 'studentlogin') {
      window.location.href = '/studentlogin';
    } else if (page === 'Facultyadminlogin') {
      window.location.href = '/Facultyadminlogin';
    }
  };

  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <div className={styles.logo}>R.Data</div>
        <nav className={styles.nav}>
          <input type="text" placeholder="Search..." className={styles.searchBox} />
          <button className={styles.loginBtn} onClick={() => navigateTo('studentlogin')}>Student Login</button>
          <button className={styles.loginBtn} onClick={() => navigateTo('Facultyadminlogin')}>Faculty/Admin Login</button>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Welcome to R.Data</h1>
          <p className={styles.heroText}>Your ultimate repository for knowledge and collaboration at Tezpur University.</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 R.Data. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;