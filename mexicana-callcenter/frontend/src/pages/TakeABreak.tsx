import PageStructure from "../components/PageStructure"
import TABreakButtons from "../components/TABreakButtons"

const TakeABreak = () => {

  return (
    <PageStructure title="Take a Break">
        <div>
            <div>
                <h1 className="font-roboto font-light text-primary">We’re here for you</h1>
            </div>
        
            <div className="container space-x-4">
                <TABreakButtons picture="/need_help_nbg.png" title="Contact help" handleClick={() => window.open ('https://www.gob.mx/stps/articulos/conoce-el-programa-de-bienestar-emocional-en-el-trabajo', '_blank')}/>
                <TABreakButtons picture="/breathing_exc_nbg.png" title="Breathing excersises" handleClick={() => window.location.href = '/supervisor/BreathingExcer'}/>
                <TABreakButtons picture="/move_body_nbg.png" title="Move your body" handleClick={() => window.location.href = '/supervisor/MoveYourBody'}/>
            </div>
        </div>
    </PageStructure>
  );
};
export default TakeABreak;