import NewsTile from "./NewsTile";

const Sidebar = ({title, onClick, className}) => (
  <div style={{
    width: '30%'
  }}>
    <div className={`${className} tile`} style={{
      margin: '40px',
      padding: '15px'
    }}>
      {title}
    </div>

    <NewsTile onClick={onClick} style={{margin: '40px', height: '250px'}} />    
  </div>
)

export default Sidebar;
