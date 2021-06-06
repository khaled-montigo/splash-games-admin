import React from 'react';
import {useSelector} from "react-redux";

const EndWizardFormCode = ({ClassName}) => {
    const { Coding } = useSelector(state => {
        return {
            Coding: state.IsCoding,
        };
    });



    return (<> {!Coding ? "" :`
               </StepWizard>
                </Card.Body>
                <Card.Footer>
                    <FormGroup>
                        <FormControl type="submit" />
                    </FormGroup>
                </Card.Footer>
            </UtilForm>
        </BootstrapForm> 
        
    </Card>
</>)

}
export default ${ClassName};`} </>);
};

export default EndWizardFormCode;
