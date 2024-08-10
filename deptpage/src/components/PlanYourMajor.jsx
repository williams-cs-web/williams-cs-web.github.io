import Schedule from './Schedule'
import Sidebar from './Sidebar'
import StudyAway from './StudyAway'


const Spacer = ({ height }) => (
  <div style={{ height: height }} />
)


const PlanYourMajor = ({ style, layout, onClick }) => {

  const showSidebar = (layout === "wide")

  return (
    <div
      id="frontpage-plan-your-major"
      style={{
        ...style,
        fontSize: "40px"
      }}
    >
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap'
      }}>
        {showSidebar ? <Sidebar title="plan your major" className="sidebar-plan-your-major" onClick={onClick} /> : <div style={{ width: '20px' }} />}
        <div>
          <div>
            <Spacer height="30px" />
            <div className="heading" style={{
              textAlign: 'left'
            }}>major requirements</div>
            <div className="plaintext left">
              Full official details of our major requirements can be found <a className="link" href="https://catalog.williams.edu/pdf/csci.pdf" target="_blank">here</a>, but the following is a gentle summary.
              A computer science major must complete 8 CSCI courses and 2 MATH courses (in addition to satisfying the
              broader Williams College graduation requirements). These courses must include the following:
              <ul>
                <li>the introductory sequence: CSCI 134 and CSCI 136 </li>
                <li>the core courses: CSCI 237, CSCI 256, and either CSCI 334 or CSCI 361</li>
                <li>one of the following "discrete math" courses: MATH 200, MATH 328, MATH 334, MATH 341</li>
                <li>a math course at the 200-or-above level (i.e. MATH 2xx or MATH 3xx) that was not used to satisfy the above requirement</li>
                <li>at least three CSCI courses at the 300-or-above level, not including CSCI 39x courses or any courses used to satisfy the above requirements.</li>
              </ul>
              The CSCI 134 requirement is waived for students that have gotten a 4+ on the AP Computer Science A Exam or who pass our CS Placement Exam (sign up <a className="link" href="https://docs.google.com/forms/d/e/1FAIpQLSeqGhIktPZ8HS1FMCepOhiPGR3Tiax7s2hwEbbJEobH3IMoow/viewform" target="_blank">here</a>). In this case, the student needs to take an additional CSCI course to bring their total up to 8. This situation corresponds to the "accelerated" path in the Major Planning Assistant below.
            </div>
            <Spacer height="10px" />
            <div className="plaintext left">
              In addition, all computer science majors must attend a total of at least twenty sessions of the Computer Science Colloquium, a regular series of computer science talks typically held Fridays 235-350pm in Wege Auditorium (TCL 123). Juniors and seniors are encouraged to attend at least five during each semester they are present on campus.  Prospective majors in their first and second years are also encouraged to attend.
            </div>

            <Spacer height="20px" />
            <div className="heading" style={{
              textAlign: 'left'
            }}>major planning assistant</div>
            <Schedule
              style={{
                width: showSidebar ? style.width - 200 : style.width
              }}
            />

            <Spacer height="20px" />
            <div className="heading" style={{ textAlign: 'left' }}>
              declaring the major
            </div>
            <div className="plaintext left">
              You are eligible to declare the CS major once you have completed two CSCI courses (including CSCI 136) and MATH 200 (or a more advanced replacement, specifically MATH 328, 334, or 341).
              Once you have done so (typically by the end of your second year at Williams), proceed with the following steps:
              <ul>
                <li>Fill out a major planning worksheet (available <a className="link" href="http://sysnet.cs.williams.edu/~jeannie/advising/cs-planning-sheet-s24.pdf" target="_blank">here</a>) and submit it <a className="link" href="https://docs.google.com/forms/d/e/1FAIpQLSdC9GYleVaS2p-vWEFkJ4aHu_LNMlTxiVkq99EhwSbIPnGIEg/viewform" target="_blank">here</a>, along with a transcript. If you plan to double-major, be aware that Williams College does not permit a single course to satisfy two different major requirements. For this reason, our department provides specialized planning sheets for students planning to double-major in either <a className="link" href="http://sysnet.cs.williams.edu/~jeannie/advising/cs-math-planning-sheet-s24.pdf" target="_blank">Math</a> or <a className="link" href="http://sysnet.cs.williams.edu/~jeannie/advising/cs-stat-planning-sheet-s24.pdf" target="_blank">Statistics</a>.</li>
                <li>Once the major planning worksheet has been submitted, meet with a CS faculty member during pre-registration. To facilitate this process, the department will announce an advising schedule shortly before pre-registration.</li>
                <li>After the meeting, go <a className="link" href="https://williamscollege.formstack.com/forms/declare_major" target="_blank">here</a> to complete the "Declare Major" form  for the Williams College Registrar.</li>
                <li>Welcome to the CS Major! 🎈</li>
              </ul>
            </div>

            <Spacer height="20px" />
            <div className="heading" style={{ textAlign: 'left' }}>
              study away
            </div>
            <div className="plaintext left">
              Many CS majors elect to participate in a study away program (for general details on study away programs at Williams, go <a className="link" href="https://study-away.williams.edu/" target="_blank">here</a>).
              With approval from the department, some of the courses taken during study away (up to two CSCI courses and one MATH course) may be used to satisfy the CS major requirements.
              You cannot receive credit for the same material twice (i.e., If you take Machine Learning abroad, you cannot take it at Williams.) Pre-vetted courses (and the CS major requirements that they are eligible to satisfy) are available here:
            </div>
            <Spacer height="20px" />

            <StudyAway layout={layout}/>
            <Spacer height="20px" />
            <div className="plaintext left">
              If a particular course does not appear above, and you would like to use that course to satisfy a CS major requirement, then you must get pre-approval from the department before attending your study away program.
              To get pre-approval, email Mark Hopkins with a syllabus and course description.
            </div>
            <Spacer height="20px" />
            <div className="plaintext left">
            To obtain credit for pre-approved courses upon completion of the study away program, fill out this <a className="link" href="https://study-away.williams.edu/returning-students/study-away-evaluation/" target="_blank">form</a> for the Williams College Global Education and Study Away Office.
            </div>
            <Spacer height="20px" />
            <div className="plaintext left">
              Finally, a student will receive four colloquium credits for each semester away, up to a total of eight credits.
            </div>


          </div>


        </div>
      </div>

    </div>
  )
}

export default PlanYourMajor;