import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dispatch, SetStateAction } from 'react';
import { Model, models as defaultModels } from '../services/models';
import { ViewStyle } from 'react-native';

const dropdownStyles = {
  container: {
    // width: 'fit-content', // React Native doesn't support 'fit-content'
    // Use auto instead
    width: 'auto'
  } as ViewStyle,
  picker: {
    borderWidth: 0,
    backgroundColor: "#f2f2f2",
    minHeight: 32,
    width: 180
  },
  itemContainer: {
    borderWidth: 0,
    backgroundColor: "#f2f2f2",
    width: 180
  },
  text: {
    fontSize: 14,
    color: "#000",
  }
};

interface ModelPickerProps {
  open: boolean;
  value: string | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string | null>>;
  onSelectModel: (model: Model) => void;
  zIndex?: number;
  models?: Model[];
}

export function ModelPicker({ 
  open, 
  value, 
  setOpen, 
  setValue, 
  onSelectModel, 
  zIndex = 50,
  models = defaultModels
}: ModelPickerProps) {
  const items = models.map(model => ({
    label: model.label,
    value: model.value,
    disabled: model.disabled
  }));

  const handleChange = (itemValue: string | null) => {
    if (itemValue) {
      const selectedModel = models.find(model => model.value === itemValue);
      if (selectedModel) onSelectModel(selectedModel);
    }
  };

  return (
    <DropDownPicker
      placeholder="Select Model"
      placeholderStyle={dropdownStyles.text}
      style={dropdownStyles.picker}
      dropDownContainerStyle={dropdownStyles.itemContainer}
      textStyle={dropdownStyles.text}
      containerStyle={{
        ...dropdownStyles.container,
        zIndex
      }}
      zIndex={zIndex}
      ArrowDownIconComponent={({ style }) => <ChevronDown size={16} color="#000" />}
      ArrowUpIconComponent={({ style }) => <ChevronUp size={16} color="#000" />}
      listItemContainerStyle={{ height: 32 }}
      disabledItemContainerStyle={{ opacity: 0.5 }}
      disabledItemLabelStyle={{ opacity: 0.5 }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={handleChange}
    />
  );
} 