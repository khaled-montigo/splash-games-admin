import React from 'react';
import {useSelector} from "react-redux";

const EndFormCode = ({ClassName}) => {
    const { Coding } = useSelector(state => {
        return {
            Coding: state.IsCoding,
        };
    });



    return (<> {!Coding ? "" :`
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

export default EndFormCode;
