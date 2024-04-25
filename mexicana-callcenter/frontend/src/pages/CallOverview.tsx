import PageStructure from "../components/PageStructure";


const MainContent = () => {
    return (
<p>Content</p>
    )
};



const CallOverview= () => {
    return (
      <PageStructure title="Call Overview">
        <MainContent />
      </PageStructure>
    );
  };
  
  export default CallOverview;
  