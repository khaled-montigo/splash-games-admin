import {useNode} from "@craftjs/core";

export const pe = () => {
    const {connectors: { connect, drag } } = useNode();
    const {ElID} = useNode((node) => ({ElID: node.id}));
    return (
        <></>
    );
}