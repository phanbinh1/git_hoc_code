import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import FormThemCoSoNgoai from './form';
import ListCoSoNgoai from './list';
import { reset } from 'redux-form';

const CoSoNgoai = ({
    coSoNgoaiSelected,
    setCoSoNgoaiSelected
}) => {
    const dispatch = useDispatch();
    const [coSos, setCoSos] = useState(coSoNgoaiSelected || []);
    return <Fragment>
        <FormThemCoSoNgoai
            onSubmit={(data) => {
                setCoSos(coSos => [...coSos, { ...data, uuid: coSos.length }]);
                dispatch(reset("FORM_THEM_CO_SO_NGOAI"))
            }}
        />
        <ListCoSoNgoai
            coSos={coSos}
            coSoNgoaiSelected={coSoNgoaiSelected}
            setCoSoNgoaiSelected={setCoSoNgoaiSelected}
        />
    </Fragment>
}

export default CoSoNgoai;