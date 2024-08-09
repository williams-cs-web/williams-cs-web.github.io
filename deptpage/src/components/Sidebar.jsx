

const Sidebar = ({title, className}) => (
  <div style={{
    width: '30%'
  }}>
    <div className={`${className} tile`} style={{
      margin: '40px',
      padding: '15px'
    }}>
      {title}
    </div>
    <div className="plaintext" style={{
      backgroundColor: "whitesmoke",
      color: "black",
      fontSize: "14px",
      margin: '40px',
      padding: '10px'
    }}>
      <span style={{ fontWeight: 'bold' }}>We are hiring!</span> Two
      tenure-track faculty positions are available, starting in Summer 2025.
      Apply on <a className="link" href="https://apply.interfolio.com/148956" target="_blank">Interfolio</a> by
      November 8, 2024 for full consideration.
    </div>
  </div>
)

export default Sidebar;
