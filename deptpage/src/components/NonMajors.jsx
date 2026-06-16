import Sidebar from "./Sidebar";
import TopMenu from "./TopMenu";
import WilliamsHeader from "./WilliamsHeader";
import WilliamsFooter from "./WilliamsFooter";
import Spacer from "./Spacer";

const NonMajors = ({ style, layout, onClick, showSidebar }) => {
  const hubId = "non-majors";

  //const showSidebar = layout === "wide";

  const renderBody = () => (
    <div
      id="frontpage-non-majors"
      style={{
        ...style,
        fontSize: "40px",
      }}
    >
      <div
        className="pagebody"
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          
        }}
      >
        {showSidebar ? (
          <Sidebar
            title="non-majors"
            className="sidebar-non-majors"
            onClick={onClick}
          />
        ) : (
          <div className="left-spacer" style={{ flexGrow: 0, flexShrink: 0, width: "80px" }} />
        )}
        <div>
          <div>
            <Spacer height="16px" />
            <div
              className="heading"
              style={{
                textAlign: "left",
              }}
            >
              advice for non-majors
            </div>
            <div className="plaintext left">
              If you’d like a brief introduction to computer science with a
              focus on a particular application area, you may wish to take one
              of our CSCI 10x offerings (e.g. CSCI 102, CSCI 103, and CSCI 104).
              These courses provide a solid foundation in computer science
              concepts that are broadly applicable to many domains. They are
              specifically intended for non-majors and do not satisfy any CS
              major requirements.
            </div>
            <Spacer height="10px" />

            <div className="plaintext left">
              If you would like an introduction more focused on designing and
              implementing computer programs, we recommend taking CSCI 134,
              possibly followed by CSCI 136. Together these give a firm
              grounding and provide important skills in computing.
            </div>
            <Spacer height="20px" />
            <img width="100%" src="images/misc/firstcourse.png" />
            <Spacer height="10px" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <WilliamsHeader />
      <TopMenu onClick={onClick} currentPage={hubId} width={style.width} />
      {renderBody()}
      <Spacer height="10px" />
      <WilliamsFooter />
    </div>
  );
};

export default NonMajors;
