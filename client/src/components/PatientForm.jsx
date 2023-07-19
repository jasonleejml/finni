import React, { useMemo } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { ConstraintField } from "./ConstraintField";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { states } from "./utils/states";
import moment from "moment";
import { ADD_PATIENT } from "../mutations/patientMutations";
import { useMutation } from "@apollo/client";
import { GET_ALL_PATIENTS } from "../queries/patientQueries";
import { toast } from "react-toastify";

export const initialRequiredFields = [
    {
        name: "firstName",
        label: "First Name",
        required: true,
        placeholder: "First Name",
        type: "string",
    },
    {
        name: "middleName",
        label: "Middle Name (Optional)",
        required: false,
        placeholder: "Middle Name",
        type: "string",
    },
    {
        name: "lastName",
        label: "Last Name",
        required: true,
        placeholder: "Last Name",
        type: "string",
    },
    {
        name: "dob",
        label: "Date of Birth",
        placeholder: "Date of Birth",
        type: "date",
    }
];

export const addressFieldsTemplate = [
    {
        name: "street1",
        label: "Address Line 1",
        required: true,
        placeholder: "Address Line 1",
        type: "string",
    },
    {
        name: "street2",
        label: "Address Line 2 (Optional)",
        required: false,
        placeholder: "Address Line 2",
        type: "string",
    },
    {
        name: "city",
        label: "City",
        required: true,
        placeholder: "City",
        type: "string",
    },
    {
        name: "state",
        label: "State",
        required: true,
        placeholder: "State",
        type: "select",
        options: states,
    },
    {
        name: "zip",
        label: "Zip Code",
        required: true,
        placeholder: "Zip Code",
        type: "string",
    },
]

export const PatientForm = ({ type, close, defaultValues, patientID, update }) => {
    const { control, handleSubmit } = useForm({
        defaultValues: defaultValues ?? {
            firstName: "",
            middleName: "",
            lastName: "",
            dob: moment(),
            address: [{
                street1: "",
                street2: "",
                city: "",
                state: "",
                zip: ""
            }],
            additionalFields: [],
        }
    });

    const [addPatient] = useMutation(ADD_PATIENT, {
        onCompleted: () => {
            close();
            toast.success("Created the new patient successfully!")
        },
        refetchQueries: [{ query: GET_ALL_PATIENTS }]
    })

    const { fields: addressFields, append: addressAppend, remove: addressRemove } = useFieldArray({
        control,
        name: "address",
    });

    const { fields: additionalFields, append: additionalFieldsAppend, remove: additionalFieldsRemove } = useFieldArray({
        control,
        name: "additionalFields",
    })

    const onSubmit = ({ firstName, middleName, lastName, dob, address, additionalFields }) => {
        type === "edit"
            ?
            update({
                variables: {
                    id: patientID,
                    firstName,
                    middleName,
                    lastName,
                    dob: moment(dob).format("YYYY-MM-DD"),
                    address,
                    additionalFields,
                }
            })
            :
            addPatient({
                variables: {
                    firstName,
                    middleName,
                    lastName,
                    dob: moment(dob).format("YYYY-MM-DD"),
                    address,
                    additionalFields,
                }
            });
    };

    // renders the initial required fields like first name and last name
    const renderInitialRequiredFields = useMemo(() => (
        initialRequiredFields?.map((formField, index) => (
            <Box
                key={`${formField.name} - ${index}`}
                sx={{ gridArea: `${formField.name}` }}
            >
                <Controller
                    key={formField.name}
                    name={formField.name}
                    control={control}
                    render={({ field }) => {
                        return ConstraintField({
                            label: formField.label,
                            isRequired: formField.required,
                            field,
                            placeholder: formField.placeholder,
                            type: formField.type,
                            options: formField.options,
                        })
                    }}
                />
            </Box>
        ))
    ), [initialRequiredFields]);

    // renders the appropriate addressFields whether it be for one or multiple addresses
    const renderAddressFields = useMemo(() => (
        addressFields.map((item, index) => (
            <Box
                key={item.id}
                display="flex"
                flexDirection="column"
                gap={2}
                sx={{
                    paddingTop: 2,
                    marginTop: 2,
                    borderTop: "1px solid gray"
                }}
            >
                {addressFieldsTemplate.map((formField) => (
                    <Controller
                        key={`address.${index}.${formField.name}`}
                        name={`address.${index}.${formField.name}`}
                        control={control}
                        render={({ field }) => {
                            return ConstraintField({
                                label: formField.label,
                                isRequired: formField.required,
                                field,
                                placeholder: formField.placeholder,
                                type: formField.type,
                                options: formField.options,
                            })
                        }}
                    />
                ))}
                {addressFields.length !== 1 && (
                    <Button onClick={() => addressRemove(index)} variant="contained" color="error" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                )}
            </Box>
        ))
    ), [addressFields, addressFieldsTemplate])

    // renders the customizable additional fields as needed
    const renderAdditionalFields = useMemo(() => (
        additionalFields.map((item, index) => (
            <Box
                key={item.id}
                display="flex"
                alignItems="center"
                gap={2}
            >
                <Controller
                    key={`additionalFields.${index}.title`}
                    name={`additionalFields.${index}.title`}
                    control={control}
                    render={({ field }) => {
                        return ConstraintField({
                            label: "Field Name",
                            isRequired: true,
                            field,
                            type: "string",
                        })
                    }}
                />
                <Controller
                    key={`additionalFields.${index}.value`}
                    name={`additionalFields.${index}.value`}
                    control={control}
                    render={({ field }) => {
                        return ConstraintField({
                            label: "Field Value",
                            isRequired: true,
                            field,
                            type: "string",
                        })
                    }}
                />
                <Button onClick={() => additionalFieldsRemove(index)} variant="contained" color="error" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </Box>
        ))
    ), [additionalFields])

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>{type === "edit" ? "Edit Patient" : "Add Patient"}</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 2,
                    gridTemplateRows: "auto",
                    gridTemplateAreas: `
                    "firstName middleName lastName"
                    "dob dob dob"
                `
                }}
                >
                    {renderInitialRequiredFields}
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                >
                    {renderAddressFields}
                    <Button
                        onClick={() => addressAppend({
                            street1: "",
                            street2: "",
                            city: "",
                            state: "",
                            zip: ""
                        })}
                        variant="contained"
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                    >
                        Add Additional Addresses
                    </Button>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    sx={{
                        paddingTop: 2,
                        marginTop: 2,
                        borderTop: "1px solid gray"
                    }}
                >
                    {renderAdditionalFields}
                    <Button
                        onClick={() => additionalFieldsAppend({
                            title: "",
                            value: "",
                        })}
                        variant="contained"
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                    >
                        Add Additional Fields
                    </Button>
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{
                        marginTop: 4
                    }}
                >
                    <Button color="primary" variant="outlined" onClick={() => close()}>
                        Cancel
                    </Button>
                    <Button type="submit" color="success" variant="contained">
                        {type === "edit" ? "Save Changes" : "Submit"}
                    </Button>
                </Box>
            </form>
        </Box>
    )
}