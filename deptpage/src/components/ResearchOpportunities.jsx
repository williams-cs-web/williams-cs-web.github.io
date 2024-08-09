import Sidebar from './Sidebar'


const ResearchOpportunities = ({ style, layout }) => {

  const renderHeading = (heading) => (
    <div className="heading">{heading.toLowerCase()}</div>
  )

  const ssr = {
    name: 'summer science research',
    image: 'images/misc/kayaking.jpg',
    description: "Williams has recently been able to provide a number of summer positions for students wishing to assist faculty in their research. In recent summers 50 to 100 students have been employed as research assistants in the sciences. Student research assistants are provided with a stipend, and are able to obtain reduced rates for room and board at the college for the summer. These research assistant positions make it possible for many students to get a head start on an honors thesis. Others use this as an opportunity to get a more intense introduction to their intended major."
  }

  const renderOpportunity = opportunity => (
    layout === "wide" ? renderOpportunityWide(opportunity)
      : renderOpportunityNarrow(opportunity)
  )

  const renderOpportunityNarrow = opportunity => (
    <div className="plaintext" style={{
      display: 'flex',
      flexFlow: 'column nowrap',
      fontSize: '16px',
      gap: '20px'
    }}>
      {renderHeading(opportunity.name)}
      {opportunity.image ?
        <img
          width="100%"
          src={opportunity.image}
          alt={`photo of research event`}
        /> : null}
      {opportunity.description}
    </div>
  )

  const renderOpportunityWide = opportunity => (
    <div style={{
      display: 'flex',
      flexFlow: 'row nowrap',
      gap: '20px'
    }}>
      <div className="plaintext" style={{
        width: '40%',
        flexGrow: 1,
        flexShrink: 1,
        fontSize: '16px'
      }}>
        {renderHeading(opportunity.name)}
        {opportunity.description}
      </div>
      <div style={{
        width: '60%',
        margin: '10px',
        flexGrow: 1,
        flexShrink: 1
      }}>
        <img
          width="100%"
          src={opportunity.image}
          alt={`photo of research event`}
        />
      </div>
    </div>
  )

  const renderHonorsThesis = () => (
    <div style={{
      display: 'flex',
      flexFlow: 'row nowrap',
      gap: '20px'
    }}>

      <div className="plaintext" style={{
        flexGrow: 1,
        flexShrink: 1
      }}>
        <div style={{ fontSize: '16px' }}>
          {renderHeading("honors thesis")}
          <div style={{ paddingTop: '8px' }}>The senior-year honors thesis gives students the opportunity to get the “feel” of doing research, and provides experience for graduate school or future employment. </div>
          <div style={{ paddingTop: '8px' }}>Interested students are advised to consult with individual faculty well in advance of their senior year, since specific research projects may require prior election of relevant courses. Most honors projects involve work on problems closely related to their faculty advisor’s own research projects, so students are strongly advised to talk to various members of the department about what projects might be available.</div>
          <div style={{ paddingTop: '8px' }}>Students who are interested in honors work should consult with their departmental advisor as soon as possible, preferably when declaring the major, so that their course work can be planned so as not to create conflicts during their senior year. During Winter Study or the spring semester of their junior year, students typically consult with the members of the department in order to find a match of interests. (A list of current faculty members and their research interests can be found at the end of this document.) During the process of finding an appropriate match, the department requires submission of a research application (please read the application and make note of the submission deadline). Once such a match is found and agreed to by both parties, the student registers for CSCI 493-W031-494, Senior Honors Project. It is often possible for the student to work with the faculty member as a research assistant during the summer on a project leading to the thesis work, but this is not required.</div>
          <div style={{ paddingTop: '8px' }}>Formal work on the thesis begins during the fall semester. The early weeks generally involve fleshing out the problems to be solved and searching through the literature determining what is already known. A one-page description of the thesis project is due in early November. As the semester progresses the work becomes more focused as student and advisor map out a plan and the student begins work on the problem. Before the end of the fall semester, the student and advisor will select a second reader for the thesis. Although the entire department will convene to discuss the work when it is time to grant Honors, it is the second reader’s job to help guarantee that the thesis itself is of high quality. By the end of the fall semester the student will submit a chapter on the background of the thesis work (detailing previous work in the area) to the advisor and second reader to be critiqued.</div>
          <div style={{ paddingTop: '8px' }}>Winter Study is a crucial time for honors students. With no other courses to place demands on the student, the month of January should be the most productive month of the year. Most (though not necessarily all) of the research work should be finished during this time. If the honors work involves the development of a significant software package, then that work should also be completed by the end of the Winter Study period. The student should also have written up a chapter on the thesis goals and submitted it to both readers for feedback. This paper will generally become the introduction of the thesis.</div>
          <div style={{ paddingTop: '8px' }}>At the beginning of the spring semester, several important events occur. The first is the decision of the department as to whether the student will be admitted into candidacy for Honors. Admission is contingent upon the department being convinced that the work thus far has been of high quality and that the student can reasonably be expected to complete the remaining requirements. (If the student is not admitted to candidacy, the fall semester and Winter Study courses revert to independent study courses and the student takes some course other than CSCI 494 to round out his or her schedule.) The second event is that the student will give an oral presentation of the work completed at a department colloquium. This talk must have been presented at least two weeks before Spring Break. Sometime before the break, the student should discuss an outline of the thesis with his or her advisors, submitting it to both readers for approval.</div>
          <div style={{ paddingTop: '8px' }}>By the end of Spring Break, the actual writing of the thesis should be well underway. As each chapter of the thesis is completed, the student will give it to both readers who will examine it, make comments and discuss them with the student. By the end of April the student should give a complete draft of the entire thesis (with illustrations and bibliographic references included) to the readers. The readers will comment and provide feedback to the student within a week. The student will then make appropriate revisions, handing in a completed copy of the thesis by the Thursday before the end of classes. Since the entire department must have a chance to examine the thesis before the defense, the defense will be scheduled for a few days later. Under no circumstances, however, will it be scheduled after the last day of reading period.</div>
          <div style={{ paddingTop: '8px' }}>The thesis defense consists of a roughly half-hour public presentation. The purpose is to present the findings of one’s yearlong research work to the Computer Science department.  Presentations are followed by a short question and answer session with the faculty and other audience members in attendance. After the defense, the CS department meets and discusses whether the student’s performance throughout the year merits Honors, Highest Honors, or no particular distinction. The student is informed of the department’s decision shortly thereafter. On occasion, the student may be informed that they will receive Honors contingent on making certain revisions in the thesis.</div>
          <div style={{ paddingTop: '8px' }}>The decision to pursue honors work should be made with care. The benefits are the opportunity to work one-on-one with a faculty member, to explore a problem in depth, and to engage in the type of scholarship necessary to succeed in post-graduate work. One cost is that two courses are taken up by this activity. Also, the Winter Study period, which for many students is the least pressured time during the school year, becomes a time of hard work and dedication to the honors project. We encourage you to talk to various members of the department as well as current honors students about honors work.</div>
          <div style={{ paddingTop: '8px' }}></div>
          <div style={{ paddingTop: '8px' }}></div>
          <div style={{ paddingTop: '8px' }}></div>
          <div style={{ paddingTop: '8px' }}></div>
          <div style={{ paddingTop: '8px' }}></div>
        </div>
      </div>
    </div>
  )

  return (
    <div
      id="research-opportunities"
      style={{
        ...style,
        fontSize: "30px"
      }}
    >
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap'
      }}>
        {layout === "wide" ? <Sidebar title="research opportunities" className="sidebar-research-opportunities" />  : <div style={{ width: '20px' }} />}
        <div style={{
          width: layout === "wide" ? '70%' : '100%',
          paddingTop: '30px',
          textAlign: 'left'
        }}>
          {renderOpportunity(ssr)}
          <div style={{ 'height': '20px' }} />
          {renderHonorsThesis()}
        </div>
      </div>

    </div>
  )
}

export default ResearchOpportunities;