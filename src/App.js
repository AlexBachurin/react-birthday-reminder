

function App() {
  return (
    <main>
      <section className="section">
        <div className="header">
          <h1 className="title">Birthday reminder app</h1>
          <div className="underline"></div>
        </div>
        <h2 className="birthdays-title">Today birthdays!</h2>
        <div className="date-container">
          <span className="date">13</span>
          <span className="month">September</span>
          <span className="year">2021</span>
        </div>
        <section className="birthdays-section">
          <article className="birthday">
            <h4>John wick</h4>
            <p>21 dec 1992</p>
          </article>
          <article className="birthday">
            <div className="img-container">
              <img src="https://briefly.ru/static/cache/authors/480/gogol.jpeg?1622718658" alt="gogol" />
            </div>
            <h4>John doe</h4>
            <p>21 dec 1995</p>
          </article>
          <article className="birthday">
            <h4>Sally Smith</h4>
            <p>30 sep 1982</p>
          </article>
          <article className="birthday">
            <h4>Sally Smith</h4>
            <p>30 sep 1982</p>
          </article>
        </section>
      </section>
    </main>
  );
}

export default App;
