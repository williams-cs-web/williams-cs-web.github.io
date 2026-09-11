import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopMenu from "./TopMenu";
import WilliamsHeader from "./WilliamsHeader";
import WilliamsFooter from "./WilliamsFooter";
import Spacer from "./Spacer";
import Passage from "./Passage";
import { usePageMeta } from "../hooks/usePageMeta";

// Permalink for students who declared under the pre-Spring-2026 requirements
// (see the note in articles/major-requirements.md). Styled like a Plan Your
// Major sub-page -- same hub highlight and layout -- rather than folded into
// the live requirements content, since the two describe different cohorts.
const OldMajorRequirements = ({ style, onClick, showSidebar }) => {
  const hubId = "plan-your-major";

  usePageMeta({
    title: "Former Major Requirements",
    description: "Computer science major requirements that applied to students who declared prior to Spring 2026.",
  });

  const renderBody = () => (
    <div
      id="old-major-requirements"
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
            title="plan your major"
            className="sidebar-plan-your-major"
            onClick={onClick}
          />
        ) : (
          <div className="left-spacer" style={{ flexGrow: 0, flexShrink: 0, width: "80px" }} />
        )}
        <div style={{ flexGrow: 1, minWidth: 0, textAlign: "left" }}>
          <div style={{ marginTop: "24px" }}>
            <div className="eyebrow">Plan Your Major</div>
            <div className="title" style={{ fontSize: "26px", marginTop: "6px", marginBottom: "18px" }}>
              Former Major Requirements
            </div>
            <div className="soft-card" style={{ padding: "16px 18px" }}>
              <Passage title={null} article="articles/old-major-requirements.md" />
            </div>
            <div style={{ marginTop: "18px" }}>
              <Link to="/plan-your-major/" className="link">&larr; back to current major requirements</Link>
            </div>
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

export default OldMajorRequirements;
