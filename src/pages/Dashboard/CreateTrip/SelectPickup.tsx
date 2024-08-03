import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import type { GroupBase, OptionsOrGroups } from "react-select";
import { Modal } from 'react-bootstrap';
import Input from '../../../components/common/FormElements/Input';

import "./style.scss"
import CustomError from '../../../components/common/FormElements/CustomError';
import { useFormikContext } from 'formik';

export type OptionType = {
    value: number;
    label: string;
};


const SelectPickup = () => {
    // const [value, setValue] = useState<OptionType | null>(null)
    const [show, setShow] = useState(false);

    const { setFieldTouched, errors, values, setFieldValue, handleBlur } = useFormikContext<any>();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function loadOptions(search: string, _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>, { page }: any) {
        const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(search)}&polygon_geojson=1&format=jsonv2`);
        const responseJSON = await response.json();

        console.log(responseJSON, ">>>>> reponse")

        if (responseJSON.length === 0) {
            return {
                options: [
                    { value: 'custom', label: 'Add custom location' }
                ]
            }
        }


        const formattedResponse = responseJSON?.map((location: any) => {
            return {
                ...location,
                label: location.display_name,
                value: location.display_name
            }
        })

        return {
            options: formattedResponse,
        };
    }

    const handleOnChange = (value: any) => {
        if (value.value === "custom") {
            handleShow()
        } else {
            setFieldValue("pickUp", value?.display_name)
            setFieldValue("pickUpPointLong", value?.lon)
            setFieldValue("pickUpPointLat", value?.lat)
            // setValue(value);
        }

    }

    const handleAddAddress = () => {
        setFieldTouched("pickUp", true)
        setFieldTouched("pickUpPointLat", true)
        setFieldTouched("pickUpPointLong", true)
        if (!errors?.['pickUpPointLat'] && !errors?.["pickUpPointLong"] && !errors?.["pickUp"] && values?.['pickUpPointLat'] && values?.['pickUpPointLong'] && values?.['pickUp']) {
            handleClose();
        }

    }




    // console.log(value, ">>>>>> value")

    return (
        <div className='pickup-component'>
            <label>Pick up *</label>
            <AsyncPaginate
                value={{ value: values?.["pickUp"], label: values?.["pickUp"] }}
                loadOptions={loadOptions}
                onChange={handleOnChange}
                additional={{
                    page: 1,
                }}
                onBlur={handleBlur}
                className='async-select'
                components={{
                    NoOptionsMessage: () => (
                        <div>
                            No results found. Select "Add custom location" to enter an address manually.
                        </div>
                    )
                }}
            />

            <Modal size='lg' className='pickup-place-modal' centered show={show}>

                <div className='modal-outer'>
                    <div>
                        <Input name="pickUp" label="End pickup address *" type="text" />
                        <CustomError name="pickUp" />
                    </div>
                    <div className="coord-block">
                        <div>
                            <Input name="pickUpPointLat" label="Latitude *" type="text" />
                            <CustomError name="pickUpPointLat" />
                        </div>
                        <div>
                            <Input name="pickUpPointLong" label="Longitude *" type="text" />
                            <CustomError name="pickUpPointLong" />
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleAddAddress}>
                        Add
                    </button>
                </div>
            </Modal>



        </div>
    )
}

export default SelectPickup