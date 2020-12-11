/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Select } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { StandardButton } from '../shared/Buttons';

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: '0.875rem',
    fontWeight: '700',
    padding: '1px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const FieldLabels = () => {
  const classes = useStyles();
  return (
    // wrap in fragment to maintain grid layout when rendered in parent
    <>
      <Grid item lg={2} cy-data="field_name_label_div">
        <Typography variant="h4" className={classes.label}>
          Field Name
        </Typography>
      </Grid>

      <Grid item lg={2} cy-data="field_type_label_div">
        <Typography variant="h4" className={classes.label}>
          Type
        </Typography>
      </Grid>

      <Grid item lg={1} cy-data="field_is_required_label_div">
        <Typography variant="h4" className={classes.label}>
          Required
        </Typography>
      </Grid>

      <Grid item lg={1} cy-data="field_is_array_label_div">
        <Typography variant="h4" className={classes.label}>
          Array
        </Typography>
      </Grid>

      <Grid item lg={2} cy-data="field_sample_options_label_div">
        <Typography variant="h4" className={classes.label}>
          Sample Options (If type=&lsquo;sample&lsquo;)
        </Typography>
      </Grid>

      <Grid item lg={3} cy-data="field_choices_label_div">
        <Typography variant="h4" className={classes.label}>
          Choices
        </Typography>
      </Grid>

      <Grid item lg={1} cy-data="field_choices_label_div" />
    </>
  );
};

const NameInput = ({ name, handleChange }) => (
  <Grid item lg={2} cy-data="field_name_label_div">
    <TextField
      name="name"
      fullWidth
      value={name}
      id="field_name"
      onChange={handleChange}
      variant="outlined"
      inputProps={{
        'aria-label': 'field_name',
        'cy-data': 'field_name_input',
      }}
    />
  </Grid>
);
NameInput.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const SelectType = ({ handleChange, type }) => (
  <Grid item lg={2}>
    <Select
      name="type"
      labelId="type_select_label"
      variant="outlined"
      id="field_type_select"
      value={type}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'type' }}
      MenuProps={{
        // open below
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        getContentAnchorEl: null,
      }}
      cy-data="field_type_select"
    >
      <MenuItem value="" name="select_none" disabled>
        {' '}
        Choose one{' '}
      </MenuItem>
      <MenuItem value="string" name="select_string">
        string
      </MenuItem>
      <MenuItem value="number" name="select_number">
        number
      </MenuItem>
      <MenuItem value="url" name="select_url">
        url
      </MenuItem>
      <MenuItem value="sample" name="select_sample">
        sample
      </MenuItem>
    </Select>
  </Grid>
);
SelectType.propTypes = {
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

const RequiredCheckbox = ({ isRequired, handleChange }) => (
  <Grid item lg={1} cy-data="is_required_checkbox_div">
    <Checkbox
      name="isRequired"
      value={isRequired}
      onClick={handleChange}
      color="primary"
      inputProps={{
        'aria-label': 'Required',
        'cy-data': 'field_is_required_checkbox',
      }}
    />
  </Grid>
);
RequiredCheckbox.propTypes = {
  isRequired: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const ArrayCheckbox = ({ isArray, handleChange }) => (
  <Grid item lg={1} cy-data="is_array_checkbox_div">
    <Checkbox
      name="isArray"
      value={isArray}
      onClick={handleChange}
      color="primary"
      inputProps={{
        'aria-label': 'Array',
        'cy-data': 'field_is_array_checkbox',
      }}
    />
  </Grid>
);
ArrayCheckbox.propTypes = {
  isArray: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const SampleOptionsInput = ({
  handleAddClick,
  // handleChange,
  // allowableFieldTypes,
  showSampleSelect,
}) => (
  <Grid item lg={2} cy-data="samples_div">
    {showSampleSelect ? (
      <>
        {/* <AllowableFieldTypes
              sampleTypes={sampleTypes}
              handleChange={handleChange}
              fieldType={fieldType}
              fieldTypeIndex={index}
            /> */}
        <StandardButton
          name="add_field_option_btn"
          variant="outlined"
          testName="add_field_option_btn"
          handleClick={handleAddClick}
          text="Add"
          dark
        />
      </>
    ) : (
      // ADD SAMPLES MENU
      <Typography>N/A</Typography>
    )}
  </Grid>
);
SampleOptionsInput.propTypes = {
  // handleChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  // allowableFieldTypes: PropTypes.array.isRequired,
  showSampleSelect: PropTypes.bool.isRequired,
  handleAddClick: PropTypes.func.isRequired,
};

const ChoicesInput = ({ handleChange, choices, showChoicesInput }) => (
  <Grid item lg={3} cy-data="choices_input_div">
    {showChoicesInput ? (
      <TextField
        name="choices"
        id="field_choices"
        multiline
        fullWidth
        rows={2}
        variant="outlined"
        helperText="Comma separated. Leave blank for unrestricted value."
        inputProps={{
          'aria-label': 'choices',
          'cy-data': 'add_field_choices_input',
        }}
        value={choices}
        onChange={handleChange}
      />
    ) : (
      <Typography>N/A</Typography>
    )}
  </Grid>
);
ChoicesInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  choices: PropTypes.string.isRequired,
  showChoicesInput: PropTypes.bool.isRequired,
};

const RemoveField = ({ handleRemoveFieldClick, index }) => (
  <Grid item lg={1} cy-data="remove_field_btn_div">
    <IconButton
      onClick={handleRemoveFieldClick(index)}
      cy-data="remove_field_btn"
    >
      <CloseIcon />
    </IconButton>
  </Grid>
);
RemoveField.propTypes = {
  handleRemoveFieldClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

// // eslint-disable-next-line no-unused-vars
// const AllowableFieldTypes = (sampleTypes, handleChange, fieldTypeIndex, fieldType) => (
//   <>
//     {fieldType.allowable_field_types !== undefined
//     && fieldType.allowable_field_types.map((aft, index) => (
//       <Select
//         name={`allowableFieldType[${fieldTypeIndex}]`}
//         labelId="allowable_field_type_select_label"
//         variant="outlined"
//         id="allowable_field_type_select"
//         value={aft[index]}
//         onChange={handleChange}
//         displayEmpty
//         inputProps={{ 'aria-label': 'allowable_field_type_select_label' }}
//         MenuProps={{
//           // open below
//           anchorOrigin: {
//             vertical: 'bottom',
//             horizontal: 'left',
//           },
//           getContentAnchorEl: null,
//         }}
//         cy-data="allowable_field_type_select_label"
//       >
//         <MenuItem value={{}} name="select_none" disabled>
//           {' Choose one '}
//         </MenuItem>
//         {sampleTypes.map((st) => (
//           <MenuItem key={index} value={st} name={`select_${st.name}`}>
//             {st.name}
//           </MenuItem>
//         ))}
//       </Select>
//     ))}
//   </>
// );

export const SampleTypeField = ({
  fieldType,
  index,
  updateParentState,
  handleRemoveFieldClick,
  handleAddAllowableFieldClick,
}) => {
  let showSampleSelect = fieldType.type === 'sample';
  let showChoicesInput = fieldType.type === 'string' || fieldType.type === 'number';

  useEffect(() => {
    // Update showSampleOptions & showSampleChoices when fieldType.type changes
    showSampleSelect = fieldType.type === 'sample';
    showChoicesInput = fieldType.type === 'string' || fieldType.type === 'number';
  });

  // Handle input change: Pass the name and value to the parent callback.
  // If the input is a checkbox we need to use the checked attribute as our value
  const handleChange = (event) => {
    const { name } = event.target;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const fieldTypeObj = { ...fieldType };
    fieldTypeObj[name] = value;
    updateParentState(name, value, index);
  };

  // Fields are not required on sample types so a user should be able add an empty field
  // But if any of the field inputs are not empty or null we want to set some requirements
  // eslint-disable-next-line no-unused-vars
  const fieldRequired = () => {
    const emptyFieldType = {
      id: null,
      name: '',
      type: '',
      isRequired: false,
      isArray: false,
      choices: '',
      allowableFieldTypes: [],
    };

    return fieldType !== emptyFieldType;
  };

  return (
    // wrap in fragment to maintain grid layout when rendered in parent
    <>
      <NameInput name={fieldType.name} handleChange={handleChange} />

      <SelectType handleChange={handleChange} type={fieldType.type} />

      <RequiredCheckbox
        isRequired={fieldType.isRequired}
        handleChange={handleChange}
      />

      <ArrayCheckbox isArray={fieldType.isArray} handleChange={handleChange} />

      <SampleOptionsInput
        handleAddClick={handleAddAllowableFieldClick}
        handleChange={handleChange}
        showSampleSelect={showSampleSelect}
        allowableFieldTypes={[]}
      />

      <ChoicesInput
        handleChange={handleChange}
        choices={fieldType.choices}
        showChoicesInput={showChoicesInput}
      />

      <RemoveField
        handleRemoveFieldClick={handleRemoveFieldClick}
        index={index}
      />
    </>
  );
};

SampleTypeField.propTypes = {
  fieldType: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    isRequired: PropTypes.bool,
    isArray: PropTypes.bool,
    choices: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  updateParentState: PropTypes.func.isRequired,
  handleRemoveFieldClick: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  // sampleTypes: PropTypes.array.isRequired,
  handleAddAllowableFieldClick: PropTypes.func.isRequired,
};
