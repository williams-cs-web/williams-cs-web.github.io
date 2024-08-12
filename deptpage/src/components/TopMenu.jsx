import { useState } from 'react'
import { Link } from "react-router-dom";

const MenuItem = ({ id, text, highlight, width, height }) => {
  const [hovering, setHovering] = useState(false)
  return (
    <Link className="topmenu-link" to={{ pathname: `/${id}` }} >

      <div
        className={highlight ? "topmenu topmenu-highlight" :
          (hovering ? "topmenu topmenu-hover" : "topmenu topmenu-nohighlight")}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          height: height,
          width: width,
          
        }}>
        <div className="centered">{text}</div>

      </div>
    </Link>
  )
}

const TopMenu = ({ onClick, currentPage, width }) => {

  const pages = [
    "home",
    "about-us",
    "plan-your-major",
    "courses",
    "colloquium",
    "student-life",
    "research",
    "non-majors",
    "news"
  ]

  const menuItemsPerLine = () => {
    if (width >= 910) {
      return 9
    } else if (width >= 600) {
      return 3
    } else {
      return 3
    }
  }

  const computeMenuItemWidth = () => {
    return Math.floor((width - menuItemsPerLine() * 2) / menuItemsPerLine())
  }

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-evenly',
      }}>
      {pages.map(page => (
        <MenuItem
          key={page}
          id={page}
          width={`${computeMenuItemWidth()}px`}
          height={menuItemsPerLine() > 3 ? '50px' : '30px'}
          text={page.replaceAll('-', ' ')}
          onClick={onClick}
          highlight={page === currentPage}
        />
      ))}
    </div>
  )
}

export default TopMenu;